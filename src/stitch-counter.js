export function StitchCounter() {
    this.current = 0;
    this.previous = 0;
}
Object.assign(StitchCounter.prototype, {
    newRound: function() {
        this.previous = this.current;
    },
    increment: function(count) {
        this.current += count;
    },
    decrement: function(count) {
        this.current -= count;
    },
    getPrevious: function() {
        return this.previous;
    },
    getCurrent: function() {
        return this.current;
    }
});

