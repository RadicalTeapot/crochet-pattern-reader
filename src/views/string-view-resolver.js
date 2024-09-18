export const StringViewResolver = {
    stitchView: function(name, count) {
        return `${count > 1 ? count : ''}${name}`.trim();
    },
    stitchGroupView: function(stitches, count) {
        const stitchesView = stitches.map(s => s.asView(this)).join(', ');
        return `(${stitchesView}) ${count > 1 ? `x ${count}`: ''}`.trim();
    },
    roundView: function(stitches, instruction, indexInPattern, stitchCount) {
        const stitchesView = stitches.map(s => s.asView(this)).join(', ');
        return `${indexInPattern+1} - ${stitchesView}${instruction ? ` (${instruction.asView(this)})` : ''} [${stitchCount}]`.trim();
    },
    instructionView: function(instruction) {
        return instruction;
    },
    projectView: function(name, pattern) {
        const patternView = pattern.map(r => `  ${r.asView(this)}`).join('\n');
        return `${name}\n${patternView}`.trim();
    }
};

export const StringViewResolverWithProgress = function(currentRoundIndex) {
    return {
        ...StringViewResolver,
        roundView: function(stitches, instruction, indexInPattern, stitchCount) {
            const asView = StringViewResolver.roundView(stitches, instruction, indexInPattern, stitchCount);
            return `${indexInPattern === currentRoundIndex ? '->' : ''}${asView}`.trim();
        }
    }
}
