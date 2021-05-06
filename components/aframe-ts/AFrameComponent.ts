import type { Component, Entity } from "aframe";
import { Schema, THREE } from "aframe";

// This class marks various properties and methods as implemented, there are
// no implementations because the Component gets decorated at runtime by the AFrame library.

// The Component['key'] setup is used to mirror the types used in the interface,
// by using this setup the types don't get out of sync when the AFRAM library updates.
export class AFrameComponent<T> implements Component {
    public componentName: string;
    constructor(componentName: string) {
        this.componentName = componentName;
    }

    attrName?: Component['attrName'];
    data: T;
    dependencies?: Component['dependencies'];
    // @ts-ignore
    el: Component['el'];
    // @ts-ignore
    id: Component['id'];
    // @ts-ignore
    initialized: Component['initialized'];
    multiple?: Component['multiple'];
    // @ts-ignore
    name: Component['name'];
    // @ts-ignore
    schema: Component['schema'];
    system: Component['system'];
    events?: Component['events'];

    // @ts-ignore
    init(data?: T): void;
    // @ts-ignore
    pause(): void;
    // @ts-ignore
    play(): void;
    // @ts-ignore
    remove(): void;
    // @ts-ignore
    tick?(time: number, timeDelta: number): void;
    // @ts-ignore
    tock?(time: number, timeDelta: number, camera: THREE.Camera): void;
    // @ts-ignore
    update(oldData: T): void;
    updateSchema?(): void;
    // @ts-ignore
    extendSchema(update: Schema): void;
    // @ts-ignore
    flushToDOM(): void;

    // @ts-ignore
    getElementById(id: string): Entity {
        return document.getElementById(id) as Entity;
    }
}