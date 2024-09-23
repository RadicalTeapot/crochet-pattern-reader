import { testSuite } from '../test-suite.js';
import assert from 'assert';
import { StitchParserFactory, StitchArrayParser } from '../../src/parsers/stitch/stitch-array-parser.js';
import { StitchParser } from '../../src/parsers/stitch/stitch-parser.js';
import { StitchGroupParser } from '../../src/parsers/stitch/stitch-group-parser.js';
import { InstructionParser } from '../../src/parsers/instruction-parser.js';
import { STITCH_ELEMENT_TYPE } from '../../src/utils/stitch-element-type.js';
import { Stitch } from '../../src/models/stitch.js';
import { StitchGroup } from '../../src/models/stitch-group.js';
import { Instruction } from '../../src/models/instruction.js';

testSuite('StitchParserFactory',
    it => it('Returns an instance of StitchParser for stitch type', () => {
        const factory = new StitchParserFactory();
        const parser = factory.getParser(STITCH_ELEMENT_TYPE.STITCH);
        assert.ok(parser instanceof StitchParser);
    }),

    it => it('Returns an instance of StitchGroupParser for stitch group type', () => {
        const factory = new StitchParserFactory();
        const parser = factory.getParser(STITCH_ELEMENT_TYPE.GROUP);
        assert.ok(parser instanceof StitchGroupParser);
    }),

    it => it('Returns an instance of InstructionParser for instruction type', () => {
        const factory = new StitchParserFactory();
        const parser = factory.getParser(STITCH_ELEMENT_TYPE.INSTRUCTION);
        assert.ok(parser instanceof InstructionParser);
    }),

    it => it('Fails for invalid types', () => {
        const factory = new StitchParserFactory();
        assert.throws(() => factory.getParser('invalid'));
    })
);

testSuite('StitchArrayParser',
    it => it('Parses stitch correctly', () => {
        const parser = new StitchArrayParser();
        const stitches = parser.parse([
            {type: 'stitch', name: 'sc', count: 1, countModifier: 1}
        ]);
        assert.deepStrictEqual(stitches, [new Stitch('sc', 1, 1)]);
    }),

    it => it('Parses stitch group correctly', () => {
        const parser = new StitchArrayParser();
        const stitches = parser.parse([
            {type: 'repeat', count: 1, stitches: [{type: 'stitch', name: 'sc', count: 1, countModifier: 1}]}
        ]);
        assert.deepStrictEqual(stitches, [new StitchGroup([new Stitch('sc', 1, 1)], 1)]);
    }),

    it => it('Parses instructions correctly', () => {
        const parser = new StitchArrayParser();
        const stitches = parser.parse([
            {type: 'instruction', instruction: 'abc'}
        ]);
        assert.deepStrictEqual(stitches, [new Instruction('abc')]);
    }),

    it => it('Fails if data is invalid', () => {
        const parser = new StitchArrayParser();
        assert.throws(() => parser.parse([{}])); // Empty data
        assert.throws(() => parser.parse([{name: 'sc', count: 1, countModifier: 1}])); // Missing type
    })
);
