import assert from 'assert';
import { testSuite } from '../test-suite.js';
import { RoundCountResolver, RoundStitchIndexResolver } from '../../src/utils/round-resolvers.js';
import { Stitch } from '../../src/models/stitch.js';

testSuite('RoundCountResolver',
    it => it('Has sane defaults', () => {
        const resolver = new RoundCountResolver();
        assert.strictEqual(resolver([]), 0);
    }),

    it => it('Works with valid data', () => {
        const resolver = new RoundCountResolver();
        assert.strictEqual(resolver([new Stitch('sc', 1)]), 1);
    }),
);

testSuite('RoundStitchIndexResolver',
    it => it('Fails when data is empty', () => {
        const resolver = new RoundStitchIndexResolver();
        assert.throws(() => resolver(0, []));
    }),

    it => it('Fails when index is out of bounds', () => {
        const resolver = new RoundStitchIndexResolver();
        assert.throws(() => resolver(1, [new Stitch('sc', 1)]));
        assert.throws(() => resolver(-1, [new Stitch('sc', 1)]));
    }),

    it => it('Works with valid data', () => {
        const resolver = new RoundStitchIndexResolver();
        assert.deepStrictEqual(resolver(0, [new Stitch('sc', 1)]), new Stitch('sc', 1));
    }),
);
