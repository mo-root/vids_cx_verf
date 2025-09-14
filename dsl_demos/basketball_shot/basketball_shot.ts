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
                transform: { pos: [640, 56] as Vec2 },
                font: { family: "system-ui", size: 30, weight: 800 },
                style: { fill: { type: "solid", color: "#e2e8f0" } }
            }),

            // Court floor
            shape("rect", {
                id: "floor",
                size: [1280, 10],
                style: { fill: { type: "solid", color: "#1e293b" } },
                transform: { pos: [640, 620] as Vec2 }
            }),

            // Hoop (backboard + rim)
            group("basket", {
                transform: { pos: [1080, 360] as Vec2 },
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
                        transform: { pos: [0, 0] as Vec2 }
                    }),
                    
                    // Rim
                    shape("ellipse", {
                        id: "rim",
                        size: [60, 12],
                        style: { 
                            fill: { type: "solid", color: "#dc2626" },
                            stroke: { color: "#991b1b", width: 2 }
                        },
                        transform: { pos: [30, 20] as Vec2 },
                        perform: timeline({
                            "0": { pose: "still" },
                            "3.8": { pose: "hit", dur: 0.1 },
                            "3.9": { pose: "settle", dur: 0.2 }
                        }, rimPoses)
                    }),

                    // Net
                    shape("polyline", {
                        id: "net",
                        points: [
                            [0, 26], [10, 40], [20, 38], [30, 42], 
                            [40, 38], [50, 40], [60, 26]
                        ],
                        style: { 
                            stroke: { color: "#f8fafc", width: 3, linecap: "round" },
                            opacity: 0.7
                        },
                        perform: timeline({
                            "0": { pose: "off" },
                            "3.8": { pose: "on", dur: 0.1 },
                            "4.0": { pose: "off", dur: 0.2 }
                        }, netFlashPoses)
                    })
                ]
            }),

            // Basketball
            shape("ellipse", {
                id: "ball",
                size: [32, 32],
                style: {
                    fill: { type: "solid", color: "#ea580c" },
                    stroke: { color: "#9a3412", width: 2 }
                },
                transform: {
                    position: {
                        coords: [
                            "180 + (1120 - 180) * (t / 4)",
                            "560 + (380 - 560) * (t / 4) - 240 * 4 * (t / 4) * (1 - (t / 4))"
                        ]
                    }
                },
                lifecycle: {
                    start: 0,
                    end: 4
                }
            }),

            // Trajectory path (shows briefly after shot)
            shape("polyline", {
                id: "trajectory",
                points: arcPoints,
                style: {
                    stroke: { 
                        color: "#22d3ee", 
                        width: 2, 
                        dasharray: "5 5",
                        opacity: 0.6
                    }
                },
                lifecycle: {
                    start: 4.2,
                    end: 5,
                    fadeIn: 0.2
                }
            }),

            // Player silhouette
            group("player", {
                transform: { pos: [120, 520] as Vec2 },
                children: [
                    // Body
                    shape("ellipse", {
                        id: "body",
                        size: [40, 80],
                        style: { fill: { type: "solid", color: "#1e293b" } },
                        transform: { pos: [0, 0] as Vec2 }
                    }),
                    
                    // Head
                    shape("ellipse", {
                        id: "head",
                        size: [24, 24],
                        style: { fill: { type: "solid", color: "#1e293b" } },
                        transform: { pos: [0, -50] as Vec2 }
                    }),

                    // Shooting arm
                    shape("polyline", {
                        id: "arm",
                        points: [[0, -20], [25, -40], [45, -60]],
                        style: { 
                            stroke: { color: "#1e293b", width: 8, linecap: "round" }
                        },
                        transform: {
                            rotation: {
                                angle: "t < 0.5 ? 0 : -30",
                                origin: [0, -20] as Vec2
                            }
                        }
                    })
                ]
            }),

            // Shot arc indicator (appears before ball is shot)
            shape("polyline", {
                id: "shotArc",
                points: [
                    [180, 560], [400, 400], [600, 320], [800, 300], [1000, 350], [1120, 380]
                ],
                style: {
                    stroke: { 
                        color: "#fbbf24", 
                        width: 2, 
                        dasharray: "10 5",
                        opacity: 0.4
                    }
                },
                lifecycle: {
                    start: 0,
                    end: 0.8,
                    fadeOut: 0.3
                }
            })
        ]
    })
});