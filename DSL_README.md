# WorldScript Animation DSL

A powerful TypeScript-based Domain Specific Language (DSL) for creating mathematical and educational animations. This project recreates classic 3Blue1Brown-style animations using a declarative, expression-driven animation system.

## 🎯 Overview

This DSL provides a comprehensive framework for creating sophisticated animations with:

- **Declarative syntax** for defining scenes, shapes, and animations
- **Expression-driven animations** with mathematical functions
- **Pose-driven animation system** for complex state transitions
- **Interactive elements** with draggable components
- **Vector field simulations** and mathematical visualizations

## 🚀 Features

### Core Elements
- **Shapes**: rectangles, ellipses, polylines with full styling
- **Text**: dynamic text with font controls and mathematical expressions
- **Groups**: hierarchical organization of elements
- **Frames**: auto-layout containers

### Animation System
- **Timeline animations** with keyframes and easing
- **Reactive animations** based on conditions
- **Sequence and parallel** animation composition
- **Pose-based state management**

### Mathematical Expressions
- Built-in math functions (sin, cos, mix, smoothstep, etc.)
- Vector operations and transformations
- Element property references
- Conditional logic and interpolation

### Interaction
- Draggable elements with constraints
- Bounds and snap-to-grid functionality
- Mouse and touch input handling

## 📁 Project Structure

```
src/
├── dsl/
│   ├── api.js          # Main DSL API
│   └── types.ts        # TypeScript type definitions

dsl_demos/
├── basketball_shot/           # Physics-based ball trajectory
├── name_flow_animation/       # Vector field text animation
├── grid_flip_animation/       # Pattern-based grid transformations
└── linear_transformation/     # Mathematical function visualization
```

## 🎬 Demo Animations

### 1. Basketball Shot (`dsl_demos/basketball_shot/`)
Recreates a physics-based basketball shot with:
- Parabolic trajectory motion
- Rim impact animation
- Court visualization
- Player silhouette

### 2. Name Flow Animation (`dsl_demos/name_flow_animation/`)
Inspired by 3Blue1Brown's name animation:
- Text stroke decomposition
- Vector field simulation
- Swirling motion patterns
- Progressive restoration

### 3. Grid Flip Animation (`dsl_demos/grid_flip_animation/`)
Pattern-based grid transformations:
- 10x10 interactive grid
- Pattern highlighting (every nth square)
- Color and rotation transitions
- Character celebration

### 4. Linear Transformation (`dsl_demos/linear_transformation/`)
Mathematical concept visualization:
- Function vs transformation comparison
- Scalar to vector progression
- Input/output visualization
- Educational annotations

## 🛠️ Installation & Setup

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Run demos (after implementing a runtime)
npm run demo:basketball
npm run demo:nameflow
npm run demo:gridflip
npm run demo:linear
```

## 📖 API Documentation

### Scene Creation
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
        // Your elements here
    ]
});
```

### Shape Elements
```typescript
// Rectangle
shape("rect", {
    id: "myRect",
    size: [100, 50],
    transform: { pos: [200, 300] },
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

// Polyline/Path
shape("polyline", {
    points: [[100, 100], [200, 150], [300, 120]],
    style: { stroke: { color: "#22c55e", width: 3 } }
})
```

### Text Elements
```typescript
textNode({
    text: "Hello World",
    transform: { pos: [640, 50] },
    font: { family: "system-ui", size: 24, weight: 700 },
    style: { fill: { type: "solid", color: "#ffffff" } }
})
```

### Animations
```typescript
// Define poses
const myPoses = poses({
    start: { "transform.position.coords": [100, 200] },
    end: { "transform.position.coords": [500, 200] }
});

// Timeline animation
perform: timeline({
    "0": { pose: "start" },
    "2": { pose: "end", dur: 1, ease: "easeInOutCubic" }
}, myPoses)

// Expression-driven animation
transform: {
    position: {
        coords: [
            "100 + t * 50",        // Move right over time
            "200 + sin(t) * 30"    // Oscillate vertically
        ]
    }
}
```

### Mathematical Expressions
```typescript
// Time-based animations
"100 + t * 50"                    // Linear motion
"200 + sin(t * 2) * 30"          // Sinusoidal oscillation
"mix(100, 500, smoothstep(0, 2, t))" // Smooth interpolation

// Element references
"ball.position.coords[0] + 50"    // Follow another element
"slider.value * 2"                // Use slider input

// Conditional expressions
"t > 2 ? 400 : 200"              // Conditional positioning
```

## 🎨 Style System

### Fill Styles
```typescript
// Solid color
fill: { type: "solid", color: "#3b82f6" }

// Linear gradient
fill: {
    type: "gradient",
    angle: 45,
    stops: [
        { offset: 0, color: "#3b82f6" },
        { offset: 1, color: "#1e40af" }
    ]
}

// Radial gradient
fill: {
    type: "radial",
    center: [0.5, 0.5],
    radius: 0.8,
    stops: [/* ... */]
}
```

### Stroke Styles
```typescript
stroke: {
    color: "#1e40af",
    width: 2,
    linecap: "round",
    opacity: 0.8,
    dasharray: "5 5"
}
```

## 🎯 Interaction System

```typescript
// Basic dragging
interaction: { draggable: true }

// Constrained dragging
interaction: {
    draggable: {
        axis: "x",                    // Only horizontal
        bounds: [-200, 200],          // X bounds
        snap: 50                      // Snap to grid
    }
}
```

## 🧮 Mathematical Functions

Built-in expression functions:
- `sin(x)`, `cos(x)`, `tan(x)` - Trigonometric
- `mix(a, b, t)` - Linear interpolation
- `smoothstep(e0, e1, x)` - Smooth step function
- `clamp(value, min, max)` - Clamp to range
- `vec2(x, y)` - Vector creation
- `len(v)`, `dot(a, b)` - Vector operations

## 🔧 Advanced Features

### Program System
```typescript
programLite<State, Params>({
    init: () => initialState,
    tick: (state, dt, params, nodes) => {
        // Update state each frame
    },
    scene: (state, params) => {
        // Return scene based on current state
    }
})
```

### Lifecycle Management
```typescript
lifecycle: {
    start: 1,        // Appear at 1 second
    end: 8,          // Disappear at 8 seconds
    fadeIn: 0.5,     // Fade in duration
    fadeOut: 0.3     // Fade out duration
}
```

## 🎓 Educational Use Cases

This DSL is perfect for creating:
- **Mathematical visualizations** (linear algebra, calculus, geometry)
- **Physics simulations** (mechanics, waves, fields)
- **Computer science concepts** (algorithms, data structures)
- **Interactive demonstrations** and educational content

## 🤝 Contributing

Contributions are welcome! This DSL framework can be extended with:
- Additional shape types
- New mathematical functions
- Enhanced animation systems
- More interaction patterns
- Runtime implementations

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

Inspired by the educational animation work of 3Blue1Brown and the Manim animation library. This DSL aims to make mathematical animation creation more accessible and expressive.