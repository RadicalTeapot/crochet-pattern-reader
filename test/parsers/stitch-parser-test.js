import { testSuite } from '../test-suite.js';
import assert from 'assert';
import { Stitch } from '../../src/models/stitch.js';
import { StitchParser } from '../../src/parsers/stitch-parser.js';
import { StitchCountResolver } from '../../src/utils/stitch-count-resolver.js';

testSuite('StitchParser',
    it => it('Parses valid stitch data', () => {
        const parser = new StitchParser();
        const stitch = parser.parseStitch({ type: 'stitch', count: 1, name: 'sc', countModifier: 1 });
        assert.strictEqual(stitch.name, 'sc');
        assert.strictEqual(stitch.count, 1);
        assert.strictEqual(stitch.countModifier, 1);
    }),

    it => it('Parses valid repeat data', () => {
        const parser = new StitchParser();
        const stitchGroup = parser.parseStitch({ type: 'repeat', count: 1, stitches: [{ type: 'stitch', count: 1, name: 'sc' }] });
        assert.deepStrictEqual(stitchGroup.stitches, [new Stitch('sc', 1)]);
        assert.strictEqual(stitchGroup.count, 1);
    }),

    it => it('Fails when data is empty object', () => {
        const parser = new StitchParser();
        assert.throws(() => parser.parseStitch({}));
    }),

    it => it('Fails when data type is invalid', () => {
        const parser = new StitchParser();
        assert.throws(() => parser.parseStitch({ type: 'sc', count: 1 }));
    }),

    it => it('Fails when count is invalid', () => {
        const parser = new StitchParser(StitchCountResolver(0));
        assert.throws(() => parser.parseStitch({ type: 'stitch', count: 0 }));
        assert.throws(() => parser.parseStitch({ type: 'repeat', count: 0 }));
    }),
);
