import { StitchParser } from './stitch-parser.js';
import { StitchGroupParser } from './stitch-group-parser.js';
import { InstructionParser } from '../instruction-parser.js';
import { StitchCounter, StitchIndexLookup } from './stitch-parser-context.js';
import { STITCH_ELEMENT_TYPE } from '../../utils/stitch-element-type.js';

export function StitchArrayParserContext(counter, indexLookup) {
    this._counter = counter || new StitchCounter();
    this._indexLookUp = indexLookup || new StitchIndexLookup();
}
Object.assign(StitchParserContext.prototype, {
    startGroup: function() {
        this._counter.startGroup();
        this._indexLookUp.startGroup();
    },
    addStitch: function(count, countModifier) {
        this._counter.addCount(count * countModifier);
        this._indexLookUp.addStitch();
    },
    finalizeGroup: function(count) {
        this._counter.finalizeGroup(count);
        this._indexLookUp.finalizeGroup();
    },
    getStitchesIndexLookup: function() {
        return this._indexLookUp.getIndexLookup();
    },
    getTotalStitchCount: function() {
        return this._counter.getTotalCount();
    }
});

// Encapsulates stitch array parsing logic
export function StitchArrayParser(context, stitchCountResolver) {
    this._context = context;
    this._stitchCountResolver = stitchCountResolver;
}
Object.assign(StitchArrayParser.prototype, {
    _getParser: function(type) {
        switch (type) {
            case STITCH_ELEMENT_TYPE.STITCH:
                return new StitchParser(this._context, this._stitchCountResolver);
            case STITCH_ELEMENT_TYPE.GROUP:
                return new StitchGroupParser(this._context, this._stitchCountResolver, this);
            case STITCH_ELEMENT_TYPE.INSTRUCTION:
                return new InstructionParser();
            default:
                throw new Error(`Invalid type ${type} found in stitch`);
        }
    },
    parse: function(data) {
        return data.map(d => {
            if (!d || !d.type) {
                throw new Error(`Invalid data ${d} found in stitches`);
            }
            return this._getParser(d.type).parse(d);
        });
    }
});
