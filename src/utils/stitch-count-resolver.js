export function StitchCountResolver(previousStitchCount = 0) {
    if (previousStitchCount < 0) {
        throw new Error(`Invalid count ${previousStitchCount}`);
    }

    return function(count) {
        if (count === -1) {
            return previousStitchCount;
        }
        if (count <= 0) {
            throw new Error(`Invalid count ${count}`);
        }
        return count;
    }
}
