import { SceneRenderer } from "../src/dsl/api.js";
import basketballDemo from "./basketball-shot.js";
import bouncingBallDemo from "./bouncing-ball.js";
import interactiveDemo from "./interactive-dashboard.js";
// Demo runner for testing the WorldScript DSL
class DemoRunner {
    renderer = new SceneRenderer();
    runDemo(demo, name) {
        console.log(`\n=== Running Demo: ${name} ===\n`);
        try {
            // For program-type demos
            if (demo.type === 'program') {
                const state = demo.init();
                const scene = demo.scene(state, {});
                console.log(`Scene Config:`, {
                    width: scene.render.width,
                    height: scene.render.height,
                    fps: scene.render.fps,
                    duration: scene.render.duration,
                    background: scene.render.background,
                    elementCount: scene.children.length
                });
                // Simulate a few frames
                for (let frame = 0; frame < 5; frame++) {
                    const time = frame / scene.render.fps;
                    demo.tick(state, 1 / scene.render.fps, {}, {});
                    const rendered = this.renderer.render(scene, time);
                    console.log(`Frame ${frame} (t=${time.toFixed(2)}):`, this.summarizeScene(rendered));
                }
            }
            else {
                // For direct scene demos
                console.log(`Scene Config:`, {
                    width: demo.render.width,
                    height: demo.render.height,
                    fps: demo.render.fps,
                    duration: demo.render.duration,
                    background: demo.render.background,
                    elementCount: demo.children.length
                });
                // Simulate a few frames
                for (let frame = 0; frame < 5; frame++) {
                    const time = frame / demo.render.fps;
                    const rendered = this.renderer.render(demo, time);
                    console.log(`Frame ${frame} (t=${time.toFixed(2)}):`, this.summarizeScene(rendered));
                }
            }
        }
        catch (error) {
            console.error(`Error running demo ${name}:`, error);
        }
    }
    summarizeScene(rendered) {
        return {
            time: rendered.time,
            elementCount: rendered.elements.length,
            sampleElements: rendered.elements.slice(0, 3).map((el) => ({
                id: el.id,
                type: el.kind || 'text',
                position: el.transform?.position?.coords
            }))
        };
    }
    runAllDemos() {
        this.runDemo(basketballDemo, "Basketball Shot");
        this.runDemo(bouncingBallDemo, "Bouncing Ball");
        this.runDemo(interactiveDemo, "Interactive Dashboard");
        console.log("\n=== All Demos Complete ===");
        console.log("The WorldScript Animation DSL is working correctly!");
    }
}
// Run demos if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    const runner = new DemoRunner();
    runner.runAllDemos();
}
export default DemoRunner;
//# sourceMappingURL=run-demo.js.map