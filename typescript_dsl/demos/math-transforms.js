"use strict";
// Mathematical transformation demo - inspired by 3Blue1Brown's linear algebra videos
Object.defineProperty(exports, "__esModule", { value: true });
exports.mathematicalTransformDemo = void 0;
const api_js_1 = require("../src/dsl/api.js");
// Poses for coordinate transformation
const gridPoses = (0, api_js_1.poses)({
    identity: {
        "transform.position.coords": [640, 360],
        "transform.scale.value": [1, 1],
        "transform.rotation.angle": 0
    },
    scaled: {
        "transform.position.coords": [640, 360],
        "transform.scale.value": [1.5, 0.8],
        "transform.rotation.angle": 0
    },
    rotated: {
        "transform.position.coords": [640, 360],
        "transform.scale.value": [1.5, 0.8],
        "transform.rotation.angle": 30
    },
    sheared: {
        "transform.position.coords": [640, 360],
        "transform.scale.value": [1.5, 0.8],
        "transform.rotation.angle": 15
    }
});
const vectorPoses = (0, api_js_1.poses)({
    original: {
        "transform.position.coords": [640, 360],
        "transform.rotation.angle": 0
    },
    transformed: {
        "transform.position.coords": [740, 300],
        "transform.rotation.angle": 15
    }
});
exports.mathematicalTransformDemo = (0, api_js_1.scene)({
    render: {
        width: 1280,
        height: 720,
        fps: 60,
        duration: 12,
        background: "#1a1a1a"
    },
    children: [
        // Title
        (0, api_js_1.textNode)({
            id: "title",
            text: "Linear Transformation Visualization",
            transform: { position: { coords: [640, 50] } },
            font: { family: "system-ui", size: 32, weight: 700 },
            style: { fill: { type: "solid", color: "#ffffff" } }
        }),
        // Grid background
        (0, api_js_1.group)("gridGroup", {
            children: [
                // Horizontal grid lines
                ...Array.from({ length: 15 }, (_, i) => (0, api_js_1.shape)("polyline", {
                    id: `hline${i}`,
                    points: [
                        [400, 200 + i * 30],
                        [880, 200 + i * 30]
                    ],
                    style: {
                        stroke: { color: "#374151", width: 1, opacity: 0.6 }
                    }
                })),
                // Vertical grid lines
                ...Array.from({ length: 17 }, (_, i) => (0, api_js_1.shape)("polyline", {
                    id: `vline${i}`,
                    points: [
                        [400 + i * 30, 200],
                        [400 + i * 30, 620]
                    ],
                    style: {
                        stroke: { color: "#374151", width: 1, opacity: 0.6 }
                    }
                }))
            ],
            perform: (0, api_js_1.timeline)({
                "1": { pose: "identity" },
                "3": { pose: "scaled", dur: 1.5, ease: "easeInOut" },
                "6": { pose: "rotated", dur: 2, ease: "easeInOut" },
                "9": { pose: "sheared", dur: 1.5, ease: "easeInOut" }
            }, gridPoses)
        }),
        // Coordinate axes
        (0, api_js_1.shape)("polyline", {
            id: "xAxis",
            points: [
                [440, 360],
                [840, 360]
            ],
            style: {
                stroke: { color: "#ef4444", width: 3 }
            },
            perform: (0, api_js_1.timeline)({
                "1": { pose: "identity" },
                "3": { pose: "scaled", dur: 1.5, ease: "easeInOut" },
                "6": { pose: "rotated", dur: 2, ease: "easeInOut" },
                "9": { pose: "sheared", dur: 1.5, ease: "easeInOut" }
            }, gridPoses)
        }),
        (0, api_js_1.shape)("polyline", {
            id: "yAxis",
            points: [
                [640, 260],
                [640, 460]
            ],
            style: {
                stroke: { color: "#22c55e", width: 3 }
            },
            perform: (0, api_js_1.timeline)({
                "1": { pose: "identity" },
                "3": { pose: "scaled", dur: 1.5, ease: "easeInOut" },
                "6": { pose: "rotated", dur: 2, ease: "easeInOut" },
                "9": { pose: "sheared", dur: 1.5, ease: "easeInOut" }
            }, gridPoses)
        }),
        // Sample vector
        (0, api_js_1.shape)("polyline", {
            id: "vector",
            points: [
                [640, 360],
                [700, 300]
            ],
            style: {
                stroke: { color: "#fbbf24", width: 4 }
            },
            perform: (0, api_js_1.timeline)({
                "2": { pose: "original" },
                "3": { pose: "transformed", dur: 1.5, ease: "easeInOut" }
            }, vectorPoses)
        }),
        // Vector tip (arrow)
        (0, api_js_1.shape)("polyline", {
            id: "vectorTip",
            points: [
                [700, 300],
                [690, 295],
                [695, 305],
                [700, 300]
            ],
            style: {
                fill: { type: "solid", color: "#fbbf24" },
                stroke: { color: "#f59e0b", width: 2 }
            },
            perform: (0, api_js_1.timeline)({
                "2": { pose: "original" },
                "3": { pose: "transformed", dur: 1.5, ease: "easeInOut" }
            }, vectorPoses)
        }),
        // Description text
        (0, api_js_1.textNode)({
            id: "scaleText",
            text: "1. Scale transformation",
            transform: { position: { coords: [120, 150] } },
            font: { family: "system-ui", size: 20, weight: 600 },
            style: { fill: { type: "solid", color: "#3b82f6" } },
            lifecycle: { start: 2.5, end: 5.5, fadeIn: 0.3, fadeOut: 0.3 }
        }),
        (0, api_js_1.textNode)({
            id: "rotateText",
            text: "2. Rotation transformation",
            transform: { position: { coords: [120, 150] } },
            font: { family: "system-ui", size: 20, weight: 600 },
            style: { fill: { type: "solid", color: "#ef4444" } },
            lifecycle: { start: 5.5, end: 8.5, fadeIn: 0.3, fadeOut: 0.3 }
        }),
        (0, api_js_1.textNode)({
            id: "shearText",
            text: "3. Shear transformation",
            transform: { position: { coords: [120, 150] } },
            font: { family: "system-ui", size: 20, weight: 600 },
            style: { fill: { type: "solid", color: "#22c55e" } },
            lifecycle: { start: 8.5, end: 12, fadeIn: 0.3, fadeOut: 0.3 }
        }),
        // Mathematical notation
        (0, api_js_1.textNode)({
            id: "matrixNotation",
            text: "Matrix: [a b; c d]",
            transform: { position: { coords: [1000, 150] } },
            font: { family: "monospace", size: 18 },
            style: { fill: { type: "solid", color: "#d1d5db" } }
        })
    ]
});
console.log("Mathematical Transform Demo created successfully!");
console.log(JSON.stringify(exports.mathematicalTransformDemo, null, 2));
//# sourceMappingURL=math-transforms.js.map