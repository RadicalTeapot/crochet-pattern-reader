export function Stitch(name, count = 1, countModifier = 1) {
    if (name === '') {
        throw new Error(`Invalid stitch name ${name}`);
    }

    if (!count) {
        throw new Error(`Invalid count ${count}`);
    }

    if (!countModifier) {
        throw new Error(`Invalid count modifier ${countModifier}`);
    }

    this.name = name;
    this.count = count;
    this.countModifier = countModifier;
}
Object.assign(Stitch.prototype, {
    asView: function(viewResolver) {
        return viewResolver.stitchView(this.name, this.count);
    },
    asFlatStitchArray: function(flatStitchArrayResolver) {
        return flatStitchArrayResolver.fromStitch(this.name, this.count, this.countModifier);
    }
});
