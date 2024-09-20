import { Stitch } from '../models/stitch.js';
import { StitchGroup } from '../models/stitch-group.js';
import { StitchCountResolver } from '../utils/stitch-count-resolver.js';
import { InstructionParser } from './instruction-parser.js';
import { STITCH_ELEMENT_TYPE } from '../utils/stitch-element-type.js';

// TODO Write a count modifier resolver that can be used in the parser (converting known names to numbers)

function StitchParser(context, stitchCountResolver) {
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

function StitchGroupParser(context, stitchCountResolver, stitchesParser) {
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

export function StitchCounter() {
    this._currentGroup = {parent: null, elements: []};
}
Object.assign(StitchParserContext.prototype, {
    startGroup: function() {
        const newGroup = {parent: this._currentGroup, elements: []};
        this._currentGroup = newGroup;
    },
    addCount: function(count) {
        this._currentGroup.elements.push(count);
    },
    finalizeGroup: function(count) {
        if (!this._currentGroup.parent) {
            throw new Error('Invalid group');
        }

        const group = this._currentGroup;
        this._currentGroup = group.parent;
        this._currentGroup.elements.push(group.elements.reduce((a, b) => a + b, 0) * count);
    },
    getTotalCount: function() {
        if (this._currentGroup.parent !== null) {
            throw new Error('Invalid group');
        }
        return this._currentGroup.elements.reduce((a, b) => a + b, 0);
    }
});

export function StichIndexLookup() {
    this._indexLookUp = []; // Flat index to stitch lookup
    this._currentIndex = [0];
}
Object.assign(StitchParserContext.prototype, {
    startGroup: function() {
        this._currentIndex.push(0);
    },
    addStitch: function() {
        this._indexLookUp.push(this._currentIndex.slice());
        this._currentIndex[this._currentIndex.length - 1]++;
    },
    finalizeGroup: function() {
        if (this._currentIndex.length <= 1) {
            throw new Error('Invalid index lookup');
        }
        this._currentIndex.pop();
    },
    getIndexLookup: function() {
        if (this._currentIndex.length > 1) {
            throw new Error('Invalid index lookup');
        }
        return this._indexLookUp;
    },
});

export function StitchParserContext(counter, indexLookup) {
    this._counter = counter || new StitchCounter();
    this._indexLookUp = indexLookup || new StichIndexLookup();
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
    getIndexLookup: function() {
        return this._indexLookUp.getIndexLookup();
    },
    getModifiedStitchCount: function() {
        return this._counter.getTotalCount();
    }
});

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
