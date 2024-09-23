import { Round } from '../models/pattern-element.js';
import { Instruction } from '../models/instruction.js';
import { PATTERN_ELEMENT_TYPE } from '../utils/pattern-element-type.js';
import { PatternElementParserContext } from './pattern-parser.js';
import { StitchArrayParser } from './stitch/stitch-array-parser.js';

export function RoundParser(context, stitchesParser) {
    this._context = context || new PatternElementParserContext();
    this._stitchesParser = stitchesParser || new StitchArrayParser();
}
Object.assign(RoundParser.prototype, {
    parse: function(data) {
        if (!data || !data.type || !data.stitches || data.type !== 'round') {
            throw new Error('Found invalid round element during pattern parsing');
        }

        const stitches = this._stitchesParser.parse(data.stitches);
        const totalStitchCount = this._stitchesParser.getTotalStitchCount();
        const stitchesIndexLookup = this._stitchesParser.getStitchesIndexLookup(); // TODO Maybe use a resolver here to inject in the Round model so it's easier to use

        let instruction;
        if (data.instruction) {
            instruction = new Instruction(data.instruction);
        }

        const indexInPattern = this._context.getAndIncrementAbsoluteIndex();
        const indexPerType = this._context.getAndIncrementPerTypeIndex(PATTERN_ELEMENT_TYPE.ROUND);
        const patternElement = new Round(stitches, instruction, totalStitchCount, stitchesIndexLookup, indexInPattern, indexPerType);
        return patternElement;
    }
})
