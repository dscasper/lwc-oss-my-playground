import {LightningElement, api} from "lwc";

export default class Button extends LightningElement {

    @api label;
    @api name;
    _variant;
    @api
    get variant(){
        return this._variant;
    }
    set variant(value){
        this._variant = value;

    }
    @api iconName;
    @api iconPosition;
    @api title;


    get hasIcon(){
        return !!this.iconName;
    }


    setVariant(){
        let button = this.template.querySelector('button');
        if(button){
            button.classList.add()
        }
    }


}
