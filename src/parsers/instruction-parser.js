import { Instruction } from "../models/instruction";

export function parseInstruction(data) {
    if (!data || !data.instruction || !data.type) {
        throw new Error('Invalid instruction');
    }

    if (data.type !== 'instruction') {
        throw new Error(`Invalid instruction type ${data.type}`);
    }
    return new Instruction(data.instruction);
}

