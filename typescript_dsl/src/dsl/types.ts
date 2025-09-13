// Core types for the WorldScript Animation DSL

export type Vect2 = [number, number];
export type Vect3 = [number, number, number];
export type Color = string; // hex, rgb, rgba, hsl, etc.
export type Expression = string | number;

// Basic coordinate and sizing types
export interface Coords {
  coords: [Expression, Expression] | Expression[];
  origin?: "center" | "top-left" | "bottom-right" | Vect2;
}

export interface Size {
  value: [Expression, Expression] | Expression;
  origin?: "center" | Vect2;
}

export interface Angle {
  angle: Expression;
  origin?: "center" | Vect2;
}

// Transform system
export interface Transform {
  position?: Coords;
  rotation?: Angle;
  scale?: Size;
}

// Style system
export interface SolidFill {
  type: "solid";
  color: Color;
}

export interface GradientStop {
  offset: number;
  color: Color;
}

export interface LinearGradientFill {
  type: "gradient";
  angle: number;
  stops: GradientStop[];
}

export interface RadialGradientFill {
  type: "radial";
  center: Vect2;
  radius: number;
  stops: GradientStop[];
}

export type Fill = SolidFill | LinearGradientFill | RadialGradientFill;

export interface Stroke {
  color: Color;
  width: number;
  linecap?: "round" | "square" | "butt";
  opacity?: Expression;
  dasharray?: string;
}

export interface Shadow {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: Color;
}

export interface Style {
  fill?: Fill;
  stroke?: Stroke;
  shadows?: Shadow[];
  opacity?: Expression;
  radius?: number;
}

// Interaction system
export interface DraggableConfig {
  axis?: "x" | "y";
  bounds?: Vect2 | [number, number, number, number]; // [minX, maxX, minY, maxY]
  boundsMode?: "center" | "edge";
  snap?: number;
}

export interface Interaction {
  draggable?: boolean | DraggableConfig;
}

// Animation system
export interface Pose {
  [path: string]: any;
}

export interface PoseCollection {
  [poseName: string]: Pose;
}

export interface EasingConfig {
  bezier?: [number, number, number, number];
}

export interface TransitionConfig {
  dur: number;
  ease?: string | EasingConfig;
}

export interface TimelineStep {
  pose: string;
  dur?: number;
  ease?: string | EasingConfig;
}

export interface Timeline {
  [time: string]: TimelineStep;
}

export interface ReactiveCondition {
  when: Expression;
  use: string;
  else: string;
  transition?: TransitionConfig;
}

export interface Reactive {
  pose: ReactiveCondition;
}

export interface SequenceStep {
  pose: string;
  dur?: number;
  hold?: number;
}

export type Sequence = SequenceStep[];

export interface Parallel {
  [key: string]: Timeline | Reactive | Sequence;
}

export type AnimationPerformer = Timeline | Reactive | Sequence | Parallel;

// Lifecycle system
export interface Lifecycle {
  start?: number;
  end?: number;
  fadeIn?: number;
  fadeOut?: number;
}

// Layout system
export interface AutoLayout {
  mode: "auto";
  direction: "row" | "column";
  gap?: number;
  padding?: number;
  alignItems?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "space-between";
}

export interface Layout {
  mode?: "auto";
  direction?: "row" | "column";
  gap?: number;
  padding?: number;
  alignItems?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "space-between";
}

// Font system
export interface Font {
  family?: string;
  size?: number;
  weight?: number | string;
}