import { LitElement, html } from "lit-element"
import {v4 as uuidv4} from "uuid"

export class DefaultQuantity extends LitElement {
  static get properties() { 
    return {          
      name: {type: String, attribute: "name"},      
      value: {type: String, attribute: "value", reflect: true},
      min: {type: Number, attribute: "min"},
      max: {type: Number, attribute: "max"},
      step: {type: Number, attribute: "step"},


      class: {type: String, attribute: "class"},
      id: {type: String, attribute: "id"},     

      error: {type: Boolean},
      focus: {type: Boolean},
     
      required: {type: Boolean, attribute: "required", reflect: true},
      readonly: {type: Boolean, attribute: "readonly", reflect: true},
      disabled: {type: Boolean, attribute: "disabled", reflect: true},
      maxlength: {type: String, attribute: "maxlength"}
     
    };
  }   

  firstUpdated() {        
    if(this.value === undefined) {
      if(this.min !== undefined) {
        this.value = this.min
      } else {
        this.value = 1;
      }
      
    }
    if(this.class === undefined) {
      this.class = "";
    }    
    if(this.name === undefined) {
      console.log("You must set up a [name] attribute for the input", this);      
    }    
    if(this.id === undefined) {
      this.id = uuidv4();
    }
    if(this.value === undefined) {
      this.value = "";
    }   
    if(this.value !== "") {
      this.focus = true;
    }  
      
  }

  createRenderRoot() {
    return this;
  }
  
  onKeyUp() {
  //  console.log(this.value);
  }
  onKeyDown(e) {
    this.dispatchEvent(new Event('keyup',{bubbles: true, cancelable: true}));

    let regex = RegExp("^[0-9.][0-9.]*$");  
    
    if(!regex.test(e.key) && e.keyCode !== 8) {
      e.preventDefault();
    } 

  }
  onFocusIn(e) {
    this.focus = true
  }
  onBlur(e) {
    this.dispatchEvent(new Event("blur", {bubbles: true,cancelable: true}));
    if(this.value === "") {      
      this.focus = false;
      if(this.required) {
        this.error = true;
      } 
    }
  }  
  
  
  render() {    

    return html`
    <div class="df-quantity ${this.class} ${this.focus ? "focus" : ""} ${this.error ? "alert" : ""}">       
      <input type="text" ?readonly=${this.readonly} ?disabled=${this.disabled} name="${this.name}" id="${this.id}__element" class="df-quantity__input" value="${this.value}" @keyup=${e=>this.onKeyUp()} @keydown=${e=>this.onKeyDown(e)} @focusin=${(e)=>this.onFocusIn(e)} @blur=${(e)=>this.onBlur(e)} autocomplete="no" />     
    </div> 
    `;
  }
}
customElements.define('df-quantity', DefaultQuantity);