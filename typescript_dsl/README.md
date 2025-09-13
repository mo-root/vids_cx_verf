# WorldScript Animation DSL

A TypeScript DSL for creating animations inspired by WorldScript concepts and 3Blue1Brown's animation style.

## Overview

This project provides a declarative TypeScript API for creating sophisticated animations with:
- **Scene composition** with shapes, text, and groups
- **Transform animations** using poses and timelines
- **Interactive elements** with drag controls
- **Mathematical expressions** for dynamic properties
- **Visual effects** like gradients and shadows
- **Lifecycle management** for element appearance

## Quick Start

```typescript
import { scene, shape, textNode, poses, timeline } from "./src/dsl/api.js";

const myPoses = poses({
    start: { "transform.position.coords": [100, 200] },
    end: { "transform.position.coords": [500, 200] }
});

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
            font: { family: "system-ui", size: 32, weight: 700 },
            style: { fill: { type: "solid", color: "#ffffff" } }
        }),
        
        shape("ellipse", {
            id: "ball",
            size: [60, 60],
            style: {
                fill: { type: "solid", color: "#ef4444" },
                stroke: { color: "#dc2626", width: 2 }
            },
            perform: timeline({
                "0": { pose: "start" },
                "2": { pose: "end", dur: 2, ease: "easeInOutCubic" }
            }, myPoses)
        })
    ]
});
```

## Core API

### Scene Creation
- `scene(config)` - Create a scene with render settings and children
- `shape(kind, config)` - Create shapes (rect, ellipse, polyline)
- `textNode(config)` - Create text elements
- `group(id, config)` - Create container groups
- `frame(id, config)` - Create layout frames

### Animation System
- `poses(collection)` - Define reusable animation states
- `timeline(steps, poses)` - Create time-based animations
- `reactive(condition, poses)` - Create condition-based animations
- `sequence(steps, poses)` - Create sequential animations
- `parallel(config)` - Create parallel animations

### Interactive Elements
- Draggable elements with bounds and constraints
- Reactive animations based on element states
- Expression-based property binding

## Demos

### 1. Basic Shapes (`basic-shapes.ts`)
Demonstrates fundamental shape creation and staggered entrance animations.

### 2. Bouncing Ball (`bouncing-ball.ts`)
Physics-inspired animation with trajectory path and realistic easing.

### 3. Mathematical Transforms (`math-transforms.ts`)
Linear algebra visualization showing scale, rotation, and shear transformations.

### 4. Interactive Demo (`interactive-demo.ts`)
Draggable controller with reactive elements and particle system.

## Building and Running

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run demo
npm run demo
```

## Features Demonstrated

### Transform System
```typescript
transform: {
    position: { coords: [x, y] },
    rotation: { angle: degrees },
    scale: { value: [scaleX, scaleY] }
}
```

### Expression System
```typescript
// Dynamic positioning
coords: ["controller.position.coords[0] + 200", "mix(200, 500, t)"]

// Conditional styling
color: "t > 3 ? '#ef4444' : '#3b82f6'"

// Mathematical functions
angle: "t * 180 + sin(t * 3) * 10"
```

### Style System
```typescript
style: {
    fill: { 
        type: "radial",
        center: [0.3, 0.3],
        radius: 0.8,
        stops: [
            { offset: 0, color: "#fbbf24" },
            { offset: 1, color: "#f59e0b" }
        ]
    },
    stroke: { color: "#d97706", width: 2 },
    shadows: [{ x: 3, y: 6, blur: 12, color: "rgba(0, 0, 0, 0.4)" }]
}
```

### Interaction System
```typescript
interaction: {
    draggable: {
        bounds: [100, 1100, 200, 500],
        boundsMode: "center"
    }
}
```

## Architecture

- **Types** (`types.ts`) - Core type definitions
- **Interfaces** (`interfaces.ts`) - Element input interfaces  
- **API** (`api.ts`) - Builder functions and utilities
- **Demos** (`demos/`) - Example scenes showcasing features

## Inspiration

This DSL is inspired by:
- 3Blue1Brown's mathematical animation style
- WorldScript's declarative scene composition
- React's component-based architecture
- CSS transforms and animations

## Future Enhancements

- SVG/Canvas rendering backend
- More easing functions and effects
- Audio synchronization
- Performance optimization
- Visual editor interface

## License

MIT License - see LICENSE file for details.