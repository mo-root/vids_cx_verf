# WorldScript Animation DSL

A TypeScript-based domain-specific language (DSL) for creating interactive animations and scenes. Inspired by modern animation frameworks, WorldScript provides a declarative approach to building complex, interactive visualizations.

## Features

- 🎨 **Declarative Scene Description** - Define animations using simple, readable syntax
- 🔄 **Expression-Based Animation** - Use mathematical expressions for dynamic behavior
- 🎭 **Pose-Driven Animation System** - Define keyframes and transitions between states
- 🖱️ **Interactive Elements** - Built-in support for draggable and interactive components
- 📊 **Data Visualization** - Create animated charts, graphs, and visualizations
- 🎮 **Real-time Animation** - Smooth 60fps animations with precise timing control

## Quick Start

```typescript
import { scene, shape, textNode } from "./src/dsl/api.js";

export default scene({
    render: {
        width: 1280,
        height: 720,
        fps: 60,
        duration: 5,
        background: "#0f172a"
    },
    children: [
        textNode({
            id: "title",
            text: "Hello World",
            transform: { position: { coords: [640, 50] } },
            font: { family: "system-ui", size: 24, weight: 700 },
            style: { fill: { type: "solid", color: "#ffffff" } }
        }),
        
        shape("ellipse", {
            id: "ball",
            size: [60, 60],
            transform: {
                position: { 
                    coords: [
                        "100 + t * 50",        // Move right over time
                        "200 + sin(t) * 30"    // Oscillate vertically
                    ]
                }
            },
            style: {
                fill: { type: "solid", color: "#ef4444" }
            }
        })
    ]
});
```

## Project Structure

```
worldscript/
├── src/
│   ├── dsl/
│   │   ├── api.ts      # Core API functions
│   │   └── types.ts    # TypeScript type definitions
│   └── index.ts        # Main exports
├── demos/
│   ├── basketball-shot.ts       # Basketball physics demo
│   ├── bouncing-ball.ts         # Ball animation with trails
│   ├── interactive-dashboard.ts # Interactive controls demo
│   └── run-demo.ts             # Demo runner
├── package.json
├── tsconfig.json
└── README.md
```

## Core Concepts

### Scene Structure
Every animation starts with a `scene()` that defines the canvas size, duration, and contains child elements.

### Elements
- **Shapes**: `shape("rect" | "ellipse" | "polyline", config)`
- **Text**: `textNode({ text: "Hello", ... })`
- **Groups**: `group("id", { children: [...] })`
- **Frames**: `frame("id", { layout: {...}, children: [...] })`

### Animation System
- **Poses**: Define animation states
- **Timeline**: Keyframe-based animations
- **Reactive**: Condition-based animations
- **Sequence**: Step-by-step animations

### Expressions
Use mathematical expressions for dynamic values:
```typescript
transform: {
    position: { coords: ["100 + t * 50", "200 + sin(t) * 30"] }
}
```

## Demos

### Basketball Shot
A physics-based basketball shooting animation with parabolic trajectory, rim interaction, and net effects.

### Bouncing Ball
Demonstrates realistic ball physics with trails, shadows, and information panels.

### Interactive Dashboard
Shows interactive controls with sliders, hover effects, and real-time parameter adjustment.

## Running Demos

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run demos
npm run demo
```

## API Reference

See the comprehensive API documentation in the code comments and type definitions. The DSL supports:

- Transform system (position, rotation, scale)
- Style system (fills, strokes, shadows)
- Animation system (poses, timelines, reactive)
- Interaction system (draggable elements)
- Expression evaluation
- Lifecycle management

## License

This project is part of the vids_cx_verf repository and follows the same licensing terms.