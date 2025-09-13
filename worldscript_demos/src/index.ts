// Main entry point for WorldScript demos
import { getAllDemos, demoMetadata } from '../demos/index.js';

// Export the DSL API for external use
export * from './dsl/index.js';

// Export demo scenes and metadata
export { getAllDemos, demoMetadata };

// Demo runner function (for future use with a renderer)
export function runDemo(demoName: string) {
  const demos = getAllDemos();
  const demo = demos[demoName as keyof typeof demos];
  
  if (!demo) {
    throw new Error(`Demo "${demoName}" not found. Available demos: ${Object.keys(demos).join(', ')}`);
  }
  
  console.log(`Running demo: ${demoMetadata[demoName as keyof typeof demoMetadata].name}`);
  return demo;
}

// List all available demos
export function listDemos() {
  return Object.entries(demoMetadata).map(([key, meta]) => ({
    id: key,
    name: meta.name,
    description: meta.description,
    concepts: meta.concepts,
    duration: meta.duration
  }));
}

// Development helper to log demo structure
export function inspectDemo(demoName: string) {
  const demo = runDemo(demoName);
  console.log(`Demo structure for ${demoName}:`, JSON.stringify(demo, null, 2));
  return demo;
}

// Main function for CLI usage
export function main() {
  console.log('WorldScript Animation Demos');
  console.log('============================');
  console.log('Available demos:');
  
  listDemos().forEach(demo => {
    console.log(`\n${demo.id}: ${demo.name}`);
    console.log(`  ${demo.description}`);
    console.log(`  Duration: ${demo.duration}s`);
    console.log(`  Concepts: ${demo.concepts.join(', ')}`);
  });
}

// Run main if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}