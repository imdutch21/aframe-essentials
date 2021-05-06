## hit-test
This component implements the WebXR hit-test. The entity you put this on will follow the floor when you move your device. To place something there you can use the position of the entity this on. 

### usage

```html
<a-scene webxr="optionalFeatures:hit-test">
    <a-box  id="world_cursor" gltf-model="#reticleModel" visible="false" hit-test>
    </a-box>
</a-scene>
```
It sometimes does take your phone a couple of seconds to actually find the floor, so give it some time


### api
Currently this component takes no argument

### events

|event    |recipient|value|
|---------|---------|-----|
|hit-found|scene    |none |