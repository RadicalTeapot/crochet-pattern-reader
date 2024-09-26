import { StitchGroup } from '../../models/stitch-group.js';
import { StitchCountResolver } from '../../utils/stitch-count-resolver.js';
import { StitchArrayParserContext } from './stitch-array-parser.js';

export function StitchGroupParser(context, stitchCountResolver, stitchesParser) {
    this._context = context || new StitchArrayParserContext();
    this._stitchCountResolver = stitchCountResolver || new StitchCountResolver();
    this._stitchesParser = stitchesParser;
}
Object.assign(StitchGroupParser.prototype, {
    parse: function(data) {
        if (!data || data.type !== 'repeat') {
            throw new Error(`Invalid data ${data} when parsing stitch group`);
        }

        const count = this._stitchCountResolver.resolveCount(data.count || 1);
        if (!count) {
            throw new Error(`Invalid count ${count}`);
        }

        this._context.startGroup();
        const stitches = this._stitchesParser.parse(data.stitches);
        this._context.finalizeGroup(count);
        return new StitchGroup(stitches, count);
    }
});

