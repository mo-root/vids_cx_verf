// Probability Distribution Demo
// Recreates Galton board and normal distribution emergence

import { scene, group, shape, textNode, poses, timeline, sequence } from "../src/dsl/index.js";

// Ball dropping animations
const ballPoses = poses({
  start: { "transform.position.coords": [640, 150] },
  peg1: { "transform.position.coords": [600, 200] },
  peg2: { "transform.position.coords": [620, 250] },
  peg3: { "transform.position.coords": [580, 300] },
  bucket: { "transform.position.coords": [560, 500] }
});

const bucketPoses = poses({
  empty: { "transform.scale.value": [1, 0.1] },
  filling: { "transform.scale.value": [1, 0.5] },
  full: { "transform.scale.value": [1, 1] }
});

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
      text: "Galton Board & Normal Distribution",
      transform: { position: { coords: [640, 50] } },
      font: { family: "system-ui", size: 28, weight: 700 },
      style: { fill: { type: "solid", color: "#ffffff" } }
    }),

    // Galton Board Structure
    group("galton_board", {
      transform: { position: { coords: [640, 200] } },
      children: [
        // Pegs arranged in triangular pattern
        ...Array.from({ length: 6 }, (_, row) => 
          Array.from({ length: row + 1 }, (_, col) => {
            const x = (col - row / 2) * 40;
            const y = row * 50;
            return shape("ellipse", {
              id: `peg_${row}_${col}`,
              size: [8, 8],
              transform: { position: { coords: [x, y] } },
              style: {
                fill: { type: "solid", color: "#6b7280" },
                stroke: { color: "#374151", width: 1 }
              }
            });
          })
        ).flat(),

        // Funnel at top
        shape("polyline", {
          id: "funnel_left",
          points: [
            [-30, -50],
            [-10, -20],
            [-10, -10]
          ],
          style: { stroke: { color: "#9ca3af", width: 3 } }
        }),

        shape("polyline", {
          id: "funnel_right",
          points: [
            [30, -50],
            [10, -20],
            [10, -10]
          ],
          style: { stroke: { color: "#9ca3af", width: 3 } }
        })
      ]
    }),

    // Buckets at bottom
    group("buckets", {
      transform: { position: { coords: [640, 480] } },
      children: [
        ...Array.from({ length: 7 }, (_, i) => {
          const x = (i - 3) * 40;
          return group(`bucket_${i}`, {
            transform: { position: { coords: [x, 0] } },
            children: [
              // Bucket walls
              shape("polyline", {
                points: [
                  [-15, 0],
                  [-15, -100],
                  [15, -100],
                  [15, 0]
                ],
                style: { stroke: { color: "#6b7280", width: 2 } }
              }),
              
              // Ball collection (grows over time)
              shape("rect", {
                id: `bucket_fill_${i}`,
                size: [28, 10],
                transform: { position: { coords: [0, -5] } },
                style: {
                  fill: { type: "solid", color: "#fbbf24" },
                  opacity: 0.8
                },
                perform: timeline({
                  "0": { pose: "empty" },
                  [`${5 + i * 2}`]: { pose: "filling", dur: 1 },
                  [`${10 + i}`]: { pose: "full", dur: 2 }
                }, bucketPoses)
              })
            ]
          });
        })
      ]
    }),

    // Animated balls falling
    ...Array.from({ length: 5 }, (_, i) => 
      shape("ellipse", {
        id: `ball_${i}`,
        size: [12, 12],
        style: {
          fill: { type: "solid", color: "#fbbf24" },
          stroke: { color: "#f59e0b", width: 1 }
        },
        perform: sequence([
          { pose: "start", hold: 0.2 + i * 0.5 },
          { pose: "peg1", dur: 0.3 },
          { pose: "peg2", dur: 0.3 },
          { pose: "peg3", dur: 0.3 },
          { pose: "bucket", dur: 0.4 }
        ], ballPoses),
        lifecycle: { start: 3 + i * 0.5, end: 8 + i * 0.5 }
      })
    ),

    // Normal distribution curve overlay
    group("normal_curve", {
      transform: { position: { coords: [640, 350] } },
      lifecycle: { start: 12, fadeIn: 2 },
      children: [
        // Bell curve using connected line segments
        shape("polyline", {
          id: "bell_curve",
          points: [
            ...Array.from({ length: 50 }, (_, i) => {
              const x = (i - 25) * 8;
              const sigma = 60;
              const height = Math.exp(-(x * x) / (2 * sigma * sigma)) * 80;
              return [x, -height] as [number, number];
            })
          ],
          style: {
            stroke: { color: "#ef4444", width: 4, linecap: "round" },
            opacity: 0.8
          }
        }),

        textNode({
          text: "Normal Distribution Emerges!",
          transform: { position: { coords: [0, -120] } },
          font: { family: "system-ui", size: 20, weight: 600 },
          style: { fill: { type: "solid", color: "#ef4444" } }
        })
      ]
    }),

    // Probability explanation
    group("probability_info", {
      transform: { position: { coords: [200, 150] } },
      lifecycle: { start: 8, fadeIn: 1 },
      children: [
        textNode({
          text: "Central Limit Theorem",
          transform: { position: { coords: [0, 0] } },
          font: { family: "system-ui", size: 18, weight: 700 },
          style: { fill: { type: "solid", color: "#3b82f6" } }
        }),
        
        textNode({
          text: "Sum of random events",
          transform: { position: { coords: [0, 25] } },
          font: { family: "system-ui", size: 14 },
          style: { fill: { type: "solid", color: "#94a3b8" } }
        }),
        
        textNode({
          text: "→ Normal distribution",
          transform: { position: { coords: [0, 45] } },
          font: { family: "system-ui", size: 14 },
          style: { fill: { type: "solid", color: "#94a3b8" } }
        })
      ]
    }),

    // Dice visualization in corner
    group("dice_demo", {
      transform: { position: { coords: [1000, 200] } },
      lifecycle: { start: 1, fadeIn: 1 },
      children: [
        textNode({
          text: "Each collision = coin flip",
          transform: { position: { coords: [0, -40] } },
          font: { family: "system-ui", size: 14 },
          style: { fill: { type: "solid", color: "#94a3b8" } }
        }),

        // Simplified dice/coin representation
        shape("rect", {
          size: [30, 30],
          transform: { 
            position: { coords: [-20, 0] },
            rotation: { angle: "t * 180" }
          },
          style: {
            fill: { type: "solid", color: "#3b82f6" },
            stroke: { color: "#1e40af", width: 2 },
            radius: 4
          }
        }),

        shape("rect", {
          size: [30, 30],
          transform: { 
            position: { coords: [20, 0] },
            rotation: { angle: "-t * 180" }
          },
          style: {
            fill: { type: "solid", color: "#ef4444" },
            stroke: { color: "#dc2626", width: 2 },
            radius: 4
          }
        }),

        textNode({
          text: "← or →",
          transform: { position: { coords: [0, 50] } },
          font: { family: "system-ui", size: 16, weight: 600 },
          style: { fill: { type: "solid", color: "#ffffff" } }
        })
      ]
    }),

    // Statistical information
    group("stats_info", {
      transform: { position: { coords: [1000, 450] } },
      lifecycle: { start: 15, fadeIn: 1 },
      children: [
        textNode({
          text: "μ = 0 (mean)",
          transform: { position: { coords: [0, 0] } },
          font: { family: "monospace", size: 14 },
          style: { fill: { type: "solid", color: "#22c55e" } }
        }),
        
        textNode({
          text: "σ² = n/4 (variance)",
          transform: { position: { coords: [0, 20] } },
          font: { family: "monospace", size: 14 },
          style: { fill: { type: "solid", color: "#22c55e" } }
        }),
        
        textNode({
          text: "n = number of rows",
          transform: { position: { coords: [0, 40] } },
          font: { family: "monospace", size: 12 },
          style: { fill: { type: "solid", color: "#94a3b8" } }
        })
      ]
    }),

    // Animation progress indicator
    textNode({
      id: "progress",
      text: "Drop balls → Collect in buckets → Normal curve emerges",
      textValue: `t < 5 ? "Drop balls..." : t < 12 ? "Collecting in buckets..." : "Normal curve emerges!"`,
      transform: { position: { coords: [640, 650] } },
      font: { family: "system-ui", size: 16 },
      style: { fill: { type: "solid", color: "#94a3b8" } }
    })
  ]
});