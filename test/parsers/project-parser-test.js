import assert from 'assert';
import { testSuite } from '../test-suite.js';
import { parseProject } from '../../src/parsers/project-parser.js';


testSuite('parseProject',
    it => it('Fails when data is invalid', () => {
        assert.throws(() => parseProject()); // No data
        assert.throws(() => parseProject({})); // Empty data
        assert.throws(() => parseProject({ pattern: [] })); // Empty pattern
        assert.throws(() => parseProject({ pattern: [{type: 'invalid'}] })); // Invalid type in pattern array
    }),

    it => it('Parses valid round', () => {
        const project = parseProject({ name: 'test', pattern: [{ type: 'round', stitches: [{type: 'stitch', name: 'sc', count: 1}] }] });
        assert.equal(project.name, 'test');
    }),

    it => it('Parses valid instruction', () => {
        const project = parseProject({ name: 'test', pattern: [{ type: 'instruction', instruction: 'test' }] });
        assert.equal(project.name, 'test');
    }),
);
