import assert from 'assert';
import { testSuite } from '../test-suite.js';
import { Round } from '../../src/models/pattern-element.js';
import { Stitch } from '../../src/models/stitch.js';

function getDefaultRound() {
    return new Round([new Stitch('sc', 1)], undefined, 1, [[0]], 0, 0);
}
testSuite('Round',
    it => it('Fails when stitches is empty', () => {
        assert.throws(() => new Round());
        assert.throws(() => new Round([]));
    }),

    it => it('Has sane defaults', () => {
        const round = getDefaultRound();
        assert.strictEqual(round.instruction, undefined);
        assert.strictEqual(round.getIndexInPattern(), 0);
    }),

    it => it('Exposes index in pattern', () => {
        const round = new Round([new Stitch('sc', 1)], undefined, 1, [[0]], 1, 0);
        assert.strictEqual(round.getIndexInPattern(), 1);
    })
);
