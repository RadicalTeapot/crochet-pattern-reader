export function Instruction(instruction) {
    if (instruction === '') {
        console.error(`Invalid instruction ${instruction}`);
        return null;
    }
    this.instruction = instruction;
}
Object.assign(Instruction.prototype, {
    toString: function() {
        return this.instruction;
    }
});

export function parseInstruction(data) {
    if (data.type !== 'instruction') {
        console.error(`Invalid instruction type ${data}`);
        return null;
    }
    return new Instruction(data.instruction);
}

