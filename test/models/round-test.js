import assert from 'assert';
import { testSuite } from '../test-suite.js';
import { Round } from '../../src/models/round.js';
import { Stitch } from '../../src/models/stitch.js';

testSuite('Round',
    it => it('Fails when stitches is empty', () => {
        assert.throws(() => new Round());
        assert.throws(() => new Round([]));
    }),

    it => it('Works with no instruction', () => {
        const round = new Round([new Stitch('sc', 1)]);
        assert.strictEqual(round.instruction, undefined);
    }),

    it => it('Enables getting stitches via an index', () => {
        const round = new Round([new Stitch('sc', 1)]);
        assert.deepStrictEqual(round.getStitchAtIndex(0), new Stitch('sc', 1));
    }),

    it => it('Enables getting the count of stitches', () => {
        const round = new Round([new Stitch('sc', 1)]);
        assert.strictEqual(round.getStitchCount(), 1);
    }),
);
