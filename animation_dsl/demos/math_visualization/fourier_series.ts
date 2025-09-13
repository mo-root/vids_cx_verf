import { scene, group, shape, textNode, poses, timeline } from "../../src/dsl/api.js";
import type { Vec2 } from "../../src/dsl/types.js";

// Fourier series approximation visualization
// Shows how multiple sine waves combine to approximate a square wave

export default scene({
    render: {
        width: 1280,
        height: 720,
        fps: 60,
        duration: 10,
        background: "#0f172a"
    },
    children: [
        textNode({
            id: "title",
            text: "Fourier Series: Square Wave Approximation",
            transform: { position: { coords: [640, 40] as Vec2 } },
            font: { family: "system-ui", size: 26, weight: 700 },
            style: { fill: { type: "solid", color: "#f1f5f9" } }
        }),

        textNode({
            id: "subtitle",
            text: "Sum of sine waves approximating a square wave",
            transform: { position: { coords: [640, 75] as Vec2 } },
            font: { family: "system-ui", size: 16, weight: 500 },
            style: { fill: { type: "solid", color: "#94a3b8" } }
        }),

        // Main coordinate system
        group("mainPlot", {
            transform: { position: { coords: [640, 350] as Vec2 } },
            children: [
                // Axes
                shape("polyline", {
                    id: "xAxis",
                    points: [[-400, 0], [400, 0]],
                    style: { stroke: { color: "#475569", width: 2 } }
                }),
                shape("polyline", {
                    id: "yAxis",
                    points: [[0, -150], [0, 150]],
                    style: { stroke: { color: "#475569", width: 2 } }
                }),

                // Grid lines
                ...Array.from({ length: 17 }, (_, i) => 
                    shape("polyline", {
                        id: `gridV${i}`,
                        points: [[(i - 8) * 50, -150], [(i - 8) * 50, 150]],
                        style: { 
                            stroke: { color: "#334155", width: 1 },
                            opacity: 0.3
                        }
                    })
                ),
                ...Array.from({ length: 7 }, (_, i) => 
                    shape("polyline", {
                        id: `gridH${i}`,
                        points: [[-400, (i - 3) * 50], [400, (i - 3) * 50]],
                        style: { 
                            stroke: { color: "#334155", width: 1 },
                            opacity: 0.3
                        }
                    })
                ),

                // Target square wave (ideal)
                shape("polyline", {
                    id: "squareWave",
                    points: Array.from({ length: 200 }, (_, i) => {
                        const x = (i - 100) * 4;
                        const period = 200;
                        const phase = ((x % period) + period) % period;
                        const y = phase < period / 2 ? 80 : -80;
                        return [x, y];
                    }),
                    style: { 
                        stroke: { color: "#64748b", width: 2, dasharray: "5 5" },
                        opacity: 0.6
                    },
                    lifecycle: { start: 1, fadeIn: 0.5 }
                }),

                // First harmonic (fundamental frequency)
                shape("polyline", {
                    id: "harmonic1",
                    points: Array.from({ length: 200 }, (_, i) => {
                        const x = (i - 100) * 4;
                        return [x, `80 * sin(${x / 63.66} + t * 2)`]; // 4/π amplitude
                    }),
                    style: { 
                        stroke: { color: "#3b82f6", width: 2 },
                        opacity: 0.8
                    },
                    lifecycle: { start: 2, fadeIn: 0.5 }
                }),

                // Third harmonic
                shape("polyline", {
                    id: "harmonic3",
                    points: Array.from({ length: 200 }, (_, i) => {
                        const x = (i - 100) * 4;
                        return [x, `${80/3} * sin(3 * ${x / 63.66} + t * 2)`];
                    }),
                    style: { 
                        stroke: { color: "#10b981", width: 2 },
                        opacity: "t > 3 ? 0.8 : 0"
                    },
                    lifecycle: { start: 3, fadeIn: 0.5 }
                }),

                // Fifth harmonic
                shape("polyline", {
                    id: "harmonic5",
                    points: Array.from({ length: 200 }, (_, i) => {
                        const x = (i - 100) * 4;
                        return [x, `${80/5} * sin(5 * ${x / 63.66} + t * 2)`];
                    }),
                    style: { 
                        stroke: { color: "#f59e0b", width: 2 },
                        opacity: "t > 4 ? 0.8 : 0"
                    },
                    lifecycle: { start: 4, fadeIn: 0.5 }
                }),

                // Seventh harmonic
                shape("polyline", {
                    id: "harmonic7",
                    points: Array.from({ length: 200 }, (_, i) => {
                        const x = (i - 100) * 4;
                        return [x, `${80/7} * sin(7 * ${x / 63.66} + t * 2)`];
                    }),
                    style: { 
                        stroke: { color: "#ef4444", width: 2 },
                        opacity: "t > 5 ? 0.8 : 0"
                    },
                    lifecycle: { start: 5, fadeIn: 0.5 }
                }),

                // Sum of harmonics (approximation)
                shape("polyline", {
                    id: "fourierSum",
                    points: Array.from({ length: 200 }, (_, i) => {
                        const x = (i - 100) * 4;
                        const omega = x / 63.66;
                        return [x, `80 * (sin(${omega} + t * 2) + sin(3 * ${omega} + t * 2)/3 + sin(5 * ${omega} + t * 2)/5 + sin(7 * ${omega} + t * 2)/7)`];
                    }),
                    style: { 
                        stroke: { color: "#f1f5f9", width: 3 },
                        opacity: "t > 6 ? 1 : 0"
                    },
                    lifecycle: { start: 6, fadeIn: 0.5 }
                })
            ]
        }),

        // Legend
        group("legend", {
            transform: { position: { coords: [100, 500] as Vec2 } },
            children: [
                textNode({
                    id: "legendTitle",
                    text: "Components:",
                    transform: { position: { coords: [0, 0] as Vec2 } },
                    font: { family: "system-ui", size: 18, weight: 600 },
                    style: { fill: { type: "solid", color: "#e2e8f0" } }
                }),

                // Fundamental frequency
                shape("polyline", {
                    id: "legend1",
                    points: [[0, 35], [30, 35]],
                    style: { stroke: { color: "#3b82f6", width: 3 } }
                }),
                textNode({
                    id: "legend1Text",
                    text: "sin(ωt) - Fundamental",
                    transform: { position: { coords: [40, 35] as Vec2 } },
                    font: { family: "JetBrains Mono", size: 14, weight: 500 },
                    style: { fill: { type: "solid", color: "#3b82f6" } }
                }),

                // Third harmonic
                shape("polyline", {
                    id: "legend3",
                    points: [[0, 65], [30, 65]],
                    style: { 
                        stroke: { color: "#10b981", width: 3 },
                        opacity: "t > 3 ? 1 : 0.3"
                    }
                }),
                textNode({
                    id: "legend3Text",
                    text: "sin(3ωt)/3 - 3rd harmonic",
                    transform: { position: { coords: [40, 65] as Vec2 } },
                    font: { family: "JetBrains Mono", size: 14, weight: 500 },
                    style: { 
                        fill: { type: "solid", color: "#10b981" },
                        opacity: "t > 3 ? 1 : 0.3"
                    }
                }),

                // Fifth harmonic
                shape("polyline", {
                    id: "legend5",
                    points: [[0, 95], [30, 95]],
                    style: { 
                        stroke: { color: "#f59e0b", width: 3 },
                        opacity: "t > 4 ? 1 : 0.3"
                    }
                }),
                textNode({
                    id: "legend5Text",
                    text: "sin(5ωt)/5 - 5th harmonic",
                    transform: { position: { coords: [40, 95] as Vec2 } },
                    font: { family: "JetBrains Mono", size: 14, weight: 500 },
                    style: { 
                        fill: { type: "solid", color: "#f59e0b" },
                        opacity: "t > 4 ? 1 : 0.3"
                    }
                }),

                // Seventh harmonic
                shape("polyline", {
                    id: "legend7",
                    points: [[0, 125], [30, 125]],
                    style: { 
                        stroke: { color: "#ef4444", width: 3 },
                        opacity: "t > 5 ? 1 : 0.3"
                    }
                }),
                textNode({
                    id: "legend7Text",
                    text: "sin(7ωt)/7 - 7th harmonic",
                    transform: { position: { coords: [40, 125] as Vec2 } },
                    font: { family: "JetBrains Mono", size: 14, weight: 500 },
                    style: { 
                        fill: { type: "solid", color: "#ef4444" },
                        opacity: "t > 5 ? 1 : 0.3"
                    }
                }),

                // Sum
                shape("polyline", {
                    id: "legendSum",
                    points: [[0, 155], [30, 155]],
                    style: { 
                        stroke: { color: "#f1f5f9", width: 3 },
                        opacity: "t > 6 ? 1 : 0.3"
                    }
                }),
                textNode({
                    id: "legendSumText",
                    text: "Sum of harmonics",
                    transform: { position: { coords: [40, 155] as Vec2 } },
                    font: { family: "JetBrains Mono", size: 14, weight: 500 },
                    style: { 
                        fill: { type: "solid", color: "#f1f5f9" },
                        opacity: "t > 6 ? 1 : 0.3"
                    }
                })
            ]
        }),

        // Fourier formula
        textNode({
            id: "formula",
            text: "f(x) = (4/π) Σ (1/n) sin(nωx), n = 1,3,5,...",
            transform: { position: { coords: [640, 650] as Vec2 } },
            font: { family: "system-ui", size: 20, weight: 600 },
            style: { fill: { type: "solid", color: "#fbbf24" } },
            lifecycle: { start: 7, fadeIn: 0.5 }
        }),

        // Error indicator
        textNode({
            id: "error",
            text: "Error decreases with more terms",
            textValue: `t > 8 ? "Error ≈ " + (Math.abs(1 - 4/Math.PI) * 100).toFixed(1) + "%" : "Error decreases with more terms"`,
            transform: { position: { coords: [640, 680] as Vec2 } },
            font: { family: "system-ui", size: 16, weight: 500 },
            style: { fill: { type: "solid", color: "#94a3b8" } },
            lifecycle: { start: 8, fadeIn: 0.5 }
        }),

        // Animation progress indicator
        textNode({
            id: "progress",
            text: "Adding harmonics...",
            textValue: `t < 2 ? "Starting with fundamental frequency..." : t < 3 ? "Adding 3rd harmonic..." : t < 4 ? "Adding 5th harmonic..." : t < 5 ? "Adding 7th harmonic..." : t < 6 ? "Computing sum..." : t < 7 ? "Showing approximation" : "Fourier series complete!"`,
            transform: { position: { coords: [1100, 150] as Vec2 } },
            font: { family: "system-ui", size: 16, weight: 600 },
            style: { fill: { type: "solid", color: "#22c55e" } }
        })
    ]
});