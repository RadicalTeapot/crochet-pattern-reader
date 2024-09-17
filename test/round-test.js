import assert from 'assert';
import { testSuite } from './it.js';
import { Round, RoundCountResolver, RoundStitchIndexResolver } from '../src/round.js';
import { Stitch } from '../src/stitch.js';

// Round
let it = testSuite('Round');
it('Fails when stitches is empty', () => {
    assert.throws(() => new Round());
    assert.throws(() => new Round([]));
});

it('Works with no instruction', () => {
    const round = new Round([new Stitch('sc', 1)]);
    assert.strictEqual(round.instruction, undefined);
});

it('Enables getting stitches via an index', () => {
    const round = new Round([new Stitch('sc', 1)]);
    assert.deepStrictEqual(round.getStitchAtIndex(0), new Stitch('sc', 1));
});

it('Enables getting the count of stitches', () => {
    const round = new Round([new Stitch('sc', 1)]);
    assert.strictEqual(round.getStitchCount(), 1);
});

// RoundCountResolver
it = testSuite('RoundCountResolver');
it('Has sane defaults', () => {
    const resolver = new RoundCountResolver();
    assert.strictEqual(resolver([]), 0);
});

it('Works with valid data', () => {
    const resolver = new RoundCountResolver();
    assert.strictEqual(resolver([new Stitch('sc', 1)]), 1);
});

// RoundStitchIndexResolver
it = testSuite('RoundStitchIndexResolver');
it('Fails when data is empty', () => {
    const resolver = new RoundStitchIndexResolver();
    assert.throws(() => resolver(0, []));
});

it('Fails when index is out of bounds', () => {
    const resolver = new RoundStitchIndexResolver();
    assert.throws(() => resolver(1, [new Stitch('sc', 1)]));
    assert.throws(() => resolver(-1, [new Stitch('sc', 1)]));
});

it('Works with valid data', () => {
    const resolver = new RoundStitchIndexResolver();
    assert.deepStrictEqual(resolver(0, [new Stitch('sc', 1)]), new Stitch('sc', 1));
});
