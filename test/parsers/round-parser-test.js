import assert from 'assert';
import { testSuite } from '../test-suite.js';
import { Round } from '../../src/models/round.js';
import { Stitch } from '../../src/models/stitch.js';
import { RoundParser } from '../../src/parsers/round-parser.js';

testSuite('RoundParser',
    it => it('Fails when data is invalid', () => {
        const parser = new RoundParser();
        assert.throws(() => parser.parseRound({})); // Empty
        assert.throws(() => parser.parseRound({ type: 'other' })); // Invalid type
        assert.throws(() => parser.parseRound({ type: 'round' })); // No stitches
    }),

    it => it('Works when no previous round is set', () => {
        const parser = new RoundParser();
        const round = parser.parseRound({ type: 'round', stitches: [{ type: 'stitch', name: 'sc', count: 1 }] });
        assert.deepStrictEqual(round, new Round([new Stitch('sc', 1, 1)]));
    }),

    it => it('Fails when assigning count when no previous round is set', () => {
        const parser = new RoundParser();
        assert.throws(() => parser.parseRound({ type: 'round', stitches: [{ type: 'stitch', name: 'sc', count: 0 }] }));
    }),

    it => it('Works when previous round is set', () => {
        const parser = new RoundParser(new Round([new Stitch('sc', 1, 1)]));
        const round = parser.parseRound({ type: 'round', stitches: [{ type: 'stitch', name: 'sc', count: 1 }] });
        assert.deepStrictEqual(round, new Round([new Stitch('sc', 1, 1)]));
    }),

    it => it('Assigns correct count when previous round is set', () => {
        const parser = new RoundParser(new Round([new Stitch('sc', 2, 1)]));
        const round = parser.parseRound({ type: 'round', stitches: [{ type: 'stitch', name: 'sc', count: 0 }] });
        assert.deepStrictEqual(round, new Round([new Stitch('sc', 2, 1)]));
    }),

    it => it('Uses previous round when called multiple times', () => {
        const parser = new RoundParser();
        const round = parser.parseRound({ type: 'round', stitches: [{ type: 'stitch', name: 'sc', count: 1 }] });
        assert.deepStrictEqual(round, new Round([new Stitch('sc', 1, 1)]));
        const round2 = parser.parseRound({ type: 'round', stitches: [{ type: 'stitch', name: 'sc', count: 0 }] });
        assert.deepStrictEqual(round2, new Round([new Stitch('sc', 1, 1)]));
    }),
);
