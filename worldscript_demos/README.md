# WorldScript DSL Animation Demos

This project contains TypeScript demos using the WorldScript DSL to recreate animation concepts from 3Blue1Brown videos.

## Structure

- `src/dsl/` - Core WorldScript DSL API implementation
- `demos/` - Individual demo files showcasing different animation concepts

## Animation Concepts Recreated

1. **Attention/Text Animations** (`demos/attention_demo.ts`)
   - Word highlighting and attention patterns
   - Text-based transformer visualizations

2. **Convolution Visualizations** (`demos/convolution_demo.ts`)
   - Mathematical function convolutions
   - Continuous and discrete function animations

3. **Linear Algebra** (`demos/linalg_demo.ts`)
   - Eigenvalue and eigenvector demonstrations
   - Matrix transformation visualizations

4. **Probability Distributions** (`demos/probability_demo.ts`)
   - Galton board simulations
   - Dice animations and distribution morphing

5. **Visual Proofs** (`demos/visual_proof_demo.ts`)
   - Geometric proofs and transformations
   - Sphere slicing demonstrations

## Usage

```bash
npm install
npm run build
npm start
```

## DSL Features Used

- Scene creation with transforms and animations
- Pose-driven animation system
- Expression-based dynamic properties
- Interactive elements and dragging
- Timeline and reactive animations
- Mathematical function visualization