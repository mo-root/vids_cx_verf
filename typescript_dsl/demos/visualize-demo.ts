// Simple visualization test - outputs one demo as formatted JSON

import { basicShapesDemo } from "./basic-shapes.js";

console.log("=".repeat(80));
console.log("WORLDSCRIPT ANIMATION DSL - BASIC SHAPES DEMO");
console.log("=".repeat(80));
console.log();

console.log("Scene Configuration:");
console.log(`  Resolution: ${basicShapesDemo.render.width}x${basicShapesDemo.render.height}`);
console.log(`  Duration: ${basicShapesDemo.render.duration}s at ${basicShapesDemo.render.fps}fps`);
console.log(`  Background: ${basicShapesDemo.render.background}`);
console.log(`  Total Elements: ${basicShapesDemo.children.length}`);
console.log();

console.log("Elements Breakdown:");
basicShapesDemo.children.forEach((element, index) => {
    const elementType = 'kind' in element ? element.kind : 'text';
    const id = element.id || `element_${index}`;
    console.log(`  ${index + 1}. ${elementType.toUpperCase()} (id: ${id})`);
    
    if ('text' in element) {
        console.log(`     Text: "${element.text}"`);
    }
    if ('size' in element && element.size) {
        console.log(`     Size: ${element.size[0]}x${element.size[1]}`);
    }
    if (element.transform?.position) {
        console.log(`     Position: [${element.transform.position.coords.join(', ')}]`);
    }
    if (element.style?.fill && 'color' in element.style.fill) {
        console.log(`     Color: ${element.style.fill.color}`);
    }
});

console.log();
console.log("Animation Timeline:");
console.log("  This demo features staggered entrance animations:");
console.log("  - Title appears at 0.5s with fade-in");
console.log("  - Rectangle animates in at 1.5s, highlights at 4s");
console.log("  - Circle animates in at 2.5s, highlights at 5s");
console.log("  - Triangle animates in at 3.5s, highlights at 6s");
console.log("  - Description text appears at 7.2s");

console.log();
console.log("=".repeat(80));
console.log("This demonstrates the declarative nature of the WorldScript DSL");
console.log("=".repeat(80));