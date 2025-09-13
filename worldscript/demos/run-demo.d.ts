declare class DemoRunner {
    private renderer;
    runDemo(demo: any, name: string): void;
    private summarizeScene;
    runAllDemos(): void;
}
export default DemoRunner;
