import { scene, group, shape, textNode, poses, reactive } from "../../src/dsl/api.js";
import type { Vec2 } from "../../src/dsl/types.js";

// Interactive pendulum demonstration with draggable bob

const pendulumPoses = poses({
    normal: { "style.stroke.color": "#64748b" },
    stressed: { "style.stroke.color": "#ef4444" }
});

const bobPoses = poses({
    idle: { "transform.scale.value": [1, 1] },
    active: { "transform.scale.value": [1.1, 1.1] }
});

export default scene({
    render: {
        width: 1280,
        height: 720,
        fps: 60,
        duration: 30, // Long duration for interaction
        background: "#0f172a"
    },
    children: [
        textNode({
            id: "title",
            text: "Interactive Pendulum",
            transform: { position: { coords: [640, 50] as Vec2 } },
            font: { family: "system-ui", size: 28, weight: 700 },
            style: { fill: { type: "solid", color: "#ffffff" } }
        }),
        
        textNode({
            id: "instructions",
            text: "Drag the pendulum bob to see physics in action",
            transform: { position: { coords: [640, 90] as Vec2 } },
            font: { family: "system-ui", size: 18, weight: 500 },
            style: { fill: { type: "solid", color: "#94a3b8" } }
        }),
        
        // Pendulum anchor point
        shape("ellipse", {
            id: "anchor",
            size: [16, 16],
            transform: { position: { coords: [640, 150] as Vec2 } },
            style: { 
                fill: { type: "solid", color: "#374151" },
                stroke: { color: "#6b7280", width: 2 }
            }
        }),
        
        // Pendulum string/rod
        shape("polyline", {
            id: "pendulumRod",
            points: [
                [640, 150], // Anchor point
                ["bob.position.coords[0]", "bob.position.coords[1]"] // Follows bob
            ],
            style: { 
                stroke: { 
                    color: "#64748b", 
                    width: 3,
                    linecap: "round"
                }
            },
            perform: reactive({
                pose: {
                    when: "len([bob.position.coords[0] - 640, bob.position.coords[1] - 150]) > 250",
                    use: "stressed",
                    else: "normal",
                    transition: { dur: 0.2 }
                }
            }, pendulumPoses)
        }),
        
        // Pendulum bob (draggable)
        shape("ellipse", {
            id: "bob",
            size: [40, 40],
            transform: { 
                position: { coords: [640, 400] as Vec2 } // Initial position
            },
            style: {
                fill: { 
                    type: "radial",
                    center: [0.3, 0.3],
                    radius: 0.8,
                    stops: [
                        { offset: 0, color: "#fbbf24" },
                        { offset: 0.7, color: "#f59e0b" },
                        { offset: 1, color: "#d97706" }
                    ]
                },
                stroke: { color: "#d97706", width: 2 },
                shadows: [{
                    x: 2,
                    y: 4,
                    blur: 8,
                    spread: 0,
                    color: "rgba(0, 0, 0, 0.4)"
                }]
            },
            interaction: {
                draggable: {
                    bounds: [440, 840, 200, 600], // Keep within reasonable bounds
                    boundsMode: "center"
                }
            },
            perform: reactive({
                pose: {
                    when: "len([bob.position.coords[0] - 640, bob.position.coords[1] - 150]) > 200",
                    use: "active",
                    else: "idle",
                    transition: { dur: 0.1 }
                }
            }, bobPoses)
        }),
        
        // Length indicator
        textNode({
            id: "length",
            text: "Length: 250px",
            textValue: `"Length: " + Math.round(len([bob.position.coords[0] - 640, bob.position.coords[1] - 150])) + "px"`,
            transform: { position: { coords: [100, 150] as Vec2 } },
            font: { family: "JetBrains Mono", size: 16, weight: 500 },
            style: { fill: { type: "solid", color: "#3b82f6" } }
        }),
        
        // Angle indicator
        textNode({
            id: "angle",
            text: "Angle: 0°",
            textValue: `"Angle: " + Math.round(Math.atan2(bob.position.coords[0] - 640, bob.position.coords[1] - 150) * 180 / Math.PI) + "°"`,
            transform: { position: { coords: [100, 180] as Vec2 } },
            font: { family: "JetBrains Mono", size: 16, weight: 500 },
            style: { fill: { type: "solid", color: "#22c55e" } }
        }),
        
        // Potential energy indicator
        textNode({
            id: "potential",
            text: "PE: 0 J",
            textValue: `"PE: " + Math.round((150 - bob.position.coords[1]) * 0.1) + " J"`,
            transform: { position: { coords: [100, 210] as Vec2 } },
            font: { family: "JetBrains Mono", size: 16, weight: 500 },
            style: { fill: { type: "solid", color: "#ef4444" } }
        }),
        
        // Arc showing swing range
        shape("polyline", {
            id: "swingArc",
            points: Array.from({ length: 50 }, (_, i) => {
                const angle = (i - 25) * Math.PI / 50; // -π/2 to π/2
                const radius = 250;
                return [
                    640 + radius * Math.sin(angle),
                    150 + radius * Math.cos(angle)
                ];
            }),
            style: { 
                stroke: { 
                    color: "#475569", 
                    width: 1, 
                    dasharray: "3 3" 
                },
                opacity: 0.5
            }
        }),
        
        // Gravity vector
        group("gravityVector", {
            transform: { position: { coords: [1100, 300] as Vec2 } },
            children: [
                textNode({
                    id: "gravityLabel",
                    text: "Gravity",
                    transform: { position: { coords: [0, -30] as Vec2 } },
                    font: { family: "system-ui", size: 16, weight: 600 },
                    style: { fill: { type: "solid", color: "#e2e8f0" } }
                }),
                shape("polyline", {
                    id: "gravityArrow",
                    points: [[0, 0], [0, 60]],
                    style: { 
                        stroke: { color: "#dc2626", width: 3 },
                        opacity: 0.8
                    }
                }),
                shape("polyline", {
                    id: "gravityArrowHead",
                    points: [[-5, 50], [0, 60], [5, 50]],
                    style: { 
                        stroke: { color: "#dc2626", width: 3 },
                        opacity: 0.8
                    }
                }),
                textNode({
                    id: "gravityValue",
                    text: "g = 9.8 m/s²",
                    transform: { position: { coords: [0, 85] as Vec2 } },
                    font: { family: "JetBrains Mono", size: 14, weight: 500 },
                    style: { fill: { type: "solid", color: "#dc2626" } }
                })
            ]
        }),
        
        // Physics equations
        textNode({
            id: "equations",
            text: "T = 2π√(L/g)",
            transform: { position: { coords: [100, 500] as Vec2 } },
            font: { family: "system-ui", size: 18, weight: 600 },
            style: { fill: { type: "solid", color: "#e2e8f0" } }
        }),
        
        textNode({
            id: "periodFormula",
            text: "Period formula for small angles",
            transform: { position: { coords: [100, 530] as Vec2 } },
            font: { family: "system-ui", size: 14, weight: 400 },
            style: { fill: { type: "solid", color: "#94a3b8" } }
        }),
        
        // Energy conservation
        textNode({
            id: "energy",
            text: "Energy Conservation: PE + KE = constant",
            transform: { position: { coords: [100, 580] as Vec2 } },
            font: { family: "system-ui", size: 16, weight: 500 },
            style: { fill: { type: "solid", color: "#fbbf24" } }
        }),
        
        // Constraint warning
        textNode({
            id: "warning",
            text: "String tension too high!",
            textValue: `len([bob.position.coords[0] - 640, bob.position.coords[1] - 150]) > 250 ? "String tension too high!" : ""`,
            transform: { position: { coords: [640, 650] as Vec2 } },
            font: { family: "system-ui", size: 20, weight: 700 },
            style: { 
                fill: { type: "solid", color: "#ef4444" },
                opacity: "len([bob.position.coords[0] - 640, bob.position.coords[1] - 150]) > 250 ? 1 : 0"
            }
        })
    ]
});