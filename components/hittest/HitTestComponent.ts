import { Schema, THREE } from "aframe";
import { AFrameComponent } from "../aframe-ts/AFrameComponent";
import type { XRHitTestTrackableType, XRReferenceSpace } from "three";
import type { XRHitTestSource } from "three/src/renderers/webxr/WebXR";
import { ATT_POSITION, EVENT_HIT_FOUND, EVENT_SESSION_END, EVENT_SESSION_START, REFERENCE_SPACE_LOCAL_FLOOR, REFERENCE_SPACE_VIEWER, SCENE_MODE_AR } from "../core/Constants";
const componentName = "hit-test";


class HitTestComponent extends AFrameComponent<any> {
    public xrHitTestSource?: XRHitTestSource = undefined;
    public viewerSpace?: XRReferenceSpace = undefined;
    public refSpace?: XRReferenceSpace = undefined;
    public hasHit: boolean = false;

    constructor() {
        super(componentName);
    }
    init() {
        this.el.sceneEl!.renderer.xr.addEventListener(EVENT_SESSION_END, () => this.onSessionEnd());
        this.el.sceneEl!.renderer.xr.addEventListener(EVENT_SESSION_START, () => this.onSessionStart());
    }
    tick() {
        if (this.el.sceneEl!.is(SCENE_MODE_AR)) {
            this.moveCursorOnHit();
        }
    }


    // resets after going out off AR mode
    onSessionEnd() {
        this.viewerSpace = undefined;
        this.refSpace = undefined;
        this.xrHitTestSource = undefined;
        this.hasHit = false;
    };

    // Sets up the hit test to be updated when a floor is detected
    onSessionStart() {
        const session = this.el.sceneEl!.renderer.xr.getSession()!;

        session.requestReferenceSpace(REFERENCE_SPACE_VIEWER).then((space: XRReferenceSpace) => {
            this.viewerSpace = space;
            console.log(space)
            session.requestHitTestSource({ space: this.viewerSpace, entityTypes: ['plane' as unknown as XRHitTestTrackableType] })
                .then((hitTestSource: XRHitTestSource) => {
                    this.xrHitTestSource = hitTestSource;
                });
        });

        session.requestReferenceSpace(REFERENCE_SPACE_LOCAL_FLOOR).then((space: XRReferenceSpace) => {
            this.refSpace = space;
        });
    };

    // Sets the cursor position once a hit as been detected
    moveCursorOnHit(){
        if (!this.viewerSpace) return;

        // @ts-ignore
        const frame = this.el.sceneEl!.frame;
        const xrViewerPose = frame.getViewerPose(this.refSpace);
        if (this.xrHitTestSource && xrViewerPose) {
            const hitTestResults = frame.getHitTestResults(this.xrHitTestSource);
            if (hitTestResults.length > 0) {
                const pose = hitTestResults[0].getPose(this.refSpace);

                const inputMat = new THREE.Matrix4();
                inputMat.fromArray(pose.transform.matrix);

                const position = new THREE.Vector3();
                position.setFromMatrixPosition(inputMat);
                this.el.setAttribute(ATT_POSITION, position);
                if(!this.hasHit){
                    this.el.sceneEl.emit(EVENT_HIT_FOUND)
                }
            }
        }
    };

}

export { HitTestComponent };