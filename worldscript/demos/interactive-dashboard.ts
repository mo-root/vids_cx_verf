import { scene, group, shape, textNode, poses, reactive, slider, driver } from "../src/dsl/api.js";

// Interactive Dashboard Demo - Shows sliders, reactive animations, and user interaction
const highlightPoses = poses({
    normal: { "style.fill.color": "#3b82f6", "transform.scale.value": [1, 1] },
    highlighted: { "style.fill.color": "#ef4444", "transform.scale.value": [1.1, 1.1] },
    pressed: { "style.fill.color": "#7c3aed", "transform.scale.value": [0.95, 0.95] }
});

const speedSlider = slider({
    id: "speed",
    min: 0,
    max: 100,
    value: 50,
    label: "Animation Speed"
});

const sizeSlider = slider({
    id: "size", 
    min: 20,
    max: 100,
    value: 40,
    label: "Element Size"
});

const colorDriver = driver({
    start: 0,
    dur: 5,
    ease: "linear",
    loop: true
});

export default scene({
    render: {
        width: 1280,
        height: 720,
        fps: 60,
        duration: 15,
        background: "#111827"
    },
    children: [
        // Header
        textNode({
            id: "header",
            text: "Interactive Animation Dashboard",
            transform: { position: { coords: [640, 60] } },
            font: { family: "system-ui", size: 36, weight: 700 },
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

        // Control Panel
        group("controlPanel", {
            transform: { position: { coords: [100, 150] } },
            children: [
                // Panel background
                shape("rect", {
                    id: "controlBg",
                    size: [300, 400],
                    style: {
                        fill: { type: "solid", color: "rgba(31, 41, 55, 0.8)" },
                        stroke: { color: "#4b5563", width: 2 },
                        radius: 12
                    }
                }),

                // Panel title
                textNode({
                    id: "controlTitle",
                    text: "Controls",
                    transform: { position: { coords: [150, 30] } },
                    font: { family: "system-ui", size: 24, weight: 600 },
                    style: { fill: { type: "solid", color: "#f9fafb" } }
                }),

                // Speed control
                group("speedControl", {
                    transform: { position: { coords: [20, 80] } },
                    children: [
                        textNode({
                            id: "speedLabel",
                            text: "Speed",
                            transform: { position: { coords: [0, 0] } },
                            font: { family: "system-ui", size: 16 },
                            style: { fill: { type: "solid", color: "#d1d5db" } }
                        }),
                        shape("rect", {
                            id: "speedTrack",
                            size: [200, 8],
                            transform: { position: { coords: [0, 25] } },
                            style: {
                                fill: { type: "solid", color: "#374151" },
                                radius: 4
                            }
                        }),
                        shape("ellipse", {
                            id: "speedHandle",
                            size: [20, 20],
                            transform: { 
                                position: { 
                                    coords: [`${speedSlider} * 2`, 25]
                                }
                            },
                            style: {
                                fill: { type: "solid", color: "#3b82f6" },
                                stroke: { color: "#1e40af", width: 2 }
                            },
                            interaction: {
                                draggable: {
                                    axis: "x",
                                    bounds: [0, 200],
                                    boundsMode: "center"
                                }
                            }
                        })
                    ]
                }),

                // Size control
                group("sizeControl", {
                    transform: { position: { coords: [20, 150] } },
                    children: [
                        textNode({
                            id: "sizeLabel",
                            text: "Size",
                            transform: { position: { coords: [0, 0] } },
                            font: { family: "system-ui", size: 16 },
                            style: { fill: { type: "solid", color: "#d1d5db" } }
                        }),
                        shape("rect", {
                            id: "sizeTrack",
                            size: [200, 8],
                            transform: { position: { coords: [0, 25] } },
                            style: {
                                fill: { type: "solid", color: "#374151" },
                                radius: 4
                            }
                        }),
                        shape("ellipse", {
                            id: "sizeHandle",
                            size: [20, 20],
                            transform: { 
                                position: { 
                                    coords: [`(${sizeSlider} - 20) * 200 / 80`, 25]
                                }
                            },
                            style: {
                                fill: { type: "solid", color: "#10b981" },
                                stroke: { color: "#047857", width: 2 }
                            },
                            interaction: {
                                draggable: {
                                    axis: "x",
                                    bounds: [0, 200],
                                    boundsMode: "center"
                                }
                            }
                        })
                    ]
                }),

                // Value displays
                textNode({
                    id: "speedValue",
                    text: "Speed: ",
                    textValue: `"Speed: " + ${speedSlider} + "%"`,
                    transform: { position: { coords: [20, 220] } },
                    font: { family: "monospace", size: 14 },
                    style: { fill: { type: "solid", color: "#9ca3af" } }
                }),

                textNode({
                    id: "sizeValue",
                    text: "Size: ",
                    textValue: `"Size: " + ${sizeSlider} + "px"`,
                    transform: { position: { coords: [20, 240] } },
                    font: { family: "monospace", size: 14 },
                    style: { fill: { type: "solid", color: "#9ca3af" } }
                })
            ]
        }),

        // Animated Elements Display
        group("animationDisplay", {
            transform: { position: { coords: [500, 200] } },
            children: [
                // Display background
                shape("rect", {
                    id: "displayBg",
                    size: [650, 450],
                    style: {
                        fill: { type: "solid", color: "rgba(17, 24, 39, 0.5)" },
                        stroke: { color: "#374151", width: 2 },
                        radius: 12
                    }
                }),

                // Orbiting elements
                ...Array.from({ length: 6 }, (_, i) => 
                    shape("ellipse", {
                        id: `orbitElement${i}`,
                        size: [`${sizeSlider}`, `${sizeSlider}`],
                        transform: {
                            position: {
                                coords: [
                                    `325 + 150 * cos(t * ${speedSlider} / 50 + ${i * Math.PI / 3})`,
                                    `225 + 150 * sin(t * ${speedSlider} / 50 + ${i * Math.PI / 3})`
                                ]
                            },
                            rotation: { 
                                angle: `t * ${speedSlider} * 2 + ${i * 60}` 
                            }
                        },
                        style: {
                            fill: { 
                                type: "solid", 
                                color: `hsl(${i * 60 + 60}, 70%, 60%)` 
                            },
                            stroke: { color: "#ffffff", width: 2 },
                            shadows: [
                                {
                                    x: 2,
                                    y: 4,
                                    blur: 8,
                                    spread: 0,
                                    color: "rgba(0, 0, 0, 0.3)"
                                }
                            ]
                        },
                        perform: reactive({
                            pose: {
                                when: `len([${i * 60 + 325} - mouse.x, ${i * 60 + 225} - mouse.y]) < 50`,
                                use: "highlighted",
                                else: "normal",
                                transition: { dur: 0.2 }
                            }
                        }, highlightPoses)
                    })
                ),

                // Center element
                shape("ellipse", {
                    id: "centerElement",
                    size: [`${sizeSlider} * 1.5`, `${sizeSlider} * 1.5`],
                    transform: {
                        position: { coords: [325, 225] },
                        rotation: { angle: `t * ${speedSlider} * -1` }
                    },
                    style: {
                        fill: { 
                            type: "radial",
                            center: [0.3, 0.3],
                            radius: 0.8,
                            stops: [
                                { offset: 0, color: "#fbbf24" },
                                { offset: 1, color: "#f59e0b" }
                            ]
                        },
                        stroke: { color: "#d97706", width: 3 }
                    },
                    interaction: {
                        draggable: {
                            bounds: [50, 600, 50, 400],
                            boundsMode: "center"
                        }
                    }
                }),

                // Connection lines
                ...Array.from({ length: 6 }, (_, i) => 
                    shape("polyline", {
                        id: `connection${i}`,
                        points: [
                            [325, 225], // Center
                            [
                                `325 + 150 * cos(t * ${speedSlider} / 50 + ${i * Math.PI / 3})`,
                                `225 + 150 * sin(t * ${speedSlider} / 50 + ${i * Math.PI / 3})`
                            ]
                        ],
                        style: {
                            stroke: { 
                                color: `hsla(${i * 60 + 120}, 70%, 60%, 0.3)`, 
                                width: 2,
                                dasharray: "3 3"
                            }
                        }
                    })
                )
            ]
        }),

        // Status display
        group("statusDisplay", {
            transform: { position: { coords: [500, 670] } },
            children: [
                textNode({
                    id: "mousePos",
                    text: "Mouse: ",
                    textValue: `"Mouse: (" + Math.round(mouse.x) + ", " + Math.round(mouse.y) + ")"`,
                    transform: { position: { coords: [0, 0] } },
                    font: { family: "monospace", size: 14 },
                    style: { fill: { type: "solid", color: "#6b7280" } }
                }),

                textNode({
                    id: "elementCount",
                    text: "Elements: 6 orbiting + 1 center",
                    transform: { position: { coords: [300, 0] } },
                    font: { family: "monospace", size: 14 },
                    style: { fill: { type: "solid", color: "#6b7280" } }
                })
            ]
        }),

        // Instructions
        textNode({
            id: "instructions",
            text: "Drag the sliders to control animation speed and element size. Hover over elements to highlight them!",
            transform: { position: { coords: [640, 100] } },
            font: { family: "system-ui", size: 16, style: "italic" },
            style: { fill: { type: "solid", color: "#9ca3af" } }
        })
    ]
});