// Core type definitions for WorldScript DSL

export interface RenderConfig {
  width: number;
  height: number;
  fps: number;
  duration: number;
  background: string;
}

export interface Position {
  coords: [number | string, number | string];
  origin?: "center" | "top-left" | "bottom-right" | [number, number];
}

export interface Rotation {
  angle: number | string;
  origin?: "center" | [number, number];
}

export interface Scale {
  value: [number, number] | number | string;
  origin?: "center" | [number, number];
}

export interface Transform {
  position?: Position;
  rotation?: Rotation;
  scale?: Scale;
}

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
  center: [number, number];
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

export interface Font {
  family: string;
  size: number;
  weight?: number;
}

export interface Lifecycle {
  start?: number;
  end?: number;
  fadeIn?: number;
  fadeOut?: number;
}

export interface DraggableConfig {
  axis?: "x" | "y";
  bounds?: [number, number] | [number, number, number, number];
  boundsMode?: "center" | "edge";
  snap?: number;
}

export interface Interaction {
  draggable?: boolean | DraggableConfig;
}

export interface Layout {
  mode: "auto";
  direction: "row" | "column";
  gap: number;
  padding: number;
  alignItems: "start" | "center" | "end" | "stretch";
  justify: "start" | "center" | "end" | "space-between";
}

// Base element interface
export interface BaseElement {
  id?: string;
  transform?: Transform;
  style?: Style;
  lifecycle?: Lifecycle;
  interaction?: Interaction;
  perform?: any; // Animation performance data
}

export interface SceneInput extends BaseElement {
  render: RenderConfig;
  children: ElementInput[];
}

export interface GroupInput extends BaseElement {
  children: ElementInput[];
}

export interface FrameInput extends BaseElement {
  layout?: Layout;
  children: ElementInput[];
}

export interface ShapeInput extends BaseElement {
  size?: [number | string, number | string];
  points?: Array<[number | string, number | string]>; // For polylines
}

export interface TextInput extends BaseElement {
  text: string;
  textValue?: string; // Dynamic text expression
  font?: Font;
}

export type ElementInput = SceneInput | GroupInput | FrameInput | ShapeInput | TextInput;