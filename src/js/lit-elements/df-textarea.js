import { LitElement, html } from "lit-element"
export class TextareaDefault extends LitElement {
  static get properties() { 
    return {          
      error: {type: Boolean, reflect: true},
      focus: {type: Boolean, reflect: true},
      value: {type: String, attribute: "value", reflect: true},
      required: {type: Boolean, attribute: "required", reflect: true},
      password: {type: Boolean},
      valid: {type: Boolean}
    };
  }  
  constructor() {    
    super();    
    this.class = this.hasAttribute("class") ? this.getAttribute('class') : "";
    this.type = this.hasAttribute("type") ? this.getAttribute("type") : null;  
    this.name = this.getAttribute('name');     
    this.label = this.getAttribute('label');  
    this.mask = this.hasAttribute("mask") ? this.getAttribute("mask") : null;
  }

  
  createRenderRoot() {
    return this;
  }

  onKeyUp(e) {
    this.value = e.target.value;  

    if(this.value === "" && !this.required) {
      this.error = false;
      return;
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
    <div class="df-textarea ${this.class} ${this.focus ? "focus" : ""} ${this.error ? "alert" : ""}"}>  
      <label class="df-textarea__label" for=${this.name}__element>${this.label}</label>  
      <textarea name="${this.name}" id="${this.name}__element" class="df-textarea__textarea" value="${this.value}"  @keyup=${e=>this.onKeyUp(e)} @focusin=${(e)=>this.onFocusIn(e)} @blur=${(e)=>this.onBlur(e)}></textarea> 
    </div> 
    `;
  }
}
customElements.define('df-textarea', TextareaDefault);