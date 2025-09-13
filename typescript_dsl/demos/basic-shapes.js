"use strict";
// Basic shapes demo - recreating simple geometric animations
Object.defineProperty(exports, "__esModule", { value: true });
exports.basicShapesDemo = void 0;
const api_js_1 = require("../src/dsl/api.js");
// Demo 1: Basic shapes with simple animations
const basicShapesPoses = (0, api_js_1.poses)({
    hidden: {
        "style.opacity": 0,
        "transform.scale.value": [0.5, 0.5]
    },
    visible: {
        "style.opacity": 1,
        "transform.scale.value": [1, 1]
    },
    highlighted: {
        "style.opacity": 1,
        "transform.scale.value": [1.2, 1.2]
    }
});
exports.basicShapesDemo = (0, api_js_1.scene)({
    render: {
        width: 1280,
        height: 720,
        fps: 60,
        duration: 8,
        background: "#0f172a"
    },
    children: [
        // Title
        (0, api_js_1.textNode)({
            id: "title",
            text: "Basic Shapes Demo",
            transform: { position: { coords: [640, 50] } },
            font: { family: "system-ui", size: 32, weight: 700 },
            style: { fill: { type: "solid", color: "#ffffff" } },
            perform: (0, api_js_1.timeline)({
                "0": { pose: "hidden" },
                "0.5": { pose: "visible", dur: 0.8, ease: "easeOut" }
            }, basicShapesPoses)
        }),
        // Rectangle
        (0, api_js_1.shape)("rect", {
            id: "rect1",
            size: [120, 80],
            transform: { position: { coords: [200, 300] } },
            style: {
                fill: { type: "solid", color: "#3b82f6" },
                stroke: { color: "#1e40af", width: 2 },
                radius: 8
            },
            perform: (0, api_js_1.timeline)({
                "1": { pose: "hidden" },
                "1.5": { pose: "visible", dur: 0.6, ease: "easeOut" },
                "4": { pose: "highlighted", dur: 0.3, ease: "easeInOut" },
                "4.5": { pose: "visible", dur: 0.3, ease: "easeInOut" }
            }, basicShapesPoses)
        }),
        // Circle
        (0, api_js_1.shape)("ellipse", {
            id: "circle1",
            size: [100, 100],
            transform: { position: { coords: [640, 300] } },
            style: {
                fill: { type: "solid", color: "#ef4444" },
                stroke: { color: "#dc2626", width: 3 }
            },
            perform: (0, api_js_1.timeline)({
                "2": { pose: "hidden" },
                "2.5": { pose: "visible", dur: 0.6, ease: "easeOut" },
                "5": { pose: "highlighted", dur: 0.3, ease: "easeInOut" },
                "5.5": { pose: "visible", dur: 0.3, ease: "easeInOut" }
            }, basicShapesPoses)
        }),
        // Triangle (polyline)
        (0, api_js_1.shape)("polyline", {
            id: "triangle1",
            points: [
                [1080, 250],
                [1030, 350],
                [1130, 350],
                [1080, 250]
            ],
            style: {
                fill: { type: "solid", color: "#22c55e" },
                stroke: { color: "#16a34a", width: 2 }
            },
            perform: (0, api_js_1.timeline)({
                "3": { pose: "hidden" },
                "3.5": { pose: "visible", dur: 0.6, ease: "easeOut" },
                "6": { pose: "highlighted", dur: 0.3, ease: "easeInOut" },
                "6.5": { pose: "visible", dur: 0.3, ease: "easeInOut" }
            }, basicShapesPoses)
        }),
        // Description text
        (0, api_js_1.textNode)({
            id: "description",
            text: "Three basic shapes with staggered entrance animations",
            transform: { position: { coords: [640, 500] } },
            font: { family: "system-ui", size: 18 },
            style: { fill: { type: "solid", color: "#9ca3af" } },
            perform: (0, api_js_1.timeline)({
                "7": { pose: "hidden" },
                "7.2": { pose: "visible", dur: 0.8, ease: "easeOut" }
            }, basicShapesPoses)
        })
    ]
});
console.log("Basic Shapes Demo created successfully!");
console.log(JSON.stringify(exports.basicShapesDemo, null, 2));
//# sourceMappingURL=basic-shapes.js.map