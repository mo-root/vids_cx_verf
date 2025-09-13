// Attention/Transformer Animation Demo
// Recreates the word attention patterns seen in transformer visualizations

import { scene, group, shape, textNode, poses, timeline, reactive } from "../src/dsl/index.js";

// Create poses for word highlighting and attention
const wordPoses = poses({
  idle: { 
    "style.fill.color": "#ffffff",
    "transform.scale.value": [1, 1],
    "style.opacity": 0.7
  },
  highlighted: { 
    "style.fill.color": "#3b82f6",
    "transform.scale.value": [1.1, 1.1],
    "style.opacity": 1
  },
  attending: {
    "style.fill.color": "#ef4444", 
    "transform.scale.value": [1.2, 1.2],
    "style.opacity": 1
  }
});

const connectionPoses = poses({
  hidden: { "style.opacity": 0, "style.stroke.width": 0 },
  visible: { "style.opacity": 0.8, "style.stroke.width": 3 }
});

export default scene({
  render: {
    width: 1280,
    height: 720,
    fps: 60,
    duration: 12,
    background: "#0f172a"
  },
  children: [
    // Title
    textNode({
      id: "title",
      text: "Attention Mechanism Visualization",
      transform: { 
        position: { coords: [640, 80] } 
      },
      font: { family: "system-ui", size: 32, weight: 700 },
      style: { fill: { type: "solid", color: "#ffffff" } }
    }),

    // Sentence words
    textNode({
      id: "word_a",
      text: "A",
      transform: { position: { coords: [200, 300] } },
      font: { family: "system-ui", size: 24, weight: 600 },
      style: { fill: { type: "solid", color: "#ffffff" } },
      perform: timeline({
        "0": { pose: "idle" },
        "2": { pose: "highlighted", dur: 0.3 },
        "3": { pose: "idle", dur: 0.3 },
        "8": { pose: "attending", dur: 0.4 },
        "9": { pose: "idle", dur: 0.3 }
      }, wordPoses)
    }),

    textNode({
      id: "word_fluffy",
      text: "fluffy",
      transform: { position: { coords: [300, 300] } },
      font: { family: "system-ui", size: 24, weight: 600 },
      style: { fill: { type: "solid", color: "#ffffff" } },
      perform: timeline({
        "0": { pose: "idle" },
        "3": { pose: "highlighted", dur: 0.3 },
        "4": { pose: "idle", dur: 0.3 },
        "6": { pose: "attending", dur: 0.4 },
        "7": { pose: "idle", dur: 0.3 }
      }, wordPoses)
    }),

    textNode({
      id: "word_blue",
      text: "blue",
      transform: { position: { coords: [420, 300] } },
      font: { family: "system-ui", size: 24, weight: 600 },
      style: { fill: { type: "solid", color: "#ffffff" } },
      perform: timeline({
        "0": { pose: "idle" },
        "4": { pose: "highlighted", dur: 0.3 },
        "5": { pose: "idle", dur: 0.3 },
        "6.5": { pose: "attending", dur: 0.4 },
        "7.5": { pose: "idle", dur: 0.3 }
      }, wordPoses)
    }),

    textNode({
      id: "word_creature",
      text: "creature",
      transform: { position: { coords: [520, 300] } },
      font: { family: "system-ui", size: 24, weight: 600 },
      style: { fill: { type: "solid", color: "#ffffff" } },
      perform: timeline({
        "0": { pose: "idle" },
        "5": { pose: "highlighted", dur: 0.3 },
        "6": { pose: "attending", dur: 1.5 },
        "8": { pose: "idle", dur: 0.3 }
      }, wordPoses)
    }),

    textNode({
      id: "word_roamed",
      text: "roamed",
      transform: { position: { coords: [680, 300] } },
      font: { family: "system-ui", size: 24, weight: 600 },
      style: { fill: { type: "solid", color: "#ffffff" } },
      perform: timeline({
        "0": { pose: "idle" },
        "7": { pose: "highlighted", dur: 0.3 },
        "8": { pose: "idle", dur: 0.3 }
      }, wordPoses)
    }),

    textNode({
      id: "word_forest",
      text: "forest",
      transform: { position: { coords: [800, 300] } },
      font: { family: "system-ui", size: 24, weight: 600 },
      style: { fill: { type: "solid", color: "#ffffff" } },
      perform: timeline({
        "0": { pose: "idle" },
        "8": { pose: "highlighted", dur: 0.3 },
        "9": { pose: "idle", dur: 0.3 }
      }, wordPoses)
    }),

    // Attention connections (lines showing relationships)
    shape("polyline", {
      id: "attention_fluffy_creature",
      points: [
        [300, 320], // From "fluffy"
        [350, 380], // Control point for curve
        [520, 320]  // To "creature"
      ],
      style: {
        stroke: { color: "#22c55e", width: 0, linecap: "round" },
        opacity: 0
      },
      perform: timeline({
        "0": { pose: "hidden" },
        "6": { pose: "visible", dur: 0.5 },
        "8": { pose: "hidden", dur: 0.5 }
      }, connectionPoses)
    }),

    shape("polyline", {
      id: "attention_blue_creature", 
      points: [
        [420, 320], // From "blue"
        [470, 380], // Control point
        [520, 320]  // To "creature"
      ],
      style: {
        stroke: { color: "#3b82f6", width: 0, linecap: "round" },
        opacity: 0
      },
      perform: timeline({
        "0": { pose: "hidden" },
        "6.5": { pose: "visible", dur: 0.5 },
        "8": { pose: "hidden", dur: 0.5 }
      }, connectionPoses)
    }),

    // Explanation text
    textNode({
      id: "explanation",
      text: "Words attend to each other based on semantic relationships",
      transform: { position: { coords: [640, 500] } },
      font: { family: "system-ui", size: 18 },
      style: { fill: { type: "solid", color: "#94a3b8" } },
      lifecycle: { start: 2, fadeIn: 1 }
    }),

    // Attention weight visualization
    group("attention_matrix", {
      transform: { position: { coords: [1000, 400] } },
      lifecycle: { start: 9, fadeIn: 1 },
      children: [
        textNode({
          text: "Attention Weights",
          transform: { position: { coords: [0, -40] } },
          font: { family: "system-ui", size: 16, weight: 600 },
          style: { fill: { type: "solid", color: "#ffffff" } }
        }),
        
        // Simplified attention matrix visualization
        shape("rect", {
          size: [120, 20],
          transform: { position: { coords: [0, 0] } },
          style: {
            fill: { 
              type: "gradient",
              angle: 0,
              stops: [
                { offset: 0, color: "#1e40af" },
                { offset: 0.7, color: "#3b82f6" },
                { offset: 1, color: "#60a5fa" }
              ]
            },
            stroke: { color: "#1e40af", width: 1 }
          }
        }),

        shape("rect", {
          size: [120, 20],
          transform: { position: { coords: [0, 25] } },
          style: {
            fill: { 
              type: "gradient",
              angle: 0,
              stops: [
                { offset: 0, color: "#166534" },
                { offset: 0.6, color: "#22c55e" },
                { offset: 1, color: "#4ade80" }
              ]
            },
            stroke: { color: "#166534", width: 1 }
          }
        })
      ]
    })
  ]
});