import {LightningElement, track} from 'lwc';
import Navigation from "../../Services/navigation";
import {
    registerListener,
    unregisterListener,
    unregisterAllListeners,
    fireEvent
} from '../../Services/pubsub';


export default class App extends LightningElement {

    pageRef = { attributes: {app: 'TestComponent' }};

    @track navigation;
    @track pages;

    warnOnce = true;
    warnNavigation = true;
    warnMessage = 'this is a message';
    eventValue;

    constructor() {
        super();
        this.eventValue = 0;
        this.navigation = new Navigation(true);
        this.pages = {...this.navigation.pages};
    }

    connectedCallback() {
        window.addEventListener('navigationevent', this.handleNavigationEvent.bind(this));
        window.addEventListener('popstate', this.handleWindowPopState.bind(this));
        window.addEventListener('beforeunload', this.handleBeforeUnload.bind(this));

        registerListener('Button Fire', this.handleEvent, this);
        this.template.addEventListener('childbubble', this.handleBubbleEvent.bind(this));
        this.template.addEventListener('noncomposedchildbubble', this.handleNonComposedBubbleEvent.bind(this));

    }

    handleNavigationEvent(event){
        this.pages = {...event.detail.pages};
    }

    handleBack(){
        this.navigation.moveBack();
    }

    handleForward(){
        this.navigation.moveNext();
    }

    handleWindowPopState() {
        if (this.warnNavigation && this.warnOnce) {
            // eslint-disable-next-line no-alert,no-restricted-globals
            if (!confirm(this.warnMessage)) {
                this.warnOnce = false;
                // eslint-disable-next-line no-restricted-globals
                this.navigation.moveForward();
            }
            else {
                this.warnNavigation = false;
                this.warnOnce = true;
            }
        } else {
            this.warnOnce = true;
        }
    }

    // eslint-disable-next-line consistent-return
    handleBeforeUnload(event) {
        if (this.warnNavigation) {
            event.returnValue = this.warnMessage; //Gecko + IE
            return this.warnMessage; //Gecko + Webkit, Safari, Chrome etc.
        }
    }


    handleEvent(event){
        this.eventValue += event;
    }




    handleTestChildEvent(event){
        this.eventValue += 1;
        console.log('App handleTestChildEvent');
    }

    handleBubbleEvent(event){
        console.log(this.eventValue);
        this.eventValue += 1;
        console.log('App handleBubbleEvent', this.eventValue);
    }

    handleNonComposedBubbleEvent(event){
        console.log('App handleNonComposedBubbleEvent');
    }


}
