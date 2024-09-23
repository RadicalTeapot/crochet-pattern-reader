import { PatternElementIndexResolver } from '../utils/pattern-element-index-resolver.js';

function PatternElement(elementName, stitches, instruction, totalElementsCount, stitchesIndexLookup, indexInPattern, indexPerType) {
    if (!stitches || stitches.length === 0) {
        throw new Error('Empty round');
    }

    this._stitches = stitches;
    this._instruction = instruction;
    this._totalElementsCount = totalElementsCount;
    this._stitchesIndexLookup = stitchesIndexLookup;
    this._indexInPattern = indexInPattern;
    this._indexPerType = indexPerType;
    this._elementName = elementName; // This shouldn't be here, use a resolver for it in the view
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

export function Round(stitches, instruction, totalElementsCount, stitchesIndexLookup, indexInPattern = 0, indexPerType = 0) {
    PatternElement.call(this, 'Round', stitches, instruction, totalElementsCount, stitchesIndexLookup, indexInPattern, indexPerType);
}
Object.assign(Round.prototype, PatternElement.prototype);

export function Row(stitches, instruction, totalElementsCount, stitchesIndexLookup, indexInPattern = 0, indexPerType = 0) {
    PatternElement.call(this, 'Row', stitches, instruction, totalElementsCount, stitchesIndexLookup, indexInPattern, indexPerType);
}
Object.assign(Row.prototype, PatternElement.prototype);
