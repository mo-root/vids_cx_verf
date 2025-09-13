//Element input interfaces for the WorldScript Animation DSL

import {
  Transform,
  Style,
  Interaction,
  AnimationPerformer,
  Lifecycle,
  Layout,
  Font,
  Vect2,
  Expression
} from "./types.js";

// Base element interface
export interface BaseElementInput {
  id?: string;
  transform?: Transform;
  style?: Style;
  interaction?: Interaction;
  perform?: AnimationPerformer;
  lifecycle?: Lifecycle;
}

// Shape element
export interface ShapeInput extends BaseElementInput {
  kind: "rect" | "ellipse" | "polyline";
  size?: Vect2;
  points?: (Vect2 | Expression[])[]; // For polyline - allow expressions
}

// Text element
export interface TextInput extends BaseElementInput {
  text: string;
  textValue?: Expression; // For dynamic text
  font?: Font;
}

// Group element
export interface GroupInput extends BaseElementInput {
  children: ElementInput[];
}

// Frame element with layout
export interface FrameInput extends BaseElementInput {
  layout?: Layout;
  children: ElementInput[];
}

// Union type for all elements
export type ElementInput = ShapeInput | TextInput | GroupInput | FrameInput;

// Scene configuration
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

// Driver configuration
export interface DriverConfig {
  start: number;
  dur: number;
  ease?: string;
  loop?: boolean;
}

// Slider configuration
export interface SliderConfig {
  id: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  label?: string;
}

// Program lite for dynamic scenes
export interface ProgramLiteConfig<State, Params> {
  init: () => State;
  tick: (state: State, dt: number, params: Params, nodes: any) => void;
  scene: (state: State, params: Params) => SceneInput;
}