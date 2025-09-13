import { scene, group, shape, textNode, poses, timeline, reactive } from "../../src/dsl/api.js";
import type { Vec2 } from "../../src/dsl/types.js";

// Linear transformation visualization inspired by 3Blue1Brown's Essence of Linear Algebra
// Shows how a 2x2 matrix transforms a grid and basis vectors

const basisPoses = poses({
    identity: { 
        "transform.position.coords": [0, 0],
        "transform.rotation.angle": 0,
        "transform.scale.value": [1, 1]
    },
    transformed: { 
        "transform.position.coords": [100, 50],
        "transform.rotation.angle": 30,
        "transform.scale.value": [1.5, 0.8]
    }
});

const gridPoses = poses({
    regular: { "style.opacity": 0.3 },
    highlighted: { "style.opacity": 0.8 }
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
            text: "Linear Transformation",
            transform: { position: { coords: [640, 50] as Vec2 } },
            font: { family: "system-ui", size: 32, weight: 700 },
            style: { fill: { type: "solid", color: "#f1f5f9" } }
        }),

        // Matrix display
        group("matrix", {
            transform: { position: { coords: [100, 100] as Vec2 } },
            children: [
                textNode({
                    id: "matrixLabel",
                    text: "Matrix:",
                    transform: { position: { coords: [0, 0] as Vec2 } },
                    font: { family: "system-ui", size: 24, weight: 600 },
                    style: { fill: { type: "solid", color: "#e2e8f0" } }
                }),
                // Matrix bracket
                shape("polyline", {
                    id: "leftBracket",
                    points: [[0, 20], [0, 40], [0, 80], [0, 100]],
                    style: { stroke: { color: "#cbd5e1", width: 3 } },
                    transform: { position: { coords: [60, 0] as Vec2 } }
                }),
                shape("polyline", {
                    id: "rightBracket", 
                    points: [[0, 20], [0, 40], [0, 80], [0, 100]],
                    style: { stroke: { color: "#cbd5e1", width: 3 } },
                    transform: { position: { coords: [150, 0] as Vec2 } }
                }),
                // Matrix elements
                textNode({
                    id: "m11",
                    text: "1.5",
                    textValue: `"1.5"`,
                    transform: { position: { coords: [85, 50] as Vec2 } },
                    font: { family: "JetBrains Mono", size: 20, weight: 600 },
                    style: { fill: { type: "solid", color: "#3b82f6" } }
                }),
                textNode({
                    id: "m12",
                    text: "0.5",
                    textValue: `"0.5"`,
                    transform: { position: { coords: [125, 50] as Vec2 } },
                    font: { family: "JetBrains Mono", size: 20, weight: 600 },
                    style: { fill: { type: "solid", color: "#ef4444" } }
                }),
                textNode({
                    id: "m21",
                    text: "0.5",
                    textValue: `"0.5"`,
                    transform: { position: { coords: [85, 80] as Vec2 } },
                    font: { family: "JetBrains Mono", size: 20, weight: 600 },
                    style: { fill: { type: "solid", color: "#3b82f6" } }
                }),
                textNode({
                    id: "m22",
                    text: "1.2",
                    textValue: `"1.2"`,
                    transform: { position: { coords: [125, 80] as Vec2 } },
                    font: { family: "JetBrains Mono", size: 20, weight: 600 },
                    style: { fill: { type: "solid", color: "#ef4444" } }
                })
            ]
        }),

        // Coordinate system center
        group("coordSystem", {
            transform: { position: { coords: [640, 360] as Vec2 } },
            children: [
                // Grid lines (horizontal)
                ...Array.from({ length: 21 }, (_, i) => 
                    shape("polyline", {
                        id: `gridH${i}`,
                        points: [[-300, (i - 10) * 30], [300, (i - 10) * 30]],
                        style: { 
                            stroke: { color: "#334155", width: 1 },
                            opacity: 0.3
                        }
                    })
                ),
                
                // Grid lines (vertical)
                ...Array.from({ length: 21 }, (_, i) => 
                    shape("polyline", {
                        id: `gridV${i}`,
                        points: [[(i - 10) * 30, -300], [(i - 10) * 30, 300]],
                        style: { 
                            stroke: { color: "#334155", width: 1 },
                            opacity: 0.3
                        }
                    })
                ),

                // Axes
                shape("polyline", {
                    id: "xAxis",
                    points: [[-300, 0], [300, 0]],
                    style: { stroke: { color: "#64748b", width: 2 } }
                }),
                shape("polyline", {
                    id: "yAxis",
                    points: [[0, -300], [0, 300]],
                    style: { stroke: { color: "#64748b", width: 2 } }
                }),

                // Basis vector i (blue)
                shape("polyline", {
                    id: "basisI",
                    points: [
                        [0, 0],
                        [`90 * (1.5 * cos(${Math.PI * 0.25}) + 0.5 * sin(${Math.PI * 0.25}))`, `90 * (0.5 * cos(${Math.PI * 0.25}) + 1.2 * sin(${Math.PI * 0.25}))`]
                    ],
                    style: { 
                        stroke: { color: "#3b82f6", width: 4 },
                        opacity: "0.7 + 0.3 * sin(t * 2)"
                    },
                    transform: {
                        position: { 
                            coords: [
                                `90 * mix(1, 1.5, smoothstep(2, 4, t))`,
                                `90 * mix(0, 0.5, smoothstep(2, 4, t))`
                            ]
                        }
                    }
                }),

                // Basis vector j (red)
                shape("polyline", {
                    id: "basisJ",
                    points: [
                        [0, 0],
                        [`-90 * (0.5 * cos(${Math.PI * 0.25}) + 1.2 * sin(${Math.PI * 0.25}))`, `90 * (1.5 * cos(${Math.PI * 0.25}) + 0.5 * sin(${Math.PI * 0.25}))`]
                    ],
                    style: { 
                        stroke: { color: "#ef4444", width: 4 },
                        opacity: "0.7 + 0.3 * sin(t * 2 + 1)"
                    },
                    transform: {
                        position: { 
                            coords: [
                                `90 * mix(0, 0.5, smoothstep(2, 4, t))`,
                                `90 * mix(1, 1.2, smoothstep(2, 4, t))`
                            ]
                        }
                    }
                }),

                // Arrow heads for basis vectors
                shape("polyline", {
                    id: "arrowI",
                    points: [[-5, -3], [0, 0], [-5, 3]],
                    style: { stroke: { color: "#3b82f6", width: 3 } },
                    transform: {
                        position: { 
                            coords: [
                                `90 * mix(1, 1.5, smoothstep(2, 4, t))`,
                                `90 * mix(0, 0.5, smoothstep(2, 4, t))`
                            ]
                        },
                        rotation: { angle: `mix(0, ${Math.atan2(0.5, 1.5) * 180 / Math.PI}, smoothstep(2, 4, t))` }
                    }
                }),

                shape("polyline", {
                    id: "arrowJ",
                    points: [[-5, -3], [0, 0], [-5, 3]],
                    style: { stroke: { color: "#ef4444", width: 3 } },
                    transform: {
                        position: { 
                            coords: [
                                `90 * mix(0, 0.5, smoothstep(2, 4, t))`,
                                `90 * mix(1, 1.2, smoothstep(2, 4, t))`
                            ]
                        },
                        rotation: { angle: `mix(90, ${Math.atan2(1.2, 0.5) * 180 / Math.PI}, smoothstep(2, 4, t))` }
                    }
                }),

                // Sample vector to transform
                shape("polyline", {
                    id: "sampleVector",
                    points: [
                        [0, 0],
                        [`60 * mix(2, 2 * 1.5 + 1 * 0.5, smoothstep(3, 5, t))`, `60 * mix(1, 2 * 0.5 + 1 * 1.2, smoothstep(3, 5, t))`]
                    ],
                    style: { 
                        stroke: { color: "#22c55e", width: 4 },
                        opacity: "t > 2.5 ? 1 : 0"
                    },
                    lifecycle: { start: 2.5 }
                }),

                // Arrow head for sample vector
                shape("polyline", {
                    id: "sampleArrow",
                    points: [[-5, -3], [0, 0], [-5, 3]],
                    style: { stroke: { color: "#22c55e", width: 3 } },
                    transform: {
                        position: { 
                            coords: [
                                `60 * mix(2, 2 * 1.5 + 1 * 0.5, smoothstep(3, 5, t))`,
                                `60 * mix(1, 2 * 0.5 + 1 * 1.2, smoothstep(3, 5, t))`
                            ]
                        },
                        rotation: { 
                            angle: `mix(${Math.atan2(1, 2) * 180 / Math.PI}, ${Math.atan2(2 * 0.5 + 1 * 1.2, 2 * 1.5 + 1 * 0.5) * 180 / Math.PI}, smoothstep(3, 5, t))`
                        }
                    },
                    lifecycle: { start: 2.5 }
                })
            ]
        }),

        // Labels for basis vectors
        textNode({
            id: "labelI",
            text: "î",
            transform: { 
                position: { 
                    coords: [
                        `640 + 90 * mix(1, 1.5, smoothstep(2, 4, t)) + 20`,
                        `360 + 90 * mix(0, 0.5, smoothstep(2, 4, t)) - 10`
                    ]
                }
            },
            font: { family: "system-ui", size: 24, weight: 700 },
            style: { fill: { type: "solid", color: "#3b82f6" } }
        }),

        textNode({
            id: "labelJ",
            text: "ĵ",
            transform: { 
                position: { 
                    coords: [
                        `640 + 90 * mix(0, 0.5, smoothstep(2, 4, t)) + 20`,
                        `360 + 90 * mix(1, 1.2, smoothstep(2, 4, t)) - 10`
                    ]
                }
            },
            font: { family: "system-ui", size: 24, weight: 700 },
            style: { fill: { type: "solid", color: "#ef4444" } }
        }),

        // Transformation explanation
        textNode({
            id: "explanation",
            text: "Watch how the matrix transforms the basis vectors",
            textValue: `t < 2 ? "Watch how the matrix transforms the basis vectors" : t < 4 ? "Basis vectors move to new positions" : "Any vector follows the same transformation"`,
            transform: { position: { coords: [640, 650] as Vec2 } },
            font: { family: "system-ui", size: 20, weight: 500 },
            style: { fill: { type: "solid", color: "#94a3b8" } }
        }),

        // Determinant display
        textNode({
            id: "determinant",
            text: "det = 1.8 - 0.25 = 1.55",
            textValue: `"det = " + (1.5 * 1.2 - 0.5 * 0.5).toFixed(2)`,
            transform: { position: { coords: [100, 200] as Vec2 } },
            font: { family: "JetBrains Mono", size: 18, weight: 600 },
            style: { 
                fill: { type: "solid", color: "#fbbf24" },
                opacity: "t > 5 ? 1 : 0"
            },
            lifecycle: { start: 5 }
        }),

        // Area scaling explanation
        textNode({
            id: "areaScaling",
            text: "Area scales by |det| = 1.55",
            transform: { position: { coords: [100, 240] as Vec2 } },
            font: { family: "system-ui", size: 16, weight: 500 },
            style: { 
                fill: { type: "solid", color: "#a3a3a3" },
                opacity: "t > 5.5 ? 1 : 0"
            },
            lifecycle: { start: 5.5 }
        })
    ]
});