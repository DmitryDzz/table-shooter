export class Env {
    static readonly meters2units = 0.02;
    static readonly units2meters = 1 / Env.meters2units;

    static camera = {
        near: 0.2,
        far: 10000,
        minBeta: Math.PI / 18, // 10 degrees
        maxBeta: Math.PI * 99 / 199, // almost PI/2
        position: { x: 0, y: 20, z: -30 },
        defaultDirection: { x: 0, y: 0, z: 0 }
    };
}