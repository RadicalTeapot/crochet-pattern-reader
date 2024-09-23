import { StitchParser } from './stitch-parser.js';
import { StitchGroupParser } from './stitch-group-parser.js';
import { InstructionParser } from '../instruction-parser.js';
import { StitchParserContext } from './stitch-parser-context.js';
import { StitchCountResolver } from '../../utils/stitch-count-resolver.js';
import { STITCH_ELEMENT_TYPE } from '../../utils/stitch-element-type.js';

// Encapsulates single stitch parser creation logic
export function StitchParserFactory(context, stitchCountResolver) {
    this._context = context || new StitchParserContext();
    this._stitchCountResolver = stitchCountResolver || new StitchCountResolver();
}
Object.assign(StitchParserFactory.prototype, {
    getParser: function(type) {
        switch (type) {
            case STITCH_ELEMENT_TYPE.STITCH:
                return new StitchParser(this._context, this._stitchCountResolver);
            case STITCH_ELEMENT_TYPE.GROUP:
                return new StitchGroupParser(this._context, this._stitchCountResolver, new StitchesParser(this));
            case STITCH_ELEMENT_TYPE.INSTRUCTION:
                return new InstructionParser();
            default:
                throw new Error(`Invalid type ${type} found in stitch`);
        }
    },
    getTotalStitchCount: function() {
        return this._context.getTotalStitchCount();
    },
    getStitchesIndexLookup: function() {
        return this._context.getStitchesIndexLookup();
    }
});

// Encapsulates stitch array parsing logic
export function StitchesParser(stitchParserFactory) {
    this._parserFactory = stitchParserFactory || new StitchParserFactory();
}
Object.assign(StitchesParser.prototype, {
    parse: function(data) {
        return data.map(d => {
            if (!d || !d.type) {
                throw new Error(`Invalid data ${d} found in stitches`);
            }
            return this._parserFactory.getParser(d.type).parse(d);
        });
    },
    getTotalStitchCount: function() {
        return this._parserFactory.getTotalStitchCount();
    },
    getStitchesIndexLookup: function() {
        return this._parserFactory.getStitchesIndexLookup();
    }
})

// Encapsulates pattern element depending on previous elements logic
export function StitchesParserFactory(stitchesParser) {
    this._stitchesParser = stitchesParser || new StitchesParser();
}
Object.assign(StitchesParserFactory.prototype, {
    getStitchesParser: function() {
        const countResolver = new StitchCountResolver(this._stitchesParser.getTotalStitchCount());
        const factory = new StitchParserFactory(new StitchParserContext(), countResolver);
        this._stitchesParser = new StitchesParser(factory);
        return this._stitchesParser;
    }
});
