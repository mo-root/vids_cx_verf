// Core types for the WorldScript Animation DSL

export type Vec2 = [number, number] | [string, string] | [number, string] | [string, number];

export interface Point {
  x: number | string;
  y: number | string;
}

export interface Size {
  width: number | string;
  height: number | string;
}

// Transform types
export interface PositionTransform {
  coords: Vec2;
  origin?: "center" | "top-left" | "bottom-right" | Vec2;
}

export interface RotationTransform {
  angle: number | string;
  origin?: "center" | Vec2;
}

export interface ScaleTransform {
  value: number | string | Vec2;
  origin?: "center" | Vec2;
}

export interface Transform {
  position?: PositionTransform;
  rotation?: RotationTransform;
  scale?: ScaleTransform;
}

// Style types
export interface SolidFill {
  type: "solid";
  color: string;
}

export interface GradientStop {
  offset: number;
  color: string;
}

export interface LinearGradientFill {
  type: "gradient";
  angle: number;
  stops: GradientStop[];
}

export interface RadialGradientFill {
  type: "radial";
  center: Vec2;
  radius: number;
  stops: GradientStop[];
}

export type Fill = SolidFill | LinearGradientFill | RadialGradientFill;

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
  style?: "normal" | "italic";
}

// Interaction types
export interface DraggableConstraints {
  axis?: "x" | "y";
  bounds?: [number, number] | [number, number, number, number]; // [min, max] or [minX, maxX, minY, maxY]
  boundsMode?: "center" | "edge";
  snap?: number;
}

export interface Interaction {
  draggable?: boolean | DraggableConstraints;
}

// Lifecycle types
export interface Lifecycle {
  start?: number;
  end?: number;
  fadeIn?: number;
  fadeOut?: number;
}

// Animation types
export interface Pose {
  [key: string]: any;
}

export interface PoseCollection {
  [poseName: string]: Pose;
}

export interface TimelineKeyframe {
  pose: string;
  dur?: number;
  ease?: string | EasingFunction;
}

export interface Timeline {
  [time: string]: TimelineKeyframe;
}

export interface ReactiveAnimation {
  pose: {
    when: string;
    use: string;
    else: string;
    transition?: {
      dur: number;
      ease?: string;
    };
  };
}

export interface SequenceStep {
  pose: string;
  dur?: number;
  hold?: number;
  ease?: string;
}

export interface EasingFunction {
  bezier?: [number, number, number, number];
}

// Element types
export interface BaseElement {
  id?: string;
  transform?: Transform;
  style?: Style;
  interaction?: Interaction;
  lifecycle?: Lifecycle;
  perform?: any; // Animation performance
}

export interface ShapeInput extends BaseElement {
  kind: "rect" | "ellipse" | "polyline";
  size?: Vec2;
  points?: Vec2[]; // For polyline
}

export interface TextInput extends BaseElement {
  text: string;
  textValue?: string; // Dynamic text expression
  font?: Font;
}

export interface GroupInput extends BaseElement {
  children: ElementInput[];
}

export interface FrameInput extends BaseElement {
  layout?: {
    mode: "auto" | "manual";
    direction?: "row" | "column";
    gap?: number;
    padding?: number;
    alignItems?: "start" | "center" | "end" | "stretch";
    justify?: "start" | "center" | "end" | "space-between";
  };
  children: ElementInput[];
}

export type ElementInput = ShapeInput | TextInput | GroupInput | FrameInput;

// Scene types
export interface RenderConfig {
  width: number;
  height: number;
  fps: number;
  duration: number;
  background: string;
}

export interface SceneInput {
  render: RenderConfig;
  children: ElementInput[];
}

// Program types
export interface NodesSnapshot {
  [id: string]: any;
}

export interface ProgramLiteConfig<State, Params> {
  init: () => State;
  tick: (state: State, dt: number, params: Params, nodes: NodesSnapshot) => void;
  scene: (state: State, params: Params) => SceneInput;
}

// Driver and Slider types
export interface DriverConfig {
  start: number;
  dur: number;
  ease?: string;
  loop?: boolean;
}

export interface SliderConfig {
  id: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  label?: string;
}