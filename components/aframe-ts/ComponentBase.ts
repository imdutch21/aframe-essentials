//  Needed to reload the components. Else A-frame does not work with components
import { AFrame } from "aframe";
import { AFrameComponent } from "./AFrameComponent";


function getAllMethodNames(obj: any) {
    let methods = new Set();
    while (obj = Reflect.getPrototypeOf(obj)) {
        let keys = Reflect.ownKeys(obj)
        keys.forEach((k) => methods.add(k));
    }

    return Array.from(methods) as string[];
}


function wrapClassComponent(instance: any) {
    return new Proxy(instance, {
        // Added because AFrame uses Object.keys(component) to check for available properties,
        // class based components use methods so we have to use this workaround.
        ownKeys: function (target) {
            return [...getAllMethodNames(instance), ...Object.getOwnPropertyNames(instance)];
        },
        // Needed to support the Object.keys(component) operation.
        getOwnPropertyDescriptor(k) {
            return {
                enumerable: true,
                configurable: true,
            };
        }
    });
}

const registerAFRAMeComponent = function (registery: AFrame, component: AFrameComponent<any>, componentName: string) {
    if (typeof registery !== "undefined") {
        console.log("Registered: ", componentName)
        registery.registerComponent(componentName, wrapClassComponent(component));
        return true;
    } else {
        console.error("AFRAME not found. Is it not initialized?");
        return false;
    }
};

const registerComponent = (component: AFrameComponent<any>) => {
    if (typeof AFRAME !== "undefined")
        return registerAFRAMeComponent(AFRAME, component, component.componentName);
    else
        return undefined;
};
export { registerComponent, registerAFRAMeComponent };