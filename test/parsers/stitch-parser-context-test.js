import { testSuite } from '../test-suite.js';
import assert from 'assert';
import { StitchParserContext, StitchCounter, StitchIndexLookup } from '../../src/parsers/stitch/stitch-parser-context.js';

testSuite('StitchCounter',
    it => it('Count stitches', () => {
        const counter = new StitchCounter();
        counter.addCount(1);
        assert.strictEqual(counter.getTotalCount(), 1);
    }),

    it => it('Defaults to 0', () => {
        const counter = new StitchCounter();
        assert.strictEqual(counter.getTotalCount(), 0);
    }),

    it => it('Counts group data', () => {
        const counter = new StitchCounter();
        counter.startGroup();
        counter.addCount(2);
        counter.finalizeGroup(3);
        assert.strictEqual(counter.getTotalCount(), 6);
    }),

    it => it('Fails when finalizing unstarted group', () => {
        const counter = new StitchCounter();
        assert.throws(() => counter.finalizeGroup(1));
    }),

    it => it('Fails to get total count when not all groups are finalized', () => {
        const counter = new StitchCounter();
        counter.startGroup();
        counter.addCount(1);
        assert.throws(() => counter.getTotalCount());
    })
);

testSuite('StitchIndexLookup',
    it => it('Indexes stitches', () => {
        const indexLookup = new StitchIndexLookup();
        indexLookup.addStitch();
        indexLookup.addStitch();
        assert.deepEqual(indexLookup.getIndexLookup(), [[0], [1]]);
    }),

    it => it('Indexes stitches inside of groups', () => {
        const indexLookup = new StitchIndexLookup();
        indexLookup.startGroup();
        indexLookup.addStitch();
        indexLookup.addStitch();
        indexLookup.finalizeGroup();
        assert.deepEqual(indexLookup.getIndexLookup(), [[0, 0], [0, 1]]);
    }),

    it => it('Updates index when closing group', () => {
        const indexLookup = new StitchIndexLookup();
        indexLookup.addStitch();
        indexLookup.startGroup();
        indexLookup.addStitch();
        indexLookup.finalizeGroup();
        indexLookup.addStitch();
        assert.deepEqual(indexLookup.getIndexLookup(), [[0], [1, 0], [2]]);
    }),

    it => it('Fails when finalizing unstarted group', () => {
        const indexLookup = new StitchIndexLookup();
        assert.throws(() => indexLookup.finalizeGroup());
    }),

    it => it('Fails to get index lookup when not all groups are finalized', () => {
        const indexLookup = new StitchIndexLookup();
        indexLookup.startGroup();
        assert.throws(() => indexLookup.getIndexLookup());
    })
);

testSuite('StitchParserContext',
    it => it('Starts groups', () => {
        let indexGroup = 0, countGroup = 0;
        const indexer = {startGroup: () => { indexGroup = 1 }};
        const counter = {startGroup: () => { countGroup = 2 }};
        const context = new StitchParserContext(counter, indexer);
        context.startGroup();
        assert.strictEqual(indexGroup, 1);
        assert.strictEqual(countGroup, 2);
    }),

    it => it('Finalizes groups', () => {
        let indexGroup = 0, countGroup = 0;
        const indexer = {finalizeGroup: () => { indexGroup = 1 }};
        const counter = {finalizeGroup: (count) => { countGroup = count }};
        const context = new StitchParserContext(counter, indexer);
        context.finalizeGroup(2);
        assert.strictEqual(indexGroup, 1);
        assert.strictEqual(countGroup, 2);
    }),

    it => it('Updates stitch count', () => {
        let indexCount = 0, countCount = 0;
        const indexer = {addStitch: () => { indexCount = 1 }};
        const counter = {addCount: (count) => { countCount = count }};
        const context = new StitchParserContext(counter, indexer);
        context.addStitch(2, 3);
        assert.strictEqual(indexCount, 1);
        assert.strictEqual(countCount, 6);
    })
);
