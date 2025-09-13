# WorldScript DSL Animation Demos

This project recreates animation concepts from 3Blue1Brown videos using the WorldScript DSL. Each demo showcases different mathematical and educational concepts through interactive animations.

## 🎯 Animation Concepts Recreated

### 1. **Attention Mechanism Visualization** (`demos/attention_demo.ts`)
- **Duration**: 12 seconds
- **Concepts**: Transformers, attention patterns, text processing, machine learning
- **Features**:
  - Word highlighting with color-coded attention
  - Dynamic attention lines between related words
  - Progressive revelation of relationships
  - Attention weight matrix visualization

### 2. **Mathematical Convolution** (`demos/convolution_demo.ts`)
- **Duration**: 10 seconds  
- **Concepts**: Convolution, mathematical functions, signal processing, integrals
- **Features**:
  - Sliding function animation (g(x) over f(x))
  - Real-time convolution result building
  - Visual multiplication region indicator
  - Mathematical formula display

### 3. **Eigenvalues and Eigenvectors** (`demos/linalg_demo.ts`)
- **Duration**: 15 seconds
- **Concepts**: Linear algebra, eigenvalues, matrix transformations, vector spaces
- **Features**:
  - Interactive coordinate grid transformation
  - Standard basis vectors vs eigenvectors
  - Visual demonstration that eigenvectors preserve direction
  - Real-time eigenvalue calculations

### 4. **Galton Board & Normal Distribution** (`demos/probability_demo.ts`)
- **Duration**: 20 seconds
- **Concepts**: Probability, central limit theorem, normal distribution, statistics
- **Features**:
  - Animated ball dropping through pegs
  - Progressive bucket filling
  - Emergence of normal distribution curve
  - Central Limit Theorem explanation

### 5. **Circle Area Visual Proof** (`demos/visual_proof_demo.ts`)
- **Duration**: 16 seconds
- **Concepts**: Geometry, visual proofs, circle area, mathematical reasoning
- **Features**:
  - Circle slicing animation
  - Rearrangement into rectangle
  - Step-by-step formula derivation
  - QED completion

## 🛠️ WorldScript DSL Features Demonstrated

### Core API Usage
- `scene()` - Root scene creation with render configuration
- `group()` - Element organization and collective transformations
- `shape()` - Geometric primitives (rectangles, ellipses, polylines)
- `textNode()` - Dynamic text with mathematical expressions

### Transform System
- **Position**: Static and expression-based positioning
- **Rotation**: Animated rotations with custom origins
- **Scale**: Uniform and non-uniform scaling

### Animation System
- **Poses**: Declarative animation states
- **Timeline**: Keyframe-based animations
- **Reactive**: Condition-based state changes
- **Sequence**: Step-by-step animation chains
- **Parallel**: Simultaneous multi-property animations

### Style System
- **Fill**: Solid colors and gradients
- **Stroke**: Customizable borders with dash patterns
- **Opacity**: Dynamic transparency effects
- **Shadows**: Depth and visual enhancement

### Advanced Features
- **Expression System**: Mathematical formulas with time variables
- **Lifecycle Management**: Element appearance/disappearance timing
- **Interactive Elements**: Draggable components with constraints
- **Driver System**: Time-based animation controllers

## 🚀 Getting Started

### Installation
```bash
cd worldscript_demos
npm install
```

### Build
```bash
npm run build
```

### Run Demos
```bash
npm start
```

### Development
```bash
npm run dev  # Watch mode for development
```

## 📁 Project Structure

```
worldscript_demos/
├── src/
│   ├── dsl/           # Core WorldScript DSL implementation
│   │   ├── types.ts   # Type definitions
│   │   ├── api.ts     # Scene builder functions
│   │   ├── animation.ts # Animation system
│   │   └── index.ts   # Main DSL exports
│   └── index.ts       # Main entry point
├── demos/             # Individual animation demos
│   ├── attention_demo.ts
│   ├── convolution_demo.ts
│   ├── linalg_demo.ts
│   ├── probability_demo.ts
│   ├── visual_proof_demo.ts
│   └── index.ts       # Demo exports
├── dist/              # Compiled TypeScript output
├── package.json
├── tsconfig.json
└── README.md
```

## 🎨 Animation Techniques Showcased

### Mathematical Visualization
- Function plotting with discrete approximations
- Coordinate system transformations
- Vector field representations
- Geometric proof animations

### Educational Storytelling
- Progressive concept revelation
- Interactive exploration elements
- Multi-stage explanations
- Visual-mathematical connections

### Technical Implementation
- Expression-driven animations
- State-based animation management
- Conditional rendering and styling
- Performance-optimized rendering

## 🔧 DSL Architecture

The WorldScript DSL provides a declarative approach to creating mathematical animations:

1. **Scene Definition**: Comprehensive render configuration
2. **Element Composition**: Hierarchical scene graph structure
3. **Animation Declaration**: Pose-driven animation system
4. **Expression Integration**: Mathematical formula embedding
5. **Interactive Enhancement**: User interaction capabilities

This implementation demonstrates how the same powerful concepts from Manim (used in 3Blue1Brown videos) can be expressed in a TypeScript DSL, making mathematical animation accessible to web developers and educators.

## 📝 License

MIT License - Feel free to use these demos as learning resources or starting points for your own mathematical visualizations.