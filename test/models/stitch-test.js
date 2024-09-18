import { testSuite } from '../test-suite.js';
import assert from 'assert';
import { Stitch } from '../../src/models/stitch.js';

testSuite('Stitch',
    it => it('Fails when name is empty', () => {
        assert.throws(() => new Stitch('', 1, 1));
    }),

    it => it('Fails when count is invalid', () => {
        assert.throws(() => new Stitch('sc', 0, 1));
    }),

    it => it('Fails when count modifier is invalid', () => {
        assert.throws(() => new Stitch('sc', 1, 0));
    }),

    it => it('Has sane defaults', () => {
        const stitch = new Stitch('sc');
        assert.strictEqual(stitch.count, 1);
        assert.strictEqual(stitch.countModifier, 1);
    }),

    it => it('Works with valid data', () => {
        const stitch = new Stitch('sc', 2, 2);
        assert.strictEqual(stitch.name, 'sc');
        assert.strictEqual(stitch.count, 2);
        assert.strictEqual(stitch.countModifier, 2);
    }),

    it => it('Has a asView method', () => {
        const stitch = new Stitch('sc', 2, 2);
        assert.notStrictEqual(stitch.asView, undefined);
    })
);
