export interface InputManager {
    dispose();
    update();
    get inUse(): boolean;
}