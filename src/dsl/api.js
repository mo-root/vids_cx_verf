// Main DSL API for Animation System
import type { 
  Vec2, 
  NodesSnapshot, 
  SceneInput, 
  ShapeInput, 
  TextInput, 
  GroupInput, 
  FrameInput,
  Poses,
  Timeline,
  Reactive,
  SequenceStep,
  ParallelAnimation,
  ProgramLiteConfig,
  ProgramState,
  ProgramParams
} from "./types.js";

// Scene creation
export function scene(config: SceneInput): SceneInput {
  return {
    render: config.render,
    children: config.children
  };
}

// Element creation functions
export function shape(kind: "rect" | "ellipse" | "polyline", config: Partial<ShapeInput> = {}): any {
  return {
    type: "shape",
    kind,
    ...config
  };
}

export function textNode(config: Partial<TextInput> & { text: string }): any {
  return {
    type: "text",
    text: config.text,
    ...config
  };
}

export function group(id: string, config: Partial<GroupInput> = {}): any {
  return {
    type: "group",
    id,
    ...config
  };
}

export function frame(id: string, config: Partial<FrameInput> = {}): any {
  return {
    type: "frame",
    id,
    ...config
  };
}

// Animation system
export function poses(poseDefinitions: Poses): Poses {
  return poseDefinitions;
}

export function timeline(keyframes: Timeline, poses: Poses): any {
  return {
    type: "timeline",
    keyframes,
    poses
  };
}

export function reactive(config: Reactive, poses: Poses): any {
  return {
    type: "reactive",
    config,
    poses
  };
}

export function sequence(steps: SequenceStep[], poses: Poses): any {
  return {
    type: "sequence",
    steps,
    poses
  };
}

export function parallel(animations: ParallelAnimation): any {
  return {
    type: "parallel",
    animations
  };
}

// Driver and slider functions
export function driver(config: {
  start: number;
  dur: number;
  ease?: string;
  loop?: boolean;
}): string {
  const { start, dur, ease = "linear", loop = false } = config;
  return `driver(${start}, ${dur}, "${ease}", ${loop})`;
}

export function slider(config: {
  id: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  label?: string;
}): string {
  const { id, min, max, step = 1, value, label = "" } = config;
  return `slider("${id}", ${min}, ${max}, ${step}, ${value}, "${label}")`;
}

// Program system
export function programLite<S extends ProgramState, P extends ProgramParams>(
  config: ProgramLiteConfig<S, P>
): ProgramLiteConfig<S, P> {
  return config;
}

// Expression helpers
export function mix(a: number | string, b: number | string, t: number | string): string {
  return `mix(${a}, ${b}, ${t})`;
}

export function smoothstep(edge0: number | string, edge1: number | string, x: number | string): string {
  return `smoothstep(${edge0}, ${edge1}, ${x})`;
}

export function clamp(value: number | string, min: number | string, max: number | string): string {
  return `clamp(${value}, ${min}, ${max})`;
}

export function sin(x: number | string): string {
  return `sin(${x})`;
}

export function cos(x: number | string): string {
  return `cos(${x})`;
}

export function vec2(x: number | string, y: number | string): string {
  return `vec2(${x}, ${y})`;
}

// Utility functions
export function randomColor(): string {
  const colors = [
    "#ef4444", "#f97316", "#eab308", "#22c55e", 
    "#06b6d4", "#3b82f6", "#8b5cf6", "#ec4899"
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function deg2rad(degrees: number): number {
  return degrees * Math.PI / 180;
}

export function rad2deg(radians: number): number {
  return radians * 180 / Math.PI;
}