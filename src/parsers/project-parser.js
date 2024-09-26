import { Project } from '../models/project.js';
import { PatternArrayParser } from './pattern-parser.js';

export function ProjectParser(patternArrayParser) {
    this._patternArrayParser = patternArrayParser || new PatternArrayParser();
}
Object.assign(ProjectParser.prototype, {
    parse: function(data) {
        if (!data || !data.pattern) {
            throw new Error('Invalid project');
        }

        const pattern = this._patternArrayParser.parse(data.pattern);
        const project = new Project(data.name, pattern);

        return project;
    }
});
