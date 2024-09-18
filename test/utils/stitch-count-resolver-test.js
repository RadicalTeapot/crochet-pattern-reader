import { testSuite } from '../test-suite.js';
import assert from 'assert';
import { StitchCountResolver } from '../../src/utils/stitch-count-resolver.js';

testSuite('StitchCountResolver',
    it => it('Fails when previous count is lower than 0', () => {
        assert.throws(() => new StitchCountResolver(-1));
    }),

    it => it('Has sane defaults', () => {
        const resolver = new StitchCountResolver();
        assert.strictEqual(resolver(0), 0);
    }),

    it => it('Returns count when greater than 0', () => {
        const resolver = new StitchCountResolver();
        assert.strictEqual(resolver(1), 1);
    }),

    it => it('Fails when count is negative', () => {
        const resolver = new StitchCountResolver();
        assert.throws(() => resolver(-1));
    }),

    it => it('Returns previous count when count is 0', () => {
        const resolver = new StitchCountResolver(1);
        assert.strictEqual(resolver(0), 1);
    }),
);
