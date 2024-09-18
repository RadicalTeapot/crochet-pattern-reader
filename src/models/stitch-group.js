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
