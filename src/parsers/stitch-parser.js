import { Stitch } from '../models/stitch.js';
import { StitchGroup } from '../models/stitch-group.js';
import { StitchCountResolver } from '../utils/stitch-count-resolver.js';

// TODO Write a count modifier resolver that can be used in the parser (converting known names to numbers)

export function StitchParser(stitchCountResolver = StitchCountResolver()) {
    this._stitchCountResolver = stitchCountResolver;
}
Object.assign(StitchParser.prototype, {
    parseStitch: function(stitch) {
        if (!stitch || !stitch.type) {
            throw new Error('Invalid stitch');
        }

        switch (stitch.type) {
            case 'stitch':
                return this._parseStitch(stitch);
            case 'repeat':
                return this._parseStitchGroup(stitch);
            default:
                throw new Error(`Invalid stitch type ${stitch.type}`);
        }
    },

    _parseStitch: function(data) {
        const count = this._stitchCountResolver(data.count);
        if (!count) {
            throw new Error(`Invalid count ${count}`);
        }

        return new Stitch(data.name, count, data.countModifier);
    },

    _parseStitchGroup: function(data) {
        const count = this._stitchCountResolver(data.count);
        if (!count) {
            throw new Error(`Invalid count ${count}`);
        }

        const stitches = data.stitches.map(stitch => this.parseStitch(stitch));
        return new StitchGroup(stitches, count);
    }
});
