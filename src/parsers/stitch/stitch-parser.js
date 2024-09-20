import { Stitch } from '../../models/stitch.js';

// TODO Write a count modifier resolver that can be used in the parser (converting known names to numbers)

export function StitchParser(context, stitchCountResolver) {
    this._context = context;
    this._stitchCountResolver = stitchCountResolver;
}
Object.assign(StitchParser.prototype, {
    parse: function(data) {
        const count = this._stitchCountResolver(data.count || 1);
        if (!count) {
            throw new Error(`Invalid count ${count} when parsing stitch`);
        }

        const countModifier = data.countModifier || 1;
        this._context.addStitch(count, countModifier);
        return new Stitch(data.name.trim(), count, countModifier);
    }
});
