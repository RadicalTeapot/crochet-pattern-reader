import { testSuite } from '../test-suite.js';
import assert from 'assert';
import { FlatStitchArrayResolver } from '../../src/utils/flat-stitch-array-generator.js';
import { Stitch } from '../../src/models/stitch.js';
import { StitchGroup } from '../../src/models/stitch-group.js';


testSuite('FlatStitchArrayResolver',
    it => it('Works with stitch', () => {
        const array = FlatStitchArrayResolver.fromStitch('sc', 2);
        assert.deepStrictEqual(array, [new Stitch('sc', 1), new Stitch('sc', 1)]);
    }),

    it => it('Works with group', () => {
        const array = FlatStitchArrayResolver.fromStitchGroup([new Stitch('sc', 1)], 2);
        assert.deepStrictEqual(array, [new Stitch('sc', 1), new Stitch('sc', 1)]);
    }),

    it => it('Preserves countModifier for stitch', () => {
        const array = FlatStitchArrayResolver.fromStitch('sc', 1, 2);
        assert.deepStrictEqual(array, [new Stitch('sc', 1, 2)]);
    }),

    it => it('Support nested stitch groups', () => {
        const array = FlatStitchArrayResolver.fromStitchGroup([new StitchGroup([new Stitch('sc', 1)], 2)], 3);
        const expected = Array(6).fill(new Stitch('sc', 1));
        assert.deepStrictEqual(array, expected);
    }),

    it => it('Returns empty array for an instruction', () => {
        const array = FlatStitchArrayResolver.fromInstruction({});
        assert.deepStrictEqual(array, []);
    }),
);
