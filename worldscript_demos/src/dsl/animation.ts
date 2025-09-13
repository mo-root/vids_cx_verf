// Animation system - poses, timelines, and drivers

export interface PoseDefinition {
  [property: string]: any;
}

export interface PoseCollection {
  [poseName: string]: PoseDefinition;
}

export interface TransitionConfig {
  dur: number;
  ease?: string | { bezier: [number, number, number, number] };
}

export interface TimelineKeyframe {
  pose: string;
  dur?: number;
  ease?: string;
}

export interface TimelineDefinition {
  [timeString: string]: TimelineKeyframe;
}

export interface ReactiveCondition {
  when: string; // Expression
  use: string; // Pose name
  else: string; // Pose name
  transition?: TransitionConfig;
}

export interface ReactiveDefinition {
  pose: ReactiveCondition;
}

export interface SequenceStep {
  pose: string;
  dur?: number;
  hold?: number;
}

export interface ParallelDefinition {
  [propertyPath: string]: any; // Timeline or other animation
}

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
  label: string;
}

// Animation builder functions
export function poses(definitions: PoseCollection): PoseCollection {
  return definitions;
}

export function timeline(
  definition: TimelineDefinition, 
  poseCollection: PoseCollection
): any {
  return {
    type: 'timeline',
    definition,
    poses: poseCollection
  };
}

export function reactive(
  definition: ReactiveDefinition,
  poseCollection: PoseCollection
): any {
  return {
    type: 'reactive',
    definition,
    poses: poseCollection
  };
}

export function sequence(
  steps: SequenceStep[],
  poseCollection: PoseCollection
): any {
  return {
    type: 'sequence',
    steps,
    poses: poseCollection
  };
}

export function parallel(definition: ParallelDefinition): any {
  return {
    type: 'parallel',
    definition
  };
}

export function driver(config: DriverConfig): string {
  // Returns an expression string that can be used in animations
  const { start, dur, ease = "linear", loop = false } = config;
  const loopStr = loop ? "% 1" : "";
  return `clamp((t - ${start}) / ${dur}, 0, 1)${loopStr}`;
}

export function slider(config: SliderConfig): string {
  // Returns an expression string that references the slider value
  return `slider_${config.id}`;
}