import { Vector3 } from "@babylonjs/core/Maths/math.vector";

export const createVector3 = (vector: { x: number, y: number, z: number }): Vector3 => {
    const {x, y, z} = vector;
    return new Vector3(x, y, z);
}