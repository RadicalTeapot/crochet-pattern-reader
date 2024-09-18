export function StitchCountResolver(previousStitchCount = 0) {
    if (previousStitchCount < 0) {
        throw new Error(`Invalid count ${previousStitchCount}`);
    }

    return function(count) {
        if (count < 0) {
            throw new Error(`Invalid count ${count}`);
        }
        if (count === 0) {
            return previousStitchCount;
        }
        return count;
    }
}
