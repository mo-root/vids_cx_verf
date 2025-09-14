import { programLite, scene, group, shape, textNode, poses, timeline } from "../../src/dsl/api.js";
import type { Vec2, NodesSnapshot } from "../../src/dsl/types.js";

// Grid Flip Animation - Recreating the pattern-based grid flipping animation
// Creates a 10x10 grid of squares that flip colors in various patterns

// Square poses
const squarePoses = poses({
    blue: { 
        "style.fill.color": "#3b82f6",
        "transform.scale.value": [1, 1],
        "transform.rotation.angle": 0
    },
    grey: { 
        "style.fill.color": "#6b7280",
        "transform.scale.value": [1, 1], 
        "transform.rotation.angle": 180
    },
    highlighted: {
        "style.stroke.color": "#ef4444",
        "style.stroke.width": 3,
        "style.fill.opacity": 0.3
    },
    normal: {
        "style.stroke.color": "#ffffff",
        "style.stroke.width": 1,
        "style.fill.opacity": 1
    }
});

// Create grid of squares
const gridSize = 10;
const squareSize = 60;
const spacing = 70;
const gridWidth = (gridSize - 1) * spacing;
const gridHeight = (gridSize - 1) * spacing;
const startX = 640 - gridWidth / 2;
const startY = 360 - gridHeight / 2;

const gridSquares: any[] = [];
const labels: any[] = [];

for (let row = 0; row < gridSize; row++) {
    for (let col = 0; col < gridSize; col++) {
        const index = row * gridSize + col;
        const x = startX + col * spacing;
        const y = startY + row * spacing;
        
        // Create square
        gridSquares.push(
            shape("rect", {
                id: `square_${index}`,
                size: [squareSize, squareSize],
                style: {
                    fill: { type: "solid", color: "#3b82f6", opacity: 0.5 },
                    stroke: { color: "#ffffff", width: 1 },
                    radius: 4
                },
                transform: { pos: [x, y] as Vec2 }
            })
        );
        
        // Create label
        labels.push(
            textNode({
                id: `label_${index}`,
                text: index.toString(),
                transform: { pos: [x, y] as Vec2 },
                font: { family: "system-ui", size: 12, weight: 600 },
                style: { fill: { type: "solid", color: "#ffffff" } }
            })
        );
    }
}

// Animation patterns - flipping every nth square
const patterns = [2, 3, 4, 5, 6, 7, 8, 9, 10];
let currentTime = 2; // Start after 2 seconds

const animatedSquares: any[] = [];
for (let patternIndex = 0; patternIndex < patterns.length; patternIndex++) {
    const n = patterns[patternIndex];
    const duration = 1 / Math.sqrt(n);
    
    for (let i = 0; i < gridSquares.length; i++) {
        if (i % n === 0) {
            // Create highlight animation
            const highlightSquare = shape("rect", {
                id: `highlight_${patternIndex}_${i}`,
                size: [squareSize, squareSize],
                style: {
                    fill: { type: "solid", color: "transparent" },
                    stroke: { color: "#ef4444", width: 3 },
                    radius: 4,
                    opacity: 0
                },
                transform: { 
                    pos: [startX + (i % gridSize) * spacing, startY + Math.floor(i / gridSize) * spacing] as Vec2 
                },
                lifecycle: {
                    start: currentTime,
                    end: currentTime + duration * 2,
                    fadeIn: duration * 0.1,
                    fadeOut: duration * 0.1
                }
            });
            
            animatedSquares.push(highlightSquare);
            
            // Update the main square to flip
            const squareRef = gridSquares[i];
            if (squareRef) {
                // Add flip animation by modifying the square's properties
                squareRef.perform = timeline({
                    [`${currentTime + duration}`]: { 
                        pose: i % 2 === 0 ? "grey" : "blue", 
                        dur: duration * 0.5 
                    }
                }, squarePoses);
            }
        }
    }
    
    currentTime += duration * 2 + 0.5; // Add pause between patterns
}

export default programLite<{}, {}>({
    init: () => ({}),
    tick: (_s: {}, _dt: number, _p: {}, _n: NodesSnapshot) => { },
    scene: (_s: {}, _p: {}) => scene({
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
                text: "Grid Pattern Animation",
                transform: { pos: [640, 50] as Vec2 },
                font: { family: "system-ui", size: 28, weight: 800 },
                style: { fill: { type: "solid", color: "#e2e8f0" } }
            }),

            // Pattern indicator
            textNode({
                id: "patternText",
                text: "Flipping every nth square",
                textValue: `"Flipping every " + (Math.floor(t / 2) + 2) + " squares"`,
                transform: { pos: [640, 100] as Vec2 },
                font: { family: "system-ui", size: 16, weight: 400 },
                style: { 
                    fill: { type: "solid", color: "#94a3b8" },
                    opacity: "t > 1 ? 1 : 0"
                },
                lifecycle: {
                    start: 1,
                    fadeIn: 0.5
                }
            }),

            // Grid group
            group("grid", {
                children: [...gridSquares, ...labels]
            }),

            // Highlight animations
            group("highlights", {
                children: animatedSquares
            }),

            // Progress indicator
            shape("rect", {
                id: "progressBar",
                size: ["600 * clamp(t / 18, 0, 1)", 3],
                style: { 
                    fill: { type: "solid", color: "#22d3ee" },
                    opacity: "t > 1 ? 0.7 : 0"
                },
                transform: { pos: [640, 650] as Vec2 },
                lifecycle: {
                    start: 1
                }
            }),

            // Character celebration at the end
            group("celebration", {
                transform: { pos: [640, 600] as Vec2 },
                lifecycle: {
                    start: 18,
                    fadeIn: 1
                },
                children: [
                    // Simple character representation
                    shape("ellipse", {
                        id: "characterHead",
                        size: [40, 40],
                        style: { fill: { type: "solid", color: "#fbbf24" } },
                        transform: { 
                            pos: [0, -20] as Vec2,
                            scale: {
                                value: "1 + 0.1 * sin(t * 4)"
                            }
                        }
                    }),
                    
                    shape("rect", {
                        id: "characterBody",
                        size: [30, 50],
                        style: { 
                            fill: { type: "solid", color: "#22d3ee" },
                            radius: 15
                        },
                        transform: { pos: [0, 10] as Vec2 }
                    }),
                    
                    // Celebration arms
                    shape("polyline", {
                        id: "leftArm",
                        points: [[-15, -10], [-35, -30], [-40, -45]],
                        style: { 
                            stroke: { color: "#22d3ee", width: 6, linecap: "round" }
                        },
                        transform: {
                            rotation: {
                                angle: "sin(t * 6) * 20"
                            }
                        }
                    }),
                    
                    shape("polyline", {
                        id: "rightArm",
                        points: [[15, -10], [35, -30], [40, -45]],
                        style: { 
                            stroke: { color: "#22d3ee", width: 6, linecap: "round" }
                        },
                        transform: {
                            rotation: {
                                angle: "sin(t * 6 + 3.14) * 20"
                            }
                        }
                    })
                ]
            })
        ]
    })
});