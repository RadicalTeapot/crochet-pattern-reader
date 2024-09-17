import { Round } from './round.js';

export function Project(name, pattern) {
    const trimmedName = name.trim();

    if (trimmedName === '') {
        throw new Error(`Invalid project name ${data.name}`);
    }

    this.name = trimmedName;
    this.setPattern(pattern);
}
Object.assign(Project.prototype, {
    toString: function() {
        return `Project: ${this.name}`;
    },
    setPattern: function(pattern) {
        this._pattern = pattern;
        // Precompute some values
        this._rounds = this._pattern.filter(p => p instanceof Round);
        this._totalStitches = this._rounds.reduce((a, b) => a + b.getStitchCount(), 0);
        this._roundIndexToPatternLineLookup = this._pattern.reduce((a, b, index) => {
            if (b instanceof Round) a.push(index);
            return a;
        }, []);
    },
    getPatternLength: function() {
        return this._pattern.length;
    },
    getPatternLine: function(index) {
        if (index < 0 || index >= this._pattern.length) {
            console.error(`Invalid pattern index ${index}`);
            return null;
        }

        return this._pattern[index];
    },
    getRoundsCount: function() {
        return this._rounds.length;
    },
    getStitchesCount: function() {
        return this._totalStitches;
    },
    getRoundStitchesCount: function(index) {
        if (index < 0 || index >= this._rounds.length) {
            console.error(`Invalid round index ${index}`);
            return null;
        }
        return this._rounds[index].stitchCount;
    },
    getRoundStitch: function(roundIndex, stitchIndex) {
        if (roundIndex < 0 || roundIndex >= this._rounds.length) {
            console.error(`Invalid round index ${roundIndex}`);
            return null;
        }
        const round = this._rounds[roundIndex];
        if (stitchIndex < 0 || stitchIndex >= round.flattenStitches.length) {
            console.error(`Invalid stitch index ${stitchIndex}`);
            return null;
        }
        return round.flattenStitches[stitchIndex];
    },
    getPatternLineFromRoundIndex: function(roundIndex) {
        if (roundIndex < 0 || roundIndex >= this._patternRoundIndexLookup.length) {
            console.error(`Invalid round index ${roundIndex}`);
            return null;
        }
        return this._patternRoundIndexLookup[roundIndex];
    },
    isLineARound: function(lineIndex) {
        if (lineIndex < 0 || lineIndex >= this._pattern.length) {
            console.error(`Invalid line index ${lineIndex}`);
            return null;
        }
        return this._pattern[lineIndex] instanceof Round;
    }
})
