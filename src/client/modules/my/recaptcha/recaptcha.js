import {LightningElement} from "lwc";
import {validateCaptcha} from "../../services/reCaptchaService";

const loadRecaptchaScript = function() {

    // if already loaded, resolve directly
    if (window.grecaptcha) {
        return;
    }

    // wait until the window.grecaptcha become available
    document.querySelector('html').addEventListener('s-recaptcha.api-loaded', (e) => {
        window.grecaptcha = e.detail;
    });

    // if no other s-recaptcha component have already start the script loading,
    // load it by adding the script tag inside the head
    if ( ! document.querySelector('script[s-recaptcha-script]')) {
        const scriptTag = document.createElement('script');
        scriptTag.setAttribute('s-recaptcha-script', true);
        scriptTag.src = `https://www.google.com/recaptcha/api.js?onload=sRecaptchaOnloadCallback&render=explicit`;
        scriptTag.async = true;
        scriptTag.defer = true;

        // add a listener to know when the recaptcha is ready
        window.sRecaptchaOnloadCallback = function() {
            // dispatch a loaded event to let all the components know that
            // the api is available
            dispatchEvent( new CustomEvent('s-recaptcha.api-loaded',  window.grecaptcha ));
        }

        // add the tag to the html
        document.querySelector('head').appendChild(scriptTag);
    }

}

export default class Recaptcha extends LightningElement {

    static renderMode = 'light'; // the default is 'shadow'

    recaptchaToken;
    isFirstRender = true;

    connectedCallback() {
        loadRecaptchaScript();
    }

    renderedCallback() {

        if(this.isFirstRender){
            this.isFirstRender = false;
            addEventListener('s-recaptcha.api-loaded', () => {
                this.loadRecaptcha();
            });
        }
    }


    loadRecaptcha(){
        // eslint-disable-next-line @lwc/lwc/no-document-query
        let element  = document.querySelector('[data-id="recaptcha_element"]');
        element.addEventListener('verifyToken', (response) => this.verifyToken(response));

        let recaptcha = window.grecaptcha;
        if(recaptcha){
            recaptcha.ready( () => {
                recaptcha.render(element, {
                    'sitekey': process.env.RECAPTCHA_SITE_KEY,
                    'callback': (token) => {
                        this.recaptchaToken = token;
                        this.verifyToken();
                    },
                    'expired-callback': this.expireCallback,
                    'error-callback': this.recaptchaErrorCallback
                });
            });
        }
    }


    loadCallback(token){
        this.recaptchaToken = token;
    }


    expireCallback() {
        this.recaptchaToken = '';
        this.dispatchIsValid(false, 'The validation timed out. Please revalidate!');
    }

    recaptchaErrorCallback(errorResponse) {
        this.recaptchaToken = '';
        this.dispatchIsValid(false, 'there was  an error in the call back: ' + errorResponse);
    }


    verifyToken(){
        validateCaptcha(this.recaptchaToken).then( (isValid) => {
            this.dispatchIsValid(isValid.success, null)
        });
    }

    dispatchIsValid(isValid, error) {
        this.dispatchEvent(new CustomEvent('recaptchaisvalid',{ detail: {isValid: isValid, error: error }}));
    }

}