"use strict";
// Bouncing ball demo - recreating physics-like animation similar to manim
Object.defineProperty(exports, "__esModule", { value: true });
exports.bouncingBallDemo = void 0;
const api_js_1 = require("../src/dsl/api.js");
// Poses for the bouncing ball animation
const ballPoses = (0, api_js_1.poses)({
    start: {
        "transform.position.coords": [100, 600],
        "transform.scale.value": [1, 1]
    },
    peak: {
        "transform.position.coords": [400, 200],
        "transform.scale.value": [1, 1]
    },
    bounce: {
        "transform.position.coords": [700, 580],
        "transform.scale.value": [1.2, 0.8]
    },
    bounceNormal: {
        "transform.position.coords": [700, 560],
        "transform.scale.value": [1, 1]
    },
    end: {
        "transform.position.coords": [1100, 400],
        "transform.scale.value": [1, 1]
    }
});
const trajectoryPoses = (0, api_js_1.poses)({
    hidden: { "style.opacity": 0 },
    visible: { "style.opacity": 0.6 }
});
exports.bouncingBallDemo = (0, api_js_1.scene)({
    render: {
        width: 1280,
        height: 720,
        fps: 60,
        duration: 6,
        background: "#0f172a"
    },
    children: [
        // Title
        (0, api_js_1.textNode)({
            id: "title",
            text: "Physics-Inspired Bouncing Ball",
            transform: { position: { coords: [640, 50] } },
            font: { family: "system-ui", size: 28, weight: 700 },
            style: { fill: { type: "solid", color: "#ffffff" } }
        }),
        // Trajectory path (shown first)
        (0, api_js_1.shape)("polyline", {
            id: "trajectory",
            points: [
                [100, 600],
                [250, 350],
                [400, 200],
                [550, 350],
                [700, 560],
                [900, 480],
                [1100, 400]
            ],
            style: {
                stroke: { color: "#22c55e", width: 2, dasharray: "5 5" }
            },
            perform: (0, api_js_1.timeline)({
                "0.5": { pose: "hidden" },
                "1": { pose: "visible", dur: 0.5, ease: "easeOut" }
            }, trajectoryPoses)
        }),
        // Bouncing ball
        (0, api_js_1.shape)("ellipse", {
            id: "ball",
            size: [60, 60],
            style: {
                fill: {
                    type: "radial",
                    center: [0.3, 0.3],
                    radius: 0.8,
                    stops: [
                        { offset: 0, color: "#fbbf24" },
                        { offset: 1, color: "#f59e0b" }
                    ]
                },
                stroke: { color: "#d97706", width: 2 },
                shadows: [
                    {
                        x: 3,
                        y: 6,
                        blur: 12,
                        spread: 0,
                        color: "rgba(0, 0, 0, 0.4)"
                    }
                ]
            },
            perform: (0, api_js_1.timeline)({
                "1.5": { pose: "start" },
                "2.5": { pose: "peak", dur: 0.8, ease: "easeOut" },
                "3.3": { pose: "bounce", dur: 0.6, ease: "easeIn" },
                "3.4": { pose: "bounceNormal", dur: 0.1, ease: "easeOut" },
                "4.5": { pose: "end", dur: 1, ease: "easeInOut" }
            }, ballPoses)
        }),
        // Ground line
        (0, api_js_1.shape)("polyline", {
            id: "ground",
            points: [
                [0, 650],
                [1280, 650]
            ],
            style: {
                stroke: { color: "#4b5563", width: 3 }
            }
        }),
        // Speed indicator
        (0, api_js_1.textNode)({
            id: "speedText",
            text: "Realistic physics timing with easing",
            transform: { position: { coords: [640, 680] } },
            font: { family: "system-ui", size: 16 },
            style: { fill: { type: "solid", color: "#9ca3af" } }
        })
    ]
});
console.log("Bouncing Ball Demo created successfully!");
console.log(JSON.stringify(exports.bouncingBallDemo, null, 2));
//# sourceMappingURL=bouncing-ball.js.map