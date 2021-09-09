import {LightningElement} from "lwc";
import {
    registerListener,
    unregisterListener,
    unregisterAllListeners,
    fireEvent
} from '../../Services/pubsub';

export default class TestComponent extends LightningElement {

    eventValue = 2;

    connectedCallback() {

        registerListener('Button Fire', this.testHandleEvent, this);
        this.template.addEventListener('childbubble', this.handleBubbleEvent.bind(this));
        this.template.addEventListener('noncomposedchildbubble', this.handleNonComposedBubbleEvent.bind(this));

    }

    disconnectedCallback() {
        unregisterListener('Button Fire', this.testHandleEvent, this);
    }

    handleClick(event){
        fireEvent(this, 'Button Fire', 1);
    }

    testHandleEvent(event){
        console.log('testHandleEvent', event);
        this.eventValue = this.eventValue + this.eventValue;
    }

    handleChildEvent(event){
        console.log('Test Comp handleChildEvent');
        this.eventValue = this.eventValue + this.eventValue;
        this.dispatchEvent(new CustomEvent('testchildevent'));
    }

    handleBubbleEvent(event){
        console.log('Test Comp handleBubbleEvent');
        this.eventValue = this.eventValue + this.eventValue;
    }

    handleNonComposedBubbleEvent(event){
        console.log('Test Comp handleNonComposedBubbleEvent');
    }


}