import { scene, group, shape, textNode, poses, timeline, reactive, sequence } from "../src/dsl/api.js";

// Bouncing Ball Demo - Shows various animation techniques
const ballPoses = poses({
    start: { "transform.position.coords": [100, 500] },
    bounce: { "transform.scale.value": [1.2, 0.8] },
    peak: { "transform.position.coords": [640, 200] },
    end: { "transform.position.coords": [1100, 500] },
    normal: { "transform.scale.value": [1, 1] }
});

const trailPoses = poses({
    hidden: { "style.opacity": 0 },
    visible: { "style.opacity": 0.3 }
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
            text: "Bouncing Ball Physics Demo",
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

        // Ball trajectory guides (parabolic paths)
        shape("polyline", {
            id: "trajectory1",
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

        // Main bouncing ball
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
            },
            perform: sequence([
                { pose: "start", hold: 0.5 },
                { pose: "peak", dur: 1.5, ease: "easeOut" },
                { pose: "bounce", dur: 0.1 },
                { pose: "normal", dur: 0.1 },
                { pose: "end", dur: 1.5, ease: "easeIn" }
            ], ballPoses)
        }),

        // Ball shadow
        shape("ellipse", {
            id: "shadow",
            size: ["ball.size[0] * 0.8", "ball.size[1] * 0.3"],
            transform: {
                position: { 
                    coords: [
                        "ball.transform.position.coords[0]", 
                        "620"
                    ]
                }
            },
            style: {
                fill: { type: "solid", color: "rgba(0, 0, 0, 0.2)" }
            }
        }),

        // Trail effects
        ...Array.from({ length: 10 }, (_, i) => 
            shape("ellipse", {
                id: `trail${i}`,
                size: [40 - i * 3, 40 - i * 3],
                transform: {
                    position: {
                        coords: [
                            `ball.transform.position.coords[0] - ${i * 15}`,
                            `ball.transform.position.coords[1] + ${i * 5}`
                        ]
                    }
                },
                style: {
                    fill: { type: "solid", color: `rgba(255, 107, 107, ${0.3 - i * 0.03})` }
                },
                lifecycle: {
                    start: 1,
                    end: 7
                }
            })
        ),

        // Physics info panel
        group("infoPanel", {
            transform: { position: { coords: [50, 150] } },
            children: [
                // Background
                shape("rect", {
                    id: "panelBg",
                    size: [280, 150],
                    style: {
                        fill: { type: "solid", color: "rgba(0, 0, 0, 0.7)" },
                        stroke: { color: "#374151", width: 1 },
                        radius: 8
                    }
                }),

                // Position display
                textNode({
                    id: "positionText",
                    text: "Position: ",
                    textValue: `"Position: " + Math.round(ball.transform.position.coords[0]) + ", " + Math.round(ball.transform.position.coords[1])`,
                    transform: { position: { coords: [10, 20] } },
                    font: { family: "monospace", size: 14 },
                    style: { fill: { type: "solid", color: "#e5e7eb" } }
                }),

                // Velocity simulation
                textNode({
                    id: "velocityText", 
                    text: "Velocity: ",
                    textValue: `"Velocity: " + Math.round(Math.abs(Math.sin(t * 2)) * 100) + " px/s"`,
                    transform: { position: { coords: [10, 40] } },
                    font: { family: "monospace", size: 14 },
                    style: { fill: { type: "solid", color: "#e5e7eb" } }
                }),

                // Time display
                textNode({
                    id: "timeText",
                    text: "Time: ",
                    textValue: `"Time: " + Math.round(t * 100) / 100 + "s"`,
                    transform: { position: { coords: [10, 60] } },
                    font: { family: "monospace", size: 14 },
                    style: { fill: { type: "solid", color: "#e5e7eb" } }
                }),

                // Phase indicator
                textNode({
                    id: "phaseText",
                    text: "Phase: ",
                    textValue: `t < 0.5 ? "Ready" : t < 2 ? "Rising" : t < 4 ? "Peak" : t < 5.5 ? "Falling" : "Landing"`,
                    transform: { position: { coords: [10, 80] } },
                    font: { family: "monospace", size: 14 },
                    style: { 
                        fill: { 
                            type: "solid", 
                            color: "t < 0.5 ? '#fbbf24' : t < 2 ? '#34d399' : t < 4 ? '#60a5fa' : t < 5.5 ? '#f87171' : '#a78bfa'" 
                        }
                    }
                })
            ]
        }),

        // Interactive elements indicator
        textNode({
            id: "instruction",
            text: "Watch the ball follow a realistic physics trajectory!",
            transform: { position: { coords: [640, 680] } },
            font: { family: "system-ui", size: 16, style: "italic" },
            style: { fill: { type: "solid", color: "#9ca3af" } }
        }),

        // Decorative elements
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
                    start: 2,
                    fadeIn: 0.5
                }
            })
        )
    ]
});