import { testSuite } from './it.js';
import assert from 'assert';
import { Stitch, StitchGroup, FlatStitchArrayGenerator } from '../src/stitch.js';

// Stitch
let it = testSuite('Stitch');
it('Fails when name is empty', () => {
    assert.throws(() => new Stitch('', 1, 1));
});

it('Fails when count is invalid', () => {
    assert.throws(() => new Stitch('sc', 0, 1));
});

it('Fails when count modifier is invalid', () => {
    assert.throws(() => new Stitch('sc', 1, 0));
});

it('Has sane defaults', () => {
    const stitch = new Stitch('sc');
    assert.strictEqual(stitch.count, 1);
    assert.strictEqual(stitch.countModifier, 1);
});

it('Works with valid data', () => {
    const stitch = new Stitch('sc', 2, 2);
    assert.strictEqual(stitch.name, 'sc');
    assert.strictEqual(stitch.count, 2);
    assert.strictEqual(stitch.countModifier, 2);
});

// StitchGroup
it = testSuite('StitchGroup');
it('Fails when stitches is empty', () => {
    assert.throws(() => new StitchGroup([], 1));
});

it('Fails when count is invalid', () => {
    assert.throws(() => new StitchGroup([new Stitch('sc', 1)], 0));
});

it('Has sane defaults', () => {
    const group = new StitchGroup([new Stitch('sc', 1)]);
    assert.strictEqual(group.count, 1);
});

it('Works with valid data', () => {
    const group = new StitchGroup([new Stitch('sc', 2)], 3);
    assert.strictEqual(group.count, 3);
});

// FlatStitchArrayGenerator 
it = testSuite('FlatStitchArrayGenerator');
it('Works with single stitch', () => {
    const array = FlatStitchArrayGenerator.fromSingle(new Stitch('sc', 2));
    assert.deepStrictEqual(array, [new Stitch('sc', 1), new Stitch('sc', 1)]);
});

it('Works with single group', () => {
    const array = FlatStitchArrayGenerator.fromSingle(new StitchGroup([new Stitch('sc', 1)], 2));
    assert.deepStrictEqual(array, [new Stitch('sc', 1), new Stitch('sc', 1)]);
});

it('Preserves countModifier for single stitch', () => {
    const array = FlatStitchArrayGenerator.fromSingle(new Stitch('sc', 1, 2));
    assert.deepStrictEqual(array, [new Stitch('sc', 1, 2)]);
});

it('Support single nested stitch groups', () => {
    const array = FlatStitchArrayGenerator.fromSingle(new StitchGroup([new StitchGroup([new Stitch('sc', 1)], 2)], 3));
    const expected = Array(6).fill(new Stitch('sc', 1));
    assert.deepStrictEqual(array, expected);
});

it('Works with an array of stitches', () => {
    const array = FlatStitchArrayGenerator.fromArray([new Stitch('sc', 1), new Stitch('sc', 1)]);
    assert.deepStrictEqual(array, [new Stitch('sc', 1), new Stitch('sc', 1)]);
});

it('Works with an array of groups', () => {
    const array = FlatStitchArrayGenerator.fromArray([new StitchGroup([new Stitch('sc', 1)], 2), new StitchGroup([new Stitch('sc', 1)], 2)]);
    assert.deepStrictEqual(array, [new Stitch('sc', 1), new Stitch('sc', 1), new Stitch('sc', 1), new Stitch('sc', 1)]);
});

it('Preserves countModifier for an array of stitches', () => {
    const array = FlatStitchArrayGenerator.fromArray([new Stitch('sc', 1, 2)]);
    assert.deepStrictEqual(array, [new Stitch('sc', 1, 2)]);
});

it('Support an array of nested stitch groups', () => {
    const array = FlatStitchArrayGenerator.fromArray([new StitchGroup([new StitchGroup([new Stitch('sc', 1)], 2)], 3), new StitchGroup([new StitchGroup([new Stitch('sc', 1)], 2)], 3)]);
    const expected = Array(12).fill(new Stitch('sc', 1));
    assert.deepStrictEqual(array, expected);
});
