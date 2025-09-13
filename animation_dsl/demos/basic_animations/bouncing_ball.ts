import { scene, group, shape, textNode, poses, timeline } from "../../src/dsl/api.js";
import type { Vec2 } from "../../src/dsl/types.js";

// Simple bouncing ball animation demonstrating basic physics and timing

const ballPoses = poses({
    start: { "transform.position.coords": [100, 500] },
    bounce: { "transform.scale.value": [1.2, 0.8] },
    end: { "transform.position.coords": [1100, 500] }
});

export default scene({
    render: {
        width: 1280,
        height: 720,
        fps: 60,
        duration: 5,
        background: "#0f172a"
    },
    children: [
        textNode({
            id: "title",
            text: "Bouncing Ball Demo",
            transform: { position: { coords: [640, 50] as Vec2 } },
            font: { family: "system-ui", size: 28, weight: 700 },
            style: { fill: { type: "solid", color: "#ffffff" } }
        }),
        
        // Ground
        shape("rect", {
            id: "ground",
            size: [1280, 20],
            transform: { position: { coords: [640, 710] as Vec2 } },
            style: { 
                fill: { type: "solid", color: "#1e293b" },
                stroke: { color: "#334155", width: 2 }
            }
        }),
        
        // Ball with physics-based motion
        shape("ellipse", {
            id: "ball",
            size: [60, 60],
            style: {
                fill: { 
                    type: "radial",
                    center: [0.3, 0.3],
                    radius: 0.8,
                    stops: [
                        { offset: 0, color: "#ff6b6b" },
                        { offset: 0.7, color: "#ee5a52" },
                        { offset: 1, color: "#dc2626" }
                    ]
                },
                stroke: { color: "#dc2626", width: 2 },
                shadows: [{
                    x: 3,
                    y: 6,
                    blur: 12,
                    spread: 0,
                    color: "rgba(0, 0, 0, 0.3)"
                }]
            },
            transform: {
                position: {
                    coords: [
                        "100 + t * 200", // Constant horizontal velocity
                        "600 - 300 * abs(sin(t * 3.14159))" // Bouncing motion
                    ]
                },
                rotation: { angle: "t * 360" } // Spinning
            }
        }),
        
        // Trajectory line that appears after a delay
        shape("polyline", {
            id: "trajectory",
            points: [
                [100, 500],
                [300, 300],
                [500, 500],
                [700, 300],
                [900, 500],
                [1100, 300]
            ],
            style: {
                stroke: { color: "#22c55e", width: 2, dasharray: "5 5" },
                opacity: 0.6
            },
            lifecycle: { start: 2, fadeIn: 0.5 }
        }),
        
        // Speed indicator
        textNode({
            id: "speed",
            text: "Speed: 200 px/s",
            transform: { position: { coords: [100, 100] as Vec2 } },
            font: { family: "JetBrains Mono", size: 16, weight: 500 },
            style: { fill: { type: "solid", color: "#94a3b8" } }
        }),
        
        // Gravity indicator
        textNode({
            id: "gravity",
            text: "Gravity: g = 9.8 m/s²",
            transform: { position: { coords: [100, 130] as Vec2 } },
            font: { family: "JetBrains Mono", size: 16, weight: 500 },
            style: { fill: { type: "solid", color: "#94a3b8" } }
        }),
        
        // Height indicator (dynamic)
        textNode({
            id: "height",
            text: "Height: 300px",
            textValue: `"Height: " + Math.round(300 * Math.abs(Math.sin(t * 3.14159))) + "px"`,
            transform: { position: { coords: [100, 160] as Vec2 } },
            font: { family: "JetBrains Mono", size: 16, weight: 500 },
            style: { fill: { type: "solid", color: "#fbbf24" } }
        }),
        
        // Shadow that scales with height
        shape("ellipse", {
            id: "shadow",
            size: [
                "60 + 40 * (1 - abs(sin(t * 3.14159)))", // Wider when ball is higher
                "20 + 10 * (1 - abs(sin(t * 3.14159)))"
            ],
            transform: { 
                position: { 
                    coords: [
                        "100 + t * 200", // Follow ball horizontally
                        690 // On the ground
                    ]
                }
            },
            style: { 
                fill: { type: "solid", color: "rgba(0, 0, 0, 0.2)" },
                opacity: "0.3 + 0.4 * (1 - abs(sin(t * 3.14159)))" // More opaque when ball is higher
            }
        }),
        
        // Bounce impact effect
        shape("ellipse", {
            id: "impact",
            size: [80, 20],
            transform: { 
                position: { 
                    coords: [
                        "100 + t * 200",
                        680
                    ]
                },
                scale: { 
                    value: "abs(sin(t * 3.14159)) < 0.1 ? 1.5 : 0" // Flash when ball hits ground
                }
            },
            style: { 
                fill: { type: "solid", color: "#fbbf24" },
                opacity: "abs(sin(t * 3.14159)) < 0.1 ? 0.6 : 0"
            }
        }),
        
        // Physics equations
        textNode({
            id: "equation",
            text: "y = h₀ - ½gt²",
            transform: { position: { coords: [1100, 100] as Vec2 } },
            font: { family: "system-ui", size: 20, weight: 600 },
            style: { fill: { type: "solid", color: "#e2e8f0" } },
            lifecycle: { start: 1, fadeIn: 0.5 }
        }),
        
        // Time display
        textNode({
            id: "time",
            text: "t = 0.0s",
            textValue: `"t = " + t.toFixed(1) + "s"`,
            transform: { position: { coords: [1100, 140] as Vec2 } },
            font: { family: "JetBrains Mono", size: 18, weight: 500 },
            style: { fill: { type: "solid", color: "#3b82f6" } }
        })
    ]
});