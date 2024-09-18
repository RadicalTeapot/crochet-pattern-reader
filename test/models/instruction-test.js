import assert from 'assert';
import { testSuite } from '../test-suite.js';
import { Instruction } from '../../src/models/instruction.js';

testSuite('Instruction',
    it => it('Fails when instruction is empty', () => {
        assert.throws(() => new Instruction()); // No instruction
        assert.throws(() => new Instruction('')); // Empty string
        assert.throws(() => new Instruction(' ')); // Only spaces
    }),
    it => it('Works with valid data', () => {
        const instruction = new Instruction('sc 1');
        assert.strictEqual(instruction.instruction, 'sc 1');
    })
);
