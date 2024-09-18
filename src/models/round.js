import { RoundCountResolver, RoundStitchIndexResolver } from '../utils/round-resolvers.js';

export function Round(stitches, instruction, indexInPattern = 0) {
    if (!stitches || stitches.length === 0) {
        throw new Error('Empty round');
    }

    this._stitches = stitches;
    this._instruction = instruction;
    this._indexInPattern = indexInPattern;
}
Object.assign(Round.prototype, {
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
        return viewResolver.roundView(this._stitches, this._instruction, this._indexInPattern, this.getStitchCount());
    }
});
