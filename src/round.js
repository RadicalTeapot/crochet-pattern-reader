import {parseStitch} from './stitch.js';
import {Instruction} from './instruction.js';

export function Round(stitches, stitchCount, instruction) {
    if (stitches.length === 0) {
        console.error(`Invalid round stitches ${stitches}`);
        return null;
    }

    if (!stitchCount) {
        console.error(`Invalid stitch count ${stitchCount}`);
        return null;
    }

    this.stitches = stitches;
    this.stitchCount = stitchCount;
    this.instruction = instruction;
}
Object.assign(Round.prototype, {
    getCurrentStitch: function(index) {
        if (index < 0 || index >= this.stitches.length) {
            console.error(`Invalid stitch index ${index}`);
            return null;
        }
        return this.stitches[index];
    },
})

function buildFlatStitchArray(data, stitchCounter, roundView) {
    const count = data.count === -1 ? stitchCounter.getPrevious() : data.count;
    if (!count) {
        console.error(`Invalid stitch count ${count}`);
        return null;
    }

    switch (data.type) {
        case 'stitch':
            stitchCounter.increment(count * (data.countModifier || 0));
            const stitch = parseStitch(data);
            roundView?.addStitch(stitch, count);
            return Array(count).fill(stitch);
        case 'repeat':
            roundView?.startRepeat();
            const stitches = Array(count).fill(null).reduce((a, _, i) => {
                const stitchesArrays = data.stitches.reduce((c, d) =>
                    c.concat(buildFlatStitchArray(d, stitchCounter, i == 0 ? roundView : undefined))
                    , []);
                return a.concat(stitchesArrays);
            }, []);
            roundView?.endRepeat(count);
            return stitches;
        default:
            console.error(`Invalid stitch type ${data}`);
            return null;
    }
}

export function parseRound(data, stitchCounter, projectView) {
    if (data.type !== 'round') {
        return null;
    }
    stitchCounter.newRound();
    const roundView = new RoundView();

    const stitches = data.stitches.map(d => buildFlatStitchArray(d, stitchCounter, roundView)).reduce((a,b) => a.concat(b), []);
    roundView.setStitchCount(stitchCounter.getCurrent());

    let instruction;
    if (data.instruction) {
        instruction = new Instruction(data.instruction);
        roundView.setInstruction(instruction);
    }

    projectView.addRound(roundView);

    return new Round(stitches, stitchCounter.getCurrent(), instruction);
}

export function RoundView() {
    this.currentRepeat = {elements: [], parent: null};
    this.elements = [];
    this.instruction = undefined;
    this.stitchCount = undefined;
}
Object.assign(RoundView.prototype, {
    addStitch: function(stitch, count) {
        this.currentRepeat.elements.push(`${count > 1 ? count : ''}${stitch.toString()}`);
    },
    startRepeat: function() {
        this.currentRepeat = {elements: [], parent: this.currentRepeat};
    },
    endRepeat: function(count) {
        const element = this.currentRepeat.elements.join(', ');
        const parent = this.currentRepeat.parent;
        if (parent) {
            this.currentRepeat = parent;
        }
        this.currentRepeat.elements.push(`(${element}) x ${count}`);
    },
    setInstruction: function(instruction) {
        this.instruction = instruction.toString();
    },
    setStitchCount: function(count) {
        this.stitchCount = count;
    },
    toString: function() {
        return this.currentRepeat.elements.join(', ') + (this.instruction ? ` (${this.instruction})` : '') + (this.stitchCount ? ` [${this.stitchCount}]` : '');
    }
})


