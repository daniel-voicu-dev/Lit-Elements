import { LitElement, html } from "lit-element"
import { uuidv4} from "./../../utilities.js"
import {Alert} from "../Dotfusion-Alert/dotfusion-alert.js";


let outputTransformedValues = ({value,min,step, max}) => {  
  let floatMax = parseFloat(max);
  let transformedValue = parseFloat(value); 
  let transformedMin = Math.ceil(min/step)*step;
  let minTranslation = window.Translations.Products_MinimumQuantity !== undefined ? window.Translations.Products_MinimumQuantity : "[Placeholder]Minimum quantity is ";
  let stepTranslation = window.Translations.Products_StepQuantity !== undefined ? window.Translations.Products_StepQuantity : "[Placeholder]Minimum step is ";
  
  let message = parseFloat(step) === 1 ? 
    minTranslation + transformedMin : 
    stepTranslation + step + ". " + minTranslation + transformedMin + ". "
  if(isNaN(transformedValue)) {
    return {value: transformedMin, error: false, message: null}
  } else if (transformedValue < transformedMin){   
    return {value: transformedMin, error: false, message}
  } else if ((transformedValue % step === 0) && transformedValue <= floatMax) {
    return {value: transformedValue, error: false, message: null}
  } else if ((transformedValue % step !== 0) && transformedValue <= floatMax) {
    let transformedValueNormalized = Math.ceil(transformedValue/step)*step;
    return {value: transformedValue, error: true, message}
  } else if (transformedValue > floatMax) {
    message = window.Translations.Products_MaximumQuantity !== undefined ? window.Translations.Products_MaximumQuantity + floatMax : "[Placeholder]Maximum quantity is " + floatMax;
    return {value: Math.ceil(floatMax/step)*step, error: true, message}
  }
}

export class DefaultQuantity extends LitElement { 
  static get properties() {
    return {
      name: {type: String},
      value: {type: Number, reflect: true},
      min: {type: Number},
      max: {type: Number},
      step: {type: Number},
      maxlength: {type: Number},
      message: {type: String, reflect: true},

      class: {type: String},
      id: {type: String},

      error: {type: Boolean, reflect: true},

      readonly: {type: Boolean, reflect: true},
      disabled: {type: Boolean, reflect: true}

    };
  }
  constructor() {
    super();

    this.name = "";
    this.value = this.hasAttribute("min") ? parseFloat(this.getAttribute("min")) : 1;
    this.min = 1;
    this.max = 999;
    this.step = 1;
    this.maxlength = 3;
    this.class="";
    this.id= this.hasAttribute("name") ? this.getAttribute("name") : "n" + uuidv4();
    this.message = "";
    this.error = false;

  }

  firstUpdated() {
    this.max = Math.min(this.max, 999);
    if(this.value % this.step !== 0) {
      this.value =  Math.ceil(this.value/this.step)*this.step;
    }
  }

  createRenderRoot() {
    return this;
  }

  onKeyUp(e) {
    this.dispatchEvent(new Event('keyup',{bubbles: true, cancelable: true}));
  }
  onKeyDown(e) {
    //this.dispatchEvent(new Event('keyup',{bubbles: true, cancelable: true}));
    let regex = RegExp("^[0-9.][0-9.]*$");
    if(!regex.test(e.key) && e.keyCode !== 8 && e.keyCode !== 37 && e.keyCode !==39 || (e.currentTarget.value.length === this.maxlength  && e.keyCode !== 8 && e.keyCode !== 37 && e.keyCode !==39)) {
      e.preventDefault();
    }

  }

  onFocusIn(e) {    
    if(this._tippy !== undefined) {
      this._tippy.destroy();
    }
  }

  onChange(e) {    
    let {value,error,message} = outputTransformedValues(e.currentTarget);       
    this.value = value;
    e.currentTarget.value = value;
    this.error = error;
    if(message === null) {
      this.message = "";
      if(this._tippy !== undefined) {
        this._tippy.destroy();
      }
    }    
    this.updateComplete.then(()=>{
      if(message !== null) {
        if (this.error === true) {
          this.message = message;
        }
        Alert({mode: "tooltip", node: this, message, type: "error"})
      } 
    });
    
    
    this.dispatchEvent(new Event("blur", {bubbles: true,cancelable: true}));    
  }


  render() {
    return html`
    <div class="df-quantity" style="--maxlength: ${this.maxlength}em">   
      <input type="number" ?readonly=${this.readonly} ?disabled=${this.disabled} name="${this.name}" id="${this.id}__element" class="df-quantity__input" value="${this.value}" @keydown=${e=>this.onKeyDown(e)} @keyup=${e=>this.onKeyUp(e)} @change=${e=>this.onChange(e)} autocomplete="no" @focusin=${e=>this.onFocusIn(e)} maxlength="${this.maxlength}" min="${this.min}" max="${this.max}" step="${this.step}" />
      
    </div> 
    `;
  }
}
customElements.define('df-quantity', DefaultQuantity);