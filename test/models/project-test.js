import assert from 'assert';
import { testSuite } from '../test-suite.js';
import { Project } from '../../src/models/project.js';

testSuite('Project',
    it => it('Fails with invalid name', () => {
        assert.throws(() => new Project('', [])); // Empty name
        assert.throws(() => new Project('  ', [])); // Whitespace name
    }),

    it => it('Stores trimmed name', () => {
        const name = 'My Project ';
        const project = new Project(name, []);
        assert.strictEqual(project.name, name.trim());
    }),

    it => it('Exposes pattern length', () => {
        const pattern = [1, 2, 3];
        const project = new Project('My Project', pattern);
        assert.strictEqual(project.getPatternLength(), 3);
    }),

    it => it('Allows to retrived pattern elements', () => {
        const pattern = [1, 2];
        const project = new Project('My Project', pattern);
        assert.strictEqual(project.getPatternElement(0), 1);
        assert.strictEqual(project.getPatternElement(1), 2);
    }),
);

