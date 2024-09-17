export const ProjectView = {
    toString: function(project, currentRoundIndex) {
        let roundIndex = 0;
        const patternString = Array(project.getPatternLength()).fill(0).map((_, index) => {
            const line = this.project.getPatternLine(index);
            const indent = project.getPatternLineFromRoundIndex(currentRoundIndex) === index ? '->' : '  ';
            const separator = '-';
            const lineElements = [indent];
            if (project.isLineARound(index)) {
                lineElements.push(`${roundIndex}`);
                lineElements.push(`${separator}`);
            }
            lineElements.push(`${line.toString()}`);
            return lineElements.join(' ');
        }).join('\n');
        return `${this.project.toString()}\n${patternString}`;
    },
};
