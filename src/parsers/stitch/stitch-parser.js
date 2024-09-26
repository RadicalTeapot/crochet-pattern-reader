import { Stitch } from '../../models/stitch.js';
import { StitchCountResolver } from '../../utils/stitch-count-resolver.js';
import { StitchArrayParserContext } from './stitch-array-parser.js';

// TODO Write a count modifier resolver that can be used in the parser (converting known names to numbers)

export function StitchParser(context, stitchCountResolver) {
    this._context = context || new StitchArrayParserContext();
    this._stitchCountResolver = stitchCountResolver || new StitchCountResolver();
}
Object.assign(StitchParser.prototype, {
    parse: function(data) {
        if (!data || data.type !== 'stitch') {
            throw new Error(`Invalid data ${data} when parsing stitch`);
        }

        const count = this._stitchCountResolver.resolveCount(data.count || 1);
        if (!count) {
            throw new Error(`Invalid count ${count} when parsing stitch`);
        }

        const countModifier = data.countModifier || 1;
        this._context.addStitch(count, countModifier);
        return new Stitch(data.name.trim(), count, countModifier);
    }
});
