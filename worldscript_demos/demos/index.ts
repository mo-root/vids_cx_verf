// Demo exports for WorldScript animations
// Each demo recreates concepts from 3Blue1Brown videos using the WorldScript DSL

import attentionDemo from './attention_demo.js';
import convolutionDemo from './convolution_demo.js';
import linalgDemo from './linalg_demo.js';
import probabilityDemo from './probability_demo.js';
import visualProofDemo from './visual_proof_demo.js';

export { 
  attentionDemo,
  convolutionDemo,
  linalgDemo,
  probabilityDemo,
  visualProofDemo
};

// Demo metadata for easy access
export const demoMetadata = {
  attention: {
    name: "Attention Mechanism Visualization",
    description: "Recreates transformer attention patterns showing word relationships",
    concepts: ["transformers", "attention", "text processing", "machine learning"],
    duration: 12
  },
  convolution: {
    name: "Mathematical Convolution",
    description: "Shows sliding function operation and area overlap computation",
    concepts: ["convolution", "mathematical functions", "signal processing", "integrals"],
    duration: 10
  },
  linalg: {
    name: "Eigenvalues and Eigenvectors",
    description: "Demonstrates matrix transformations and special vectors",
    concepts: ["linear algebra", "eigenvalues", "matrix transformations", "vector spaces"],
    duration: 15
  },
  probability: {
    name: "Galton Board & Normal Distribution",
    description: "Shows how random processes lead to normal distributions",
    concepts: ["probability", "central limit theorem", "normal distribution", "statistics"],
    duration: 20
  },
  visualProof: {
    name: "Circle Area Visual Proof",
    description: "Geometric proof of circle area formula through rearrangement",
    concepts: ["geometry", "visual proofs", "circle area", "mathematical reasoning"],
    duration: 16
  }
};

// Utility function to get all demo scenes
export function getAllDemos() {
  return {
    attentionDemo,
    convolutionDemo,
    linalgDemo,
    probabilityDemo,
    visualProofDemo
  };
}