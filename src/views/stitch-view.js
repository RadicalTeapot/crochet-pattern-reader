export const StitchView = {
    asString(stitch) {
        return `${stitch.count > 1 ? stitch.count : ''}${stitch.name}`.trim();
    }
}
