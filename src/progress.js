export function Progress(project) {
    this.project = project;
    this.currentRoundIndex = 0;
    this.currentStitchIndex = 0;
}
Object.assign(Progress.prototype, {
    next: function() {
        this.currentStitchIndex++;
        if (this.currentStitchIndex >= this.project.getRoundStitchesCount(this.currentRoundIndex)) {
            this.currentStitchIndex = 0;
            this.currentRoundIndex++;
            if (this.currentRoundIndex >= this.project.getRoundsCount()) {
                return false;
            }
        }
        return true;
    },
    setProgress: function(roundIndex, stitchIndex) {
        if (roundIndex >= this.project.getRoundsCount()) {
            console.error(`Invalid round index ${roundIndex}`);
            return;
        }
        if (stitchIndex >= this.project.getRoundStitchesCount(this.currentRoundIndex)) {
            console.error(`Invalid stitch index ${stitchIndex}`);
            return;
        }
        this.currentRoundIndex = roundIndex;
        this.currentStitchIndex = stitchIndex;
    },
    toString: function() {
        const stitchString = this.project.getRoundStitch(this.currentRoundIndex, this.currentStitchIndex).toString();
        const roundStitchCount = this.project.getRoundStitchesCount(this.currentRoundIndex);

        const surroundings = [];
        if (this.currentStitchIndex > 1) {
            surroundings.push('...');
        }
        if (this.currentStitchIndex >= 1) {
            const previousStitch = this.project.getRoundStich(this.currentRoundIndex, this.currentStitchIndex - 1);
            surroundings.push(`(${previousStitch.toString()})`);
        }
        surroundings.push(stitchString);
        if (this.currentStitchIndex < roundStitchCount - 1) {
            const nextStitch = this.project.getRoundStitch(this.currentRoundIndex, this.currentStitchIndex + 1);
            surroundings.push(`(${nextStitch.toString()})`);
        }
        if (this.currentStitchIndex < roundStitchCount - 2) {
            surroundings.push('...');
        }

        const completedStitchesCount = Array(this.currentRoundIndex).fill(null).reduce((a, _, i) =>
            a + this.project.getRoundStitchesCount(i), 0) + this.currentStitchIndex;

        return `Next stitch: ${stitchString}\nSurroundings: ${surroundings.join(' ')}\nProgress: ${completedStitchesCount}/${this.project.getStitchesCount()} (${(completedStitchesCount / this.project.getStitchesCount() * 100).toFixed(2)}%)`;
    }
})

