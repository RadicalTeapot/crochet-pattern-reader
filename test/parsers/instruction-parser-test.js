import assert from 'assert';
import { testSuite } from '../test-suite.js';
import { parseInstruction } from '../../src/parsers/instruction-parser.js';
import { Instruction } from '../../src/models/instruction.js';

testSuite('parseInstruction',
    it => it('Fails when data is invalid', () => {
        assert.throws(() => parseInstruction()); // No data
        assert.throws(() => parseInstruction({})); // No instruction
        assert.throws(() => parseInstruction({ instruction: 'sc 1' })); // No type
        assert.throws(() => parseInstruction({ instruction: 'sc 1', type: 'invalid' })); // Invalid type
    }),
    it => it('Works with valid data', () => {
        const instruction = parseInstruction({ instruction: 'sc 1', type: 'instruction' });
        assert.deepStrictEqual(instruction, new Instruction('sc 1'));
    }),
);
