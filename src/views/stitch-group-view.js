import { StitchView } from './stitch-view.js';

export const StitchGroupView = {
    asString(stitchGroup) {
        const stitches = stitchGroup.stitches.map(StitchView.asString).join(', ');
        return `(${stitches}) ${stitchGroup.count > 1 ? `x ${stitchGroup.count}`: ''}`.trim();
    }
}
