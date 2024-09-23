import assert from 'assert';
import { testSuite } from '../test-suite.js';
import { ProjectParser } from '../../src/parsers/project-parser.js';


testSuite('ProjectParser',
    it => it('Fails when data is invalid', () => {
        assert.throws(() => new ProjectParser().parse()); // No data
        assert.throws(() => new ProjectParser().parse({})); // Empty data
        assert.throws(() => new ProjectParser().parse({ pattern: [] })); // Empty pattern
        assert.throws(() => new ProjectParser().parse({ pattern: [{type: 'invalid'}] })); // Invalid type in pattern array
    }),

    it => it('Parses valid round', () => {
        const project = new ProjectParser().parse({ name: 'test', pattern: [{ type: 'round', stitches: [{type: 'stitch', name: 'sc', count: 1}] }] });
        assert.equal(project.name, 'test');
    }),

    it => it('Parses valid instruction', () => {
        const project = new ProjectParser().parse({ name: 'test', pattern: [{ type: 'instruction', instruction: 'test' }] });
        assert.equal(project.name, 'test');
    }),
);
