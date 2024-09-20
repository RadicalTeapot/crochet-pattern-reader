import { Stitch } from '../models/stitch.js';

export const FlatStitchArrayResolver = {
    fromStitch: function(name, count, countModifier, indexInPatternElement) {
        return Array(count).fill(new Stitch(name, 1, countModifier, indexInPatternElement));
    },
    fromStitchGroup: function(stitches, count) {
        return Array(count)
            .fill(0)
            .reduce((a, _) => a.concat(stitches.reduce((b, s) => b.concat(s.asFlatStitchArray(this)), [])) , []);
    },
    fromInstruction: function(instruction) {
        return [];
    }
}

export const FlatStitchArrayGenerator = {
    fromSingle: function(object, resolver = FlatStitchArrayResolver) {
        return object.asFlatStitchArray(resolver);
    },
    fromArray: function(array, resolver = FlatStitchArrayResolver) {
        return array.reduce((a, b) => a.concat(FlatStitchArrayGenerator.fromSingle(b, resolver)), []);
    },
}
