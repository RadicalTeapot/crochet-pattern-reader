import { Project } from '../models/project.js';
import { RoundParser } from '../parsers/round-parser.js';
import { parseInstruction } from '../parsers/instruction-parser.js';

export function parseProject(data) {
    if (!data || !data.pattern) {
        throw new Error('Invalid project');
    }

    const roundParser = new RoundParser();

    const pattern = data.pattern.map(d => {
        switch (d.type) {
            case 'round':
                return roundParser.parseRound(d);
            case 'instruction':
                return parseInstruction(d);
            default:
                throw new Error(`Invalid type ${d.type} found in project ${data}`);
        }
    }, []);
    const project = new Project(data.name, pattern);

    return project;
}
