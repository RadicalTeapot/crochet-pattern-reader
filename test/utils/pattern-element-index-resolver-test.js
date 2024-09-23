import assert from 'assert';
import { testSuite } from '../test-suite.js';
import { PatternElementIndexResolver } from '../../src/utils/pattern-element-index-resolver.js';
import { Stitch } from '../../src/models/stitch.js';
import { FlatStitchArrayGenerator } from '../../src/utils/flat-stitch-array-generator.js';

function getDefaultResolver() {
    const flattener = FlatStitchArrayGenerator.fromArray;
    return new PatternElementIndexResolver(flattener);
}

testSuite('PatternElementIndexResolver',
    it => it('Fails when data is empty', () => {
        const resolver = getDefaultResolver();
        assert.throws(() => resolver(0, []));
    }),

    it => it('Fails when index is out of bounds', () => {
        const resolver = getDefaultResolver();
        assert.throws(() => resolver(1, [new Stitch('sc', 1)]));
        assert.throws(() => resolver(-1, [new Stitch('sc', 1)]));
    }),

    it => it('Works with valid data', () => {
        const resolver = getDefaultResolver();
        assert.deepStrictEqual(resolver(0, [new Stitch('sc', 1)]), new Stitch('sc', 1));
    }),
);
