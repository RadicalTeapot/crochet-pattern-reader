import { RoundCountResolver, RoundStitchIndexResolver } from '../utils/round-resolvers';

export function Round(stitches, instruction) {
    if (!stitches || stitches.length === 0) {
        throw new Error('Empty round');
    }

    this._stitches = stitches;
    this._instruction = instruction;
}
Object.assign(Round.prototype, {
    getStitchCount: function(resolver = RoundCountResolver()) {
        return resolver(this._stitches);
    },
    getStitchAtIndex: function(index, resolver = RoundStitchIndexResolver()) {
        return resolver(index, this._stitches);
    },
})
