import { RoundCountResolver, RoundStitchIndexResolver } from '../utils/round-resolvers.js';

function PatternElement(elementName, stitches, instruction, indexInPattern = 0) {
    if (!stitches || stitches.length === 0) {
        throw new Error('Empty round');
    }

    this._stitches = stitches;
    this._instruction = instruction;
    this._indexInPattern = indexInPattern;
    this._elementName = elementName;
}
Object.assign(PatternElement.prototype, {
    getIndexInPattern: function() {
        return this._indexInPattern;
    },
    getStitchCount: function(resolver = RoundCountResolver()) {
        return resolver(this._stitches);
    },
    getStitchAtIndex: function(index, resolver = RoundStitchIndexResolver()) {
        return resolver(index, this._stitches);
    },
    asView: function(viewResolver) {
        return viewResolver.patternElementView(this._elementName, this._stitches, this._instruction, this._indexInPattern, this.getStitchCount());
    }
});

export function Round(stitches, instruction, indexInPattern = 0) {
    PatternElement.call(this, 'Round', stitches, instruction, indexInPattern);
}
Object.assign(Round.prototype, PatternElement.prototype);

export function Row(stitches, instruction, indexInPattern = 0) {
    PatternElement.call(this, 'Row', stitches, instruction, indexInPattern);
}
Object.assign(Row.prototype, PatternElement.prototype);
