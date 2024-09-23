import assert from 'assert';
import { testSuite } from '../test-suite.js';
import { InstructionParser } from '../../src/parsers/instruction-parser.js';
import { Instruction } from '../../src/models/instruction.js';

testSuite('InstructionParser',
    it => it('Fails when data is invalid', () => {
        assert.throws(() => new InstructionParser().parse()); // No data
        assert.throws(() => new InstructionParser().parse({})); // No instruction
        assert.throws(() => new InstructionParser().parse({ instruction: 'sc 1' })); // No type
        assert.throws(() => new InstructionParser().parse({ instruction: 'sc 1', type: 'invalid' })); // Invalid type
    }),
    it => it('Works with valid data', () => {
        const instruction = new InstructionParser().parse({ instruction: 'sc 1', type: 'instruction' });
        assert.deepStrictEqual(instruction, new Instruction('sc 1'));
    }),
);
