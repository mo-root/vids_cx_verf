// Simple Example - Bouncing Ball with Trail
// Demonstrates the power and simplicity of the DSL

import { scene, shape, textNode, poses, timeline } from "./src/dsl/api.js";
import type { Vec2 } from "./src/dsl/types.js";

// Ball poses for bounce effect
const ballPoses = poses({
    normal: { "transform.scale.value": [1, 1] },
    squished: { "transform.scale.value": [1.2, 0.8] }
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
            text: "Simple Bouncing Ball Example",
            transform: { pos: [640, 50] as Vec2 },
            font: { family: "system-ui", size: 24, weight: 700 },
            style: { fill: { type: "solid", color: "#e2e8f0" } }
        }),

        // Ground
        shape("rect", {
            id: "ground",
            size: [1280, 20],
            style: { fill: { type: "solid", color: "#374151" } },
            transform: { pos: [640, 650] as Vec2 }
        }),

        // Bouncing ball with physics
        shape("ellipse", {
            id: "ball",
            size: [40, 40],
            style: {
                fill: { 
                    type: "gradient",
                    angle: 45,
                    stops: [
                        { offset: 0, color: "#ef4444" },
                        { offset: 1, color: "#dc2626" }
                    ]
                },
                stroke: { color: "#991b1b", width: 2 }
            },
            transform: {
                position: {
                    coords: [
                        "200 + t * 150",  // Move right
                        // Bouncing physics: gravity + bounce
                        "400 + 200 * sin(t * 3) * exp(-t * 0.2)"
                    ]
                }
            },
            // Squish effect on bounce
            perform: timeline({
                "0": { pose: "normal" },
                "1.0": { pose: "squished", dur: 0.1 },
                "1.1": { pose: "normal", dur: 0.1 },
                "2.1": { pose: "squished", dur: 0.1 },
                "2.2": { pose: "normal", dur: 0.1 },
                "3.1": { pose: "squished", dur: 0.1 },
                "3.2": { pose: "normal", dur: 0.1 }
            }, ballPoses)
        }),

        // Ball trail (multiple balls with delays and opacity)
        ...Array.from({ length: 8 }, (_, i) => 
            shape("ellipse", {
                id: `trail_${i}`,
                size: [30 - i * 2, 30 - i * 2],
                style: {
                    fill: { 
                        type: "solid", 
                        color: "#ef4444",
                        opacity: (8 - i) / 16  // Fade out
                    }
                },
                transform: {
                    position: {
                        coords: [
                            `200 + (t - ${i * 0.1}) * 150`,
                            `400 + 200 * sin((t - ${i * 0.1}) * 3) * exp(-(t - ${i * 0.1}) * 0.2)`
                        ]
                    }
                },
                lifecycle: {
                    start: i * 0.1,  // Staggered start
                    fadeIn: 0.1
                }
            })
        ),

        // Physics explanation
        textNode({
            id: "physicsFormula",
            text: "y = 400 + 200 × sin(3t) × e^(-0.2t)",
            transform: { pos: [640, 600] as Vec2 },
            font: { family: "system-ui", size: 16, weight: 600 },
            style: { fill: { type: "solid", color: "#22d3ee" } },
            lifecycle: {
                start: 2,
                fadeIn: 1
            }
        }),

        // Explanation text
        textNode({
            id: "explanation",
            text: "Damped oscillation creates realistic bouncing physics",
            transform: { pos: [640, 620] as Vec2 },
            font: { family: "system-ui", size: 14, weight: 400 },
            style: { fill: { type: "solid", color: "#94a3b8" } },
            lifecycle: {
                start: 3,
                fadeIn: 1
            }
        })
    ]
});

/* 
This simple example demonstrates:

1. **Mathematical Expressions**: Using sin() and exp() for realistic physics
2. **Timeline Animations**: Squish effect on bounce with precise timing  
3. **Array Generation**: Creating trail effect with multiple elements
4. **Lifecycle Management**: Staggered appearance of trail elements
5. **Gradient Styling**: Professional-looking ball appearance
6. **Educational Content**: Physics formula explanation

The entire animation is just ~100 lines and creates a compelling 
physics demonstration that would take much more code in traditional
animation frameworks.

Key DSL Features Shown:
- Expression-driven position: "200 + t * 150"
- Complex physics: "400 + 200 * sin(t * 3) * exp(-t * 0.2)"
- Pose-based state changes: normal ↔ squished
- Programmatic element generation: Array.from() for trail
- Rich styling: gradients, strokes, opacity
- Timeline precision: bounce timing synchronized with physics
*/