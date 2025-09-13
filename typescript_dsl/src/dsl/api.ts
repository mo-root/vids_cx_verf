// Core API functions for the WorldScript Animation DSL

import {
  SceneInput,
  ShapeInput,
  TextInput,
  GroupInput,
  FrameInput,
  ElementInput,
  DriverConfig,
  SliderConfig,
  ProgramLiteConfig
} from "./interfaces.js";
import {
  PoseCollection,
  Timeline,
  Reactive,
  Sequence,
  Parallel,
  AnimationPerformer
} from "./types.js";

/**
 * Create a scene with render configuration and child elements
 */
export function scene(config: SceneInput): SceneInput {
  return {
    render: config.render,
    children: config.children
  };
}

/**
 * Create a shape element (rect, ellipse, or polyline)
 */
export function shape(
  kind: "rect" | "ellipse" | "polyline",
  config: Partial<ShapeInput> = {}
): ShapeInput {
  return {
    kind,
    ...config
  };
}

/**
 * Create a text element
 */
export function textNode(config: Partial<TextInput> & { text: string }): TextInput {
  return {
    ...config,
    text: config.text
  };
}

/**
 * Create a group container for organizing elements
 */
export function group(id: string, config: Partial<GroupInput> = {}): GroupInput {
  return {
    id,
    children: config.children || [],
    ...config
  };
}

/**
 * Create a frame container with layout capabilities
 */
export function frame(id: string, config: Partial<FrameInput> = {}): FrameInput {
  return {
    id,
    children: config.children || [],
    ...config
  };
}

/**
 * Create a collection of poses for animations
 */
export function poses(poseCollection: PoseCollection): PoseCollection {
  return poseCollection;
}

/**
 * Create a timeline animation
 */
export function timeline(timelineSteps: Timeline, poses: PoseCollection): Timeline {
  // Validate that all referenced poses exist
  Object.values(timelineSteps).forEach(step => {
    if (!poses[step.pose]) {
      throw new Error(`Pose "${step.pose}" not found in pose collection`);
    }
  });
  return timelineSteps;
}

/**
 * Create a reactive animation based on conditions
 */
export function reactive(reactiveConfig: Reactive, poses: PoseCollection): Reactive {
  // Validate that all referenced poses exist
  const { use, else: elsePose } = reactiveConfig.pose;
  if (!poses[use]) {
    throw new Error(`Pose "${use}" not found in pose collection`);
  }
  if (!poses[elsePose]) {
    throw new Error(`Pose "${elsePose}" not found in pose collection`);
  }
  return reactiveConfig;
}

/**
 * Create a sequence animation
 */
export function sequence(sequenceSteps: Sequence, poses: PoseCollection): Sequence {
  // Validate that all referenced poses exist
  sequenceSteps.forEach(step => {
    if (!poses[step.pose]) {
      throw new Error(`Pose "${step.pose}" not found in pose collection`);
    }
  });
  return sequenceSteps;
}

/**
 * Create a parallel animation
 */
export function parallel(parallelConfig: Parallel): Parallel {
  return parallelConfig;
}

/**
 * Create a time-based driver for animations
 */
export function driver(config: DriverConfig): string {
  // Return a string that can be used in expressions
  const loopSuffix = config.loop ? " % " + config.dur : "";
  const easingFunction = config.ease ? `${config.ease}()` : "";
  return `driver_${config.start}_${config.dur}${loopSuffix}${easingFunction}`;
}

/**
 * Create an interactive slider control
 */
export function slider(config: SliderConfig): string {
  // Return a string that can be used in expressions
  return `slider_${config.id}`;
}

/**
 * Create a dynamic scene using ProgramLite
 */
export function programLite<State, Params>(
  config: ProgramLiteConfig<State, Params>
): ProgramLiteConfig<State, Params> {
  return config;
}

// Math utility functions that can be used in expressions
export const MathUtils = {
  // Vector functions
  vec2: (x: number, y: number): [number, number] => [x, y],
  len: (v: [number, number]): number => Math.sqrt(v[0] * v[0] + v[1] * v[1]),
  dot: (a: [number, number], b: [number, number]): number => a[0] * b[0] + a[1] * b[1],
  
  // Interpolation functions
  mix: (a: number, b: number, t: number): number => a + (b - a) * t,
  clamp: (value: number, min: number, max: number): number => Math.max(min, Math.min(max, value)),
  step: (edge: number, x: number): number => x < edge ? 0 : 1,
  smoothstep: (e0: number, e1: number, x: number): number => {
    const t = Math.max(0, Math.min(1, (x - e0) / (e1 - e0)));
    return t * t * (3 - 2 * t);
  },
  
  // Rotation
  rotate2: (v: [number, number], angle: number): [number, number] => [
    v[0] * Math.cos(angle) - v[1] * Math.sin(angle),
    v[0] * Math.sin(angle) + v[1] * Math.cos(angle)
  ],
  
  // Constants
  pi: Math.PI,
  tau: 2 * Math.PI
};

// Expression evaluator helper
export class ExpressionEvaluator {
  private context: Record<string, any> = {};
  
  setContext(context: Record<string, any>) {
    this.context = { ...context, ...MathUtils };
  }
  
  evaluate(expression: string | number): number {
    if (typeof expression === "number") {
      return expression;
    }
    
    try {
      // Simple expression evaluation
      // In a real implementation, this would be more sophisticated
      const func = new Function(...Object.keys(this.context), `return ${expression}`);
      return func(...Object.values(this.context));
    } catch (error) {
      console.warn(`Failed to evaluate expression: ${expression}`, error);
      return 0;
    }
  }
}