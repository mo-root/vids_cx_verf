import { programLite, scene, group, shape, textNode, poses, timeline } from "../../src/dsl/api.js";
import type { Vec2, NodesSnapshot } from "../../src/dsl/types.js";

// Basketball shot following a parabolic arc into the basket.
// Uses expression-driven position for the ball and pose-driven accents for the rim/net.

// Poses
const rimPoses = poses({
    still: { "transform.scale": [1, 1] },
    hit: { "transform.scale": [1.08, 0.92] },
    settle: { "transform.scale": [1, 1] }
});

const netFlashPoses = poses({ 
    off: { "style.opacity": 0 }, 
    on: { "style.opacity": 0.8 } 
});

// Sample a static parabola as a polyline for a trailing trajectory
const x0 = 180, y0 = 560, x1 = 1120, y1 = 380, h = 240;
const N = 40;
const arcPoints = Array.from({ length: N }, (_, i) => {
    const s = i / (N - 1);
    return [
        `${x0} + ${(x1 - x0)} * ${s}`,
        `${y0} + ${(y1 - y0)} * ${s} - ${h} * 4 * ${s} * (1 - ${s})`
    ];
});

export default programLite<{}, {}>({
    init: () => ({}),
    tick: (_s: {}, _dt: number, _p: {}, _n: NodesSnapshot) => { },
    scene: (_s: {}, _p: {}) => scene({
        render: {
            width: 1280,
            height: 720,
            fps: 60,
            duration: 5,
            background: "#0b1220"
        },
        children: [
            // Title
            textNode({
                id: "title",
                text: "Basketball Shot",
                transform: { position: { coords: [640, 56] as Vec2 } },
                font: { family: "system-ui", size: 30, weight: 800 },
                style: { fill: { type: "solid", color: "#e2e8f0" } }
            }),

            // Court floor
            shape("rect", {
                id: "floor",
                size: [1280, 10],
                style: { fill: { type: "solid", color: "#1e293b" } },
                transform: { position: { coords: [640, 620] as Vec2 } }
            }),

            // Hoop (backboard + rim)
            group("basket", {
                transform: { position: { coords: [1080, 360] as Vec2 } },
                children: [
                    // Backboard
                    shape("rect", {
                        id: "backboard",
                        size: [14, 160],
                        style: { 
                            fill: { type: "solid", color: "#cbd5e1" }, 
                            stroke: { color: "#94a3b8", width: 2 }, 
                            radius: 4 
                        },
                        transform: { position: { coords: [0, 0] as Vec2 } }
                    }),

                    // Rim
                    shape("ellipse", {
                        id: "rim",
                        size: [60, 8],
                        style: { 
                            fill: { type: "solid", color: "#f97316" },
                            stroke: { color: "#ea580c", width: 2 }
                        },
                        transform: { position: { coords: [30, 50] as Vec2 } },
                        perform: timeline({
                            "0": { pose: "still" },
                            "2.8": { pose: "hit", dur: 0.1 },
                            "2.9": { pose: "settle", dur: 0.2 }
                        }, rimPoses)
                    }),

                    // Net strands
                    ...Array.from({ length: 8 }, (_, i) => 
                        shape("polyline", {
                            id: `net${i}`,
                            points: [
                                [30 + (i - 3.5) * 6, 54],
                                [30 + (i - 3.5) * 4, 84],
                                [30 + (i - 3.5) * 2, 94]
                            ],
                            style: { 
                                stroke: { color: "#f3f4f6", width: 2 },
                                opacity: "0.7 + 0.3 * sin(t * 6 + " + i + ")"
                            }
                        })
                    ),

                    // Net flash effect
                    shape("ellipse", {
                        id: "netFlash",
                        size: [80, 20],
                        style: { 
                            fill: { type: "solid", color: "#fbbf24" },
                            opacity: 0
                        },
                        transform: { position: { coords: [30, 70] as Vec2 } },
                        perform: timeline({
                            "0": { pose: "off" },
                            "2.85": { pose: "on", dur: 0.05 },
                            "2.95": { pose: "off", dur: 0.1 }
                        }, netFlashPoses)
                    })
                ]
            }),

            // Ball with parabolic motion
            shape("ellipse", {
                id: "ball",
                size: [24, 24],
                style: { 
                    fill: { type: "solid", color: "#f97316" },
                    stroke: { color: "#ea580c", width: 2 }
                },
                transform: {
                    position: { 
                        coords: [
                            `${x0} + ${x1 - x0} * smoothstep(0.5, 3, t)`,
                            `${y0} + ${y1 - y0} * smoothstep(0.5, 3, t) - ${h} * 4 * smoothstep(0.5, 3, t) * (1 - smoothstep(0.5, 3, t))`
                        ]
                    },
                    rotation: { angle: "t * 720" } // Ball spinning
                },
                lifecycle: { start: 0.5, end: 3.5 }
            }),

            // Trajectory arc (appears after shot)
            shape("polyline", {
                id: "trajectory",
                points: arcPoints,
                style: { 
                    stroke: { color: "#22c55e", width: 3, dasharray: "8 4" },
                    opacity: 0.6
                },
                lifecycle: { start: 3.2, fadeIn: 0.5 }
            }),

            // Player silhouette
            group("player", {
                transform: { position: { coords: [150, 500] as Vec2 } },
                children: [
                    // Body
                    shape("rect", {
                        id: "playerBody",
                        size: [40, 80],
                        style: { fill: { type: "solid", color: "#1f2937" } },
                        transform: { position: { coords: [0, 0] as Vec2 } }
                    }),
                    // Head
                    shape("ellipse", {
                        id: "playerHead",
                        size: [30, 30],
                        style: { fill: { type: "solid", color: "#374151" } },
                        transform: { position: { coords: [0, -55] as Vec2 } }
                    }),
                    // Shooting arm
                    shape("rect", {
                        id: "playerArm",
                        size: [8, 50],
                        style: { fill: { type: "solid", color: "#4b5563" } },
                        transform: { 
                            position: { coords: [25, -20] as Vec2 },
                            rotation: { 
                                angle: "mix(-30, 45, smoothstep(0, 1, t))",
                                origin: [0, 25]
                            }
                        }
                    })
                ]
            }),

            // Score display
            textNode({
                id: "score",
                text: "SWISH!",
                textValue: `t > 3 ? "SWISH!" : ""`,
                transform: { position: { coords: [640, 150] as Vec2 } },
                font: { family: "system-ui", size: 48, weight: 900 },
                style: { 
                    fill: { type: "solid", color: "#22c55e" },
                    opacity: "t > 3 ? 1 : 0"
                },
                lifecycle: { start: 3 }
            }),

            // Distance indicator
            textNode({
                id: "distance",
                text: "22 feet",
                transform: { position: { coords: [650, 580] as Vec2 } },
                font: { family: "system-ui", size: 18, weight: 600 },
                style: { fill: { type: "solid", color: "#94a3b8" } }
            }),

            // Arc distance line
            shape("polyline", {
                id: "distanceLine",
                points: [
                    [180, 590],
                    [1080, 590]
                ],
                style: { 
                    stroke: { color: "#6b7280", width: 2, dasharray: "5 5" },
                    opacity: 0.7
                }
            })
        ]
    })
});