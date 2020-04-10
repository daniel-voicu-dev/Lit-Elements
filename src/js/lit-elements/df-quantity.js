import { LitElement, html } from "lit-element"
import {v4 as uuidv4} from "uuid"

export class DefaultQuantity extends LitElement {
  static get properties() { 
    return {          
      name: {type: String},      
      value: {type: Number, reflect: true},
      min: {type: Number},
      max: {type: Number},
      step: {type: Number},
      maxlength: {type: Number},


      class: {type: String},
      id: {type: String},     

      error: {type: Boolean, reflect: true},
      focus: {type: Boolean, reflect: true},
     
      required: {type: Boolean, reflect: true},
      readonly: {type: Boolean, reflect: true},
      disabled: {type: Boolean, reflect: true}
      
     
    };
  }   
  constructor() {
    super();

    this.name = "";
    this.value = this.hasAttribute("min") ? parseFloat(this.getAttribute("min")) : 1;
    this.min = 1;
    this.max = 9999999999999;
    this.step = 1;
    this.maxlength = 3;
    this.class="";
    this.id= this.hasAttribute("name") ? this.getAttribute("name") : "n" + uuidv4();
   
  }  
  
  firstUpdated() {
    this.max = parseFloat(this.max.toString().substring(0,this.maxlength));
  }

  createRenderRoot() {
    return this;
  }
  
  
  onKeyDown(e) {
    this.dispatchEvent(new Event('keyup',{bubbles: true, cancelable: true}));

    let regex = RegExp("^[0-9.][0-9.]*$");  
    if(!regex.test(e.key) && e.keyCode !== 8 && e.keyCode !== 37 && e.keyCode !==39 || (e.currentTarget.value.length === this.maxlength  && e.keyCode !== 8 && e.keyCode !== 37 && e.keyCode !==39)) {
      e.preventDefault();
    } 

  }
  
  
  onChange(e) {
    this.value= e.currentTarget.value;   
    if(this.value === "" || this.value < this.min) {  
      this.value = this.min;
    }
    this.dispatchEvent(new Event("blur", {bubbles: true,cancelable: true}));
  } 
  
  
  render() {    

    return html`
    <div class="df-quantity" style="--maxlength: ${this.maxlength}em">       
      <input type="number" ?readonly=${this.readonly} ?disabled=${this.disabled} name="${this.name}" id="${this.id}__element" class="df-quantity__input" value="${this.value}" @keydown=${e=>this.onKeyDown(e)}  @change=${e=>this.onChange(e)} autocomplete="no" maxlength="${this.maxlength}" min="${this.min}" max="${this.max}" step="${this.step}" />     
    </div> 
    `;
  }
}
customElements.define('df-quantity', DefaultQuantity);