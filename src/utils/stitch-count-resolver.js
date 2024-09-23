// Encapsulate the logic of resolving stitch count when parsing
export function StitchCountResolver(previousStitchCount = 0) {
    if (previousStitchCount < 0) {
        throw new Error(`Invalid count ${previousStitchCount}`);
    }
    this._previousCount = previousStitchCount;
}
Object.assign(StitchCountResolver.prototype, {
    resolveCount: function(count) {
        if (count === -1) {
            count = this._previousCount;
        }
        if (count <= 0) {
            throw new Error(`Invalid count ${count}`);
        }
        return count;
    }
});
