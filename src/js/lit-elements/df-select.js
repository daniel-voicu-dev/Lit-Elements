import { LitElement, html } from "lit-element"
import {siblings} from "./utilities.js"


export class SelectOptionDefault extends LitElement {
  static get properties() { 
    return {      
      checked: { type: Boolean, attribute: "checked"}, 
      label: { type: String, attribute: "label" },
      value: { type: String, attribute: "value" }
    };
  }  
 
  constructor(){
    super();   
    this.innerContent = Array.from(this.children);
  }  

  handleClick(e){
    [...siblings(this)].forEach(el=>el.removeAttribute("checked"));
    this.checked = true;    
    this.dispatchEvent(new CustomEvent("selectChanged", {bubbles: true,cancelable: true, detail: {target: this}})); 
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    console.log(this);
    this.elementChildren = this.innerContent;
    super.connectedCallback();
  }
 
  render() {    
    return html`
      <div class="df-select__option" label="${this.label}" value="${this.value}" @click=${(e)=>this.handleClick(e)}>${this.elementChildren}</div>
    `;
  }
}
customElements.define('df-option', SelectOptionDefault);




// Extend the LitElement base class
export class SelectDefault extends LitElement {
  static get properties() { 
    return {  
      name: {type: String, attribute: "name"}, 
      class: {type: String, attribute: "class"},
      label: {type: String, attribute: "label"},      
      value: {type: String, attribute: "value", reflect: true},       
      required: {type: Boolean, reflect: true},      
      open: {type: Boolean, reflect: true},   
      writing: {type: Boolean, reflect: true},
      error: {type: Boolean, reflect: true},
      focus: {type: Boolean, reflect: true},
      selected: {type: String, reflect: true},
      id: {type: String}
     
    };
  }  

  
  constructor(){
    super();           
    this.innerContent = Array.from(this.children);
  }

 

  createRenderRoot() {
    return this;
  }

  connectedCallback() {    
    this.elementChildren = this.innerContent;
    super.connectedCallback();
  }
  
  
  render() {    

    return html`    
    <div>${this.elementChildren}</div>
    `;
  }
}
customElements.define('df-select', SelectDefault);




