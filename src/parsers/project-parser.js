import { Project } from '../models/project.js';
import { PatternParser } from './pattern-parser.js';

export function ProjectParser(patternParser) {
    this._patternParser = patternParser || new PatternParser();
}
Object.assign(ProjectParser.prototype, {
    parse: function(data) {
        if (!data || !data.pattern) {
            throw new Error('Invalid project');
        }

        const pattern = this._patternParser.parse(data.pattern);
        const project = new Project(data.name, pattern);

        return project;
    }
});
