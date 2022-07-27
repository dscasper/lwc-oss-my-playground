import {LightningElement, api} from "lwc";

export default class DatePicker extends LightningElement {

    @api value;
    @api min;
    @api max;

    _variant;
    @api
    get variant() {
        return this._variant;
    }
    set variant(value){
        this._variant = value;
    }

    _label = ' ';
    @api
    get label(){
        return this._label;
    }
    set label(value){
       this._label = value;
    }


    handleDateChange(event){
        console.log('target', event.target)
        console.log('target value', event.target.value);
        console.log('this value', this.value);


    }


}