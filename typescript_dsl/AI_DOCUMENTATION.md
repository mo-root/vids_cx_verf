# **AI Documentation for WorldScript Animation DSL (TypeScript Implementation)**

## **1. Quick Start Guide**

### **Basic Scene Structure**
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

### **Core Elements**
- **`scene()`** - Root container with render configuration
- **`group()`** - Container for organizing elements
- **`shape()`** - Visual elements (rect, ellipse, polyline)
- **`textNode()`** - Text elements
- **`frame()`** - Layout container with auto-layout

---

## **2. API Reference**

### **Scene Creation**
```typescript
scene(config: SceneInput): SceneInput
```
**Required Properties:**
- `render.width` - Canvas width in pixels
- `render.height` - Canvas height in pixels  
- `render.fps` - Frames per second
- `render.duration` - Scene duration in seconds
- `render.background` - Background color (hex, rgb, etc.)
- `children` - Array of scene elements

### **Element Creation**

#### **Shapes**
```typescript
shape(kind: "rect" | "ellipse" | "polyline", config: Partial<ShapeInput>)
```

**Rectangle Example:**
```typescript
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
```

**Ellipse Example:**
```typescript
shape("ellipse", {
    id: "myCircle",
    size: [80, 80],
    transform: { position: { coords: [400, 200] } },
    style: { fill: { type: "solid", color: "#ef4444" } }
})
```

**Polyline Example:**
```typescript
shape("polyline", {
    id: "myLine",
    points: [
        [100, 100],
        [200, 150],
        [300, 120],
        [400, 200]
    ],
    style: {
        stroke: { color: "#22c55e", width: 3 },
        dasharray: "5 5"
    }
})
```

#### **Text**
```typescript
textNode(config: Partial<TextInput> & { text: string })
```

**Example:**
```typescript
textNode({
    id: "title",
    text: "Hello World",
    transform: { position: { coords: [640, 50] } },
    font: { family: "system-ui", size: 24, weight: 700 },
    style: { fill: { type: "solid", color: "#ffffff" } }
})
```

#### **Groups**
```typescript
group(id: string, config: Partial<GroupInput>)
```

**Example:**
```typescript
group("car", {
    transform: { position: { coords: [200, 400] } },
    children: [
        shape("rect", { /* car body */ }),
        shape("ellipse", { /* wheels */ })
    ]
})
```

---

## **3. Transform System**

### **Position**
```typescript
transform: {
    position: {
        coords: [x, y],           // Static position
        origin?: "center" | "top-left" | "bottom-right" | [x, y]
    }
}
```

**Dynamic Position (Expressions):**
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

### **Rotation**
```typescript
transform: {
    rotation: {
        angle: 45,                 // Static angle (degrees)
        origin?: "center" | [x, y]
    }
}
```

**Dynamic Rotation:**
```typescript
transform: {
    rotation: {
        angle: "t * 180"           // Rotate 180 degrees per second
    }
}
```

### **Scale**
```typescript
transform: {
    scale: {
        value: [1.5, 0.8],         // Static scale [x, y]
        origin?: "center" | [x, y]
    }
}
```

**Dynamic Scale:**
```typescript
transform: {
    scale: {
        value: "1 + 0.2 * sin(t * 2)"  // Pulsing scale
    }
}
```

---

## **4. Style System**

### **Fill**
```typescript
style: {
    fill: {
        type: "solid",
        color: "#3b82f6"
    }
}
```

**Gradient Fill:**
```typescript
style: {
    fill: {
        type: "gradient",
        angle: 45,
        stops: [
            { offset: 0, color: "#3b82f6" },
            { offset: 1, color: "#1e40af" }
        ]
    }
}
```

**Radial Gradient:**
```typescript
style: {
    fill: {
        type: "radial",
        center: [0.5, 0.5],
        radius: 0.8,
        stops: [
            { offset: 0, color: "#ffffff" },
            { offset: 1, color: "#000000" }
        ]
    }
}
```

### **Stroke**
```typescript
style: {
    stroke: {
        color: "#1e40af",
        width: 2,
        linecap: "round",          // "round" | "square" | "butt"
        opacity: 0.8,
        dasharray: "5 5"           // Dashed line
    }
}
```

### **Shadows**
```typescript
style: {
    shadows: [
        {
            x: 2,
            y: 4,
            blur: 8,
            spread: 0,
            color: "rgba(0, 0, 0, 0.3)"
        }
    ]
}
```

### **Opacity**
```typescript
style: {
    opacity: 0.7                   // Static
    // or
    opacity: "0.5 + 0.5 * sin(t)"  // Dynamic
}
```

---

## **5. Expression System**

### **Built-in Functions**
```javascript
// Math constants
pi, tau

// Vector functions
vec2(x, y)           // Create vector [x, y]
len(v)               // Vector length
dot(a, b)            // Dot product
rotate2(v, angle)    // Rotate vector by angle

// Interpolation
clamp(value, min, max)           // Clamp value between min and max
mix(a, b, t)                     // Linear interpolation
step(edge, x)                    // Step function
smoothstep(e0, e1, x)            // Smooth step function

// Time
t                   // Current time in seconds
```

### **Element References**
```javascript
// Access other elements' properties
"ball.position.coords[0]"        // Ball's X position
"slider.position.coords[1]"      // Slider's Y position
"group.transform.scale"          // Group's scale
```

### **Expression Examples**
```typescript
// Follow another element
position: { coords: ["ball.position.coords[0]", "ball.position.coords[1] + 50"] }

// Oscillate between two values
position: { coords: ["mix(100, 500, 0.5 + 0.5 * sin(t))", 200] }

// Conditional positioning
position: { coords: ["t > 2 ? 400 : 200", 300] }

// Complex animation
rotation: { angle: "t * 90 + sin(t * 3) * 10" }
```

---

## **6. Animation System (Pose-Driven)**

### **Creating Poses**
```typescript
const myPoses = poses({
    start: { "transform.position.coords": [100, 200] },
    end: { "transform.position.coords": [500, 200] },
    bounce: { "transform.scale.value": [1.2, 0.8] }
});
```

### **Timeline Animation**
```typescript
perform: timeline({
    "0": { pose: "start" },
    "2": { pose: "end", dur: 1, ease: "easeInOutCubic" },
    "3": { pose: "bounce", dur: 0.2 }
}, myPoses)
```

### **Reactive Animation**
```typescript
perform: reactive({
    pose: {
        when: "ball.position.coords[0] > 400",
        use: "highlighted",
        else: "normal",
        transition: { dur: 0.3 }
    }
}, myPoses)
```

### **Sequence Animation**
```typescript
perform: sequence([
    { pose: "start", hold: 0.5 },
    { pose: "middle", dur: 1 },
    { pose: "end", dur: 0.5 }
], myPoses)
```

### **Parallel Animation**
```typescript
perform: parallel({
    position: timeline({ "0": { pose: "start" }, "2": { pose: "end" } }, myPoses),
    scale: timeline({ "1": { pose: "bounce" } }, myPoses)
})
```

---

## **7. Interaction System**

### **Draggable Elements**
```typescript
interaction: {
    draggable: true  // Free dragging
}
```

### **Constrained Dragging**
```typescript
interaction: {
    draggable: {
        axis: "x",                    // Only X-axis
        bounds: [-200, 200],          // X bounds
        boundsMode: "center",         // Constrain center or edges
        snap: 50                      // Snap to 50px grid
    }
}
```

### **2D Bounds**
```typescript
interaction: {
    draggable: {
        bounds: [100, 500, 200, 400], // [minX, maxX, minY, maxY]
        boundsMode: "edge"
    }
}
```

---

## **8. Lifecycle Management**

```typescript
lifecycle: {
    start: 1,        // Appear at 1 second
    end: 8,          // Disappear at 8 seconds
    fadeIn: 0.5,     // Fade in over 0.5 seconds
    fadeOut: 0.3     // Fade out over 0.3 seconds
}
```

---

## **9. Complete Example (TypeScript)**

```typescript
import { scene, group, shape, textNode, poses, timeline } from "./src/dsl/api.js";

const ballPoses = poses({
    start: { "transform.position.coords": [100, 500] },
    bounce: { "transform.scale.value": [1.2, 0.8] },
    end: { "transform.position.coords": [1100, 500] }
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
            text: "Bouncing Ball Demo",
            transform: { position: { coords: [640, 50] } },
            font: { family: "system-ui", size: 28, weight: 700 },
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
                "1": { pose: "bounce", dur: 0.1 },
                "1.1": { pose: "start", dur: 0.1 },
                "2": { pose: "end", dur: 2, ease: "easeInOutCubic" }
            }, ballPoses)
        }),
        
        shape("polyline", {
            id: "trajectory",
            points: [
                [100, 500],
                [640, 300],
                [1100, 500]
            ],
            style: {
                stroke: { color: "#22c55e", width: 2, dasharray: "5 5" }
            }
        })
    ]
});
```

---

## **10. Implementation Features**

### **Type Safety**
The TypeScript implementation provides full type safety for:
- Scene configuration
- Element properties
- Animation poses
- Expression validation
- Style definitions

### **Demos Included**
1. **Basic Shapes** - Staggered entrance animations
2. **Bouncing Ball** - Physics-inspired movement
3. **Mathematical Transforms** - Linear algebra visualizations
4. **Interactive Elements** - Draggable controls with reactive animations

### **Build System**
```bash
npm install     # Install dependencies
npm run build   # Compile TypeScript
npm run demo    # Run demo scenes
```

---

This TypeScript DSL implementation provides a complete animation framework inspired by 3Blue1Brown's mathematical animations, with type safety and comprehensive demos showcasing all features.