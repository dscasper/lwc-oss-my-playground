import {LightningElement} from "lwc";
import {registerListener} from "../../Services/pubsub";

export default class DiffComponent extends LightningElement {
    eventValue = 0;

    connectedCallback() {

        registerListener('Button Fire', this.handleEvent, this);
        this.template.addEventListener('childbubble', this.handleBubbleEvent.bind(this));
        this.template.addEventListener('noncomposedchildbubble', this.handleNonComposedBubbleEvent.bind(this));


    }

    handleEvent(event){
        console.log('unrelated handleEvent');
        this.eventValue += event;

    }

    handleBubbleEvent(event){
        console.log('unrelated handleBubbleEvent');
        this.eventValue += 1;
    }

    handleNonComposedBubbleEvent(event){
        console.log('unrelated handleNonComposedBubbleEvent');
    }
}