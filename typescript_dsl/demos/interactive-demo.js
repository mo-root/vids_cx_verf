"use strict";
// Interactive demo with draggable elements and reactive animations
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactiveDemo = void 0;
const api_js_1 = require("../src/dsl/api.js");
// Poses for interactive elements
const sliderPoses = (0, api_js_1.poses)({
    idle: {
        "style.fill.color": "#6b7280",
        "transform.scale.value": [1, 1]
    },
    active: {
        "style.fill.color": "#3b82f6",
        "transform.scale.value": [1.1, 1.1]
    }
});
const targetPoses = (0, api_js_1.poses)({
    normal: {
        "style.fill.color": "#ef4444",
        "transform.scale.value": [1, 1]
    },
    highlighted: {
        "style.fill.color": "#fbbf24",
        "transform.scale.value": [1.3, 1.3]
    }
});
exports.interactiveDemo = (0, api_js_1.scene)({
    render: {
        width: 1280,
        height: 720,
        fps: 60,
        duration: 30, // Longer duration for interactive demo
        background: "#111827"
    },
    children: [
        // Title
        (0, api_js_1.textNode)({
            id: "title",
            text: "Interactive Elements Demo",
            transform: { position: { coords: [640, 50] } },
            font: { family: "system-ui", size: 28, weight: 700 },
            style: { fill: { type: "solid", color: "#ffffff" } }
        }),
        // Instructions
        (0, api_js_1.textNode)({
            id: "instructions",
            text: "Drag the blue circle to control the animation",
            transform: { position: { coords: [640, 100] } },
            font: { family: "system-ui", size: 16 },
            style: { fill: { type: "solid", color: "#9ca3af" } }
        }),
        // Draggable controller
        (0, api_js_1.shape)("ellipse", {
            id: "controller",
            size: [40, 40],
            transform: { position: { coords: [200, 360] } },
            style: {
                fill: { type: "solid", color: "#3b82f6" },
                stroke: { color: "#1e40af", width: 2 },
                shadows: [
                    {
                        x: 2,
                        y: 4,
                        blur: 8,
                        spread: 0,
                        color: "rgba(0, 0, 0, 0.3)"
                    }
                ]
            },
            interaction: {
                draggable: {
                    bounds: [100, 1100, 200, 500],
                    boundsMode: "center"
                }
            },
            perform: (0, api_js_1.reactive)({
                pose: {
                    when: "controller.interaction.dragging",
                    use: "active",
                    else: "idle"
                }
            }, sliderPoses)
        }),
        // Horizontal track for controller
        (0, api_js_1.shape)("polyline", {
            id: "track",
            points: [
                [120, 360],
                [1080, 360]
            ],
            style: {
                stroke: { color: "#374151", width: 4 }
            }
        }),
        // Following circle (reacts to controller position)
        (0, api_js_1.shape)("ellipse", {
            id: "follower",
            size: [60, 60],
            transform: {
                position: {
                    coords: [
                        "controller.position.coords[0] + 200",
                        "mix(200, 500, (controller.position.coords[0] - 100) / 1000)"
                    ]
                }
            },
            style: {
                fill: {
                    type: "solid",
                    color: "controller.position.coords[0] > 600 ? '#22c55e' : '#ef4444'"
                },
                stroke: { color: "#ffffff", width: 2 }
            }
        }),
        // Target zone
        (0, api_js_1.shape)("rect", {
            id: "targetZone",
            size: [150, 100],
            transform: { position: { coords: [950, 300] } },
            style: {
                fill: { type: "solid", color: "rgba(34, 197, 94, 0.2)" },
                stroke: { color: "#22c55e", width: 2, dasharray: "5 5" }
            },
            perform: (0, api_js_1.reactive)({
                pose: {
                    when: "controller.position.coords[0] > 800",
                    use: "highlighted",
                    else: "normal"
                }
            }, targetPoses)
        }),
        // Target zone label
        (0, api_js_1.textNode)({
            id: "targetLabel",
            text: "Target Zone",
            transform: { position: { coords: [950, 250] } },
            font: { family: "system-ui", size: 14, weight: 600 },
            style: { fill: { type: "solid", color: "#22c55e" } }
        }),
        // Connection line
        (0, api_js_1.shape)("polyline", {
            id: "connection",
            points: [
                ["controller.position.coords[0]", "controller.position.coords[1]"],
                ["follower.position.coords[0]", "follower.position.coords[1]"]
            ],
            style: {
                stroke: {
                    color: "#6b7280",
                    width: 2,
                    dasharray: "3 3",
                    opacity: "controller.position.coords[0] > 300 ? 0.8 : 0.3"
                }
            }
        }),
        // Dynamic text showing position
        (0, api_js_1.textNode)({
            id: "positionText",
            text: "X Position: ",
            textValue: `"X: " + Math.round(controller.position.coords[0])`,
            transform: { position: { coords: [200, 500] } },
            font: { family: "monospace", size: 16 },
            style: { fill: { type: "solid", color: "#d1d5db" } }
        }),
        // Status indicator
        (0, api_js_1.textNode)({
            id: "statusText",
            text: "Status: Outside target",
            textValue: `controller.position.coords[0] > 800 ? "Status: In target zone!" : "Status: Outside target"`,
            transform: { position: { coords: [200, 530] } },
            font: { family: "system-ui", size: 16, weight: 600 },
            style: {
                fill: {
                    type: "solid",
                    color: "controller.position.coords[0] > 800 ? '#22c55e' : '#ef4444'"
                }
            }
        }),
        // Animated particle system (based on controller position)
        ...Array.from({ length: 8 }, (_, i) => (0, api_js_1.shape)("ellipse", {
            id: `particle${i}`,
            size: [8, 8],
            transform: {
                position: {
                    coords: [
                        `follower.position.coords[0] + ${Math.cos(i * Math.PI / 4) * 80}`,
                        `follower.position.coords[1] + ${Math.sin(i * Math.PI / 4) * 80}`
                    ]
                },
                rotation: {
                    angle: `t * ${45 + i * 15} + controller.position.coords[0] * 0.1`
                }
            },
            style: {
                fill: {
                    type: "solid",
                    color: `hsl(${200 + i * 20}, 70%, 60%)`
                },
                opacity: "0.3 + 0.4 * sin(t * 2 + " + i + ")"
            },
            lifecycle: {
                start: 1,
                fadeIn: 0.5
            }
        }))
    ]
});
console.log("Interactive Demo created successfully!");
console.log(JSON.stringify(exports.interactiveDemo, null, 2));
//# sourceMappingURL=interactive-demo.js.map