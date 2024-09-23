
import { RoundParser } from './round-parser.js';
import { RowParser } from './row-parser.js';
import { StitchArrayParser, StitchArrayParserContext } from './stitch/stitch-array-parser.js';
import { StitchCountResolver } from '../utils/stitch-count-resolver.js';
import { InstructionParser } from './instruction-parser.js';
import { PATTERN_ELEMENT_TYPE } from '../utils/pattern-element-type.js';

export function PatternElementParserContext() {
    this._absoluteIndex = 0;
    this._perTypeIndex = {};
    // TODO Should this be done like so or using reduce on PATTERN_ELEMENT_TYPE.getOwnPropertyNames?
    this._perTypeIndex[PATTERN_ELEMENT_TYPE.ROUND] = 0;
    this._perTypeIndex[PATTERN_ELEMENT_TYPE.ROW] = 0;
}
Object.assign(PatternElementParserContext.prototype, {
    getAndIncrementAbsoluteIndex: function() {
        const index = this._absoluteIndex;
        this._absoluteIndex++;
        return index;
    },
    getAndIncrementPerTypeIndex: function(type) {
        if (!this._perTypeIndex.hasOwnProperty(type)) {
            throw new Error(`Invalid type ${type}`);
        }
        const index = this._perTypeIndex[type];
        this._perTypeIndex[type]++;
        return index;
    },
});

export function PatternElementParserFactory(patternParserContext, stitchArrayParserContext) {
    this._context = patternParserContext || new PatternElementParserContext();
    this._stitchArrayParserContext = stitchArrayParserContext || new StitchArrayParserContext();
}
Object.assign(PatternElementParserFactory.prototype, {
    _getStitchArrayParser: function() {
        // Use count from previous parsed pattern element
        const countResolver = new StitchCountResolver(this._stitchArrayParserContext.getTotalStitchCount());
        this._stitchArrayParser = new StitchArrayParser(new StitchArrayParserContext(), countResolver);
        return this._stitchArrayParser;
    },
    getParser: function(type) {
        switch (type) {
            case PATTERN_ELEMENT_TYPE.ROUND:
                return new RoundParser(this._context, this._getStitchArrayParser());
            case PATTERN_ELEMENT_TYPE.ROW:
                return new RowParser(this._context, this._getStitchArrayParser());
            case PATTERN_ELEMENT_TYPE.INSTRUCTION:
                return new InstructionParser();
            default:
                throw new Error(`Invalid type ${type} found in pattern element`);
        }
    },
});

export function PatternArrayParser(patternElementParserFactory) {
    this._parserFactory = patternElementParserFactory || new PatternElementParserFactory();
}
Object.assign(PatternArrayParser.prototype, {
    parse: function(data) {
        return data.map(d => {
            if (!d || !d.type) {
                throw new Error(`Invalid data ${d} found in stitches`);
            }
            return this._parserFactory.getParser(d.type).parse(d);
        });
    }
});

