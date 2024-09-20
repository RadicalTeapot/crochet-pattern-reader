import { StitchParser } from './stitch-parser.js';
import { StitchGroupParser } from './stitch-group-parser.js';
import { InstructionParser } from '../instruction-parser.js';
import { StitchParserContext } from './stitch-parser-context.js';
import { StitchCountResolver } from '../../utils/stitch-count-resolver.js';
import { STITCH_ELEMENT_TYPE } from '../../utils/stitch-element-type.js';

export function StitchParserFactory(context, previousStitchCount = 0) {
    this._context = context || new StitchParserContext();
    this._stitchCountResolver = StitchCountResolver(previousStitchCount);
}
Object.assign(StitchParserFactory.prototype, {
    getParser: function(type) {
        switch (type) {
            case STITCH_ELEMENT_TYPE.STITCH:
                return new StitchParser(this._context, this._stitchCountResolver);
            case STITCH_ELEMENT_TYPE.GROUP:
                return new StitchGroupParser(this._context, this._stitchCountResolver, new StitchesParser(this));
            case STITCH_ELEMENT_TYPE.INSTRUCTION:
                return InstructionParser;
            default:
                throw new Error(`Invalid type ${type} found in stitch`);
        }
    }
});

export function StitchesParser(stitchParserFactory) {
    this._parserFactory = stitchParserFactory || new StitchParserFactory();
}
Object.assign(StitchesParser.prototype, {
    parse: function(data) {
        return data.map(d => this._parserFactory.getParser(d.type).parse(d));
    }
})
