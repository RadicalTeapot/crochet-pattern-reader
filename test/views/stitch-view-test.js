import assert from 'assert';
import { testSuite } from '../test-suite.js';
import { StitchView } from '../../src/views/stitch-view.js';
import { Stitch } from '../../src/models/stitch.js';

testSuite('StitchView',
    it => it('Converts a stitch with count 1 to a string without count', () => {
        const stitch = new Stitch('sc', 1, 1);
        assert.equal(StitchView.asString(stitch), 'sc');
    }),

    it => it('Converts a stitch with count greater than one to a string with count', () => {
        const stitch = new Stitch('sc', 2, 1);
        assert.equal(StitchView.asString(stitch), '2sc');
    })
);
