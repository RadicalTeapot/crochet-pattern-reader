import { StitchParser } from './stitch-parser.js';
import { StitchCountResolver } from '../utils/stitch-count-resolver.js';
import { Round, Row } from '../models/round.js';
import { RoundCountResolver } from '../utils/round-resolvers.js';
import { Instruction } from '../models/instruction.js';
import { parseInstruction } from '../parsers/instruction-parser.js';

export function PatternElementTypeResolver(type, ...args) {
    switch (type) {
        case 'round':
            return new Round(...args);
        case 'row':
            return new Row(...args);
        default:
            throw new Error(`Invalid pattern element type ${type}`);
    }
}

export function RoundParser(previousPatternElement, countResolver = RoundCountResolver(), typeResolver = PatternElementTypeResolver) {
    this._previousPatternElement = previousPatternElement;
    this._countResolver = countResolver;
    this._typeResolver = typeResolver;
}
Object.assign(RoundParser.prototype, {
    parseRound: function(data) {
        if (!data || !data.type || !data.stitches) {
            throw new Error('Invalid round');
        }

        const previousStitchCount = this._previousPatternElement ? this._previousPatternElement.getStitchCount(this._countResolver) : 0;
        const countResolver = new StitchCountResolver(previousStitchCount);
        const stitchParser = new StitchParser(countResolver);
        // TODO Encapsulate the logic used here
        const stitches = data.stitches.map(d => {
            switch (d.type) {
                case 'stitch':
                case 'repeat':
                    return stitchParser.parseStitch(d);
                case 'instruction':
                    return parseInstruction(d);
                default:
                    throw new Error(`Invalid type ${d.type} found in round ${data}`);
            }
        });

        let instruction;
        if (data.instruction) {
            instruction = new Instruction(data.instruction);
        }

        const indexInPattern = this._previousPatternElement ? this._previousPatternElement.getIndexInPattern() + 1 : 0;
        const patternElement = this._typeResolver(data.type, stitches, instruction, indexInPattern);
        this._previousPatternElement = patternElement;
        return patternElement;
    }
})
