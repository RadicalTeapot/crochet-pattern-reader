function Progress(roundIndex = 0, stitchIndex = 0) {
    this.currentRoundIndex = roundIndex;
    this.currentStitchIndex = stitchIndex;
}

const ProgressFactory = {
    createFromBeginning: function() {
        return new Progress();
    },
    createFromRoundAndStitchIndex: function(project, roundIndex, stitchIndex) {
        if (roundIndex >= project.getRoundsCount()) {
            console.error(`Invalid round index ${roundIndex}`);
            return;
        }
        if (stitchIndex >= project.getRoundStitchesCount(roundIndex)) {
            console.error(`Invalid stitch index ${stitchIndex}`);
            return;
        }
        const progress = new Progress(roundIndex, stitchIndex);
        return progress;
    },
    createFromNextStitch: function(project, progress) {
        let roundIndex = progress.currentRoundIndex;
        let stitchIndex = progress.currentStitchIndex;

        stitchIndex++;
        if (stitchIndex >= project.getRoundStitchesCount(roundIndex)) {
            stitchIndex = 0;
            roundIndex++;
            if (roundIndex >= project.getRoundsCount()) {
                return ProgressFactory.createFromRoundAndStitchIndex(roundIndex - 1, project.getRoundStitchesCount(roundIndex - 1) - 1);
            }
        }
        return ProgressFactory.createFromRoundAndStitchIndex(roundIndex, stitchIndex);
    }
}

const ProgressViewFactory = {
    currentStitch: function(project, progress) {
        const stitchString = project.getRoundStitch(progress.currentRoundIndex, progress.currentStitchIndex).toString();
        return `Next stitch: ${stitchString}`;
    },
    surroundings: function(project, progress) {
        const stitchString = project.getRoundStitch(progress.currentRoundIndex, progress.currentStitchIndex).toString();
        const roundStitchCount = project.getRoundStitchesCount(progress.currentRoundIndex);

        const surroundings = [];
        if (progress.currentStitchIndex > 1) {
            surroundings.push('...');
        }
        if (progress.currentStitchIndex >= 1) {
            const previousStitch = project.getRoundStich(progress.currentRoundIndex, progress.currentStitchIndex - 1);
            surroundings.push(`(${previousStitch.toString()})`);
        }
        surroundings.push(stitchString);
        if (progress.currentStitchIndex < roundStitchCount - 1) {
            const nextStitch = project.getRoundStitch(progress.currentRoundIndex, progress.currentStitchIndex + 1);
            surroundings.push(`(${nextStitch.toString()})`);
        }
        if (progress.currentStitchIndex < roundStitchCount - 2) {
            surroundings.push('...');
        }

        return `Surroundings: ${surroundings.join(' ')}`;
    },
    percentage: function(project, progress) {
        const completedStitchesCount = Array(progress.currentRoundIndex).fill(null).reduce((a, _, i) =>
            a + project.getRoundStitchesCount(i), 0) + progress.currentStitchIndex;

        return `Progress: ${completedStitchesCount}/${project.getStitchesCount()} (${(completedStitchesCount / project.getStitchesCount() * 100).toFixed(2)}%)`;
    }
}

export function ProgressManager(project) {
    this._project = project;
    this.progress = ProgressFactory.createFromBeginning(project);
}
Object.assign(ProgressManager.prototype, {
    setProgress: function(roundIndex, stitchIndex) {
        this.progress = ProgressFactory.createFromRoundAndStitchIndex(this._project, roundIndex, stitchIndex);
    },
    next: function() {
        this.progress = ProgressFactory.createFromNextStitch(this._project, this.progress);
    },
    toString: function() {
        const currentStitch = ProgressViewFactory.currentStitch(this._project, this.progress);
        const surroundings = ProgressViewFactory.surroundings(this._project, this.progress);
        const percentage = ProgressViewFactory.percentage(this._project, this.progress);
        return `${currentStitch}\n${surroundings}\n${percentage}`;
    }
});
