// Core types for the animation DSL
export type Vec2 = [number, number];
export type Vec3 = [number, number, number];
export type Color = string; // hex, rgb, hsl, etc.

// Basic render configuration
export interface RenderConfig {
    width: number;
    height: number;
    fps: number;
    duration: number;
    background: Color;
}

// Transform configuration
export interface PositionConfig {
    coords: Vec2 | [string, string] | [number, string] | [string, number]; // Can be expressions
    origin?: "center" | "top-left" | "bottom-right" | Vec2;
}

export interface RotationConfig {
    angle: number | string; // Can be expression
    origin?: "center" | Vec2;
}

export interface ScaleConfig {
    value: Vec2 | number | string; // Can be expression
    origin?: "center" | Vec2;
}

export interface TransformConfig {
    position?: PositionConfig;
    rotation?: RotationConfig;
    scale?: ScaleConfig;
}

// Style configuration
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
    center: Vec2;
    radius: number;
    stops: GradientStop[];
}

export type FillConfig = SolidFill | LinearGradientFill | RadialGradientFill;

export interface StrokeConfig {
    color: Color;
    width: number;
    linecap?: "round" | "square" | "butt";
    opacity?: number;
    dasharray?: string;
}

export interface ShadowConfig {
    x: number;
    y: number;
    blur: number;
    spread: number;
    color: Color;
}

export interface StyleConfig {
    fill?: FillConfig;
    stroke?: StrokeConfig;
    shadows?: ShadowConfig[];
    opacity?: number | string; // Can be expression
    radius?: number; // For rounded rectangles
}

// Font configuration
export interface FontConfig {
    family: string;
    size: number;
    weight?: number;
}

// Interaction configuration
export interface DraggableConfig {
    axis?: "x" | "y";
    bounds?: [number, number] | [number, number, number, number]; // [min, max] or [minX, maxX, minY, maxY]
    boundsMode?: "center" | "edge";
    snap?: number;
}

export interface InteractionConfig {
    draggable?: boolean | DraggableConfig;
}

// Lifecycle configuration
export interface LifecycleConfig {
    start?: number;
    end?: number;
    fadeIn?: number;
    fadeOut?: number;
}

// Animation poses and timeline
export interface PoseDefinition {
    [propertyPath: string]: any;
}

export interface PoseLibrary {
    [poseName: string]: PoseDefinition;
}

export interface TimelineKeyframe {
    pose: string;
    dur?: number;
    ease?: string;
}

export interface TimelineConfig {
    [time: string]: TimelineKeyframe;
}

export interface ReactiveCondition {
    when: string; // Expression
    use: string; // Pose name
    else?: string; // Pose name
    transition?: { dur: number; ease?: string };
}

export interface ReactiveConfig {
    pose: ReactiveCondition;
}

export interface SequenceStep {
    pose: string;
    dur?: number;
    hold?: number;
}

export type PerformConfig = TimelineConfig | ReactiveConfig | SequenceStep[];

// Base element interface
export interface BaseElement {
    id?: string;
    transform?: TransformConfig;
    style?: StyleConfig;
    interaction?: InteractionConfig;
    lifecycle?: LifecycleConfig;
    perform?: PerformConfig;
}

// Specific element types
export interface ShapeInput extends BaseElement {
    kind: "rect" | "ellipse" | "polyline";
    size?: Vec2 | [string, string] | [number, string] | [string, number];
    points?: any[]; // For polyline - flexible array for expressions
}

export interface TextInput extends BaseElement {
    text: string;
    textValue?: string; // Dynamic text expression
    font?: FontConfig;
}

export interface GroupInput extends BaseElement {
    children: ElementInput[];
}

export interface FrameInput extends BaseElement {
    layout?: {
        mode: "auto";
        direction: "row" | "column";
        gap?: number;
        padding?: number;
        alignItems?: "start" | "center" | "end" | "stretch";
        justify?: "start" | "center" | "end" | "space-between";
    };
    children: ElementInput[];
}

export type ElementInput = ShapeInput | TextInput | GroupInput | FrameInput;

// Scene configuration
export interface SceneInput {
    render: RenderConfig;
    children: ElementInput[];
}

// Driver and slider types
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

// Snapshot type for programLite
export interface NodesSnapshot {
    [nodeId: string]: any;
}