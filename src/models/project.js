export function Project(name, pattern) {
    const trimmedName = name.trim();

    if (trimmedName === '') {
        throw new Error(`Invalid project name ${data.name}`);
    }

    this.name = trimmedName;
    this._pattern = pattern;
}
Object.assign(Project.prototype, {
    getPatternLength: function() {
        return this._pattern.length;
    },
    getPatternElement: function(index) {
        if (index < 0 || index >= this._pattern.length) {
            console.error(`Invalid pattern index ${index}`);
            return null;
        }

        return this._pattern[index];
    },
    asView: function(viewResolver) {
        return viewResolver.projectView(this.name, this._pattern);
    }
});
