export const StitchCounter = {
    getCount: function(stitches) {
        return stitches.reduce((a, s) => a + s.count * s.countModifier, 0);
    }
};

