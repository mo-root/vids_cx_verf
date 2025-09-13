// Linear Algebra: Eigenvalue/Eigenvector Demo
// Recreates matrix transformation and eigenvalue visualization

import { scene, group, shape, textNode, poses, timeline, reactive } from "../src/dsl/index.js";

// Poses for vector transformations
const vectorPoses = poses({
  original: { 
    "transform.position.coords": [640, 360],
    "transform.rotation.angle": 0,
    "transform.scale.value": [1, 1]
  },
  transformed: { 
    "transform.position.coords": [740, 260],
    "transform.rotation.angle": 0,
    "transform.scale.value": [2, 2]
  },
  eigenvector1: {
    "transform.position.coords": [640, 360],
    "transform.rotation.angle": 0,
    "transform.scale.value": [2.5, 2.5]
  },
  eigenvector2: {
    "transform.position.coords": [640, 360], 
    "transform.rotation.angle": 90,
    "transform.scale.value": [1.5, 1.5]
  }
});

const gridPoses = poses({
  identity: { "transform.scale.value": [1, 1], "transform.rotation.angle": 0 },
  transformed: { "transform.scale.value": [1.5, 0.8], "transform.rotation.angle": 15 }
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
    // Title
    textNode({
      id: "title",
      text: "Eigenvalues and Eigenvectors",
      transform: { position: { coords: [640, 60] } },
      font: { family: "system-ui", size: 28, weight: 700 },
      style: { fill: { type: "solid", color: "#ffffff" } }
    }),

    // Matrix display
    group("matrix_display", {
      transform: { position: { coords: [150, 150] } },
      children: [
        textNode({
          text: "A = ",
          transform: { position: { coords: [0, 0] } },
          font: { family: "system-ui", size: 20, weight: 600 },
          style: { fill: { type: "solid", color: "#ffffff" } }
        }),
        
        // Matrix brackets and values
        shape("polyline", {
          points: [
            [40, -30],
            [50, -30],
            [50, 30],
            [40, 30]
          ],
          style: { stroke: { color: "#ffffff", width: 2 } }
        }),
        
        textNode({
          text: "2.5  0.5",
          transform: { position: { coords: [80, -10] } },
          font: { family: "monospace", size: 16 },
          style: { fill: { type: "solid", color: "#3b82f6" } }
        }),
        
        textNode({
          text: "0.5  1.5", 
          transform: { position: { coords: [80, 10] } },
          font: { family: "monospace", size: 16 },
          style: { fill: { type: "solid", color: "#3b82f6" } }
        }),
        
        shape("polyline", {
          points: [
            [120, -30],
            [130, -30],
            [130, 30],
            [120, 30]
          ],
          style: { stroke: { color: "#ffffff", width: 2 } }
        })
      ]
    }),

    // Coordinate grid
    group("coordinate_grid", {
      transform: { position: { coords: [640, 360] } },
      perform: timeline({
        "0": { pose: "identity" },
        "5": { pose: "transformed", dur: 2, ease: "easeInOutCubic" },
        "10": { pose: "identity", dur: 2, ease: "easeInOutCubic" }
      }, gridPoses),
      children: [
        // Grid lines
        ...Array.from({ length: 21 }, (_, i) => {
          const x = (i - 10) * 30;
          return shape("polyline", {
            id: `grid_v_${i}`,
            points: [
              [x, -300],
              [x, 300]
            ],
            style: {
              stroke: { color: "#374151", width: 1, opacity: 0.5 }
            }
          });
        }),
        
        ...Array.from({ length: 21 }, (_, i) => {
          const y = (i - 10) * 30;
          return shape("polyline", {
            id: `grid_h_${i}`,
            points: [
              [-300, y],
              [300, y]
            ],
            style: {
              stroke: { color: "#374151", width: 1, opacity: 0.5 }
            }
          });
        }),

        // Axes
        shape("polyline", {
          id: "x_axis",
          points: [[-300, 0], [300, 0]],
          style: { stroke: { color: "#6b7280", width: 2 } }
        }),
        
        shape("polyline", {
          id: "y_axis", 
          points: [[0, -300], [0, 300]],
          style: { stroke: { color: "#6b7280", width: 2 } }
        })
      ]
    }),

    // Standard basis vectors
    shape("polyline", {
      id: "basis_vector_i",
      points: [
        [640, 360],
        [700, 360]
      ],
      style: {
        stroke: { color: "#3b82f6", width: 4, linecap: "round" }
      },
      perform: timeline({
        "0": { pose: "original" },
        "5": { pose: "transformed", dur: 2 },
        "10": { pose: "original", dur: 2 }
      }, vectorPoses),
      lifecycle: { start: 1, fadeIn: 0.5 }
    }),

    shape("polyline", {
      id: "basis_vector_j",
      points: [
        [640, 360],
        [640, 300]
      ],
      style: {
        stroke: { color: "#ef4444", width: 4, linecap: "round" }
      },
      perform: timeline({
        "0": { pose: "original" },
        "5": { pose: "transformed", dur: 2 },
        "10": { pose: "original", dur: 2 }
      }, vectorPoses),
      lifecycle: { start: 1, fadeIn: 0.5 }
    }),

    // Eigenvector 1 (doesn't change direction, only scales)
    shape("polyline", {
      id: "eigenvector_1",
      points: [
        [640, 360],
        [730, 300]
      ],
      style: {
        stroke: { color: "#22c55e", width: 6, linecap: "round" }
      },
      perform: timeline({
        "0": { pose: "original" },
        "5": { pose: "eigenvector1", dur: 2 },
        "10": { pose: "original", dur: 2 }
      }, vectorPoses),
      lifecycle: { start: 8, fadeIn: 0.5 }
    }),

    // Eigenvector 2
    shape("polyline", {
      id: "eigenvector_2", 
      points: [
        [640, 360],
        [550, 340]
      ],
      style: {
        stroke: { color: "#f59e0b", width: 6, linecap: "round" }
      },
      perform: timeline({
        "0": { pose: "original" },
        "5": { pose: "eigenvector2", dur: 2 },
        "10": { pose: "original", dur: 2 }
      }, vectorPoses),
      lifecycle: { start: 8, fadeIn: 0.5 }
    }),

    // Labels
    textNode({
      id: "basis_label",
      text: "Standard basis vectors",
      transform: { position: { coords: [800, 300] } },
      font: { family: "system-ui", size: 16 },
      style: { fill: { type: "solid", color: "#94a3b8" } },
      lifecycle: { start: 2, end: 7.5 }
    }),

    textNode({
      id: "eigen_label",
      text: "Eigenvectors (direction preserved)",
      transform: { position: { coords: [800, 300] } },
      font: { family: "system-ui", size: 16 },
      style: { fill: { type: "solid", color: "#22c55e" } },
      lifecycle: { start: 8.5, fadeIn: 0.5 }
    }),

    // Eigenvalue equations
    group("eigenvalue_info", {
      transform: { position: { coords: [200, 500] } },
      lifecycle: { start: 9, fadeIn: 1 },
      children: [
        textNode({
          text: "Av₁ = λ₁v₁",
          transform: { position: { coords: [0, 0] } },
          font: { family: "system-ui", size: 18, weight: 600 },
          style: { fill: { type: "solid", color: "#22c55e" } }
        }),
        
        textNode({
          text: "λ₁ ≈ 2.8",
          transform: { position: { coords: [120, 0] } },
          font: { family: "system-ui", size: 16 },
          style: { fill: { type: "solid", color: "#22c55e" } }
        }),
        
        textNode({
          text: "Av₂ = λ₂v₂",
          transform: { position: { coords: [0, 25] } },
          font: { family: "system-ui", size: 18, weight: 600 },
          style: { fill: { type: "solid", color: "#f59e0b" } }
        }),
        
        textNode({
          text: "λ₂ ≈ 1.2",
          transform: { position: { coords: [120, 25] } },
          font: { family: "system-ui", size: 16 },
          style: { fill: { type: "solid", color: "#f59e0b" } }
        })
      ]
    }),

    // Animation phases explanation
    textNode({
      id: "phase_explanation",
      text: "Watch how the transformation affects different vectors",
      textValue: `t < 4 ? "Watch how the transformation affects different vectors" : t < 8 ? "Standard vectors change direction and magnitude" : "Eigenvectors only change magnitude!"`,
      transform: { position: { coords: [640, 650] } },
      font: { family: "system-ui", size: 16 },
      style: { fill: { type: "solid", color: "#94a3b8" } }
    })
  ]
});