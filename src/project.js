import { Round, parseRound } from './round.js';
import { parseInstruction } from './instruction.js';
import { StitchCounter } from './stitch-counter.js';

export function Project(data, pattern) {
    if (data.name === '') {
        console.error(`Invalid project name ${data.name}`);
        return null;
    }

    this.name = data.name;

    this._pattern = pattern;
    this._rounds = this._pattern.filter(p => p instanceof Round);
    this._totalStitches = this._rounds.reduce((a, b) => a + b.stitches.length, 0);
}
Object.assign(Project.prototype, {
    toString: function() {
        return `Project: ${this.name}`;
    },
    getRoundsCount: function() {
        return this._rounds.length;
    },
    getStitchesCount: function() {
        return this._totalStitches;
    },
    getRoundStitchesCount: function(index) {
        return this._rounds[index].stitches.length;
    },
    getRoundStitch: function(roundIndex, stitchIndex) {
        return this._rounds[roundIndex].stitches[stitchIndex];
    }
})

export function parseProject(data) {
    const projectView = new ProjectView();
    const stitchCounter = new StitchCounter();
    const project = new Project(data, data.pattern.map(d => {
        switch (d.type) {
            case 'round':
                const round = parseRound(d, stitchCounter, projectView);
                return round;
            case 'instruction':
                const instruction = parseInstruction(d);
                projectView.addInstruction(instruction);
                return instruction;
            default:
                console.error(`Invalid type ${d.type} found in project ${data}`);
                return null;
        }
    }, []));

    projectView.setProject(project);
    return { project, view: projectView };
}


export function ProjectView() {
    this.project = null;
    this.currentRoundIndex = 0;
    this.roundCounter = 0;
    this.lines = [];
}
Object.assign(ProjectView.prototype, {
    toString: function() {
        const patternString = this.lines.map(line => {
            const indent = this.currentRoundIndex === line.index ? '->' : '  ';
            const separator = '-';
            const lineElements = [indent];
            if (line.index !== undefined) {
                lineElements.push(`${line.index + 1}`);
                lineElements.push(`${separator}`);
            }
            if (line.string) {
                lineElements.push(`${line.string}`);
            }
            return lineElements.join(' ');

        }).join('\n');
        return `${this.project.toString()}\n${patternString}`;
    },
    setProject: function(project) {
        this.project = project;
    },
    setCurrentRoundIndex: function(currentRoundIndex) {
        this.currentRoundIndex = currentRoundIndex;
    },
    addRound: function(round) {
        const roundIndex = this.roundCounter++;
        this.lines.push({ index: roundIndex, string: round.toString() });
    },
    addInstruction: function(instruction) {
        this.lines.push({ string: instruction.toString() });
    },
})
