import assert from 'assert';
import { testSuite } from '../test-suite.js';
import { Stitch } from '../../src/models/stitch.js';
import { StitchCounter } from '../../src/utils/stitch-counter.js';

// StitchCounter
testSuite('StitchCounter',
    it => it('Fails with no data', () => {
        assert.throws(() => StitchCounter.getCount());
    }),

    it => it('Works with empty array data', () => {
        assert.strictEqual(StitchCounter.getCount([]), 0);
    }),

    it => it('Works with stitch data', () => {
        assert.strictEqual(StitchCounter.getCount([new Stitch('sc', 1), new Stitch('sc', 2)]), 3);
    }),
);
