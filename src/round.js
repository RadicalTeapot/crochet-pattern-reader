import { FlatStitchArrayGenerator } from './stitch.js';
import { StitchCounter } from './stitch-counter.js';

export function RoundCountResolver(flattener = FlatStitchArrayGenerator.fromArray, counter = StitchCounter.getCount) {
    return function(stitches) {
        const flattenedStitches = flattener(stitches);
        return counter(flattenedStitches);
    }
}

export function RoundStitchIndexResolver(flattener = FlatStitchArrayGenerator.fromArray) {
    return function(index, stitches) {
        const flattenedStitches = flattener(stitches);
        if (index < 0 || index >= flattenedStitches.length) {
            throw new Error(`Invalid stitch index ${index}`);
        }
        return flattenedStitches[index];
    }
}

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
