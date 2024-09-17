import assert from 'assert';
import { Stitch } from '../src/stitch.js';
import { StitchCounter } from '../src/stitch-counter.js';
import { testSuite } from './it.js';

// StitchCounter
let it = testSuite('StitchCounter');
it('Fails with no data', () => {
    assert.throws(() => StitchCounter.getCount());
});

it('Works with empty array data', () => {
    assert.strictEqual(StitchCounter.getCount([]), 0);
});

it('Works with stitch data', () => {
    assert.strictEqual(StitchCounter.getCount([new Stitch('sc', 1), new Stitch('sc', 2)]), 3);
});
