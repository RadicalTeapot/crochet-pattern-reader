export function Stitch(name) {
    if (name === '') {
        console.error(`Invalid stitch name ${name}`);
        return null;
    }

    this.name = name;
}
Object.assign(Stitch.prototype, {
    toString: function() {
        return this.name;
    }
});

export function parseStitch(data) {
    if (data.type !== 'stitch') {
        console.error(`Invalid stitch type ${data}`);
        return null;
    }
    return new Stitch(data.name);
}
