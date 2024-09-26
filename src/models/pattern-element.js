import { PatternElementIndexResolver } from '../utils/pattern-element-index-resolver.js';

export function PatternElement(elementType, stitches, instruction, totalElementsCount, stitchesIndexLookup, indexInPattern, indexPerType) {
    if (!stitches || stitches.length === 0) {
        throw new Error(`Empty ${elementType}`);
    }

    this._stitches = stitches;
    this._instruction = instruction;
    this._totalElementsCount = totalElementsCount;
    this._stitchesIndexLookup = stitchesIndexLookup;
    this._indexInPattern = indexInPattern;
    this._indexPerType = indexPerType;
    this._elementType = elementType;
}
Object.assign(PatternElement.prototype, {
    getIndexInPattern: function() {
        return this._indexInPattern;
    },
    getElementAtIndex: function(index, resolver = PatternElementIndexResolver()) {
        // TODO This should use this._stitchesIndexLookup instead
        return resolver(index, this._stitches);
    },
    asView: function(viewResolver) {
        return viewResolver.patternElementView(this._elementName, this._stitches, this._instruction, this._indexInPattern, this._totalElementsCount);
    }
});
