import { scene, group, shape, textNode, poses, timeline } from "../../src/dsl/api.js";
import type { Vec2 } from "../../src/dsl/types.js";

// Sphere Surface Area Visualization
// Demonstrates the projection of a sphere onto a cylinder to show why surface area = 4πr²

// Animation poses
const spherePoses = poses({
    hidden: { "style.opacity": 0, "transform.scale.value": [0.5, 0.5] },
    visible: { "style.opacity": 0.8, "transform.scale.value": [1, 1] },
    highlighted: { "style.opacity": 1, "style.stroke.width": 3 }
});

const cylinderPoses = poses({
    hidden: { "style.opacity": 0, "transform.position.coords": [800, 360] },
    visible: { "style.opacity": 0.6, "transform.position.coords": [900, 360] },
    unfolded: { "style.opacity": 0.8, "transform.position.coords": [1100, 360] }
});

const projectionPoses = poses({
    hidden: { "style.opacity": 0 },
    visible: { "style.opacity": 0.4 }
});

// Create sphere with latitude lines
const sphereRadius = 120;
const sphereCenter: Vec2 = [400, 360];

const sphereElements: any[] = [
    // Main sphere
    shape("ellipse", {
        id: "sphere",
        size: [sphereRadius * 2, sphereRadius * 2],
        style: {
            fill: { type: "solid", color: "#3b82f6", opacity: 0.3 },
            stroke: { color: "#1e40af", width: 2 }
        },
        transform: { pos: sphereCenter },
        perform: timeline({
            "0": { pose: "hidden" },
            "1": { pose: "visible", dur: 1 },
            "8": { pose: "highlighted", dur: 0.5 }
        }, spherePoses)
    })
];

// Add latitude lines to sphere
for (let i = 1; i < 8; i++) {
    const y = (i - 4) * 25; // Latitude positions
    const width = Math.sqrt(sphereRadius * sphereRadius - y * y) * 2;
    
    sphereElements.push(
        shape("ellipse", {
            id: `latitude_${i}`,
            size: [width, 8],
            style: {
                fill: { type: "solid", color: "transparent" },
                stroke: { color: "#1e40af", width: 1, opacity: 0.6 }
            },
            transform: { pos: [sphereCenter[0], sphereCenter[1] + y] },
            lifecycle: {
                start: 2 + i * 0.2,
                fadeIn: 0.3
            }
        })
    );
}

// Create cylinder
const cylinderHeight = sphereRadius * 2;
const cylinderWidth = 60;

const cylinderElements: any[] = [
    // Cylinder main body
    shape("rect", {
        id: "cylinder",
        size: [cylinderWidth, cylinderHeight],
        style: {
            fill: { type: "solid", color: "#22c55e", opacity: 0.3 },
            stroke: { color: "#16a34a", width: 2 }
        },
        perform: timeline({
            "0": { pose: "hidden" },
            "5": { pose: "visible", dur: 1 },
            "12": { pose: "unfolded", dur: 2 }
        }, cylinderPoses)
    }),
    
    // Cylinder top
    shape("ellipse", {
        id: "cylinderTop",
        size: [cylinderWidth, 12],
        style: {
            fill: { type: "solid", color: "#22c55e", opacity: 0.5 },
            stroke: { color: "#16a34a", width: 2 }
        },
        transform: {
            position: {
                coords: [
                    "t < 12 ? 900 : 1100",
                    `${360 - cylinderHeight / 2}`
                ]
            }
        },
        lifecycle: {
            start: 5,
            fadeIn: 1
        }
    }),
    
    // Cylinder bottom
    shape("ellipse", {
        id: "cylinderBottom",
        size: [cylinderWidth, 12],
        style: {
            fill: { type: "solid", color: "#22c55e", opacity: 0.5 },
            stroke: { color: "#16a34a", width: 2 }
        },
        transform: {
            position: {
                coords: [
                    "t < 12 ? 900 : 1100",
                    `${360 + cylinderHeight / 2}`
                ]
            }
        },
        lifecycle: {
            start: 5,
            fadeIn: 1
        }
    })
];

// Create unfolded rectangle
const unfoldedRect = shape("rect", {
    id: "unfoldedRect",
    size: [2 * Math.PI * sphereRadius / 3, cylinderHeight],
    style: {
        fill: { type: "solid", color: "#f59e0b", opacity: 0.4 },
        stroke: { color: "#d97706", width: 2, dasharray: "5 5" }
    },
    transform: { pos: [1100, 360] },
    lifecycle: {
        start: 14,
        fadeIn: 1.5
    }
});

// Projection lines
const projectionLines: any[] = [];
for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    const sphereX = sphereCenter[0] + Math.cos(angle) * sphereRadius;
    const sphereY = sphereCenter[1] + Math.sin(angle) * sphereRadius * 0.3; // Flattened for 2D view
    
    projectionLines.push(
        shape("polyline", {
            id: `projection_${i}`,
            points: [
                [sphereX, sphereY],
                ["t < 12 ? 900 : 1100", sphereY]
            ],
            style: {
                stroke: { color: "#94a3b8", width: 1, dasharray: "3 3", opacity: 0.5 }
            },
            lifecycle: {
                start: 6 + i * 0.1,
                fadeIn: 0.3
            }
        })
    );
}

export default scene({
    render: {
        width: 1280,
        height: 720,
        fps: 60,
        duration: 20,
        background: "#0f172a"
    },
    children: [
        // Title
        textNode({
            id: "title",
            text: "Sphere Surface Area = 4πr²",
            transform: { pos: [640, 60] as Vec2 },
            font: { family: "system-ui", size: 32, weight: 800 },
            style: { fill: { type: "solid", color: "#e2e8f0" } }
        }),

        // Subtitle
        textNode({
            id: "subtitle",
            text: "Projection onto Cylinder",
            transform: { pos: [640, 100] as Vec2 },
            font: { family: "system-ui", size: 18, weight: 400 },
            style: { fill: { type: "solid", color: "#94a3b8" } }
        }),

        // Sphere group
        group("sphereGroup", {
            children: sphereElements
        }),

        // Cylinder group
        group("cylinderGroup", {
            children: cylinderElements
        }),

        // Projection lines
        group("projectionLines", {
            children: projectionLines
        }),

        // Unfolded rectangle
        unfoldedRect,

        // Radius indicator
        shape("polyline", {
            id: "radiusLine",
            points: [
                [sphereCenter[0], sphereCenter[1]],
                [sphereCenter[0] + sphereRadius, sphereCenter[1]]
            ],
            style: {
                stroke: { color: "#fbbf24", width: 3, linecap: "round" }
            },
            lifecycle: {
                start: 3,
                fadeIn: 0.5
            }
        }),

        // Radius label
        textNode({
            id: "radiusLabel",
            text: "r",
            transform: { pos: [sphereCenter[0] + sphereRadius / 2, sphereCenter[1] - 20] as Vec2 },
            font: { family: "system-ui", size: 20, weight: 700 },
            style: { fill: { type: "solid", color: "#fbbf24" } },
            lifecycle: {
                start: 3.5,
                fadeIn: 0.5
            }
        }),

        // Cylinder circumference label
        textNode({
            id: "circumferenceLabel",
            text: "Circumference = 2πr",
            transform: { pos: [900, 500] as Vec2 },
            font: { family: "system-ui", size: 16, weight: 600 },
            style: { fill: { type: "solid", color: "#22c55e" } },
            lifecycle: {
                start: 7,
                fadeIn: 0.8
            }
        }),

        // Height label
        textNode({
            id: "heightLabel",
            text: "Height = 2r",
            transform: { pos: [950, 360] as Vec2 },
            font: { family: "system-ui", size: 16, weight: 600 },
            style: { fill: { type: "solid", color: "#22c55e" } },
            lifecycle: {
                start: 8,
                fadeIn: 0.8
            }
        }),

        // Unfolded area calculation
        textNode({
            id: "areaCalculation",
            text: "Area = 2πr × 2r = 4πr²",
            transform: { pos: [1100, 500] as Vec2 },
            font: { family: "system-ui", size: 18, weight: 700 },
            style: { fill: { type: "solid", color: "#f59e0b" } },
            lifecycle: {
                start: 16,
                fadeIn: 1
            }
        }),

        // Step indicators
        group("stepIndicators", {
            transform: { pos: [100, 600] as Vec2 },
            children: [
                textNode({
                    id: "step1",
                    text: "1. Start with sphere",
                    transform: { pos: [0, 0] as Vec2 },
                    font: { family: "system-ui", size: 14, weight: 600 },
                    style: { 
                        fill: { type: "solid", color: "#3b82f6" },
                        opacity: "t > 1 && t < 5 ? 1 : 0.3"
                    }
                }),
                
                textNode({
                    id: "step2",
                    text: "2. Project onto cylinder",
                    transform: { pos: [0, 25] as Vec2 },
                    font: { family: "system-ui", size: 14, weight: 600 },
                    style: { 
                        fill: { type: "solid", color: "#22c55e" },
                        opacity: "t > 5 && t < 12 ? 1 : 0.3"
                    }
                }),
                
                textNode({
                    id: "step3",
                    text: "3. Unfold to rectangle",
                    transform: { pos: [0, 50] as Vec2 },
                    font: { family: "system-ui", size: 14, weight: 600 },
                    style: { 
                        fill: { type: "solid", color: "#f59e0b" },
                        opacity: "t > 12 ? 1 : 0.3"
                    }
                })
            ]
        }),

        // Mathematical formula progression
        group("formulaProgression", {
            transform: { pos: [640, 650] as Vec2 },
            children: [
                textNode({
                    id: "formula1",
                    text: "Surface Area = ?",
                    font: { family: "system-ui", size: 16, weight: 600 },
                    style: { 
                        fill: { type: "solid", color: "#e2e8f0" },
                        opacity: "t < 16 ? 1 : 0"
                    }
                }),
                
                textNode({
                    id: "formula2",
                    text: "Surface Area = 4πr²",
                    font: { family: "system-ui", size: 20, weight: 700 },
                    style: { 
                        fill: { type: "solid", color: "#22d3ee" },
                        opacity: "t > 16 ? 1 : 0"
                    },
                    transform: {
                        scale: {
                            value: "t > 16 ? 1 + 0.1 * sin((t - 16) * 4) : 1"
                        }
                    }
                })
            ]
        })
    ]
});