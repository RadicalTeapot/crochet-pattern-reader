import { StitchParser } from './stitch-parser.js';
import { StitchGroupParser } from './stitch-group-parser.js';
import { InstructionParser } from '../instruction-parser.js';

export function StitchParserFactory(context, previousStitchCount = 0) {
    this._context = context || new StitchParserContext();
    this._stitchCountResolver = StitchCountResolver(previousStitchCount);
}
Object.assign(StitchParserFactory.prototype, {
    getParser: function(type) {
        switch (type) {
            case STITCH_ELEMENT_TYPE.STITCH:
                return StitchParser(this._context, this._stitchCountResolver);
            case STITCH_ELEMENT_TYPE.GROUP:
                return StitchGroupParser(this._context, this._stitchCountResolver, new StitchesParser(this));
            case STITCH_ELEMENT_TYPE.INSTRUCTION:
                return InstructionParser;
            default:
                throw new Error(`Invalid type ${type} found in stitch`);
        }
    }
});

export function StitchesParser(stitchParserFactory) {
    this._parserFactory = stitchParserFactory || new StitchParserFactory(0);
}
Object.assign(StitchesParser.prototype, {
    parse: function(data) {
        return data.map(d => this._parserFactory.getParser(d.type).parse(d));
    }
})
