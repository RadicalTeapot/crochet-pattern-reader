import assert from 'assert';
import { testSuite } from './it.js';
import { Instruction, parseInstruction } from '../src/instruction.js';

// Instruction
let it = testSuite('Instruction');
it('Fails when instruction is empty', () => {
    assert.throws(() => new Instruction()); // No instruction
    assert.throws(() => new Instruction('')); // Empty string
    assert.throws(() => new Instruction(' ')); // Only spaces
});

it('Works with valid data', () => {
    const instruction = new Instruction('sc 1');
    assert.strictEqual(instruction.instruction, 'sc 1');
});

// parseInstruction
it = testSuite('parseInstruction');
it('Fails when data is invalid', () => {
    assert.throws(() => parseInstruction()); // No data
    assert.throws(() => parseInstruction({})); // No instruction
    assert.throws(() => parseInstruction({ instruction: 'sc 1' })); // No type
    assert.throws(() => parseInstruction({ instruction: 'sc 1', type: 'other' })); // Invalid type
});

it('Works with valid data', () => {
    const instruction = parseInstruction({ instruction: 'sc 1', type: 'instruction' });
    assert.strictEqual(instruction.instruction, 'sc 1');
});
