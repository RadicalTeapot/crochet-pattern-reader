import { Round } from './round.js';

export function Progress(project) {
    this.project = project;
    this.rounds = project.pattern.filter(p => p instanceof Round);
    this.totalStitches = this.rounds.reduce((a, b) => a + b.stitches.length, 0);
    this.currentRoundIndex = 0;
    this.currentStitchIndex = 0;
}
Object.assign(Progress.prototype, {
    next: function() {
        this.currentStitchIndex++;
        if (this.currentStitchIndex >= this.project.pattern[this.currentRoundIndex].stitches.length) {
            this.currentStitchIndex = 0;
            this.currentRoundIndex++;
            if (this.currentRoundIndex >= this.rounds.length) {
                return false;
            }
        }
        return true;
    },
    setProgress: function(roundIndex, stitchIndex) {
        if (roundIndex >= this.rounds.length) {
            console.error(`Invalid round index ${roundIndex}`);
            return;
        }
        if (stitchIndex >= this.rounds[roundIndex].stitches.length) {
            console.error(`Invalid stitch index ${stitchIndex}`);
            return;
        }
        this.currentRoundIndex = roundIndex;
        this.currentStitchIndex = stitchIndex;
    },
    toString: function() {
        const stitchString = this.rounds[this.currentRoundIndex].stitches[this.currentStitchIndex].toString();

        const surroundings = [];
        if (this.currentStitchIndex > 1) {
            surroundings.push('...');
        }
        if (this.currentStitchIndex >= 1) {
            const previousStitch = this.rounds[this.currentRoundIndex].stitches[this.currentStitchIndex - 1];
            surroundings.push(`(${previousStitch.toString()})`);
        }
        surroundings.push(stitchString);
        if (this.currentStitchIndex < this.rounds[this.currentRoundIndex].stitches.length - 1) {
            const nextStitch = this.rounds[this.currentRoundIndex].stitches[this.currentStitchIndex + 1];
            surroundings.push(`(${nextStitch.toString()})`);
        }
        if (this.currentStitchIndex < this.rounds[this.currentRoundIndex].stitches.length - 2) {
            surroundings.push('...');
        }

        const completedStitchesCount = this.rounds.slice(0, this.currentRoundIndex).reduce((a, b) => a + b.stitchCount, 0) + this.currentStitchIndex;

        return `Next stitch: ${stitchString}\nSurroundings: ${surroundings.join(' ')}\nProgress: ${completedStitchesCount}/${this.totalStitches} (${(completedStitchesCount / this.totalStitches * 100).toFixed(2)}%)`;
    }
})

