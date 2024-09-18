export function StitchGroup(stitches, count = 1) {
    if (stitches.length === 0) {
        throw new Error(`Empty stitch group`);
    }

    if (!count) {
        throw new Error(`Invalid count ${count}`);
    }

    this.stitches = stitches;
    this.count = count;
}
Object.assign(StitchGroup.prototype, {
    asView: function(viewResolver) {
        return viewResolver.stitchGroupView(this.stitches, this.count);
    },
    asFlatStitchArray: function(flatStitchArrayResolver) {
        return flatStitchArrayResolver.fromStitchGroup(this.stitches, this.count);
    }
});
