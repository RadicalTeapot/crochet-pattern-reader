import { StitchParser } from './stitch-parser.js';
import { StitchCountResolver } from '../utils/stitch-count-resolver.js';
import { Round, } from '../models/round.js';
import { RoundCountResolver } from '../utils/round-resolvers.js';
import { Instruction } from '../models/instruction.js';

export function RoundParser(previousRound, countResolver = RoundCountResolver()) {
    this._previousRound = previousRound;
    this._countResolver = countResolver;
}
Object.assign(RoundParser.prototype, {
    parseRound: function(data) {
        if (!data || !data.type || !data.stitches) {
            throw new Error('Invalid round');
        }

        if (data.type !== 'round') {
            throw new Error(`Invalid round type ${data.type}`);
        }

        const previousRoundCount = this._previousRound ? this._previousRound.getStitchCount(this._countResolver) : 0;
        const countResolver = new StitchCountResolver(previousRoundCount);
        const stitchParser = new StitchParser(countResolver);
        const stitches = data.stitches.map(stitch => stitchParser.parseStitch(stitch));

        let instruction;
        if (data.instruction) {
            instruction = new Instruction(data.instruction);
        }

        const indexInPattern = this._previousRound ? this._previousRound.getIndexInPattern() + 1 : 0;
        const round = new Round(stitches, instruction, indexInPattern);
        this._previousRound = round;
        return round;
    }
})
