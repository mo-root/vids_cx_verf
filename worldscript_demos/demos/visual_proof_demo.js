// Visual Proof Demo
// Recreates geometric visual proofs like circle area derivation
import { scene, group, shape, textNode, poses, timeline } from "../src/dsl/index.js";
// Poses for the circle-to-rectangle transformation
const slicePoses = poses({
    circle: {
        "transform.rotation.angle": 0,
        "transform.position.coords": [0, 0]
    },
    unfolding: {
        "transform.rotation.angle": 90,
        "transform.position.coords": [50, 0]
    },
    rectangle: {
        "transform.rotation.angle": 90,
        "transform.position.coords": [100, 0]
    }
});
const formulaPoses = poses({
    hidden: { "style.opacity": 0, "transform.scale.value": [0.8, 0.8] },
    visible: { "style.opacity": 1, "transform.scale.value": [1, 1] }
});
export default scene({
    render: {
        width: 1280,
        height: 720,
        fps: 60,
        duration: 16,
        background: "#0f172a"
    },
    children: [
        // Title
        textNode({
            id: "title",
            text: "Visual Proof: Area of a Circle",
            transform: { position: { coords: [640, 60] } },
            font: { family: "system-ui", size: 28, weight: 700 },
            style: { fill: { type: "solid", color: "#ffffff" } }
        }),
        // Initial circle
        group("circle_demo", {
            transform: { position: { coords: [300, 300] } },
            children: [
                // Main circle
                shape("ellipse", {
                    id: "main_circle",
                    size: [200, 200],
                    style: {
                        fill: { type: "solid", color: "rgba(59, 130, 246, 0.3)" },
                        stroke: { color: "#3b82f6", width: 3 }
                    },
                    lifecycle: { start: 0.5, fadeIn: 1 }
                }),
                // Radius line
                shape("polyline", {
                    id: "radius_line",
                    points: [
                        [0, 0],
                        [100, 0]
                    ],
                    style: {
                        stroke: { color: "#ef4444", width: 3, linecap: "round" }
                    },
                    lifecycle: { start: 1.5, fadeIn: 0.5 }
                }),
                textNode({
                    text: "r",
                    transform: { position: { coords: [50, -20] } },
                    font: { family: "system-ui", size: 18, weight: 600 },
                    style: { fill: { type: "solid", color: "#ef4444" } },
                    lifecycle: { start: 2, fadeIn: 0.5 }
                })
            ]
        }),
        // Circle slices that transform into rectangle
        group("transformation", {
            transform: { position: { coords: [800, 300] } },
            children: [
                // Create multiple slices of the circle
                ...Array.from({ length: 12 }, (_, i) => {
                    const angle = (i * 30) - 180;
                    const sliceHeight = 150;
                    const sliceWidth = 12;
                    return shape("rect", {
                        id: `slice_${i}`,
                        size: [sliceWidth, sliceHeight],
                        transform: {
                            position: { coords: [0, 0] },
                            rotation: { angle: angle, origin: "center" }
                        },
                        style: {
                            fill: {
                                type: "solid",
                                color: i % 2 === 0 ? "#22c55e" : "#16a34a"
                            },
                            stroke: { color: "#166534", width: 1 }
                        },
                        perform: timeline({
                            "0": { pose: "circle" },
                            "5": { pose: "unfolding", dur: 2, ease: "easeInOutCubic" },
                            "8": { pose: "rectangle", dur: 2, ease: "easeInOutCubic" }
                        }, slicePoses),
                        lifecycle: { start: 3 + i * 0.1, fadeIn: 0.3 }
                    });
                }),
                // Rectangle outline that appears
                shape("rect", {
                    id: "final_rectangle",
                    size: [377, 200], // π * r by r
                    style: {
                        fill: { type: "solid", color: "transparent" },
                        stroke: { color: "#fbbf24", width: 4, dasharray: "5 5" }
                    },
                    lifecycle: { start: 10, fadeIn: 1 }
                })
            ]
        }),
        // Explanation text
        textNode({
            id: "explanation_1",
            text: "Cut the circle into thin slices...",
            transform: { position: { coords: [640, 500] } },
            font: { family: "system-ui", size: 18 },
            style: { fill: { type: "solid", color: "#94a3b8" } },
            lifecycle: { start: 3, end: 6 }
        }),
        textNode({
            id: "explanation_2",
            text: "Rearrange the slices...",
            transform: { position: { coords: [640, 500] } },
            font: { family: "system-ui", size: 18 },
            style: { fill: { type: "solid", color: "#94a3b8" } },
            lifecycle: { start: 6, end: 9 }
        }),
        textNode({
            id: "explanation_3",
            text: "Forms a rectangle!",
            transform: { position: { coords: [640, 500] } },
            font: { family: "system-ui", size: 18 },
            style: { fill: { type: "solid", color: "#94a3b8" } },
            lifecycle: { start: 9, fadeIn: 1 }
        }),
        // Measurements and formulas
        group("measurements", {
            transform: { position: { coords: [800, 450] } },
            lifecycle: { start: 11, fadeIn: 1 },
            children: [
                // Width measurement
                shape("polyline", {
                    points: [
                        [-188, 120],
                        [-188, 130],
                        [188, 130],
                        [188, 120]
                    ],
                    style: { stroke: { color: "#fbbf24", width: 2 } }
                }),
                textNode({
                    text: "πr",
                    transform: { position: { coords: [0, 150] } },
                    font: { family: "system-ui", size: 16, weight: 600 },
                    style: { fill: { type: "solid", color: "#fbbf24" } }
                }),
                // Height measurement  
                shape("polyline", {
                    points: [
                        [200, -100],
                        [210, -100],
                        [210, 100],
                        [200, 100]
                    ],
                    style: { stroke: { color: "#ef4444", width: 2 } }
                }),
                textNode({
                    text: "r",
                    transform: { position: { coords: [230, 0] } },
                    font: { family: "system-ui", size: 16, weight: 600 },
                    style: { fill: { type: "solid", color: "#ef4444" } }
                })
            ]
        }),
        // Final formula derivation
        group("formula_derivation", {
            transform: { position: { coords: [640, 580] } },
            children: [
                textNode({
                    id: "area_rectangle",
                    text: "Area of rectangle = width × height",
                    transform: { position: { coords: [0, 0] } },
                    font: { family: "system-ui", size: 16 },
                    style: { fill: { type: "solid", color: "#94a3b8" } },
                    perform: timeline({
                        "0": { pose: "hidden" },
                        "12": { pose: "visible", dur: 0.5 }
                    }, formulaPoses)
                }),
                textNode({
                    id: "area_substitution",
                    text: "= πr × r",
                    transform: { position: { coords: [0, 25] } },
                    font: { family: "system-ui", size: 16 },
                    style: { fill: { type: "solid", color: "#94a3b8" } },
                    perform: timeline({
                        "0": { pose: "hidden" },
                        "13": { pose: "visible", dur: 0.5 }
                    }, formulaPoses)
                }),
                textNode({
                    id: "area_final",
                    text: "= πr²",
                    transform: { position: { coords: [0, 50] } },
                    font: { family: "system-ui", size: 20, weight: 700 },
                    style: { fill: { type: "solid", color: "#22c55e" } },
                    perform: timeline({
                        "0": { pose: "hidden" },
                        "14": { pose: "visible", dur: 0.5 }
                    }, formulaPoses)
                })
            ]
        }),
        // Circle formula for comparison
        group("original_formula", {
            transform: { position: { coords: [300, 450] } },
            lifecycle: { start: 2, fadeIn: 1 },
            children: [
                textNode({
                    text: "Area = ?",
                    transform: { position: { coords: [0, 0] } },
                    font: { family: "system-ui", size: 18, weight: 600 },
                    style: { fill: { type: "solid", color: "#ffffff" } }
                })
            ]
        }),
        // Arrow showing transformation
        shape("polyline", {
            id: "transformation_arrow",
            points: [
                [500, 300],
                [600, 300],
                [590, 290],
                [600, 300],
                [590, 310]
            ],
            style: {
                stroke: { color: "#22c55e", width: 3, linecap: "round" }
            },
            lifecycle: { start: 4, fadeIn: 1 }
        }),
        // QED box
        shape("rect", {
            id: "qed_box",
            size: [60, 40],
            transform: { position: { coords: [1100, 580] } },
            style: {
                fill: { type: "solid", color: "rgba(34, 197, 94, 0.2)" },
                stroke: { color: "#22c55e", width: 2 },
                radius: 8
            },
            lifecycle: { start: 15, fadeIn: 0.5 }
        }),
        textNode({
            id: "qed",
            text: "QED",
            transform: { position: { coords: [1100, 580] } },
            font: { family: "system-ui", size: 16, weight: 700 },
            style: { fill: { type: "solid", color: "#22c55e" } },
            lifecycle: { start: 15, fadeIn: 0.5 }
        }),
        // Interactive elements hint
        textNode({
            id: "interactive_hint",
            text: "Visual proofs make abstract concepts tangible",
            transform: { position: { coords: [640, 650] } },
            font: { family: "system-ui", size: 14, weight: 400 },
            style: { fill: { type: "solid", color: "#6b7280" } },
            lifecycle: { start: 1, fadeIn: 2 }
        })
    ]
});
//# sourceMappingURL=visual_proof_demo.js.map