import assert from 'assert';
import { testSuite } from '../test-suite.js';
import { StitchGroupView } from '../../src/views/stitch-group-view.js';
import { Stitch } from '../../src/models/stitch.js';
import { StitchGroup } from '../../src/models/stitch-group.js';

testSuite('StitchView',
    it => it('Converts a stitch group with count 1 to a string without count', () => {
        const stitchGroup = new StitchGroup([new Stitch('sc', 1, 1)], 1);
        assert.equal(StitchGroupView.asString(stitchGroup), '(sc)');
    }),

    it => it('Converts a stitch group with count greater than one to a string with count', () => {
        const stitchGroup = new StitchGroup([new Stitch('sc', 1, 1)], 2);
        assert.equal(StitchGroupView.asString(stitchGroup), '(sc) x 2');
    })
);
