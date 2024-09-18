import { testSuite } from '../test-suite.js';
import assert from 'assert';
import { Stitch } from '../../src/models/stitch.js';
import { StitchGroup } from '../../src/models/stitch-group.js';

testSuite('StitchGroup',
    it => it('Fails when stitches is empty', () => {
        assert.throws(() => new StitchGroup([], 1));
    }),

    it => it('Fails when count is invalid', () => {
        assert.throws(() => new StitchGroup([new Stitch('sc', 1)], 0));
    }),

    it => it('Has sane defaults', () => {
        const group = new StitchGroup([new Stitch('sc', 1)]);
        assert.strictEqual(group.count, 1);
    }),

    it => it('Works with valid data', () => {
        const group = new StitchGroup([new Stitch('sc', 2)], 3);
        assert.strictEqual(group.count, 3);
    }),
);

