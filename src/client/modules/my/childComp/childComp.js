import {LightningElement} from "lwc";

export default class ChildComp extends LightningElement {


    handleClick(){
        this.dispatchEvent(new CustomEvent('childevent', {detail: 1 }));
    }

    handleBubbleClick(){
        this.dispatchEvent(new CustomEvent('childbubble', {
            detail: 1, composed: true, bubbles: true
        }));
    }


    handleNonComposedBubbleClick(){
        this.dispatchEvent(new CustomEvent('noncomposedchildbubble', {
            detail: 1, composed: false, bubbles: false
        }));
    }


}