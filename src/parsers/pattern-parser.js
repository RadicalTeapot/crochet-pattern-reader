import { RoundElementParser, RowElementParser, InstructionElementParser, PatternElementFactory } from './pattern-element-parser.js';

export function PatternElementParserFactory(patternElementFactory) {
    this._patternElementFactory = patternElementFactory || new PatternElementFactory();
}
Object.assign(PatternElementParserFactory.prototype, {
    getParser: function(type) {
        switch (type) {
            case 'round':
                return new RoundElementParser(this._patternElementFactory);
            case 'row':
                return new RowElementParser(this._patternElementFactory);
            case 'instruction':
                return new InstructionElementParser();
            default:
                throw new Error(`Invalid type ${type} found in pattern element`);
        }
    },
});

export function PatternArrayParser(patternElementParserFactory) {
    this._parserFactory = patternElementParserFactory || new PatternElementParserFactory();
}
Object.assign(PatternArrayParser.prototype, {
    parse: function(data) {
        return data.map(d => {
            if (!d || !d.type) {
                throw new Error(`Invalid data ${d} found in stitches`);
            }
            return this._parserFactory.getParser(d.type).parse(d);
        });
    }
});

