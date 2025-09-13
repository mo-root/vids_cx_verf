// Core API functions for the WorldScript Animation DSL

import {
  SceneInput,
  ElementInput,
  ShapeInput,
  TextInput,
  GroupInput,
  FrameInput,
  PoseCollection,
  Timeline,
  ReactiveAnimation,
  SequenceStep,
  DriverConfig,
  SliderConfig,
  ProgramLiteConfig,
  NodesSnapshot
} from "./types.js";

// Scene creation
export function scene(config: SceneInput): SceneInput {
  return {
    render: config.render,
    children: config.children
  };
}

// Element creation functions
export function shape(kind: "rect" | "ellipse" | "polyline", config: Partial<ShapeInput> = {}): ShapeInput {
  return {
    kind,
    ...config
  };
}

export function textNode(config: Partial<TextInput> & { text: string }): TextInput {
  return {
    ...config,
    text: config.text
  };
}

export function group(id: string, config: Partial<GroupInput> = {}): GroupInput {
  return {
    id,
    children: config.children || [],
    ...config
  };
}

export function frame(id: string, config: Partial<FrameInput> = {}): FrameInput {
  return {
    id,
    children: config.children || [],
    layout: config.layout || { mode: "manual" },
    ...config
  };
}

// Animation system
export function poses(poseCollection: PoseCollection): PoseCollection {
  return poseCollection;
}

export function timeline(timelineConfig: Timeline, poses: PoseCollection) {
  return {
    type: "timeline",
    timeline: timelineConfig,
    poses
  };
}

export function reactive(config: ReactiveAnimation, poses: PoseCollection) {
  return {
    type: "reactive",
    ...config,
    poses
  };
}

export function sequence(steps: SequenceStep[], poses: PoseCollection) {
  return {
    type: "sequence",
    steps,
    poses
  };
}

export function parallel(animations: { [key: string]: any }) {
  return {
    type: "parallel",
    animations
  };
}

// Drivers and controls
export function driver(config: DriverConfig): string {
  // Returns a string that can be used in expressions
  const id = `driver_${Math.random().toString(36).substr(2, 9)}`;
  // In a real implementation, this would register the driver
  return id;
}

export function slider(config: SliderConfig): string {
  // Returns a string that can be used in expressions
  const id = config.id;
  // In a real implementation, this would register the slider
  return id;
}

// Program system for dynamic scenes
export function programLite<State, Params>(config: ProgramLiteConfig<State, Params>) {
  return {
    type: "program",
    ...config
  };
}

// Expression evaluation helpers
export class ExpressionEvaluator {
  private variables: Map<string, any> = new Map();
  private t: number = 0;
  
  setTime(time: number) {
    this.t = time;
    this.variables.set('t', time);
  }
  
  setVariable(name: string, value: any) {
    this.variables.set(name, value);
  }
  
  evaluate(expression: string | number): any {
    if (typeof expression === 'number') {
      return expression;
    }
    
    try {
      // Simple expression evaluation - in production this would be more sophisticated
      let code = expression;
      
      // Replace built-in math functions
      code = code.replace(/sin\(/g, 'Math.sin(');
      code = code.replace(/cos\(/g, 'Math.cos(');
      code = code.replace(/tan\(/g, 'Math.tan(');
      code = code.replace(/pi/g, 'Math.PI');
      code = code.replace(/tau/g, '(2 * Math.PI)');
      code = code.replace(/floor\(/g, 'Math.floor(');
      code = code.replace(/ceil\(/g, 'Math.ceil(');
      code = code.replace(/round\(/g, 'Math.round(');
      code = code.replace(/abs\(/g, 'Math.abs(');
      code = code.replace(/max\(/g, 'Math.max(');
      code = code.replace(/min\(/g, 'Math.min(');
      code = code.replace(/sqrt\(/g, 'Math.sqrt(');
      
      // Add smoothstep function
      code = code.replace(/smoothstep\(/g, 'this.smoothstep(');
      code = code.replace(/mix\(/g, 'this.mix(');
      code = code.replace(/clamp\(/g, 'this.clamp(');
      
      // Replace time variable
      code = code.replace(/\bt\b/g, this.t.toString());
      
      // Simple evaluation (unsafe - for demo purposes only)
      return Function.call(this, '"use strict"; return (' + code + ')')();
    } catch (error) {
      console.warn(`Expression evaluation failed: ${expression}`, error);
      return 0;
    }
  }
  
  // Helper functions for expressions
  smoothstep(edge0: number, edge1: number, x: number): number {
    const t = this.clamp((x - edge0) / (edge1 - edge0), 0, 1);
    return t * t * (3 - 2 * t);
  }
  
  mix(a: number, b: number, t: number): number {
    return a * (1 - t) + b * t;
  }
  
  clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
  }
}

// Scene renderer (simplified)
export class SceneRenderer {
  private evaluator = new ExpressionEvaluator();
  
  render(scene: SceneInput, time: number): any {
    this.evaluator.setTime(time);
    
    return {
      scene,
      time,
      elements: this.renderElements(scene.children)
    };
  }
  
  private renderElements(elements: ElementInput[]): any[] {
    return elements.map(element => this.renderElement(element));
  }
  
  private renderElement(element: ElementInput): any {
    const rendered: any = { ...element };
    
    // Evaluate expressions in transform
    if (element.transform?.position?.coords) {
      rendered.transform = { ...element.transform };
      rendered.transform.position = { ...element.transform.position };
      rendered.transform.position.coords = [
        this.evaluator.evaluate(element.transform.position.coords[0]),
        this.evaluator.evaluate(element.transform.position.coords[1])
      ];
    }
    
    if (element.transform?.rotation?.angle) {
      if (!rendered.transform) rendered.transform = {};
      rendered.transform.rotation = {
        ...element.transform.rotation,
        angle: this.evaluator.evaluate(element.transform.rotation.angle)
      };
    }
    
    // Handle children
    if ('children' in element && element.children) {
      rendered.children = this.renderElements(element.children);
    }
    
    return rendered;
  }
}