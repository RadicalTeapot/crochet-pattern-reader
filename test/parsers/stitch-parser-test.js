import { testSuite } from '../test-suite.js';
import assert from 'assert';
import { Stitch } from '../../src/models/stitch.js';
import { StitchParser } from '../../src/parsers/stitch/stitch-parser.js';
import { StitchCountResolver } from '../../src/utils/stitch-count-resolver.js';
import { StitchParserContext } from '../../src/parsers/stitch/stitch-parser-context.js'

function getDefaultStitchParser() {
    return new StitchParser(new StitchParserContext(), new StitchCountResolver(0));
}

testSuite('StitchParser',
    it => it('Parses valid stitch data', () => {
        const parser = getDefaultStitchParser();
        const stitch = parser.parse({ type: 'stitch', count: 1, name: 'sc', countModifier: 1 });
        assert.deepStrictEqual(stitch, new Stitch('sc', 1, 1));
    }),

    it => it('Assigns 1 as default to count when no count is present', () => {
        const parser = getDefaultStitchParser();
        const stitch = parser.parse({ type: 'stitch', name: 'sc', countModifier: 1 });
        assert.deepStrictEqual(stitch, new Stitch('sc', 1, 1));
    }),

    it => it('Assigns 1 as default to countModifier when not present', () => {
        const parser = getDefaultStitchParser();
        const stitch = parser.parse({ type: 'stitch', count: 1, name: 'sc' });
        assert.deepStrictEqual(stitch, new Stitch('sc', 1, 1));
    }),

    it => it('Uses count resolver to set count', () => {
        const parser = new StitchParser(new StitchParserContext(), {resolveCount: () => 2});
        const stitch = parser.parse({ type: 'stitch', count: 1, name: 'sc', countModifier: 1 });
        assert.deepStrictEqual(stitch, new Stitch('sc', 2, 1));
    }),

    it => it('Passes count and count modifier to context addStitch method when parsing', () => {
        let count = 0, countModifier = 0;
        const context = {addStitch: function(c, cm) { count = c; countModifier = cm; }};
        const parser = new StitchParser(context, new StitchCountResolver(0));
        parser.parse({ type: 'stitch', count: 1, name: 'sc', countModifier: 1 });
        assert.strictEqual(count, 1);
        assert.strictEqual(countModifier, 1);
    }),

    it => it('Fails when data is empty object', () => {
        const parser = getDefaultStitchParser();
        assert.throws(() => parser.parse({}));
    }),

    it => it('Fails when data type is invalid', () => {
        const parser = getDefaultStitchParser();
        assert.throws(() => parser.parse({ type: 'invalid', name: 'sc', count: 1, countModifier: 1 }));
    }),
);
