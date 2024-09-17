import { testSuite } from './it.js';
import assert from 'assert';
import { StitchCountResolver, StitchParser } from '../src/stitch-parser.js';
import { Stitch } from '../src/stitch.js';

// StitchCountResolver
let it = testSuite('StitchCountResolver');
it('Fails when previous count is lower than 0', () => {
    assert.throws(() => new StitchCountResolver(-1));
})

it('Has sane defaults', () => {
    const resolver = new StitchCountResolver();
    assert.strictEqual(resolver(0), 0);
});

it('Returns count when greater than 0', () => {
    const resolver = new StitchCountResolver();
    assert.strictEqual(resolver(1), 1);
});

it('Fails when count is negative', () => {
    const resolver = new StitchCountResolver();
    assert.throws(() => resolver(-1));
});

it('Returns previous count when count is 0', () => {
    const resolver = new StitchCountResolver(1);
    assert.strictEqual(resolver(0), 1);
});

// StitchParser
it = testSuite('StitchParser');
it('Parses valid stitch data', () => {
    const parser = new StitchParser();
    const stitch = parser.parseStitch({ type: 'stitch', count: 1, name: 'sc', countModifier: 1 });
    assert.strictEqual(stitch.name, 'sc');
    assert.strictEqual(stitch.count, 1);
    assert.strictEqual(stitch.countModifier, 1);
});

it('Parses valid repeat data', () => {
    const parser = new StitchParser();
    const stitchGroup = parser.parseStitch({ type: 'repeat', count: 1, stitches: [{ type: 'stitch', count: 1, name: 'sc' }] });
    assert.deepStrictEqual(stitchGroup.stitches, [new Stitch('sc', 1)]);
    assert.strictEqual(stitchGroup.count, 1);
});

it('Fails when data is empty object', () => {
    const parser = new StitchParser();
    assert.throws(() => parser.parseStitch({}));
});

it('Fails when data type is invalid', () => {
    const parser = new StitchParser();
    assert.throws(() => parser.parseStitch({ type: 'sc', count: 1 }));
});

it('Fails when count is invalid', () => {
    const parser = new StitchParser(StitchCountResolver(0));
    assert.throws(() => parser.parseStitch({ type: 'stitch', count: 0 }));
    assert.throws(() => parser.parseStitch({ type: 'repeat', count: 0 }));
});
