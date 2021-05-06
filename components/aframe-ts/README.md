## Aframe Typescript

This part of the project makes it posible for aframe to work together with typescript. It is very much a hacky way to get it to work, but it still beats having to work with javascript. It works best together with the folowing npm packages:
    @types/aframe
    @types/jest
    @types/three
    @types/webxr

To use you can make your own component by extending AFrameComponent.
```typescript
class ExampleComponent extends AFrameComponent<any> {

    constructor() {
        super("example"); //this will be the component name you use when assigning components to an entity
    }
    init(data: any) {}
    tick() {}
    pause() {}
    play() {}
    remove() {}
    tick?(time: number, timeDelta: number) {}
    tock?(time: number, timeDelta: number, camera: THREE.Camera) {}
    update(oldData: any) {}
    updateSchema?() {}
    extendSchema(update: Schema) {}
    flushToDOM() {}
}
```

To then register your component you muse use the registerComponent function from ComponentBase
```typescript
registerComponent(new ExampleComponent())
```