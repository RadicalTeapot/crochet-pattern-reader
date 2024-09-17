import { Stitch } from "../models/stitch";

export const FlatStitchArrayGenerator = {
    fromSingle: function(object) {
        if (object instanceof Stitch) return FlatStitchArrayGenerator._fromStitch(object);
        else if (object instanceof StitchGroup) return FlatStitchArrayGenerator._fromGroup(object);
        else throw new Error(`Invalid object ${object}`);
    },
    fromArray: function(array) {
        return array.reduce((a, b) => a.concat(FlatStitchArrayGenerator.fromSingle(b)), []);
    },
    _fromStitch: function(stitch){
        return Array(stitch.count).fill(new Stitch(stitch.name, 1, stitch.countModifier));
    },
    _fromGroup: function(stitchGroup) {
        return Array(stitchGroup.count)
            .fill(0)
            .reduce((a, _) => a.concat(FlatStitchArrayGenerator.fromArray(stitchGroup.stitches)) , []);
    }
}
