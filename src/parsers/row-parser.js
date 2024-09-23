import { Row } from '../models/pattern-element.js';
import { Instruction } from '../models/instruction.js';
import { PATTERN_ELEMENT_TYPE } from '../utils/pattern-element-type.js';
import { PatternElementParserContext } from './pattern-parser.js';
import { StitchArrayParser } from './stitch/stitch-array-parser.js';

export function RowParser(context, stitchesParser) {
    this._context = context || new PatternElementParserContext();
    this._stitchesParser = stitchesParser || new StitchArrayParser();
}
Object.assign(RowParser.prototype, {
    parse: function(data) {
        if (!data || !data.type || !data.stitches || data.type !== 'row') {
            throw new Error('Found invalid row during pattern parsing');
        }

        const stitches = this._stitchesParser.parse(data.stitches);
        const totalStitchCount = this._stitchesParser.getTotalStitchCount();
        const stitchesIndexLookup = this._stitchesParser.getStitchesIndexLookup();

        let instruction;
        if (data.instruction) {
            instruction = new Instruction(data.instruction);
        }

        const indexInPattern = this._context.getAndIncrementAbsoluteIndex();
        const indexPerType = this._context.getAndIncrementPerTypeIndex(PATTERN_ELEMENT_TYPE.ROW);
        const patternElement = new Row(stitches, instruction, totalStitchCount, stitchesIndexLookup, indexInPattern, indexPerType);
        return patternElement;
    }
})
