import { testSuite } from '../test-suite.js';
import assert from 'assert';
import { Stitch } from '../../src/models/stitch.js';
import { StitchGroup } from '../../src/models/stitch-group.js';
import { FlatStitchArrayGenerator } from '../../src/utils/flat-stitch-array-generator.js';

testSuite('FlatStitchArrayGenerator',
    it => it('Works with single stitch', () => {
        const array = FlatStitchArrayGenerator.fromSingle(new Stitch('sc', 2));
        assert.deepStrictEqual(array, [new Stitch('sc', 1), new Stitch('sc', 1)]);
    }),

    it => it('Works with single group', () => {
        const array = FlatStitchArrayGenerator.fromSingle(new StitchGroup([new Stitch('sc', 1)], 2));
        assert.deepStrictEqual(array, [new Stitch('sc', 1), new Stitch('sc', 1)]);
    }),

    it => it('Preserves countModifier for single stitch', () => {
        const array = FlatStitchArrayGenerator.fromSingle(new Stitch('sc', 1, 2));
        assert.deepStrictEqual(array, [new Stitch('sc', 1, 2)]);
    }),

    it => it('Support single nested stitch groups', () => {
        const array = FlatStitchArrayGenerator.fromSingle(new StitchGroup([new StitchGroup([new Stitch('sc', 1)], 2)], 3));
        const expected = Array(6).fill(new Stitch('sc', 1));
        assert.deepStrictEqual(array, expected);
    }),

    it => it('Works with an array of stitches', () => {
        const array = FlatStitchArrayGenerator.fromArray([new Stitch('sc', 1), new Stitch('sc', 1)]);
        assert.deepStrictEqual(array, [new Stitch('sc', 1), new Stitch('sc', 1)]);
    }),

    it => it('Works with an array of groups', () => {
        const array = FlatStitchArrayGenerator.fromArray([new StitchGroup([new Stitch('sc', 1)], 2), new StitchGroup([new Stitch('sc', 1)], 2)]);
        assert.deepStrictEqual(array, [new Stitch('sc', 1), new Stitch('sc', 1), new Stitch('sc', 1), new Stitch('sc', 1)]);
    }),

    it => it('Preserves countModifier for an array of stitches', () => {
        const array = FlatStitchArrayGenerator.fromArray([new Stitch('sc', 1, 2)]);
        assert.deepStrictEqual(array, [new Stitch('sc', 1, 2)]);
    }),

    it => it('Support an array of nested stitch groups', () => {
        const array = FlatStitchArrayGenerator.fromArray([new StitchGroup([new StitchGroup([new Stitch('sc', 1)], 2)], 3), new StitchGroup([new StitchGroup([new Stitch('sc', 1)], 2)], 3)]);
        const expected = Array(12).fill(new Stitch('sc', 1));
        assert.deepStrictEqual(array, expected);
    }),
);
