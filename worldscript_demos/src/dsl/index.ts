// Main entry point for WorldScript DSL
export * from './types.js';
export * from './api.js';
export * from './animation.js';

// Re-export commonly used functions for convenience
export {
  scene,
  group,
  frame,
  shape,
  textNode,
  programLite
} from './api.js';

export {
  poses,
  timeline,
  reactive,
  sequence,
  parallel,
  driver,
  slider
} from './animation.js';