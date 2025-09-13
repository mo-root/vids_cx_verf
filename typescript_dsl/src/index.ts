// Main entry point for the WorldScript Animation DSL

export * from "./dsl/types.js";
export * from "./dsl/interfaces.js";
export * from "./dsl/api.js";

// Re-export commonly used functions for convenience
export {
  scene,
  shape,
  textNode,
  group,
  frame,
  poses,
  timeline,
  reactive,
  sequence,
  parallel,
  driver,
  slider,
  programLite,
  MathUtils,
  ExpressionEvaluator
} from "./dsl/api.js";

// Version info
export const VERSION = "1.0.0";
export const DESCRIPTION = "TypeScript DSL for creating animations inspired by WorldScript";