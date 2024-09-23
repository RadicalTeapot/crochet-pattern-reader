import assert from 'assert';
import { testSuite } from '../test-suite.js';
import { Round, Row } from '../../src/models/pattern-element.js';
import { Stitch } from '../../src/models/stitch.js';
import { RoundParser } from '../../src/parsers/round-parser.js';
import { Instruction } from '../../src/models/instruction.js';
import { PatternElementParserContext } from '../../src/parsers/pattern-parser.js';
import { StitchArrayParser } from '../../src/parsers/stitch/stitch-array-parser.js';

testSuite('RoundParser',
    it => it('Fails when data is invalid', () => {
        const parser = new RoundParser();
        assert.throws(() => parser.parse({})); // Empty
        assert.throws(() => parser.parse({ type: 'invalid' })); // Invalid type
        assert.throws(() => parser.parse({ type: 'round' })); // No stitches
    }),

    it => it('Works when no previous round is set', () => {
        const parser = new RoundParser();
        const round = parser.parse({ type: 'round', stitches: [{ type: 'stitch', name: 'sc', count: 1 }] });
        assert.deepStrictEqual(round, new Round([new Stitch('sc', 1, 1)], undefined, 1, [[0]], 0, 0));
    }),

    it => it('Supports instructions inside stitches', () => {
        const parser = new RoundParser();
        const round = parser.parse({ type: 'round', stitches: [{ type: 'stitch', name: 'sc', count: 1}, { type: 'instruction', instruction: 'abc' }] });
        assert.deepStrictEqual(round, new Round([new Stitch('sc', 1, 1), new Instruction('abc')], undefined, 1, [[0]], 0, 0));
    }),

    it => it('Fails when count is -1 and first parsed round', () => {
        const parser = new RoundParser();
        assert.throws(() => parser.parse({ type: 'round', stitches: [{ type: 'stitch', name: 'sc', count: -1 }] }));
    }),

    it => it('Gets index in pattern from the context', () => {
        const context = new PatternElementParserContext();
        context.getAndIncrementAbsoluteIndex = () => 1;
        const parser = new RoundParser(context);
        const round = parser.parse({ type: 'round', stitches: [{ type: 'stitch', name: 'sc', count: 1 }] });
        assert.deepStrictEqual(round, new Round([new Stitch('sc', 1, 1)], undefined, 1, [[0]], 1, 0));
    }),

    it => it('Gets index per type from the context', () => {
        const context = new PatternElementParserContext();
        context.getAndIncrementPerTypeIndex = () => 1;
        const parser = new RoundParser(context);
        const round = parser.parse({ type: 'round', stitches: [{ type: 'stitch', name: 'sc', count: 1 }] });
        assert.deepStrictEqual(round, new Round([new Stitch('sc', 1, 1)], undefined, 1, [[0]], 0, 1));
    }),

    it => it('Gets total stitch count from stitch array parser', () => {
        const stitchArrayParser = new StitchArrayParser();
        stitchArrayParser.getTotalStitchCount = () => 2;
        const parser = new RoundParser(undefined, stitchArrayParser);
        const round = parser.parse({ type: 'round', stitches: [{ type: 'stitch', name: 'sc', count: 1 }] });
        assert.deepStrictEqual(round, new Round([new Stitch('sc', 1, 1)], undefined, 2, [[0]], 0, 0));
    }),

    it => it('Gets index lookup from stitch array parser', () => {
        const stitchArrayParser = new StitchArrayParser();
        stitchArrayParser.getStitchesIndexLookup = () => [[1]];
        const parser = new RoundParser(undefined, stitchArrayParser);
        const round = parser.parse({ type: 'round', stitches: [{ type: 'stitch', name: 'sc', count: 1 }] });
        assert.deepStrictEqual(round, new Round([new Stitch('sc', 1, 1)], undefined, 1, [[1]], 0, 0));
    })
);
