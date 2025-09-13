# WorldScript Animation DSL - Demo Showcase

This document showcases the capabilities of the WorldScript Animation DSL through several interactive demos.

## Demo 1: Simple Ball Animation

**Features Demonstrated:**
- Mathematical expressions for motion (`t * 125` for linear movement)
- Complex physics simulation with parabolic motion
- Multiple shape primitives (ellipse, rectangle, polyline)
- Transform system with position and rotation
- Style system with gradients and shadows
- Group hierarchy for organizing elements
- Text rendering with dynamic content
- Lifecycle management for element visibility

**Key Code Snippet:**
```typescript
shape("ellipse", {
    id: "ball",
    size: [60, 60],
    transform: {
        position: {
            coords: [
                "100 + t * 125", // Linear X movement
                "500 + (t < 4 ? -150 * t + 150 * (t - 2) * (t - 2) / 4 : ...)" // Parabolic Y
            ]
        }
    },
    style: {
        fill: { 
            type: "radial",
            center: [0.3, 0.3],
            radius: 0.8,
            stops: [
                { offset: 0, color: "#ff6b6b" },
                { offset: 1, color: "#dc2626" }
            ]
        }
    }
})
```

## Demo 2: Geometric Animation

**Features Demonstrated:**
- Complex nested group transformations
- Synchronized rotation animations (`t * 30` degrees per second)
- Array-based element generation
- Multi-layer visual effects
- Color interpolation with HSL
- Polyline shapes for custom geometry
- Mathematical wave generation
- Status panels with real-time information

**Key Code Snippet:**
```typescript
group("centerGroup", {
    transform: { 
        position: { coords: [640, 360] },
        rotation: { angle: "t * 30" } // Rotate 30 degrees per second
    },
    children: [
        // Orbiting squares with individual rotations
        ...Array.from({ length: 4 }, (_, i) => 
            shape("rect", {
                transform: {
                    position: {
                        coords: [
                            `${150 * Math.cos(i * Math.PI / 2)}`,
                            `${150 * Math.sin(i * Math.PI / 2)}`
                        ]
                    },
                    rotation: { angle: `t * 90 + ${i * 90}` }
                }
            })
        )
    ]
})
```

## Demo 3: Basketball Shot (Advanced)

**Features Demonstrated:**
- Complex physics-based animation (parabolic trajectory)
- Pose-driven animation system
- Timeline-based animations with easing
- Reactive animations based on conditions
- Advanced expression evaluation
- Multiple coordinate systems
- Interactive visual feedback
- Realistic motion simulation

**Key Code Snippet:**
```typescript
const ballPoses = poses({
    start: { "transform.position.coords": [180, 560] },
    arc: { "transform.position.coords": [650, 240] },
    basket: { "transform.position.coords": [1120, 380] }
});

// Basketball with parabolic motion
shape("ellipse", {
    id: "ball",
    transform: {
        position: {
            coords: [
                `180 + 940 * smoothstep(1, 4, t)`,
                `560 + -180 * smoothstep(1, 4, t) - 240 * 4 * smoothstep(1, 4, t) * (1 - smoothstep(1, 4, t))`
            ]
        }
    }
})
```

## Technical Features Showcased

### 1. Expression System
- Mathematical functions: `sin`, `cos`, `sqrt`, `abs`
- Interpolation functions: `smoothstep`, `mix`, `clamp`
- Time-based animation: `t` variable
- Conditional expressions: `t < 4 ? valueA : valueB`

### 2. Transform System
- **Position**: Static coordinates or dynamic expressions
- **Rotation**: Angle in degrees with customizable origin
- **Scale**: Uniform or non-uniform scaling

### 3. Style System
- **Solid fills**: Single color backgrounds
- **Gradient fills**: Linear and radial gradients with color stops
- **Strokes**: Customizable width, color, line caps, dash patterns
- **Shadows**: Multiple shadow effects with blur and spread

### 4. Shape Primitives
- **Rectangle**: With optional border radius
- **Ellipse**: Perfect circles or ovals
- **Polyline**: Custom paths and complex shapes

### 5. Animation System
- **Pose-driven**: Define states and transition between them
- **Timeline**: Keyframe-based animations with easing
- **Reactive**: Condition-based state changes
- **Expression-driven**: Real-time mathematical calculations

### 6. Layout & Organization
- **Groups**: Hierarchical organization with inherited transforms
- **Frames**: Auto-layout containers (planned feature)
- **Lifecycle**: Element visibility timing and transitions

## Performance Characteristics

- **60 FPS**: Smooth animation at 60 frames per second
- **Expression Evaluation**: Efficient mathematical computation
- **Hierarchical Rendering**: Optimized scene graph traversal
- **Memory Efficient**: Minimal object creation during animation

## Code Quality Features

- **TypeScript**: Full type safety and IDE support
- **Modular Design**: Clean separation of concerns
- **Extensible**: Easy to add new shapes, transforms, and effects
- **Declarative**: Clear, readable animation descriptions
- **Composable**: Reusable components and patterns

## Real-World Applications

This DSL is suitable for:
- Educational visualizations and animations
- Data visualization and interactive charts
- UI animation prototyping
- Game development and interactive media
- Scientific and mathematical demonstrations
- Presentation and storytelling tools

The WorldScript Animation DSL provides a powerful, expressive way to create complex animations using simple, declarative syntax while maintaining full control over timing, styling, and interaction.