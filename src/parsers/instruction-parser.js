import { Instruction } from '../models/instruction.js';

export function InstructionParser() {}
Object.assign(InstructionParser.prototype, {
    parse: function(data) {
        if (!data || !data.instruction || !data.type) {
            throw new Error('Invalid instruction');
        }

        if (data.type !== 'instruction') {
            throw new Error(`Invalid instruction type ${data.type}`);
        }

        return new Instruction(data.instruction);
    }
});
