import assert from 'assert';
import { testSuite } from '../test-suite.js';
import { Round } from '../../src/models/pattern-element.js';
import { Stitch } from '../../src/models/stitch.js';
import { Instruction } from '../../src/models/instruction.js';

testSuite('Round',
    it => it('Fails when stitches is empty', () => {
        assert.throws(() => new Round());
        assert.throws(() => new Round([]));
    }),

    it => it('Has sane defaults', () => {
        const round = new Round([new Stitch('sc', 1)]);
        assert.strictEqual(round.instruction, undefined);
        assert.strictEqual(round.getIndexInPattern(), 0);
    }),

    it => it('Enables getting stitches via an index', () => {
        const round = new Round([new Stitch('sc', 1)], 0);
        assert.deepStrictEqual(round.getElementAtIndex(0), new Stitch('sc', 1));
    }),

    it => it('Enables getting the count of stitches', () => {
        const round = new Round([new Stitch('sc', 1)], 0);
        assert.strictEqual(round.getStitchCount(), 1);
    }),

    it => it('Ignores instructions when getting stitch count', () => {
        const round = new Round([new Stitch('sc', 1), new Instruction('abc')], 0);
        assert.strictEqual(round.getStitchCount(), 1);
    }),

    it => it('Ignores instructions when getting stitch at index', () => {
        const round = new Round([new Instruction('abc'), new Stitch('sc', 1)], 0);
        assert.deepStrictEqual(round.getStitchAtIndex(0), new Stitch('sc', 1));
    }),

    it => it('Enables getting the index in the pattern', () => {
        const round = new Round([new Stitch('sc', 1)], undefined, 1);
        assert.strictEqual(round.getIndexInPattern(), 1);
    }),

    it => it('Has a asView method', () => {
        const round = new Round([new Stitch('sc', 1)], undefined, 1);
        assert.notStrictEqual(round.asView, undefined);
    })
);
