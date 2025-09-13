import { scene, group, textNode, shape } from "../src/dsl/api.js";
import type { Vec2 } from "../src/dsl/types.js";

// Demo index showcasing all available animations

export default scene({
    render: {
        width: 1280,
        height: 720,
        fps: 60,
        duration: 15,
        background: "#0f172a"
    },
    children: [
        // Main title
        textNode({
            id: "mainTitle",
            text: "Animation DSL Demo Gallery",
            transform: { position: { coords: [640, 80] as Vec2 } },
            font: { family: "system-ui", size: 36, weight: 800 },
            style: { 
                fill: { 
                    type: "gradient",
                    angle: 45,
                    stops: [
                        { offset: 0, color: "#3b82f6" },
                        { offset: 1, color: "#8b5cf6" }
                    ]
                }
            }
        }),

        textNode({
            id: "subtitle",
            text: "Mathematical and Educational Animations Inspired by 3Blue1Brown",
            transform: { position: { coords: [640, 120] as Vec2 } },
            font: { family: "system-ui", size: 18, weight: 500 },
            style: { fill: { type: "solid", color: "#94a3b8" } }
        }),

        // Demo thumbnails grid
        group("demoGrid", {
            transform: { position: { coords: [640, 400] as Vec2 } },
            children: [
                // Basketball Demo
                group("basketballDemo", {
                    transform: { position: { coords: [-400, -120] as Vec2 } },
                    children: [
                        shape("rect", {
                            id: "basketballThumbnail",
                            size: [280, 160],
                            style: {
                                fill: { type: "solid", color: "#1e293b" },
                                stroke: { color: "#3b82f6", width: 2 },
                                radius: 8
                            }
                        }),
                        // Mini basketball
                        shape("ellipse", {
                            id: "miniBall",
                            size: [20, 20],
                            style: { fill: { type: "solid", color: "#f97316" } },
                            transform: {
                                position: {
                                    coords: [
                                        "-100 + 200 * smoothstep(0, 3, t)",
                                        "-40 + 60 * sin(smoothstep(0, 3, t) * 3.14159)"
                                    ]
                                }
                            }
                        }),
                        // Mini hoop
                        shape("ellipse", {
                            id: "miniHoop",
                            size: [30, 5],
                            style: { fill: { type: "solid", color: "#f97316" } },
                            transform: { position: { coords: [80, -20] as Vec2 } }
                        }),
                        textNode({
                            id: "basketballTitle",
                            text: "Basketball Shot",
                            transform: { position: { coords: [0, 100] as Vec2 } },
                            font: { family: "system-ui", size: 18, weight: 600 },
                            style: { fill: { type: "solid", color: "#f1f5f9" } }
                        }),
                        textNode({
                            id: "basketballDesc",
                            text: "Parabolic trajectory physics",
                            transform: { position: { coords: [0, 125] as Vec2 } },
                            font: { family: "system-ui", size: 14, weight: 400 },
                            style: { fill: { type: "solid", color: "#94a3b8" } }
                        })
                    ]
                }),

                // Linear Transformation Demo
                group("linearDemo", {
                    transform: { position: { coords: [0, -120] as Vec2 } },
                    children: [
                        shape("rect", {
                            id: "linearThumbnail",
                            size: [280, 160],
                            style: {
                                fill: { type: "solid", color: "#1e293b" },
                                stroke: { color: "#22c55e", width: 2 },
                                radius: 8
                            }
                        }),
                        // Mini grid lines
                        ...Array.from({ length: 5 }, (_, i) => 
                            shape("polyline", {
                                id: `miniGridH${i}`,
                                points: [[-100, (i - 2) * 20], [100, (i - 2) * 20]],
                                style: { 
                                    stroke: { color: "#475569", width: 1 },
                                    opacity: 0.5
                                }
                            })
                        ),
                        ...Array.from({ length: 5 }, (_, i) => 
                            shape("polyline", {
                                id: `miniGridV${i}`,
                                points: [[(i - 2) * 40, -60], [(i - 2) * 40, 60]],
                                style: { 
                                    stroke: { color: "#475569", width: 1 },
                                    opacity: 0.5
                                }
                            })
                        ),
                        // Basis vectors
                        shape("polyline", {
                            id: "miniI",
                            points: [[0, 0], [`40 * (1 + 0.5 * sin(t))`, `20 * sin(t)`]],
                            style: { stroke: { color: "#3b82f6", width: 2 } }
                        }),
                        shape("polyline", {
                            id: "miniJ",
                            points: [[0, 0], [`20 * sin(t)`, `40 * (1 + 0.3 * cos(t))`]],
                            style: { stroke: { color: "#ef4444", width: 2 } }
                        }),
                        textNode({
                            id: "linearTitle",
                            text: "Linear Transformation",
                            transform: { position: { coords: [0, 100] as Vec2 } },
                            font: { family: "system-ui", size: 18, weight: 600 },
                            style: { fill: { type: "solid", color: "#f1f5f9" } }
                        }),
                        textNode({
                            id: "linearDesc",
                            text: "Matrix transformations",
                            transform: { position: { coords: [0, 125] as Vec2 } },
                            font: { family: "system-ui", size: 14, weight: 400 },
                            style: { fill: { type: "solid", color: "#94a3b8" } }
                        })
                    ]
                }),

                // Fourier Series Demo
                group("fourierDemo", {
                    transform: { position: { coords: [400, -120] as Vec2 } },
                    children: [
                        shape("rect", {
                            id: "fourierThumbnail",
                            size: [280, 160],
                            style: {
                                fill: { type: "solid", color: "#1e293b" },
                                stroke: { color: "#fbbf24", width: 2 },
                                radius: 8
                            }
                        }),
                        // Mini wave
                        shape("polyline", {
                            id: "miniWave",
                            points: Array.from({ length: 50 }, (_, i) => {
                                const x = (i - 25) * 4;
                                return [x, `20 * sin(${x / 20} + t * 3) + 10 * sin(3 * ${x / 20} + t * 3) / 3`];
                            }),
                            style: { stroke: { color: "#fbbf24", width: 2 } }
                        }),
                        // Square wave outline
                        shape("polyline", {
                            id: "miniSquare",
                            points: [[-80, -30], [-40, -30], [-40, 30], [0, 30], [0, -30], [40, -30], [40, 30], [80, 30]],
                            style: { 
                                stroke: { color: "#64748b", width: 1, dasharray: "3 3" },
                                opacity: 0.6
                            }
                        }),
                        textNode({
                            id: "fourierTitle",
                            text: "Fourier Series",
                            transform: { position: { coords: [0, 100] as Vec2 } },
                            font: { family: "system-ui", size: 18, weight: 600 },
                            style: { fill: { type: "solid", color: "#f1f5f9" } }
                        }),
                        textNode({
                            id: "fourierDesc",
                            text: "Wave decomposition",
                            transform: { position: { coords: [0, 125] as Vec2 } },
                            font: { family: "system-ui", size: 14, weight: 400 },
                            style: { fill: { type: "solid", color: "#94a3b8" } }
                        })
                    ]
                }),

                // Interactive Pendulum Demo
                group("pendulumDemo", {
                    transform: { position: { coords: [-200, 120] as Vec2 } },
                    children: [
                        shape("rect", {
                            id: "pendulumThumbnail",
                            size: [280, 160],
                            style: {
                                fill: { type: "solid", color: "#1e293b" },
                                stroke: { color: "#8b5cf6", width: 2 },
                                radius: 8
                            }
                        }),
                        // Mini pendulum
                        shape("polyline", {
                            id: "miniPendulumRod",
                            points: [[0, -60], [`60 * sin(t * 1.5)`, `60 * cos(t * 1.5) - 60`]],
                            style: { stroke: { color: "#64748b", width: 2 } }
                        }),
                        shape("ellipse", {
                            id: "miniPendulumBob",
                            size: [16, 16],
                            style: { fill: { type: "solid", color: "#fbbf24" } },
                            transform: {
                                position: {
                                    coords: [`60 * sin(t * 1.5)`, `60 * cos(t * 1.5) - 60`]
                                }
                            }
                        }),
                        textNode({
                            id: "pendulumTitle",
                            text: "Interactive Pendulum",
                            transform: { position: { coords: [0, 100] as Vec2 } },
                            font: { family: "system-ui", size: 18, weight: 600 },
                            style: { fill: { type: "solid", color: "#f1f5f9" } }
                        }),
                        textNode({
                            id: "pendulumDesc",
                            text: "Draggable physics simulation",
                            transform: { position: { coords: [0, 125] as Vec2 } },
                            font: { family: "system-ui", size: 14, weight: 400 },
                            style: { fill: { type: "solid", color: "#94a3b8" } }
                        })
                    ]
                }),

                // Bouncing Ball Demo
                group("ballDemo", {
                    transform: { position: { coords: [200, 120] as Vec2 } },
                    children: [
                        shape("rect", {
                            id: "ballThumbnail",
                            size: [280, 160],
                            style: {
                                fill: { type: "solid", color: "#1e293b" },
                                stroke: { color: "#ef4444", width: 2 },
                                radius: 8
                            }
                        }),
                        // Mini bouncing ball
                        shape("ellipse", {
                            id: "miniBounceBall",
                            size: [20, 20],
                            style: { fill: { type: "solid", color: "#ef4444" } },
                            transform: {
                                position: {
                                    coords: [
                                        "-60 + t * 40",
                                        `-20 + 40 * abs(sin(t * 4))`
                                    ]
                                }
                            }
                        }),
                        // Ground line
                        shape("polyline", {
                            id: "miniGround",
                            points: [[-100, 60], [100, 60]],
                            style: { stroke: { color: "#475569", width: 2 } }
                        }),
                        textNode({
                            id: "ballTitle",
                            text: "Bouncing Ball",
                            transform: { position: { coords: [0, 100] as Vec2 } },
                            font: { family: "system-ui", size: 18, weight: 600 },
                            style: { fill: { type: "solid", color: "#f1f5f9" } }
                        }),
                        textNode({
                            id: "ballDesc",
                            text: "Physics and timing",
                            transform: { position: { coords: [0, 125] as Vec2 } },
                            font: { family: "system-ui", size: 14, weight: 400 },
                            style: { fill: { type: "solid", color: "#94a3b8" } }
                        })
                    ]
                })
            ]
        }),

        // Features list
        textNode({
            id: "features",
            text: "Features: Expression-driven animations • Pose-based timeline • Interactive elements • Mathematical visualizations",
            transform: { position: { coords: [640, 650] as Vec2 } },
            font: { family: "system-ui", size: 16, weight: 500 },
            style: { fill: { type: "solid", color: "#64748b" } }
        }),

        // GitHub link
        textNode({
            id: "github",
            text: "View source code and documentation at github.com/mo-root/vids_cx_verf/animation_dsl",
            transform: { position: { coords: [640, 680] as Vec2 } },
            font: { family: "JetBrains Mono", size: 14, weight: 400 },
            style: { fill: { type: "solid", color: "#3b82f6" } }
        })
    ]
});