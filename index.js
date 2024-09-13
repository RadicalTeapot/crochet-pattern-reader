import fs from 'fs';
import { parseProject } from './src/project.js';
import { ProgressManager } from './src/progress.js';

// Read path from cli argument - If no argument is provided, read from stdin
const path = process.argv[2] || '';
if (!path) {
    console.error('No path provided');
    process.exit(1);
}
if (!fs.existsSync(path)) {
    console.error('File does not exist');
    process.exit(1);
}

// Read file contents
const contents = fs.readFileSync(path, 'utf8');
const json = JSON.parse(contents);

const projects = json.projects.map(parseProject);
const progressManager = new ProgressManager(projects[0].project);
progressManager.setProgress(13, 0);
projects[0].view.setCurrentRoundIndex(progressManager.progress.currentRoundIndex);
console.log(projects[0].view.toString());
console.log();
console.log(progressManager.toString());
