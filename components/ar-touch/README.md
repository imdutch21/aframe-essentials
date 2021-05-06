## touch-ar-raycast
This component makes it posible to use touch as an interaction while in WebXR AR-mode. It converts a touch into a mousedown event on the selected element. In regular A-Frame this is sadly not implemented. 

### usage

```html
<a-scene>
    <a-entity touch-ar-raycast raycaster="objects:a-plane;"></a-entity>
    <a-plane onmousedown="console.log('test')"></a-plane>
</a-scene>
```

Put the touch-ar-raycast on an entity with a racast component on it. It will use that raycast component to descide if it hits an entity.

### api
Currently this component takes no argument

### events

|event    |recipient|value|
|---------|---------|-----|
|mousedown|self     |none |