import {
    SceneInput,
    ShapeInput,
    TextInput,
    GroupInput,
    FrameInput,
    PoseLibrary,
    PoseDefinition,
    TimelineConfig,
    ReactiveConfig,
    SequenceStep,
    DriverConfig,
    SliderConfig,
    Vec2,
    NodesSnapshot
} from "./types.js";

// Scene creation
export function scene(config: SceneInput): SceneInput {
    return config;
}

// Shape creation
export function shape(kind: "rect" | "ellipse" | "polyline", config: Partial<ShapeInput> = {}): ShapeInput {
    return {
        kind,
        ...config
    };
}

// Text creation
export function textNode(config: Partial<TextInput> & { text: string }): TextInput {
    const { text, ...restConfig } = config;
    return {
        text,
        ...restConfig
    };
}

// Group creation
export function group(id: string, config: Partial<GroupInput> = {}): GroupInput {
    return {
        id,
        children: [],
        ...config
    };
}

// Frame creation
export function frame(id: string, config: Partial<FrameInput> = {}): FrameInput {
    return {
        id,
        children: [],
        ...config
    };
}

// Pose system
export function poses(poseDefinitions: { [poseName: string]: PoseDefinition }): PoseLibrary {
    return poseDefinitions;
}

// Animation types
export function timeline(keyframes: TimelineConfig, poseLibrary: PoseLibrary): TimelineConfig {
    return keyframes;
}

export function reactive(conditions: ReactiveConfig, poseLibrary: PoseLibrary): ReactiveConfig {
    return conditions;
}

export function sequence(steps: SequenceStep[], poseLibrary: PoseLibrary): SequenceStep[] {
    return steps;
}

export function parallel(animations: { [key: string]: any }): { [key: string]: any } {
    return animations;
}

// Driver and slider creation
export function driver(config: DriverConfig): string {
    // Return a string identifier that can be used in expressions
    return `driver_${Math.random().toString(36).substr(2, 9)}`;
}

export function slider(config: SliderConfig): string {
    // Return a string identifier that can be used in expressions
    return config.id;
}

// ProgramLite for dynamic scenes
export interface ProgramLiteConfig<State, Params> {
    init: () => State;
    tick: (state: State, dt: number, params: Params, nodes: NodesSnapshot) => void;
    scene: (state: State, params: Params) => SceneInput;
}

export function programLite<State, Params>(config: ProgramLiteConfig<State, Params>): ProgramLiteConfig<State, Params> {
    return config;
}

// Utility functions for common patterns
export namespace Utils {
    export function mix(a: number, b: number, t: number): number {
        return a + (b - a) * t;
    }

    export function clamp(value: number, min: number, max: number): number {
        return Math.max(min, Math.min(max, value));
    }

    export function smoothstep(edge0: number, edge1: number, x: number): number {
        const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
        return t * t * (3 - 2 * t);
    }

    export function step(edge: number, x: number): number {
        return x < edge ? 0 : 1;
    }

    export function len(v: Vec2): number {
        return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
    }

    export function dot(a: Vec2, b: Vec2): number {
        return a[0] * b[0] + a[1] * b[1];
    }

    export function vec2(x: number, y: number): Vec2 {
        return [x, y];
    }

    export function rotate2(v: Vec2, angle: number): Vec2 {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return [
            v[0] * cos - v[1] * sin,
            v[0] * sin + v[1] * cos
        ];
    }
}

// Export types for external use
export * from "./types.js";