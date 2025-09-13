import { programLite, scene, group, shape, textNode, poses, timeline } from "../src/dsl/api.js";
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
const ballPoses = poses({
    start: { "transform.position.coords": [180, 560] },
    arc: { "transform.position.coords": [650, 240] }, // Peak of arc
    basket: { "transform.position.coords": [1120, 380] }
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
export default programLite({
    init: () => ({}),
    tick: (_s, _dt, _p, _n) => { },
    scene: (_s, _p) => scene({
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
                text: "Basketball Shot Animation",
                transform: { position: { coords: [640, 50] } },
                font: { family: "system-ui", size: 32, weight: 700 },
                style: { fill: { type: "solid", color: "#ffffff" } }
            }),
            // Basketball court floor
            shape("rect", {
                id: "floor",
                size: [1280, 200],
                transform: { position: { coords: [0, 520] } },
                style: {
                    fill: { type: "solid", color: "#8B4513" },
                    stroke: { color: "#654321", width: 2 }
                }
            }),
            // Trajectory path (parabolic arc)
            shape("polyline", {
                id: "trajectory",
                points: arcPoints,
                style: {
                    stroke: { color: "#ffaa00", width: 2, dasharray: "5 5", opacity: 0.6 }
                },
                lifecycle: {
                    start: 1,
                    end: 5,
                    fadeIn: 0.3
                }
            }),
            // Basketball
            shape("ellipse", {
                id: "ball",
                size: [40, 40],
                transform: {
                    position: {
                        coords: [
                            `${x0} + ${(x1 - x0)} * smoothstep(1, 4, t)`,
                            `${y0} + ${(y1 - y0)} * smoothstep(1, 4, t) - ${h} * 4 * smoothstep(1, 4, t) * (1 - smoothstep(1, 4, t))`
                        ]
                    }
                },
                style: {
                    fill: { type: "solid", color: "#ff6600" },
                    stroke: { color: "#cc5500", width: 3 }
                },
                lifecycle: {
                    start: 1,
                    end: 5
                }
            }),
            // Basketball hoop pole
            shape("rect", {
                id: "pole",
                size: [20, 200],
                transform: { position: { coords: [1050, 380] } },
                style: {
                    fill: { type: "solid", color: "#888888" }
                }
            }),
            // Basketball rim
            group("rim", {
                transform: { position: { coords: [1120, 380] } },
                children: [
                    shape("ellipse", {
                        id: "rimOuter",
                        size: [100, 20],
                        style: {
                            fill: { type: "solid", color: "#ff4444" },
                            stroke: { color: "#cc3333", width: 2 }
                        }
                    }),
                    shape("ellipse", {
                        id: "rimInner",
                        size: [80, 16],
                        style: {
                            fill: { type: "solid", color: "transparent" },
                            stroke: { color: "#aa2222", width: 1 }
                        }
                    })
                ],
                perform: timeline({
                    "0": { pose: "still" },
                    "4": { pose: "hit", dur: 0.1 },
                    "4.2": { pose: "settle", dur: 0.3 }
                }, rimPoses)
            }),
            // Basketball net
            group("net", {
                transform: { position: { coords: [1120, 400] } },
                children: [
                    // Net strings
                    ...Array.from({ length: 8 }, (_, i) => shape("polyline", {
                        id: `netString${i}`,
                        points: [
                            [i * 10 - 35, 0],
                            [i * 8 - 28, 30],
                            [i * 6 - 21, 50]
                        ],
                        style: {
                            stroke: { color: "#ffffff", width: 2 }
                        }
                    }))
                ],
                perform: timeline({
                    "0": { pose: "off" },
                    "4": { pose: "on", dur: 0.1 },
                    "4.5": { pose: "off", dur: 0.3 }
                }, netFlashPoses)
            }),
            // Backboard
            shape("rect", {
                id: "backboard",
                size: [150, 100],
                transform: { position: { coords: [1200, 330] } },
                style: {
                    fill: { type: "solid", color: "#ffffff" },
                    stroke: { color: "#cccccc", width: 3 }
                }
            }),
            // Timer/Score display
            textNode({
                id: "timer",
                text: "Time: ",
                textValue: `"Time: " + Math.floor(t * 10) / 10 + "s"`,
                transform: { position: { coords: [100, 100] } },
                font: { family: "monospace", size: 24, weight: 600 },
                style: { fill: { type: "solid", color: "#00ff00" } }
            }),
            // Shot status
            textNode({
                id: "status",
                text: "Status: ",
                textValue: `t < 1 ? "Get Ready..." : t < 4 ? "Shooting..." : "SCORE!"`,
                transform: { position: { coords: [100, 130] } },
                font: { family: "system-ui", size: 20, weight: 500 },
                style: {
                    fill: {
                        type: "solid",
                        color: "t < 1 ? '#ffff00' : t < 4 ? '#ff6600' : '#00ff00'"
                    }
                }
            })
        ]
    })
});
//# sourceMappingURL=basketball-shot.js.map