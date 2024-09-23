import { FlatStitchArrayGenerator } from './flat-stitch-array-generator.js';

export function PatternElementIndexResolver(flattener = FlatStitchArrayGenerator.fromArray) {
    return function(index, elements) {
        const flattenedElements = flattener(elements);
        // TODO This doesn't work anymore since stitch doesn't have a isAtPatternElementIndex property
        const elementIndex = flattenedElements.findIndex(s => s.isAtPatternElementIndex && s.isAtPatternElementIndex(index));
        if (elementIndex === -1) {
            throw new Error(`Element index ${index} not found in pattern element`);
        }
        return flattenedElements[elementIndex];
    }
}

