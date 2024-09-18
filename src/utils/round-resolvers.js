import { FlatStitchArrayGenerator } from './flat-stitch-array-generator.js';
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

