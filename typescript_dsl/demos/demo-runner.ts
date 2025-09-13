// Demo runner - executes all demo scenes

import { basicShapesDemo } from "./basic-shapes.js";
import { bouncingBallDemo } from "./bouncing-ball.js";
import { mathematicalTransformDemo } from "./math-transforms.js";
import { interactiveDemo } from "./interactive-demo.js";

console.log("=".repeat(60));
console.log("WorldScript Animation DSL - Demo Runner");
console.log("=".repeat(60));

const demos = [
    { name: "Basic Shapes", scene: basicShapesDemo },
    { name: "Bouncing Ball", scene: bouncingBallDemo },
    { name: "Mathematical Transforms", scene: mathematicalTransformDemo },
    { name: "Interactive Elements", scene: interactiveDemo }
];

demos.forEach((demo, index) => {
    console.log(`\n${index + 1}. ${demo.name} Demo:`);
    console.log(`   Duration: ${demo.scene.render.duration}s`);
    console.log(`   Resolution: ${demo.scene.render.width}x${demo.scene.render.height}`);
    console.log(`   FPS: ${demo.scene.render.fps}`);
    console.log(`   Elements: ${demo.scene.children.length}`);
    console.log(`   Background: ${demo.scene.render.background}`);
});

console.log("\n" + "=".repeat(60));
console.log("All demos loaded successfully!");
console.log("These scenes demonstrate the WorldScript DSL capabilities:");
console.log("- Declarative scene composition");
console.log("- Transform animations with poses and timelines");
console.log("- Interactive elements with drag controls");
console.log("- Mathematical expressions for dynamic properties");
console.log("- Gradient fills and visual effects");
console.log("- Lifecycle management for element appearance");
console.log("=".repeat(60));

// Export all demos for external use
export {
    basicShapesDemo,
    bouncingBallDemo,
    mathematicalTransformDemo,
    interactiveDemo
};