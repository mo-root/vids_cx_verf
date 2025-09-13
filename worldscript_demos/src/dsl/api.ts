// Core API functions for creating WorldScript scenes

import { 
  SceneInput, 
  GroupInput, 
  FrameInput, 
  ShapeInput, 
  TextInput,
  ElementInput 
} from './types.js';

// Scene creation
export function scene(config: SceneInput): SceneInput {
  return {
    ...config,
    id: config.id || 'scene'
  };
}

// Container elements
export function group(id: string, config: Partial<GroupInput>): GroupInput {
  return {
    id,
    children: [],
    ...config
  };
}

export function frame(id: string, config: Partial<FrameInput>): FrameInput {
  return {
    id,
    children: [],
    ...config
  };
}

// Shape creation
export function shape(
  kind: "rect" | "ellipse" | "polyline", 
  config: Partial<ShapeInput>
): ShapeInput {
  const baseShape: ShapeInput = {
    ...config
  };

  // Set default size for rect and ellipse
  if (kind === "rect" || kind === "ellipse") {
    baseShape.size = config.size || [100, 100];
  }

  // For polyline, points are required
  if (kind === "polyline" && !config.points) {
    baseShape.points = [[0, 0], [100, 100]];
  }

  return baseShape;
}

// Text creation
export function textNode(config: Partial<TextInput> & { text: string }): TextInput {
  return {
    font: {
      family: "system-ui",
      size: 16
    },
    ...config
  };
}

// Program-driven scenes for dynamic content
export interface ProgramState {
  [key: string]: any;
}

export interface ProgramParams {
  [key: string]: any;
}

export interface ProgramConfig<State, Params> {
  init: () => State;
  tick: (state: State, dt: number, params: Params, nodes: any) => void;
  scene: (state: State, params: Params) => SceneInput;
}

export function programLite<State extends ProgramState, Params extends ProgramParams>(
  config: ProgramConfig<State, Params>
): ProgramConfig<State, Params> {
  return config;
}

// Utility functions for common patterns
export function createColorGradient(startColor: string, endColor: string): any {
  return {
    type: "gradient",
    angle: 0,
    stops: [
      { offset: 0, color: startColor },
      { offset: 1, color: endColor }
    ]
  };
}

export function createShadow(x: number, y: number, blur: number = 4, color: string = "rgba(0,0,0,0.3)") {
  return {
    x,
    y, 
    blur,
    spread: 0,
    color
  };
}

// Helper for creating common transform animations
export function createMoveAnimation(fromX: number, fromY: number, toX: number, toY: number) {
  return {
    start: { "transform.position.coords": [fromX, fromY] },
    end: { "transform.position.coords": [toX, toY] }
  };
}

export function createScaleAnimation(fromScale: number, toScale: number) {
  return {
    small: { "transform.scale.value": [fromScale, fromScale] },
    large: { "transform.scale.value": [toScale, toScale] }
  };
}

export function createFadeAnimation() {
  return {
    hidden: { "style.opacity": 0 },
    visible: { "style.opacity": 1 }
  };
}