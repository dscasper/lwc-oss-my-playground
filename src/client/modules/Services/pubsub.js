/**
 * A basic pub-sub mechanism for sibling component communication
 */

const events = {};

/**
 * Confirm that two page references have the same attributes
 * @param {object} componentRef1 - The first template reference
 * @param {object} componentRef2 - The second template reference
 */
const sameComponentRef = (componentRef1, componentRef2) => {
    const obj1 = componentRef1
    const obj2 = componentRef2;

    let returnVal = Object.keys(obj1)
        .concat(Object.keys(obj2))
        .every((key) => {
            return obj1[key] === obj2[key];
        });
    return returnVal;
};

/**
 * Registers a callback for an event
 * @param {string} eventName - Name of the event to listen for.
 * @param {function} callback - Function to invoke when said event is fired.
 * @param {object} component - The value to be passed as the this parameter to the callback function is bound.
 */
const registerListener = (eventName, callback, component) => {
    // Checking that the listener has a pageRef property. We rely on that property for filtering purpose in fireEvent()
    if (!component) {
        throw new Error(
            'pubsub listeners need a template property'
        );
    }

    if (!events[eventName]) {
        events[eventName] = [];
    }

    const duplicate = events[eventName].find((listener) => {
        return listener.callback === callback && listener === component;
    });

    if (!duplicate) {
        console.log('add to listener', component);
        events[eventName].push({ callback, component });
    }
};

/**
 * Unregisters a callback for an event
 * @param {string} eventName - Name of the event to unregister from.
 * @param {function} callback - Function to unregister.
 * @param {object} component - The value to be passed as the this parameter to the callback function is bound.
 */
const unregisterListener = (eventName, callback, component) => {
    if (events[eventName]) {
        events[eventName] = events[eventName].filter(
            (listener) =>
                listener.callback !== callback || listener !== component
        );
    }
};

/**
 * Unregisters all event listeners bound to an object.
 * @param {object} component - All the callbacks bound to this object will be removed.
 */
const unregisterAllListeners = (component) => {
    Object.keys(events).forEach((eventName) => {
        events[eventName] = events[eventName].filter(
            (listener) => listener !== component
        );
    });
};

/**
 * Fires an event to listeners.
 * @param {object} componentRef - Reference of the component that represents the event scope.
 * @param {string} eventName - Name of the event to fire.
 * @param {*} payload - Payload of the event to fire.
 */
const fireEvent = (componentRef, eventName, payload) => {
    if (events[eventName]) {
        const listeners = events[eventName];
        listeners.forEach((listener) => {
            if (sameComponentRef(componentRef, listener.component)) {
                try {
                    console.log('fire event', listener.component);
                    listener.callback.call(listener.component, payload);
                } catch (error) {
                    // fail silently
                }
            }
        });
    }
};

export {
    registerListener,
    unregisterListener,
    unregisterAllListeners,
    fireEvent
};