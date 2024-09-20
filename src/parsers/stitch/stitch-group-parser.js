import { StitchGroup } from '../../models/stitch-group.js';

export function StitchGroupParser(context, stitchCountResolver, stitchesParser) {
    this._context = context;
    this._stitchCountResolver = stitchCountResolver;
    this._stitchesParser = stitchesParser;
}
Object.assign(StitchGroupParser.prototype, {
    parse: function(data) {
        const count = this._stitchCountResolver(data.count);
        if (!count) {
            throw new Error(`Invalid count ${count}`);
        }

        this._context.startGroup();
        const stitches = this._stitchesParser.parse(data.stitches);
        this._context.finalizeGroup(count);
        return new StitchGroup(stitches, count);
    }
});

