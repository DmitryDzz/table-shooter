import {
    AbstractMesh,
    Engine,
    PhysicsImpostor,
    SceneLoader,
    SceneOptions,
    TransformNode,
    Vector3
} from "@babylonjs/core";
import {GameScene} from "./GameScene";
import {createVector3} from "./Math";
import {ISceneLoaderAsyncResult} from "@babylonjs/core/Loading/sceneLoader";
import {Player} from "./Player";

export class Level1 extends GameScene {
    constructor(engine: Engine, canvas: HTMLCanvasElement, options?: SceneOptions) {
        super(engine, canvas, options);
    }

    async initializeAsync(): Promise<void> {
        const loadedAsset: ISceneLoaderAsyncResult =
            await SceneLoader.ImportMeshAsync(null, "./assets/", "environment.glb", this);
        for (let mesh of loadedAsset.meshes) {
            mesh.parent = this.rootNode;
        }


        const ground: AbstractMesh = loadedAsset.meshes.find(x => x.name === "Ground");
        ground.position = createVector3({x: 0, y: -20, z: 30});


        const homeYard: TransformNode = new TransformNode("HomeYard", this);
        homeYard.parent = this.rootNode;
        homeYard.position = createVector3({x: -8, y: -20, z: 30});
        homeYard.rotate(Vector3.Up(), Math.PI / 4 * 3);

        const house: AbstractMesh = loadedAsset.meshes.find(x => x.name === "House");
        house.parent = homeYard;
        house.position = createVector3({x: 0, y: 0, z: 0});

        const fence: AbstractMesh = loadedAsset.meshes.find(x => x.name === "Fence");
        fence.parent = homeYard;
        fence.position = createVector3({x: 5, y: 0, z: -7});
        fence.rotate(Vector3.Up(), Math.PI);

        for (let i = 1; i <= 9; i++) {
            const f = fence.clone(`FenceA${i}`, fence.parent);
            f.position = createVector3({x: fence.position.x - i, y: fence.position.y, z: fence.position.z});
        }
        for (let i = 1; i <= 14; i++) {
            const f = fence.clone(`FenceB${i}`, fence.parent);
            f.rotate(Vector3.Up(), Math.PI / 2);
            f.position = createVector3({x: fence.position.x - 10, y: fence.position.y, z: fence.position.z - 1 + i});
        }
        for (let i = 1; i <= 10; i++) {
            const f = fence.clone(`FenceC${i}`, fence.parent);
            f.rotate(Vector3.Up(), Math.PI);
            f.position = createVector3({x: fence.position.x - 11 + i, y: fence.position.y, z: fence.position.z + 14});
        }
        for (let i = 1; i <= 14; i++) {
            const f = fence.clone(`FenceD${i}`, fence.parent);
            f.rotate(Vector3.Up(), -Math.PI / 2);
            f.position = createVector3({x: fence.position.x, y: fence.position.y, z: fence.position.z + 15 - i});
        }


        const barn: AbstractMesh = loadedAsset.meshes.find(x => x.name === "Barn");
        barn.position = createVector3({x: 10, y: -20, z: 30});
        barn.rotate(Vector3.Up(), -Math.PI / 4 * 3);


        const streetlight: AbstractMesh = loadedAsset.meshes.find(x => x.name === "Streetlight");
        streetlight.position = createVector3({x: 1, y: -20, z: 27});
        streetlight.rotate(Vector3.Up(), Math.PI);



        // Physics:
        for (let mesh of loadedAsset.meshes) {
            this._getRidOfParentNodes(mesh);
        }
        ground.physicsImpostor = new PhysicsImpostor(ground, PhysicsImpostor.BoxImpostor,
            {mass: 0, restitution: 0}, this);


        const player = new Player(this);
        await player.initializeAsync();
        // player.position = new Vector3(0, -0.2, 0.4);
    }

    private _getRidOfParentNodes(mesh: AbstractMesh) {
        const worldMatrix = mesh.computeWorldMatrix(true).clone();
        mesh.parent = null;
        mesh.freezeWorldMatrix(worldMatrix, true);
        mesh.unfreezeWorldMatrix();
    }
}