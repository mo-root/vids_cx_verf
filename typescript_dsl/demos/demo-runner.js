"use strict";
// Demo runner - executes all demo scenes
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactiveDemo = exports.mathematicalTransformDemo = exports.bouncingBallDemo = exports.basicShapesDemo = void 0;
const basic_shapes_js_1 = require("./basic-shapes.js");
Object.defineProperty(exports, "basicShapesDemo", { enumerable: true, get: function () { return basic_shapes_js_1.basicShapesDemo; } });
const bouncing_ball_js_1 = require("./bouncing-ball.js");
Object.defineProperty(exports, "bouncingBallDemo", { enumerable: true, get: function () { return bouncing_ball_js_1.bouncingBallDemo; } });
const math_transforms_js_1 = require("./math-transforms.js");
Object.defineProperty(exports, "mathematicalTransformDemo", { enumerable: true, get: function () { return math_transforms_js_1.mathematicalTransformDemo; } });
const interactive_demo_js_1 = require("./interactive-demo.js");
Object.defineProperty(exports, "interactiveDemo", { enumerable: true, get: function () { return interactive_demo_js_1.interactiveDemo; } });
console.log("=".repeat(60));
console.log("WorldScript Animation DSL - Demo Runner");
console.log("=".repeat(60));
const demos = [
    { name: "Basic Shapes", scene: basic_shapes_js_1.basicShapesDemo },
    { name: "Bouncing Ball", scene: bouncing_ball_js_1.bouncingBallDemo },
    { name: "Mathematical Transforms", scene: math_transforms_js_1.mathematicalTransformDemo },
    { name: "Interactive Elements", scene: interactive_demo_js_1.interactiveDemo }
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
//# sourceMappingURL=demo-runner.js.map