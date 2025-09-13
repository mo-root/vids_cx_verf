// Convolution Visualization Demo
// Recreates the mathematical convolution animations showing sliding function operations

import { scene, group, shape, textNode, poses, timeline, driver } from "../src/dsl/index.js";

// Create poses for the sliding animation
const slidingPoses = poses({
  start: { "transform.position.coords": [-300, 0] },
  end: { "transform.position.coords": [300, 0] }
});

const highlightPoses = poses({
  normal: { "style.fill.color": "#3b82f6", "style.opacity": 0.7 },
  highlighted: { "style.fill.color": "#ef4444", "style.opacity": 1 }
});

// Driver for continuous sliding motion
const slideDriver = driver({
  start: 2,
  dur: 6,
  ease: "linear",
  loop: false
});

export default scene({
  render: {
    width: 1280,
    height: 720,
    fps: 60,
    duration: 10,
    background: "#0f172a"
  },
  children: [
    // Title
    textNode({
      id: "title",
      text: "Convolution: f * g",
      transform: { position: { coords: [640, 80] } },
      font: { family: "system-ui", size: 32, weight: 700 },
      style: { fill: { type: "solid", color: "#ffffff" } }
    }),

    // Function f(x) - Fixed function
    group("function_f", {
      transform: { position: { coords: [640, 250] } },
      children: [
        textNode({
          text: "f(x)",
          transform: { position: { coords: [-350, -30] } },
          font: { family: "system-ui", size: 20, weight: 600 },
          style: { fill: { type: "solid", color: "#3b82f6" } }
        }),

        // Bell curve representation using rectangles
        ...Array.from({ length: 20 }, (_, i) => {
          const x = (i - 10) * 30;
          const height = Math.exp(-(x * x) / 8000) * 80;
          return shape("rect", {
            id: `f_bar_${i}`,
            size: [25, height],
            transform: { 
              position: { coords: [x, -height / 2] } 
            },
            style: {
              fill: { type: "solid", color: "#3b82f6" },
              stroke: { color: "#1e40af", width: 1 }
            }
          });
        })
      ]
    }),

    // Function g(x) - Sliding function (flipped)
    group("function_g", {
      transform: { 
        position: { 
          coords: [`640 + ${slideDriver} * 600 - 300`, 400] 
        } 
      },
      children: [
        textNode({
          text: "g(-x)",
          transform: { position: { coords: [0, -60] } },
          font: { family: "system-ui", size: 20, weight: 600 },
          style: { fill: { type: "solid", color: "#22c55e" } }
        }),

        // Triangle function using rectangles
        ...Array.from({ length: 12 }, (_, i) => {
          const x = (i - 6) * 20;
          const height = Math.max(0, 60 - Math.abs(x) * 1.5);
          return shape("rect", {
            id: `g_bar_${i}`,
            size: [18, height],
            transform: { 
              position: { coords: [x, -height / 2] } 
            },
            style: {
              fill: { type: "solid", color: "#22c55e" },
              stroke: { color: "#166534", width: 1 },
              opacity: 0.8
            }
          });
        })
      ]
    }),

    // Convolution result - builds up over time
    group("convolution_result", {
      transform: { position: { coords: [640, 550] } },
      children: [
        textNode({
          text: "(f * g)(x)",
          transform: { position: { coords: [-350, -30] } },
          font: { family: "system-ui", size: 20, weight: 600 },
          style: { fill: { type: "solid", color: "#f59e0b" } }
        }),

        // Result curve - appears progressively
        ...Array.from({ length: 30 }, (_, i) => {
          const x = (i - 15) * 20;
          const t_appear = 2 + (i / 30) * 6; // Appears progressively during slide
          
          // Approximate convolution result height
          const height = Math.exp(-((x - 100) * (x - 100)) / 15000) * 50 + 
                        Math.exp(-((x + 100) * (x + 100)) / 15000) * 50;
          
          return shape("rect", {
            id: `conv_bar_${i}`,
            size: [18, height],
            transform: { 
              position: { coords: [x, -height / 2] } 
            },
            style: {
              fill: { type: "solid", color: "#f59e0b" },
              stroke: { color: "#d97706", width: 1 }
            },
            lifecycle: { 
              start: t_appear, 
              fadeIn: 0.2 
            }
          });
        })
      ]
    }),

    // Multiplication region indicator
    shape("rect", {
      id: "multiplication_region",
      size: [100, 200],
      transform: { 
        position: { 
          coords: [`640 + ${slideDriver} * 600 - 300`, 325] 
        } 
      },
      style: {
        fill: { type: "solid", color: "rgba(255, 255, 255, 0.1)" },
        stroke: { color: "#ffffff", width: 2, dasharray: "5 5" }
      },
      lifecycle: { start: 2, end: 8 }
    }),

    // Explanation text
    textNode({
      id: "explanation1",
      text: "g(x) slides across f(x), computing the area of overlap at each position",
      transform: { position: { coords: [640, 650] } },
      font: { family: "system-ui", size: 16 },
      style: { fill: { type: "solid", color: "#94a3b8" } },
      lifecycle: { start: 1, fadeIn: 1 }
    }),

    // Mathematical formula
    group("formula", {
      transform: { position: { coords: [200, 150] } },
      lifecycle: { start: 0.5, fadeIn: 1 },
      children: [
        textNode({
          text: "(f * g)(x) = ∫ f(τ)g(x-τ) dτ",
          transform: { position: { coords: [0, 0] } },
          font: { family: "system-ui", size: 18, weight: 600 },
          style: { fill: { type: "solid", color: "#ffffff" } }
        })
      ]
    }),

    // Arrow showing direction
    shape("polyline", {
      id: "direction_arrow",
      points: [
        [300, 480],
        [380, 480],
        [370, 470],
        [380, 480],
        [370, 490]
      ],
      style: {
        stroke: { color: "#22c55e", width: 3, linecap: "round" }
      },
      lifecycle: { start: 2, end: 8 }
    })
  ]
});