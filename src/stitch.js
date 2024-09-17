export function Stitch(name, count = 1, countModifier = 1) {
    if (name === '') {
        throw new Error(`Invalid stitch name ${name}`);
    }

    if (!count) {
        throw new Error(`Invalid count ${count}`);
    }

    if (!countModifier) {
        throw new Error(`Invalid count modifier ${countModifier}`);
    }

    this.name = name;
    this.count = count;
    this.countModifier = countModifier;
}
Object.assign(Stitch.prototype, {
    toString: function() {
        return `${this.count > 1 ? this.count : ''}${this.name}`.trim();
    }
});

export function StitchGroup(stitches, count = 1) {
    if (stitches.length === 0) {
        throw new Error(`Empty stitch group`);
    }

    if (!count) {
        throw new Error(`Invalid count ${count}`);
    }

    this.stitches = stitches;
    this.count = count;
}
Object.assign(StitchGroup.prototype, {
    toString: function() {
        const string = this.stitches.map(s => s.toString()).join(',');
        return `(${string}) x ${this.count}`;
    }
});

export const FlatStitchArrayGenerator = {
    fromSingle: function(object) {
        if (object instanceof Stitch) return FlatStitchArrayGenerator._fromStitch(object);
        else if (object instanceof StitchGroup) return FlatStitchArrayGenerator._fromGroup(object);
        else throw new Error(`Invalid object ${object}`);
    },
    fromArray: function(array) {
        return array.reduce((a, b) => a.concat(FlatStitchArrayGenerator.fromSingle(b)), []);
    },
    _fromStitch: function(stitch){
        return Array(stitch.count).fill(new Stitch(stitch.name, 1, stitch.countModifier));
    },
    _fromGroup: function(stitchGroup) {
        return Array(stitchGroup.count)
            .fill(0)
            .reduce((a, _) => a.concat(FlatStitchArrayGenerator.fromArray(stitchGroup.stitches)) , []);
    }
}
