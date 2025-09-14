// Demo Index - Showcase of all available animations
import { scene, group, textNode, shape } from "./src/dsl/api.js";
import type { Vec2 } from "./src/dsl/types.js";

export default scene({
    render: {
        width: 1280,
        height: 720,
        fps: 60,
        duration: 8,
        background: "#0f172a"
    },
    children: [
        // Main title
        textNode({
            id: "mainTitle",
            text: "WorldScript Animation DSL",
            transform: { pos: [640, 100] as Vec2 },
            font: { family: "system-ui", size: 42, weight: 800 },
            style: { 
                fill: { 
                    type: "gradient",
                    angle: 45,
                    stops: [
                        { offset: 0, color: "#3b82f6" },
                        { offset: 0.5, color: "#8b5cf6" },
                        { offset: 1, color: "#ec4899" }
                    ]
                }
            },
            lifecycle: {
                start: 0.5,
                fadeIn: 1
            }
        }),

        // Subtitle
        textNode({
            id: "subtitle",
            text: "Recreating 3Blue1Brown-style animations with TypeScript",
            transform: { pos: [640, 150] as Vec2 },
            font: { family: "system-ui", size: 18, weight: 400 },
            style: { fill: { type: "solid", color: "#94a3b8" } },
            lifecycle: {
                start: 1.5,
                fadeIn: 0.8
            }
        }),

        // Demo cards
        group("demoCards", {
            transform: { pos: [640, 400] as Vec2 },
            lifecycle: {
                start: 2.5,
                fadeIn: 1
            },
            children: [
                // Basketball Shot Demo
                group("basketballCard", {
                    transform: { pos: [-400, -100] as Vec2 },
                    children: [
                        shape("rect", {
                            id: "basketballCardBg",
                            size: [180, 120],
                            style: {
                                fill: { type: "solid", color: "#1e293b" },
                                stroke: { color: "#3b82f6", width: 2 },
                                radius: 8
                            }
                        }),
                        
                        textNode({
                            id: "basketballTitle",
                            text: "Basketball Shot",
                            transform: { pos: [0, -30] as Vec2 },
                            font: { family: "system-ui", size: 14, weight: 700 },
                            style: { fill: { type: "solid", color: "#e2e8f0" } }
                        }),
                        
                        textNode({
                            id: "basketballDesc",
                            text: "Parabolic trajectory\nPhysics simulation",
                            transform: { pos: [0, 10] as Vec2 },
                            font: { family: "system-ui", size: 11, weight: 400 },
                            style: { fill: { type: "solid", color: "#94a3b8" } }
                        }),

                        // Mini basketball
                        shape("ellipse", {
                            id: "miniBall",
                            size: [12, 12],
                            style: { fill: { type: "solid", color: "#ea580c" } },
                            transform: { 
                                pos: [0, 35] as Vec2,
                                position: {
                                    coords: [
                                        "sin(t * 3) * 30",
                                        "35 + cos(t * 3) * 10"
                                    ]
                                }
                            }
                        })
                    ]
                }),

                // Name Flow Demo
                group("nameFlowCard", {
                    transform: { pos: [-130, -100] as Vec2 },
                    children: [
                        shape("rect", {
                            id: "nameFlowCardBg",
                            size: [180, 120],
                            style: {
                                fill: { type: "solid", color: "#1e293b" },
                                stroke: { color: "#22c55e", width: 2 },
                                radius: 8
                            }
                        }),
                        
                        textNode({
                            id: "nameFlowTitle",
                            text: "Name Flow",
                            transform: { pos: [0, -30] as Vec2 },
                            font: { family: "system-ui", size: 14, weight: 700 },
                            style: { fill: { type: "solid", color: "#e2e8f0" } }
                        }),
                        
                        textNode({
                            id: "nameFlowDesc",
                            text: "Vector field animation\nText stroke flow",
                            transform: { pos: [0, 10] as Vec2 },
                            font: { family: "system-ui", size: 11, weight: 400 },
                            style: { fill: { type: "solid", color: "#94a3b8" } }
                        }),

                        // Flowing particles
                        shape("ellipse", {
                            id: "particle1",
                            size: [4, 4],
                            style: { fill: { type: "solid", color: "#22c55e" } },
                            transform: {
                                position: {
                                    coords: [
                                        "cos(t * 2) * 40",
                                        "35 + sin(t * 2.5) * 15"
                                    ]
                                }
                            }
                        }),

                        shape("ellipse", {
                            id: "particle2",
                            size: [4, 4],
                            style: { fill: { type: "solid", color: "#22c55e" } },
                            transform: {
                                position: {
                                    coords: [
                                        "cos(t * 1.8 + 1) * 35",
                                        "35 + sin(t * 2.2 + 1) * 20"
                                    ]
                                }
                            }
                        })
                    ]
                }),

                // Grid Flip Demo
                group("gridFlipCard", {
                    transform: { pos: [140, -100] as Vec2 },
                    children: [
                        shape("rect", {
                            id: "gridFlipCardBg",
                            size: [180, 120],
                            style: {
                                fill: { type: "solid", color: "#1e293b" },
                                stroke: { color: "#f59e0b", width: 2 },
                                radius: 8
                            }
                        }),
                        
                        textNode({
                            id: "gridFlipTitle",
                            text: "Grid Animation",
                            transform: { pos: [0, -30] as Vec2 },
                            font: { family: "system-ui", size: 14, weight: 700 },
                            style: { fill: { type: "solid", color: "#e2e8f0" } }
                        }),
                        
                        textNode({
                            id: "gridFlipDesc",
                            text: "Pattern highlighting\nSequential flipping",
                            transform: { pos: [0, 10] as Vec2 },
                            font: { family: "system-ui", size: 11, weight: 400 },
                            style: { fill: { type: "solid", color: "#94a3b8" } }
                        }),

                        // Mini grid
                        ...Array.from({ length: 9 }, (_, i) => 
                            shape("rect", {
                                id: `miniGrid_${i}`,
                                size: [8, 8],
                                style: { 
                                    fill: { 
                                        type: "solid", 
                                        color: `${Math.floor(t + i) % 2 === 0 ? '#3b82f6' : '#6b7280'}`
                                    }
                                },
                                transform: { 
                                    pos: [
                                        ((i % 3) - 1) * 15, 
                                        35 + (Math.floor(i / 3) - 1) * 12
                                    ] as Vec2 
                                }
                            })
                        )
                    ]
                }),

                // Linear Transformation Demo
                group("linearCard", {
                    transform: { pos: [410, -100] as Vec2 },
                    children: [
                        shape("rect", {
                            id: "linearCardBg",
                            size: [180, 120],
                            style: {
                                fill: { type: "solid", color: "#1e293b" },
                                stroke: { color: "#8b5cf6", width: 2 },
                                radius: 8
                            }
                        }),
                        
                        textNode({
                            id: "linearTitle",
                            text: "Linear Transform",
                            transform: { pos: [0, -30] as Vec2 },
                            font: { family: "system-ui", size: 14, weight: 700 },
                            style: { fill: { type: "solid", color: "#e2e8f0" } }
                        }),
                        
                        textNode({
                            id: "linearDesc",
                            text: "Mathematical concepts\nVector transformations",
                            transform: { pos: [0, 10] as Vec2 },
                            font: { family: "system-ui", size: 11, weight: 400 },
                            style: { fill: { type: "solid", color: "#94a3b8" } }
                        }),

                        // Function notation
                        textNode({
                            id: "functionNotation",
                            text: "f(x) → L(v⃗)",
                            transform: { pos: [0, 40] as Vec2 },
                            font: { family: "system-ui", size: 12, weight: 600 },
                            style: { fill: { type: "solid", color: "#8b5cf6" } }
                        })
                    ]
                }),

                // Sphere Projection Demo
                group("sphereCard", {
                    transform: { pos: [140, 100] as Vec2 },
                    children: [
                        shape("rect", {
                            id: "sphereCardBg",
                            size: [180, 120],
                            style: {
                                fill: { type: "solid", color: "#1e293b" },
                                stroke: { color: "#ec4899", width: 2 },
                                radius: 8
                            }
                        }),
                        
                        textNode({
                            id: "sphereTitle",
                            text: "Sphere Projection",
                            transform: { pos: [0, -30] as Vec2 },
                            font: { family: "system-ui", size: 14, weight: 700 },
                            style: { fill: { type: "solid", color: "#e2e8f0" } }
                        }),
                        
                        textNode({
                            id: "sphereDesc",
                            text: "Surface area proof\nGeometric visualization",
                            transform: { pos: [0, 10] as Vec2 },
                            font: { family: "system-ui", size: 11, weight: 400 },
                            style: { fill: { type: "solid", color: "#94a3b8" } }
                        }),

                        // Mini sphere
                        shape("ellipse", {
                            id: "miniSphere",
                            size: [20, 20],
                            style: { 
                                fill: { type: "solid", color: "#ec4899", opacity: 0.6 },
                                stroke: { color: "#ec4899", width: 1 }
                            },
                            transform: { pos: [0, 40] as Vec2 }
                        })
                    ]
                })
            ]
        }),

        // Call to action
        textNode({
            id: "callToAction",
            text: "Explore the dsl_demos/ directory to see the source code!",
            transform: { pos: [640, 600] as Vec2 },
            font: { family: "system-ui", size: 16, weight: 600 },
            style: { 
                fill: { type: "solid", color: "#22d3ee" },
                opacity: "0.5 + 0.5 * sin(t * 2)"
            },
            lifecycle: {
                start: 5,
                fadeIn: 1
            }
        }),

        // Background decoration
        ...Array.from({ length: 20 }, (_, i) => 
            shape("ellipse", {
                id: `bgDot_${i}`,
                size: [3, 3],
                style: { 
                    fill: { type: "solid", color: "#1e293b" },
                    opacity: 0.3
                },
                transform: {
                    position: {
                        coords: [
                            `${100 + (i % 5) * 280} + sin(t + ${i}) * 20`,
                            `${200 + Math.floor(i / 5) * 120} + cos(t * 1.2 + ${i}) * 15`
                        ]
                    }
                }
            })
        )
    ]
});