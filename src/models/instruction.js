export function Instruction(instruction) {
    const trimmed = instruction.trim();

    if (trimmed === '') {
        throw new Error(`Invalid instruction ${instruction}`);
    }
    this.instruction = trimmed;
}
