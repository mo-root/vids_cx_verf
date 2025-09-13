# Animation DSL

A TypeScript-based Domain Specific Language (DSL) for creating mathematical and educational animations, inspired by 3Blue1Brown's animation style and the WorldScript system.

## Overview

This DSL provides a declarative way to create complex animations with:
- **Scene Creation**: Define render settings, dimensions, and duration
- **Elements**: Shapes, text, groups, and frames with rich styling
- **Transforms**: Position, rotation, and scale with expression support
- **Animations**: Pose-driven system with timeline and reactive animations
- **Interactions**: Draggable elements with constraints
- **Expressions**: Mathematical expressions for dynamic behavior

## Project Structure

```
animation_dsl/
├── src/dsl/                    # Core DSL implementation
│   ├── types.ts               # Type definitions
│   └── api.ts                 # Main API functions
└── demos/                     # Example animations
    ├── basketball/            # Basketball shot animation
    ├── math_visualization/    # Mathematical visualizations
    └── basic_animations/      # Simple animation examples
```

## Core API

### Scene Creation
```typescript
import { scene } from "./src/dsl/api.js";

export default scene({
    render: {
        width: 1280,
        height: 720,
        fps: 60,
        duration: 5,
        background: "#0f172a"
    },
    children: [
        // Your elements here
    ]
});
```

### Elements

#### Shapes
```typescript
import { shape } from "./src/dsl/api.js";

// Rectangle
shape("rect", {
    id: "myRect",
    size: [100, 50],
    transform: { position: { coords: [200, 300] } },
    style: {
        fill: { type: "solid", color: "#3b82f6" },
        stroke: { color: "#1e40af", width: 2 },
        radius: 8
    }
})

// Circle/Ellipse
shape("ellipse", {
    id: "myCircle",
    size: [80, 80],
    style: { fill: { type: "solid", color: "#ef4444" } }
})

// Line/Polyline
shape("polyline", {
    id: "myLine",
    points: [[100, 100], [200, 150], [300, 120]],
    style: { stroke: { color: "#22c55e", width: 3 } }
})
```

#### Text
```typescript
import { textNode } from "./src/dsl/api.js";

textNode({
    id: "title",
    text: "Hello World",
    font: { family: "system-ui", size: 24, weight: 700 },
    style: { fill: { type: "solid", color: "#ffffff" } }
})
```

### Transforms with Expressions

#### Static Position
```typescript
transform: {
    position: { coords: [640, 360] }
}
```

#### Dynamic Position (Expressions)
```typescript
transform: {
    position: {
        coords: [
            "100 + t * 50",        // Move right over time
            "200 + sin(t) * 30"    // Oscillate vertically
        ]
    }
}
```

#### Rotation and Scale
```typescript
transform: {
    rotation: { angle: "t * 180" },           // Rotate 180° per second
    scale: { value: "1 + 0.2 * sin(t * 2)" } // Pulsing scale
}
```

### Animations

#### Pose-Driven System
```typescript
import { poses, timeline } from "./src/dsl/api.js";

const ballPoses = poses({
    start: { "transform.position.coords": [100, 500] },
    end: { "transform.position.coords": [1100, 500] },
    bounce: { "transform.scale.value": [1.2, 0.8] }
});

// Timeline animation
perform: timeline({
    "0": { pose: "start" },
    "2": { pose: "end", dur: 1, ease: "easeInOutCubic" },
    "3": { pose: "bounce", dur: 0.2 }
}, ballPoses)
```

#### Reactive Animations
```typescript
import { reactive } from "./src/dsl/api.js";

perform: reactive({
    pose: {
        when: "ball.position.coords[0] > 400",
        use: "highlighted",
        else: "normal",
        transition: { dur: 0.3 }
    }
}, myPoses)
```

### Interactions

#### Draggable Elements
```typescript
interaction: {
    draggable: {
        axis: "x",                    // Constrain to X-axis
        bounds: [100, 500],          // X bounds
        snap: 50                     // Snap to grid
    }
}
```

### Built-in Expression Functions

```javascript
// Math constants and functions
t                    // Current time in seconds
pi, tau              // Mathematical constants
sin(x), cos(x), tan(x)
abs(x), sqrt(x), pow(x, y)
min(a, b), max(a, b)

// Interpolation
mix(a, b, t)         // Linear interpolation
smoothstep(e0, e1, x) // Smooth step function
clamp(value, min, max) // Clamp value

// Vector operations
vec2(x, y)           // Create vector
len(v)               // Vector length
dot(a, b)            // Dot product
rotate2(v, angle)    // Rotate vector

// Element references
"elementId.position.coords[0]"  // Access other elements
```

## Demo Animations

### 1. Basketball Shot (`demos/basketball/basketball_shot.ts`)
A realistic basketball shot animation featuring:
- Parabolic ball trajectory
- Player shooting motion
- Rim and net reactions
- Physics-based timing

### 2. Linear Transformation (`demos/math_visualization/linear_transformation.ts`)
Mathematical visualization showing:
- 2D coordinate system
- Basis vector transformations
- Matrix representation
- Determinant calculation

### 3. Bouncing Ball (`demos/basic_animations/bouncing_ball.ts`)
Simple physics demonstration with:
- Gravity simulation
- Collision detection
- Shadow effects
- Real-time physics data

### 4. Interactive Pendulum (`demos/basic_animations/interactive_pendulum.ts`)
Interactive physics simulation featuring:
- Draggable pendulum bob
- Real-time physics calculations
- Energy conservation display
- Constraint visualization

## Expression System Features

### Mathematical Expressions
The DSL supports complex mathematical expressions for dynamic animations:

```typescript
// Orbital motion
position: {
    coords: [
        "400 + 200 * cos(t)",
        "300 + 200 * sin(t)"
    ]
}

// Conditional behavior
style: {
    fill: { 
        type: "solid", 
        color: "t > 3 ? '#ef4444' : '#3b82f6'" 
    }
}

// Following other elements
position: {
    coords: [
        "leader.position.coords[0] + 50",
        "leader.position.coords[1]"
    ]
}
```

### Animation Patterns

#### Staggered Animations
```typescript
// Multiple elements with delayed timing
...Array.from({ length: 5 }, (_, i) => 
    shape("rect", {
        id: `item${i}`,
        perform: timeline({
            [`${i * 0.2}`]: { pose: "hidden" },
            [`${i * 0.2 + 0.5}`]: { pose: "visible" }
        }, poses)
    })
)
```

#### Physics Simulation
```typescript
// Spring-damper system
position: {
    coords: [
        "mix(restX, targetX, smoothstep(0, 1, t))",
        "mix(restY, targetY, smoothstep(0, 1, t))"
    ]
}
```

## Design Philosophy

This DSL follows the WorldScript philosophy of:
1. **Declarative**: Describe what you want, not how to achieve it
2. **Expression-Driven**: Use mathematical expressions for dynamic behavior
3. **Pose-Driven**: Define animation states and transitions
4. **Composable**: Build complex animations from simple components
5. **Interactive**: Support user interaction and real-time updates

## Inspired by 3Blue1Brown

The animations and mathematical visualizations are inspired by the educational style of 3Blue1Brown, featuring:
- Clean, mathematical aesthetics
- Step-by-step visual explanations
- Interactive demonstrations
- Real-time calculations and displays
- Educational narrative structure

## Getting Started

1. Import the DSL API:
```typescript
import { scene, shape, textNode, poses, timeline } from "./src/dsl/api.js";
```

2. Create your first scene:
```typescript
export default scene({
    render: { width: 1280, height: 720, fps: 60, duration: 5, background: "#0f172a" },
    children: [
        textNode({
            text: "Hello Animation DSL!",
            transform: { position: { coords: [640, 360] } },
            style: { fill: { type: "solid", color: "#ffffff" } }
        })
    ]
});
```

3. Add animations and interactions as needed
4. Export as a module for use in your animation system

## Future Extensions

Potential areas for expansion:
- 3D transformations and elements
- Audio synchronization
- Advanced particle systems
- Complex mathematical plotting
- Real-time data visualization
- Export to various animation formats