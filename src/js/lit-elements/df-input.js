import { LitElement, html } from "lit-element"
import {isValidEmail, uuidv4} from "./../../utilities.js"

export class DefaulInput extends LitElement {
  static get properties() {
    return {
      name: {type: String},
      type: {type: String},
      value: {type: String, reflect: true},

      class: {type: String},     
      label: {type: String},
      placeholder: {type: String},
      mask: {type: String},
      id: {type: String, reflect: true},

      error: {type: Boolean, reflect: true},
      focus: {type: Boolean, reflect: true},

      required: {type: Boolean, attribute:"required", reflect: true},
      readonly: {type: Boolean, attribute:"readonly", reflect: true},
      disabled: {type: Boolean, attribute:"disabled", reflect: true},
      password: {attribute: false},
    };
  }
  constructor() {
    super();    
    this.value="";

    this.class="";
    this.id= this.hasAttribute("id") ? this.getAttribute("id") : this.hasAttribute("name") ? this.getAttribute("name") : "n"+uuidv4();
    this.label="";
    this.placeholder="";
    this.mask=""

    this.error=false;
    this.focus=false;
    this.password=false;
  }

  firstUpdated() {
    // if(this.name === undefined) {
    //   console.log("You must set up a [name] attribute for the input", this);
    // }
    if(this.type === undefined) {
      console.log("You must set up a [type] attribute for the input", this);
    }
    if(this.type === "password") {
      this.password = true;
    }
    if(this.value !== "") {
      this.focus = true;
    }
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if(propName === "value" && this.value !== undefined) {
        if(this.value === "") {
          this.focus = false;
        } else {
          this.focus = true;
          this.error = false;
        }
        this.querySelector(".df-input__input").value = this.value;
        this.dispatchEvent(new Event("change", {bubbles: true,cancelable: true}));
      }
    });
  }

  createRenderRoot() {
    return this;
  }

  async onKeyUp(e) {   
    this.value = e.target.value;
    await this.updateComplete;
    if(this.value === "" && !this.required) {
      this.error = false;
      return;
    }

    if(this.type === "text" || this.type === "password") {
      if(this.mask !== null) {
        let regex = RegExp(this.mask);
        if(regex.test(this.value)) {
          this.error = false;
        } else {
          this.error = true;
        }
      } else {
        if(this.value !== "") {
          this.error = false;
        }
      }

    }
    if(this.type === "email") {      
      if(isValidEmail(this.value)) {
        this.error = false;
      } else {
        this.error = true;
      }
    }

    if(this.type === "number") {
      let regex = RegExp("^[0-9/]+$");
      if(regex.test(this.value)) {
        this.error = false;
      } else {
        this.error = true;
      }
    }
  }
  onKeyDown(e) {
    if(this.type === "number") {
      let regex = RegExp("^[0-9/]*$");
      if(!regex.test(e.key) && e.keyCode !==8 && e.keyCode !== 37 && e.keyCode !==39) {
        e.preventDefault();
      }
    }
  }
  onFocusIn(e) {
    this.focus = true;
    this.scrollIntoView(false);
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
  onTogglePassword(e) {
    if(this.password === true) {
      this.password = false;
      this.querySelector(".df-input__input").type="text";
    } else {
      this.password = true;
      this.querySelector(".df-input__input").type="password"
    }
  }

  render() {     
    return html`
    <div class="df-input">  
      ${this.placeholder !== "" ? this.focus ? "" : html`<label class="df-input__label" for=${this.id}__element>${this.placeholder}</label>` : html`<label class="df-input__label" for=${this.id}__element>${this.label}</label> `}
      <input type="${this.type==="password" ? "password" : "text"}" ?required=${this.required} ?readonly=${this.readonly} ?disabled=${this.disabled} name="${this.name}" id="${this.id}__element" class="df-input__input" .value="${this.value}" @keydown=${e=>this.onKeyDown(e)} @keyup=${e=>this.onKeyUp(e)} @focusin=${(e)=>this.onFocusIn(e)} @blur=${(e)=>this.onBlur(e)} autocomplete="off" ?error="${this.error}" />     
      ${this.type==="password" ?
        this.password === true ?
          html`<button type="button" @click=${e=>this.onTogglePassword(e)} class="btn-icon df-input__icon"><div class="ico icon-medium"><svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'><path d='M255.66,112c-77.94,0-157.89,45.11-220.83,135.33a16,16,0,0,0-.27,17.77C82.92,340.8,161.8,400,255.66,400,348.5,400,429,340.62,477.45,264.75a16.14,16.14,0,0,0,0-17.47C428.89,172.28,347.8,112,255.66,112Z' style='fill:none;stroke:var(--icon-color, var(--color-brand, #000));stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><circle cx='256' cy='256' r='80' style='fill:none;stroke:var(--icon-color, #000);stroke-miterlimit:10;stroke-width:32px'/></svg></div></button>` :
          html`<button type="button" @click=${e=>this.onTogglePassword(e)} class="btn-icon df-input__icon"><div class="ico icon-medium"><svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'><path fill="var(--color-brand)" d='M432,448a15.92,15.92,0,0,1-11.31-4.69l-352-352A16,16,0,0,1,91.31,68.69l352,352A16,16,0,0,1,432,448Z'/><path fill="var(--color-brand)" d='M255.66,384c-41.49,0-81.5-12.28-118.92-36.5-34.07-22-64.74-53.51-88.7-91l0-.08c19.94-28.57,41.78-52.73,65.24-72.21a2,2,0,0,0,.14-2.94L93.5,161.38a2,2,0,0,0-2.71-.12c-24.92,21-48.05,46.76-69.08,76.92a31.92,31.92,0,0,0-.64,35.54c26.41,41.33,60.4,76.14,98.28,100.65C162,402,207.9,416,255.66,416a239.13,239.13,0,0,0,75.8-12.58,2,2,0,0,0,.77-3.31l-21.58-21.58a4,4,0,0,0-3.83-1A204.8,204.8,0,0,1,255.66,384Z'/><path fill="var(--color-brand)" d='M490.84,238.6c-26.46-40.92-60.79-75.68-99.27-100.53C349,110.55,302,96,255.66,96a227.34,227.34,0,0,0-74.89,12.83,2,2,0,0,0-.75,3.31l21.55,21.55a4,4,0,0,0,3.88,1A192.82,192.82,0,0,1,255.66,128c40.69,0,80.58,12.43,118.55,37,34.71,22.4,65.74,53.88,89.76,91a.13.13,0,0,1,0,.16,310.72,310.72,0,0,1-64.12,72.73,2,2,0,0,0-.15,2.95l19.9,19.89a2,2,0,0,0,2.7.13,343.49,343.49,0,0,0,68.64-78.48A32.2,32.2,0,0,0,490.84,238.6Z'/><path fill="var(--color-brand)" d='M256,160a95.88,95.88,0,0,0-21.37,2.4,2,2,0,0,0-1,3.38L346.22,278.34a2,2,0,0,0,3.38-1A96,96,0,0,0,256,160Z'/><path fill="var(--color-brand)" d='M165.78,233.66a2,2,0,0,0-3.38,1,96,96,0,0,0,115,115,2,2,0,0,0,1-3.38Z'/></svg></div></button>` :
        ""}      
    </div> 
    `;
   
  }
}
customElements.define('df-input', DefaulInput);