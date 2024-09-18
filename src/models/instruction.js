export function Instruction(instruction) {
    const trimmed = instruction.trim();

    if (trimmed === '') {
        throw new Error(`Invalid instruction ${instruction}`);
    }
    this.instruction = trimmed;
}
Object.assign(Instruction.prototype, {
    asView: function(viewResolver) {
        return viewResolver.instructionView(this.instruction);
    },
    asFlatStitchArray: function(flatStitchArrayResolver) {
        return flatStitchArrayResolver.fromInstruction(this.instruction);
    }
});
