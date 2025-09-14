import { scene, group, shape, textNode, poses, timeline, reactive } from "../../src/dsl/api.js";
import type { Vec2 } from "../../src/dsl/types.js";

// Name Flow Animation - Recreating the swirling vector field name animation
// Simulates text being written, then flowing in a vector field, then returning to original position

// Vector field function - creates four swirls pattern
function fourSwirls(x: number, y: number, t: number): Vec2 {
    const scale = 0.001;
    const timeScale = 0.5;
    const fieldStrength = 50;
    
    // Normalize coordinates to [-1, 1] range
    const nx = (x - 640) / 320;
    const ny = (y - 360) / 180;
    
    // Create four swirl pattern
    const swirl1X = (ny + 0.5) * Math.cos(t * timeScale) - (nx + 0.5) * Math.sin(t * timeScale);
    const swirl1Y = (nx + 0.5) * Math.cos(t * timeScale) + (ny + 0.5) * Math.sin(t * timeScale);
    
    const swirl2X = (ny - 0.5) * Math.cos(-t * timeScale) - (nx + 0.5) * Math.sin(-t * timeScale);
    const swirl2Y = (nx + 0.5) * Math.cos(-t * timeScale) + (ny - 0.5) * Math.sin(-t * timeScale);
    
    const swirl3X = (ny + 0.5) * Math.cos(t * timeScale) - (nx - 0.5) * Math.sin(t * timeScale);
    const swirl3Y = (nx - 0.5) * Math.cos(t * timeScale) + (ny + 0.5) * Math.sin(t * timeScale);
    
    const swirl4X = (ny - 0.5) * Math.cos(-t * timeScale) - (nx - 0.5) * Math.sin(-t * timeScale);
    const swirl4Y = (nx - 0.5) * Math.cos(-t * timeScale) + (ny - 0.5) * Math.sin(-t * timeScale);
    
    const avgX = (swirl1X + swirl2X + swirl3X + swirl4X) / 4;
    const avgY = (swirl1Y + swirl2Y + swirl3Y + swirl4Y) / 4;
    
    return [avgX * fieldStrength, avgY * fieldStrength];
}

// Letter stroke poses
const letterPoses = poses({
    hidden: { "style.opacity": 0, "transform.scale.value": [0.8, 0.8] },
    written: { "style.opacity": 1, "transform.scale.value": [1, 1] },
    flowing: { "style.opacity": 0.8 },
    restored: { "style.opacity": 1, "transform.scale.value": [1, 1] }
});

// Vector field poses
const fieldPoses = poses({
    hidden: { "style.opacity": 0 },
    visible: { "style.opacity": 0.6 }
});

// Create individual letter strokes for "3Blue1Brown"
const name = "3Blue1Brown";
const letterStrokes: any[] = [];
const baseY = 360;
let currentX = 200;

// Create strokes for each letter
for (let i = 0; i < name.length; i++) {
    const letter = name[i];
    const letterWidth = letter === " " ? 30 : 45;
    
    if (letter !== " ") {
        // Create multiple strokes per letter to simulate bezier curves
        const strokesPerLetter = 3;
        for (let j = 0; j < strokesPerLetter; j++) {
            const strokeId = `letter_${i}_stroke_${j}`;
            const offsetY = (j - 1) * 15;
            const strokeWidth = Math.random() * 20 + 10;
            
            letterStrokes.push(
                shape("polyline", {
                    id: strokeId,
                    points: [
                        [currentX, baseY + offsetY],
                        [currentX + strokeWidth * 0.3, baseY + offsetY - 10],
                        [currentX + strokeWidth * 0.7, baseY + offsetY + 5],
                        [currentX + strokeWidth, baseY + offsetY]
                    ],
                    style: {
                        stroke: { color: "#ffffff", width: 2, linecap: "round" },
                        opacity: 0
                    },
                    transform: {
                        position: {
                            coords: [
                                // During flow phase, move according to vector field
                                `t > 5 && t < 65 ? ${currentX} + sin(t * 0.1 + ${i}) * 30 + cos(t * 0.08 + ${j}) * 20 : ${currentX}`,
                                `t > 5 && t < 65 ? ${baseY + offsetY} + cos(t * 0.12 + ${i}) * 25 + sin(t * 0.07 + ${j}) * 15 : ${baseY + offsetY}`
                            ]
                        }
                    },
                    perform: timeline({
                        "0": { pose: "hidden" },
                        [`${1 + i * 0.2}`]: { pose: "written", dur: 0.3 },
                        "5": { pose: "flowing", dur: 1 },
                        "65": { pose: "restored", dur: 5 }
                    }, letterPoses),
                    lifecycle: {
                        start: 0,
                        end: 75
                    }
                })
            );
        }
    }
    currentX += letterWidth;
}

// Create vector field visualization
const vectorField: any[] = [];
const gridSize = 12;
for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
        const posX = 100 + (x / (gridSize - 1)) * 1080;
        const posY = 100 + (y / (gridSize - 1)) * 520;
        
        vectorField.push(
            shape("polyline", {
                id: `vector_${x}_${y}`,
                points: [
                    [posX, posY],
                    [posX + Math.cos(x + y) * 30, posY + Math.sin(x + y) * 30]
                ],
                style: {
                    stroke: { color: "#22d3ee", width: 2, linecap: "round" },
                    opacity: 0
                },
                transform: {
                    rotation: {
                        angle: `t * 20 + ${x * 30 + y * 20}`
                    }
                },
                perform: timeline({
                    "0": { pose: "hidden" },
                    [`${4 + (x + y) * 0.1}`]: { pose: "visible", dur: 0.5 },
                    "65": { pose: "hidden", dur: 2 }
                }, fieldPoses)
            })
        );
    }
}

export default scene({
    render: {
        width: 1280,
        height: 720,
        fps: 60,
        duration: 75,
        background: "#0f172a"
    },
    children: [
        // Title
        textNode({
            id: "title",
            text: "Name Flow Animation",
            transform: { pos: [640, 50] as Vec2 },
            font: { family: "system-ui", size: 24, weight: 700 },
            style: { fill: { type: "solid", color: "#e2e8f0" } }
        }),

        // Main name group
        group("nameGroup", {
            transform: { pos: [640, 360] as Vec2 },
            children: letterStrokes
        }),

        // Vector field
        group("vectorField", {
            children: vectorField
        }),

        // Instructions text
        textNode({
            id: "instructions",
            text: "Watch the name flow through the vector field",
            transform: { pos: [640, 650] as Vec2 },
            font: { family: "system-ui", size: 16, weight: 400 },
            style: { 
                fill: { type: "solid", color: "#94a3b8" },
                opacity: "t > 2 && t < 70 ? 1 : 0"
            },
            lifecycle: {
                start: 2,
                end: 70,
                fadeIn: 0.5,
                fadeOut: 1
            }
        }),

        // Flow duration indicator
        shape("rect", {
            id: "progressBar",
            size: ["800 * clamp((t - 5) / 60, 0, 1)", 4],
            style: { 
                fill: { type: "solid", color: "#22d3ee" },
                opacity: "t > 5 && t < 65 ? 0.7 : 0"
            },
            transform: { pos: [640, 680] as Vec2 },
            lifecycle: {
                start: 5,
                end: 65
            }
        })
    ]
});