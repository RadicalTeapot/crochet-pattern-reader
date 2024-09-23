export function StitchCounter() {
    this._currentGroup = {parent: null, elements: []};
}
Object.assign(StitchCounter.prototype, {
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

export function StitchIndexLookup() {
    this._indexLookUp = []; // Flat index to stitch lookup
    this._currentIndex = [0];
}
Object.assign(StitchIndexLookup.prototype, {
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
        this._currentIndex[this._currentIndex.length - 1]++;
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

