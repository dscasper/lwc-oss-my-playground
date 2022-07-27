import {LightningElement} from "lwc";

export default class ChildComp extends LightningElement {
    static renderMode = 'light';

    connectedCallback() {
        document.addEventListener("DOMContentLoaded", function(e){
            let primIcon = document.getElementById("lightning-primitive-icon");
            console.log('doc load', primIcon);
        });
    }

    renderedCallback() {


        let primIcon = this.querySelector('lightning-primitive-icon');
        console.log(primIcon);
        console.log(document);
        if(primIcon){
            primIcon.classList.add('test-button-icon')
        }
    }

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