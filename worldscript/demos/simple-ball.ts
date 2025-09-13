import { scene, group, shape, textNode, poses, timeline } from "../src/dsl/api.js";

// Simple Bouncing Ball Demo
const ballPoses = poses({
    start: { "transform.position.coords": [100, 500] },
    peak: { "transform.position.coords": [640, 200] },
    end: { "transform.position.coords": [1100, 500] },
    normal: { "transform.scale.value": [1, 1] },
    bounce: { "transform.scale.value": [1.2, 0.8] }
});

export default scene({
    render: {
        width: 1280,
        height: 720,
        fps: 60,
        duration: 8,
        background: "#0f172a"
    },
    children: [
        // Title
        textNode({
            id: "title",
            text: "Simple Bouncing Ball Demo",
            transform: { position: { coords: [640, 50] } },
            font: { family: "system-ui", size: 28, weight: 700 },
            style: { fill: { type: "solid", color: "#ffffff" } }
        }),

        // Ground
        shape("rect", {
            id: "ground",
            size: [1280, 50],
            transform: { position: { coords: [0, 670] } },
            style: {
                fill: { type: "solid", color: "#22c55e" },
                stroke: { color: "#16a34a", width: 2 }
            }
        }),

        // Ball trajectory guide
        shape("polyline", {
            id: "trajectory",
            points: [
                [100, 500],
                [320, 300],
                [640, 200],
                [960, 300],
                [1100, 500]
            ],
            style: {
                stroke: { color: "#64748b", width: 2, dasharray: "5 5", opacity: 0.4 }
            }
        }),

        // Main bouncing ball with simple linear interpolation
        shape("ellipse", {
            id: "ball",
            size: [60, 60],
            transform: {
                position: {
                    coords: [
                        "100 + t * 125", // Linear movement from x=100 to x=1100 over 8 seconds
                        "500 + (t < 4 ? -150 * t + 150 * (t - 2) * (t - 2) / 4 : 150 * (t - 4) - 150 * (t - 6) * (t - 6) / 4)" // Parabolic motion
                    ]
                }
            },
            style: {
                fill: { 
                    type: "radial",
                    center: [0.3, 0.3],
                    radius: 0.8,
                    stops: [
                        { offset: 0, color: "#ff6b6b" },
                        { offset: 1, color: "#dc2626" }
                    ]
                },
                stroke: { color: "#b91c1c", width: 2 },
                shadows: [
                    {
                        x: 4,
                        y: 6,
                        blur: 12,
                        spread: 0,
                        color: "rgba(0, 0, 0, 0.3)"
                    }
                ]
            }
        }),

        // Ball shadow
        shape("ellipse", {
            id: "shadow",
            size: [48, 18],
            transform: {
                position: { 
                    coords: [
                        "100 + t * 125", // Follow ball's X position
                        "620" // Fixed at ground level
                    ]
                }
            },
            style: {
                fill: { type: "solid", color: "rgba(0, 0, 0, 0.2)" }
            }
        }),

        // Physics info panel
        group("infoPanel", {
            transform: { position: { coords: [50, 150] } },
            children: [
                // Background
                shape("rect", {
                    id: "panelBg",
                    size: [280, 120],
                    style: {
                        fill: { type: "solid", color: "rgba(0, 0, 0, 0.7)" },
                        stroke: { color: "#374151", width: 1 },
                        radius: 8
                    }
                }),

                // Time display
                textNode({
                    id: "timeText",
                    text: "Time: 0.0s",
                    transform: { position: { coords: [10, 25] } },
                    font: { family: "monospace", size: 14 },
                    style: { fill: { type: "solid", color: "#e5e7eb" } }
                }),

                // Phase indicator
                textNode({
                    id: "phaseText",
                    text: "Phase: Starting",
                    transform: { position: { coords: [10, 45] } },
                    font: { family: "monospace", size: 14 },
                    style: { 
                        fill: { 
                            type: "solid", 
                            color: "#fbbf24"
                        }
                    }
                }),

                // Ball position
                textNode({
                    id: "posText",
                    text: "Position: (100, 500)",
                    transform: { position: { coords: [10, 65] } },
                    font: { family: "monospace", size: 14 },
                    style: { fill: { type: "solid", color: "#34d399" } }
                })
            ]
        }),

        // Decorative stars
        ...Array.from({ length: 5 }, (_, i) => 
            shape("ellipse", {
                id: `star${i}`,
                size: [8, 8],
                transform: {
                    position: { 
                        coords: [
                            200 + i * 200,
                            `100 + 20 * sin(t * 2 + ${i})`
                        ]
                    },
                    rotation: { angle: `t * 45 + ${i * 72}` }
                },
                style: {
                    fill: { type: "solid", color: "#fbbf24" }
                },
                lifecycle: {
                    start: 1,
                    fadeIn: 0.5
                }
            })
        ),

        // Instructions
        textNode({
            id: "instruction",
            text: "Watch the ball follow a physics trajectory with realistic motion!",
            transform: { position: { coords: [640, 680] } },
            font: { family: "system-ui", size: 16, style: "italic" },
            style: { fill: { type: "solid", color: "#9ca3af" } }
        })
    ]
});