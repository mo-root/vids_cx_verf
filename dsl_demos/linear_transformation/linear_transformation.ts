import { scene, group, shape, textNode, poses, timeline, reactive } from "../../src/dsl/api.js";
import type { Vec2 } from "../../src/dsl/types.js";

// Linear Transformation Demo - Recreating the function vs linear transformation explanation
// Shows the concept progression from f(x) to L(v) with vector inputs and outputs

// Text and element poses
const titlePoses = poses({
    initial: { "style.opacity": 1 },
    faded: { "style.opacity": 0.3 }
});

const functionPoses = poses({
    hidden: { "style.opacity": 0, "transform.scale.value": [0.8, 0.8] },
    visible: { "style.opacity": 1, "transform.scale.value": [1, 1] },
    transformed: { "style.opacity": 1, "transform.scale.value": [1, 1] }
});

const numberPoses = poses({
    input: { "style.fill.color": "#3b82f6" },
    output: { "style.fill.color": "#ef4444" },
    hidden: { "style.opacity": 0 },
    visible: { "style.opacity": 1 }
});

const vectorPoses = poses({
    hidden: { "style.opacity": 0, "transform.position.coords": [400, 400] },
    input: { "style.opacity": 1, "transform.position.coords": [300, 400] },
    output: { "style.opacity": 1, "transform.position.coords": [500, 400] }
});

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
        group("titleGroup", {
            transform: { pos: [640, 100] as Vec2 },
            children: [
                textNode({
                    id: "linearText",
                    text: "Linear",
                    transform: { pos: [-60, 0] as Vec2 },
                    font: { family: "system-ui", size: 36, weight: 800 },
                    style: { fill: { type: "solid", color: "#e2e8f0" } },
                    perform: timeline({
                        "0": { pose: "initial" },
                        "5": { pose: "faded", dur: 0.5 }
                    }, titlePoses)
                }),
                
                textNode({
                    id: "transformationText",
                    text: "Transformation",
                    transform: { pos: [80, 0] as Vec2 },
                    font: { family: "system-ui", size: 36, weight: 800 },
                    style: { fill: { type: "solid", color: "#e2e8f0" } }
                }),
                
                // Function label under transformation
                textNode({
                    id: "functionLabel",
                    text: "function",
                    transform: { pos: [80, 50] as Vec2 },
                    font: { family: "system-ui", size: 18, weight: 400 },
                    style: { fill: { type: "solid", color: "#fbbf24" } },
                    lifecycle: {
                        start: 1,
                        fadeIn: 0.5
                    }
                }),
                
                // Brace under transformation
                shape("polyline", {
                    id: "brace",
                    points: [
                        [20, 30], [25, 35], [135, 35], [140, 30]
                    ],
                    style: {
                        stroke: { color: "#fbbf24", width: 2, linecap: "round" }
                    },
                    lifecycle: {
                        start: 1,
                        fadeIn: 0.5
                    }
                })
            ]
        }),

        // Scalar function demonstration
        group("scalarFunction", {
            transform: { pos: [640, 300] as Vec2 },
            lifecycle: {
                start: 0,
                end: 8,
                fadeOut: 1
            },
            children: [
                // f(x) notation
                textNode({
                    id: "fofx",
                    text: "f(x)",
                    transform: { pos: [0, 0] as Vec2 },
                    font: { family: "system-ui", size: 24, weight: 600 },
                    style: { fill: { type: "solid", color: "#e2e8f0" } },
                    perform: timeline({
                        "0.5": { pose: "visible", dur: 0.5 }
                    }, functionPoses)
                }),

                // Input numbers
                group("inputs", {
                    transform: { pos: [-150, 0] as Vec2 },
                    children: [
                        textNode({
                            id: "input1",
                            text: "5",
                            transform: { pos: [0, -40] as Vec2 },
                            font: { family: "system-ui", size: 20, weight: 600 },
                            style: { fill: { type: "solid", color: "#3b82f6" } },
                            perform: timeline({
                                "1": { pose: "visible", dur: 0.3 }
                            }, numberPoses)
                        }),
                        textNode({
                            id: "input2",
                            text: "2",
                            transform: { pos: [0, 0] as Vec2 },
                            font: { family: "system-ui", size: 20, weight: 600 },
                            style: { fill: { type: "solid", color: "#3b82f6" } },
                            perform: timeline({
                                "1.3": { pose: "visible", dur: 0.3 }
                            }, numberPoses)
                        }),
                        textNode({
                            id: "input3",
                            text: "-3",
                            transform: { pos: [0, 40] as Vec2 },
                            font: { family: "system-ui", size: 20, weight: 600 },
                            style: { fill: { type: "solid", color: "#3b82f6" } },
                            perform: timeline({
                                "1.6": { pose: "visible", dur: 0.3 }
                            }, numberPoses)
                        })
                    ]
                }),

                // Output numbers (squared)
                group("outputs", {
                    transform: { pos: [150, 0] as Vec2 },
                    children: [
                        textNode({
                            id: "output1",
                            text: "25",
                            transform: { pos: [0, -40] as Vec2 },
                            font: { family: "system-ui", size: 20, weight: 600 },
                            style: { 
                                fill: { type: "solid", color: "#ef4444" },
                                opacity: 0
                            },
                            perform: timeline({
                                "3": { pose: "visible", dur: 0.5 }
                            }, numberPoses)
                        }),
                        textNode({
                            id: "output2",
                            text: "4",
                            transform: { pos: [0, 0] as Vec2 },
                            font: { family: "system-ui", size: 20, weight: 600 },
                            style: { 
                                fill: { type: "solid", color: "#ef4444" },
                                opacity: 0
                            },
                            perform: timeline({
                                "3.3": { pose: "visible", dur: 0.5 }
                            }, numberPoses)
                        }),
                        textNode({
                            id: "output3",
                            text: "9",
                            transform: { pos: [0, 40] as Vec2 },
                            font: { family: "system-ui", size: 20, weight: 600 },
                            style: { 
                                fill: { type: "solid", color: "#ef4444" },
                                opacity: 0
                            },
                            perform: timeline({
                                "3.6": { pose: "visible", dur: 0.5 }
                            }, numberPoses)
                        })
                    ]
                }),

                // Arrows
                shape("polyline", {
                    id: "arrow1",
                    points: [[-80, 0], [-50, 0]],
                    style: {
                        stroke: { color: "#94a3b8", width: 2, linecap: "round" }
                    },
                    lifecycle: {
                        start: 2,
                        fadeIn: 0.3
                    }
                }),
                
                shape("polyline", {
                    id: "arrow2",
                    points: [[50, 0], [80, 0]],
                    style: {
                        stroke: { color: "#94a3b8", width: 2, linecap: "round" }
                    },
                    lifecycle: {
                        start: 2.8,
                        fadeIn: 0.3
                    }
                })
            ]
        }),

        // Vector function demonstration
        group("vectorFunction", {
            transform: { pos: [640, 380] as Vec2 },
            lifecycle: {
                start: 7,
                fadeIn: 1
            },
            children: [
                // L(v) notation
                textNode({
                    id: "Lofv",
                    text: "L(v⃗)",
                    transform: { pos: [0, 0] as Vec2 },
                    font: { family: "system-ui", size: 24, weight: 600 },
                    style: { fill: { type: "solid", color: "#e2e8f0" } }
                }),

                // Input vector
                group("inputVector", {
                    transform: { pos: [-150, 0] as Vec2 },
                    children: [
                        // Vector bracket
                        shape("polyline", {
                            id: "inputBracket",
                            points: [[-20, -25], [-15, -25], [-15, 25], [-20, 25]],
                            style: {
                                stroke: { color: "#22c55e", width: 2, linecap: "round" }
                            }
                        }),
                        
                        textNode({
                            id: "inputVector1",
                            text: "5",
                            transform: { pos: [0, -10] as Vec2 },
                            font: { family: "system-ui", size: 18, weight: 600 },
                            style: { fill: { type: "solid", color: "#22c55e" } }
                        }),
                        
                        textNode({
                            id: "inputVector2",
                            text: "7",
                            transform: { pos: [0, 10] as Vec2 },
                            font: { family: "system-ui", size: 18, weight: 600 },
                            style: { fill: { type: "solid", color: "#22c55e" } }
                        }),
                        
                        shape("polyline", {
                            id: "inputBracketRight",
                            points: [[20, -25], [15, -25], [15, 25], [20, 25]],
                            style: {
                                stroke: { color: "#22c55e", width: 2, linecap: "round" }
                            }
                        })
                    ]
                }),

                // Output vector
                group("outputVector", {
                    transform: { pos: [150, 0] as Vec2 },
                    lifecycle: {
                        start: 11,
                        fadeIn: 0.8
                    },
                    children: [
                        // Vector bracket
                        shape("polyline", {
                            id: "outputBracket",
                            points: [[-20, -25], [-15, -25], [-15, 25], [-20, 25]],
                            style: {
                                stroke: { color: "#a855f7", width: 2, linecap: "round" }
                            }
                        }),
                        
                        textNode({
                            id: "outputVector1",
                            text: "2",
                            transform: { pos: [0, -10] as Vec2 },
                            font: { family: "system-ui", size: 18, weight: 600 },
                            style: { fill: { type: "solid", color: "#a855f7" } }
                        }),
                        
                        textNode({
                            id: "outputVector2",
                            text: "-3",
                            transform: { pos: [0, 10] as Vec2 },
                            font: { family: "system-ui", size: 18, weight: 600 },
                            style: { fill: { type: "solid", color: "#a855f7" } }
                        }),
                        
                        shape("polyline", {
                            id: "outputBracketRight",
                            points: [[20, -25], [15, -25], [15, 25], [20, 25]],
                            style: {
                                stroke: { color: "#a855f7", width: 2, linecap: "round" }
                            }
                        })
                    ]
                }),

                // Labels
                textNode({
                    id: "vectorInputLabel",
                    text: "Vector input",
                    transform: { pos: [-150, 60] as Vec2 },
                    font: { family: "system-ui", size: 14, weight: 400 },
                    style: { fill: { type: "solid", color: "#22c55e" } },
                    lifecycle: {
                        start: 9,
                        fadeIn: 0.5
                    }
                }),
                
                textNode({
                    id: "vectorOutputLabel",
                    text: "Vector output",
                    transform: { pos: [150, 60] as Vec2 },
                    font: { family: "system-ui", size: 14, weight: 400 },
                    style: { fill: { type: "solid", color: "#a855f7" } },
                    lifecycle: {
                        start: 12,
                        fadeIn: 0.5
                    }
                }),

                // Arrow
                shape("polyline", {
                    id: "vectorArrow",
                    points: [[-80, 0], [-50, 0]],
                    style: {
                        stroke: { color: "#94a3b8", width: 2, linecap: "round" }
                    },
                    lifecycle: {
                        start: 10,
                        fadeIn: 0.5
                    }
                }),
                
                shape("polyline", {
                    id: "vectorArrow2",
                    points: [[50, 0], [80, 0]],
                    style: {
                        stroke: { color: "#94a3b8", width: 2, linecap: "round" }
                    },
                    lifecycle: {
                        start: 10.8,
                        fadeIn: 0.5
                    }
                })
            ]
        }),

        // Comparison note
        textNode({
            id: "comparisonNote",
            text: "Linear transformations take vectors as input and output vectors",
            transform: { pos: [640, 550] as Vec2 },
            font: { family: "system-ui", size: 16, weight: 400 },
            style: { fill: { type: "solid", color: "#94a3b8" } },
            lifecycle: {
                start: 13,
                fadeIn: 1
            }
        }),

        // Background grid for visual appeal
        group("backgroundGrid", {
            children: Array.from({ length: 20 }, (_, i) => 
                shape("polyline", {
                    id: `gridLine_${i}`,
                    points: [[i * 64, 0], [i * 64, 720]],
                    style: {
                        stroke: { 
                            color: "#1e293b", 
                            width: 1,
                            opacity: 0.3
                        }
                    }
                })
            ).concat(
                Array.from({ length: 12 }, (_, i) => 
                    shape("polyline", {
                        id: `gridLineH_${i}`,
                        points: [[0, i * 60], [1280, i * 60]],
                        style: {
                            stroke: { 
                                color: "#1e293b", 
                                width: 1,
                                opacity: 0.3
                            }
                        }
                    })
                )
            )
        })
    ]
});