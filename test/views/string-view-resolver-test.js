import assert from 'assert';
import { testSuite } from '../test-suite.js';
import { StringViewResolver } from '../../src/views/string-view-resolver.js';
import { Stitch } from '../../src/models/stitch.js';
import { Instruction } from '../../src/models/instruction.js';
import { PatternElement } from '../../src/models/pattern-element.js';

testSuite('StringViewResolver.stitchView',
    it => it('Converts a stitch with count 1 to a string without count', () => {
        assert.equal(StringViewResolver.stitchView('sc', 1), 'sc');
    }),

    it => it('Converts a stitch with count greater than one to a string with count', () => {
        assert.equal(StringViewResolver.stitchView('sc', 2), '2sc');
    })
);

testSuite('StringViewResolver.stitchGroupView',
    it => it('Converts a stitch group with count 1 to a string without count', () => {
        assert.equal(StringViewResolver.stitchGroupView([new Stitch('sc', 1, 1)], 1), '(sc)');
    }),

    it => it('Converts a stitch group with count greater than one to a string with count', () => {
        assert.equal(StringViewResolver.stitchGroupView([new Stitch('sc', 1, 1)], 2), '(sc) x 2');
    })
);

testSuite('StringViewResolver.instructionView',
    it => it('Converts an instruction to a string', () => {
        assert.equal(StringViewResolver.instructionView('abc'), 'abc');
    })
);

testSuite('StringViewResolver.patternElementView',
    it => it('Converts a round to a string', () => {
        assert.equal(StringViewResolver.patternElementView('abc', [new Stitch('sc', 1, 1)], undefined, 0, 1), 'abc 1 - sc [1]');
    }),

    it => it('Converts a round with an instruction to a string', () => {
        assert.equal(StringViewResolver.patternElementView('abc', [new Stitch('sc', 1, 1)], new Instruction('abc'), 0, 1), 'abc 1 - sc (abc) [1]');
    })
);

testSuite('StringViewResolver.projectView',
    it => it('Converts a project to a string', () => {
        assert.equal(StringViewResolver.projectView('abc', [new PatternElement([new Stitch('sc', 1, 1)], undefined, 0, 1), new Instruction('def')]), 'abc\n  Round 1 - sc [1]\n  def');
    })
);
