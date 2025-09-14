// Core DSL Types for Animation System

export type Vec2 = [number, number];

export interface NodesSnapshot {
  [nodeId: string]: any;
}

// Transform types
export interface Position {
  coords: Vec2 | string[];
  origin?: "center" | "top-left" | "bottom-right" | Vec2;
}

export interface Rotation {
  angle: number | string;
  origin?: "center" | Vec2;
}

export interface Scale {
  value: Vec2 | number | string;
  origin?: "center" | Vec2;
}

export interface Transform {
  position?: Position;
  rotation?: Rotation;
  scale?: Scale;
  pos?: Vec2;  // Shorthand for position.coords
}

// Style types
export interface GradientStop {
  offset: number;
  color: string;
}

export interface Fill {
  type: "solid" | "gradient" | "radial";
  color?: string;
  angle?: number;
  center?: Vec2;
  radius?: number;
  stops?: GradientStop[];
}

export interface Stroke {
  color: string;
  width: number;
  linecap?: "round" | "square" | "butt";
  opacity?: number;
  dasharray?: string;
}

export interface Shadow {
  x: number;
  y: number;
  blur: number;
  spread: number;
  color: string;
}

export interface Style {
  fill?: Fill;
  stroke?: Stroke;
  shadows?: Shadow[];
  opacity?: number | string;
  radius?: number;
}

// Font types
export interface Font {
  family: string;
  size: number;
  weight?: number | string;
}

// Animation types
export interface PoseDefinition {
  [property: string]: any;
}

export interface Poses {
  [poseName: string]: PoseDefinition;
}

export interface TimelineKeyframe {
  pose: string;
  dur?: number;
  ease?: string;
}

export interface Timeline {
  [time: string]: TimelineKeyframe;
}

export interface ReactiveCondition {
  when: string;
  use: string;
  else?: string;
  transition?: { dur: number; ease?: string };
}

export interface Reactive {
  pose: ReactiveCondition;
}

export interface SequenceStep {
  pose: string;
  dur?: number;
  hold?: number;
}

export interface ParallelAnimation {
  [property: string]: any;
}

// Interaction types
export interface DraggableConfig {
  axis?: "x" | "y";
  bounds?: Vec2 | [number, number, number, number];
  boundsMode?: "center" | "edge";
  snap?: number;
}

export interface Interaction {
  draggable?: boolean | DraggableConfig;
}

// Lifecycle types
export interface Lifecycle {
  start?: number;
  end?: number;
  fadeIn?: number;
  fadeOut?: number;
}

// Layout types
export interface Layout {
  mode: "auto";
  direction: "row" | "column";
  gap: number;
  padding: number;
  alignItems?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "space-between";
}

// Base element types
export interface BaseElement {
  id?: string;
  transform?: Transform;
  style?: Style;
  lifecycle?: Lifecycle;
  interaction?: Interaction;
  perform?: any; // Animation performance
}

export interface ShapeInput extends BaseElement {
  size?: Vec2 | string[];
  points?: Vec2[] | string[][];
}

export interface TextInput extends BaseElement {
  text: string;
  textValue?: string;
  font?: Font;
}

export interface GroupInput extends BaseElement {
  children: any[];
}

export interface FrameInput extends BaseElement {
  layout?: Layout;
  children: any[];
}

// Render configuration
export interface RenderConfig {
  width: number;
  height: number;
  fps: number;
  duration: number;
  background: string;
}

// Scene configuration
export interface SceneInput {
  render: RenderConfig;
  children: any[];
}

// Program types
export interface ProgramState {
  [key: string]: any;
}

export interface ProgramParams {
  [key: string]: any;
}

export interface ProgramLiteConfig<S extends ProgramState, P extends ProgramParams> {
  init: () => S;
  tick: (state: S, dt: number, params: P, nodes: NodesSnapshot) => void;
  scene: (state: S, params: P) => SceneInput;
}