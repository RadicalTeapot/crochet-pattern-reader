
import assert from 'assert';
import { testSuite } from '../test-suite.js';
import { Row } from '../../src/models/pattern-element.js';
import { Stitch } from '../../src/models/stitch.js';
import { Instruction } from '../../src/models/instruction.js';

testSuite('Row',
    it => it('Fails when stitches is empty', () => {
        assert.throws(() => new Row());
        assert.throws(() => new Row([]));
    }),

    it => it('Has sane defaults', () => {
        const row = new Row([new Stitch('sc', 1)]);
        assert.strictEqual(row.instruction, undefined);
        assert.strictEqual(row.getIndexInPattern(), 0);
    }),

    it => it('Enables getting stitches via an index', () => {
        const row = new Row([new Stitch('sc', 1)], 0);
        assert.deepStrictEqual(row.getStitchAtIndex(0), new Stitch('sc', 1));
    }),

    it => it('Ignores instructions when getting stitch count', () => {
        const row = new Row([new Stitch('sc', 1), new Instruction('abc')], 0);
        assert.strictEqual(row.getStitchCount(), 1);
    }),

    it => it('Ignores instructions when getting stitch at index', () => {
        const row = new Row([new Instruction('abc'), new Stitch('sc', 1)], 0);
        assert.deepStrictEqual(row.getStitchAtIndex(0), new Stitch('sc', 1));
    }),

    it => it('Enables getting the count of stitches', () => {
        const row = new Row([new Stitch('sc', 1)], 0);
        assert.strictEqual(row.getStitchCount(), 1);
    }),

    it => it('Enables getting the index in the pattern', () => {
        const row = new Row([new Stitch('sc', 1)], undefined, 1);
        assert.strictEqual(row.getIndexInPattern(), 1);
    }),

    it => it('Has a asView method', () => {
        const row = new Row([new Stitch('sc', 1)], undefined, 1);
        assert.notStrictEqual(row.asView, undefined);
    })
);
