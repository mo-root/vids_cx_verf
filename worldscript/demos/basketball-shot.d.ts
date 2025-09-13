import type { NodesSnapshot } from "../src/dsl/types.js";
declare const _default: {
    init: () => {};
    tick: (state: {}, dt: number, params: {}, nodes: NodesSnapshot) => void;
    scene: (state: {}, params: {}) => import("../src/dsl/types.js").SceneInput;
    type: string;
};
export default _default;
