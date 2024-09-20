import { testSuite } from '../test-suite.js';
import assert from 'assert';
import { Stitch } from '../../src/models/stitch.js';
import { StitchGroup } from '../../src/models/stitch-group.js';
import { StitchGroupParser } from '../../src/parsers/stitch/stitch-group-parser.js';
import { StitchParserContext } from '../../src/parsers/stitch/stitch-parser-context.js'
import { StitchesParser } from '../../src/parsers/stitch/stitches-parser.js';
import { StitchCountResolver } from '../../src/utils/stitch-count-resolver.js';

function getDefaultStitchGroupParser() {
    return new StitchGroupParser(new StitchParserContext(), new StitchCountResolver(0), new StitchesParser());
}

testSuite('StitchParser',
    it => it('Parses valid repeat data', () => {
        const parser = getDefaultStitchGroupParser();
        const stitchGroup = parser.parse({ type: 'repeat', count: 1, stitches: [{ type: 'stitch', count: 1, name: 'sc', countModifier: 1 }] });
        assert.deepStrictEqual(stitchGroup, new StitchGroup([new Stitch('sc', 1)], 1));
    }),

    it => it('Uses count resolver to set count', () => {
        const parser = new StitchGroupParser(new StitchParserContext(), () => 2, new StitchesParser());
        const stitchGroup = parser.parse({ type: 'repeat', count: 1, stitches: [{ type: 'stitch', count: 1, name: 'sc', countModifier: 1 }] });
        assert.deepStrictEqual(stitchGroup, new StitchGroup([new Stitch('sc', 1, 1)], 2));
    }),

    it => it('Calls startGroup on context', () => {
        let startGroupCount = 0;
        const context = {startGroup: function() { startGroupCount++; }, finalizeGroup: () => {}};
        const parser = new StitchGroupParser(context, new StitchCountResolver(0), new StitchesParser());
        parser.parse({ type: 'repeat', count: 1, stitches: [{ type: 'stitch', count: 1, name: 'sc', countModifier: 1 }] });
        assert.strictEqual(startGroupCount, 1);
    }),

    it => it('Calls finalizeGroup with count on context', () => {
        let finalizeGroupCount = 0;
        const context = {startGroup: () => {}, finalizeGroup: (count) => { finalizeGroupCount = count }};
        const parser = new StitchGroupParser(context, new StitchCountResolver(0), new StitchesParser());
        parser.parse({ type: 'repeat', count: 1, stitches: [{ type: 'stitch', count: 1, name: 'sc', countModifier: 1 }] });
        assert.strictEqual(finalizeGroupCount, 1);
    }),

    it => it('Supports nested groups', () => {
        const parser = getDefaultStitchGroupParser();
        const stitchGroup = parser.parse({ type: 'repeat', count: 1, stitches: [{ type: 'repeat', count: 1, stitches: [{ type: 'stitch', count: 1, name: 'sc', countModifier: 1 }]}] });
        assert.deepStrictEqual(stitchGroup, new StitchGroup([new StitchGroup([new Stitch('sc', 1)], 1)], 1));
    }),

    it => it('Fails when data is empty object', () => {
        const parser = getDefaultStitchGroupParser();
        assert.throws(() => parser.parse({}));
    }),

    it => it('Fails when data type is invalid', () => {
        const parser = getDefaultStitchGroupParser();
        assert.throws(() => parser.parse({ type: 'invalid', count: 1, stitches: [{ type: 'stitch', count: 1, name: 'sc', countModifier: 1 }] }));
    }),
);
