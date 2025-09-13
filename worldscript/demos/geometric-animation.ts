import { scene, group, shape, textNode } from "../src/dsl/api.js";

// Geometric Animation Demo - Shows rotating shapes and color transitions
export default scene({
    render: {
        width: 1280,
        height: 720,
        fps: 60,
        duration: 10,
        background: "#1a1a2e"
    },
    children: [
        // Title
        textNode({
            id: "title",
            text: "Geometric Animation Showcase",
            transform: { position: { coords: [640, 60] } },
            font: { family: "system-ui", size: 32, weight: 700 },
            style: { 
                fill: { 
                    type: "gradient",
                    angle: 45,
                    stops: [
                        { offset: 0, color: "#ff6b6b" },
                        { offset: 1, color: "#4ecdc4" }
                    ]
                }
            }
        }),

        // Central rotating group
        group("centerGroup", {
            transform: { 
                position: { coords: [640, 360] },
                rotation: { angle: "t * 30" } // Rotate 30 degrees per second
            },
            children: [
                // Inner circle
                shape("ellipse", {
                    id: "innerCircle",
                    size: [100, 100],
                    style: {
                        fill: { 
                            type: "radial",
                            center: [0.3, 0.3],
                            radius: 0.8,
                            stops: [
                                { offset: 0, color: "#ff9a9e" },
                                { offset: 1, color: "#fad0c4" }
                            ]
                        },
                        stroke: { color: "#ff6b6b", width: 3 }
                    }
                }),

                // Orbiting squares
                ...Array.from({ length: 4 }, (_, i) => 
                    shape("rect", {
                        id: `square${i}`,
                        size: [30, 30],
                        transform: {
                            position: {
                                coords: [
                                    `${150 * Math.cos(i * Math.PI / 2)}`,
                                    `${150 * Math.sin(i * Math.PI / 2)}`
                                ]
                            },
                            rotation: { angle: `t * 90 + ${i * 90}` }
                        },
                        style: {
                            fill: { 
                                type: "solid", 
                                color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f9ca24'][i]
                            },
                            stroke: { color: "#ffffff", width: 2 },
                            radius: 5
                        }
                    })
                )
            ]
        }),

        // Corner triangles
        ...Array.from({ length: 4 }, (_, i) => {
            const corners = [
                [200, 200],   // Top-left
                [1080, 200],  // Top-right
                [1080, 520],  // Bottom-right
                [200, 520]    // Bottom-left
            ];
            
            return shape("polyline", {
                id: `triangle${i}`,
                points: [
                    [corners[i][0], corners[i][1]],
                    [corners[i][0] + 50, corners[i][1] + 30],
                    [corners[i][0] - 30, corners[i][1] + 50],
                    [corners[i][0], corners[i][1]] // Close the triangle
                ],
                transform: {
                    rotation: { 
                        angle: `t * 45 + ${i * 90}`,
                        origin: corners[i] as [number, number]
                    }
                },
                style: {
                    fill: { 
                        type: "solid", 
                        color: `hsl(${i * 90 + 180}, 70%, 60%)` 
                    },
                    stroke: { color: "#ffffff", width: 2 }
                }
            });
        }),

        // Pulsing background elements
        ...Array.from({ length: 6 }, (_, i) => 
            shape("ellipse", {
                id: `bgElement${i}`,
                size: [
                    `20 + 10 * sin(t * 2 + ${i})`,
                    `20 + 10 * sin(t * 2 + ${i})`
                ],
                transform: {
                    position: {
                        coords: [
                            100 + (i % 3) * 400,
                            150 + Math.floor(i / 3) * 300
                        ]
                    }
                },
                style: {
                    fill: { 
                        type: "solid", 
                        color: `hsla(${i * 60}, 50%, 70%, 0.3)`
                    }
                }
            })
        ),

        // Moving wave line
        shape("polyline", {
            id: "wave",
            points: Array.from({ length: 50 }, (_, i) => [
                i * 25.6, // 1280 / 50 = 25.6
                `600 + 50 * sin(${i * 0.3} + t * 3)`
            ]),
            style: {
                stroke: { 
                    color: "#4ecdc4", 
                    width: 4,
                    linecap: "round"
                }
            }
        }),

        // Status display
        group("statusDisplay", {
            transform: { position: { coords: [50, 100] } },
            children: [
                shape("rect", {
                    id: "statusBg",
                    size: [200, 80],
                    style: {
                        fill: { type: "solid", color: "rgba(0, 0, 0, 0.5)" },
                        stroke: { color: "#4ecdc4", width: 1 },
                        radius: 8
                    }
                }),

                textNode({
                    id: "timeDisplay",
                    text: "Time: 0.0s",
                    transform: { position: { coords: [10, 20] } },
                    font: { family: "monospace", size: 14 },
                    style: { fill: { type: "solid", color: "#ffffff" } }
                }),

                textNode({
                    id: "rotationDisplay",
                    text: "Rotation: 0°",
                    transform: { position: { coords: [10, 40] } },
                    font: { family: "monospace", size: 14 },
                    style: { fill: { type: "solid", color: "#4ecdc4" } }
                }),

                textNode({
                    id: "elementsDisplay",
                    text: "Elements: 20+",
                    transform: { position: { coords: [10, 60] } },
                    font: { family: "monospace", size: 14 },
                    style: { fill: { type: "solid", color: "#ff6b6b" } }
                })
            ]
        }),

        // Instructions
        textNode({
            id: "instruction",
            text: "Pure mathematical beauty: shapes rotating and pulsing in harmony",
            transform: { position: { coords: [640, 680] } },
            font: { family: "system-ui", size: 16, style: "italic" },
            style: { fill: { type: "solid", color: "#9ca3af" } }
        })
    ]
});