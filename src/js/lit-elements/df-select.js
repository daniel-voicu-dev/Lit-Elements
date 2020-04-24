import { LitElement, html } from "lit-element"
import {siblings} from "./utilities.js"
import {v4 as uuidv4} from "uuid"


export class SelectOptionDefault extends LitElement {
  static get properties() { 
    return {      
      checked: { type: Boolean, attribute: "checked"}, 
      label: { type: String},
      value: { type: String},
      innerContent: {type: Array},
    };
  }  
 
  constructor(){
    super();   
    this.label = "";
    this.value = "";
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
    this.elementChildren = this.innerContent;
    super.connectedCallback();
  }
 
  render() {    
    return html`
      <div class="df-option" label="${this.label}" value="${this.value}" @click=${(e)=>this.handleClick(e)}>${this.elementChildren}</div>
    `;
  }
}
customElements.define('df-option', SelectOptionDefault);




// Extend the LitElement base class
export class SelectDefault extends LitElement {
  static get properties() { 
    return {  
      name: {type: String}, 
      label: {type: String},   
      placeholder: {type: String},      
      value: {type: String, reflect: true},       
      required: {type: Boolean, reflect: true},      
      open: {type: Boolean, reflect: true},   
      writing: {type: Boolean, reflect: true},
      error: {type: Boolean, reflect: true},
      focus: {type: Boolean, reflect: true},
      hasvalue: {type: Boolean, reflect: true},
      innerContent: {type: Array},
      readonly: {type: Boolean, reflect: true},
      disabled: {type: Boolean, reflect: true},
      required: {type: Boolean, reflect: true},
      selected: {type: String, reflect: true},
      maxlength: {type: Number, attribute: false}
     
    };
  }  

  
  constructor(){
    super();    
    this.name = "";
    this.label = "";
    this.placeholder = "";
    this.value = "";
    this.open = false;
    this.writing = false;
    this.error = false;
    this.focus = false;
    this.hasvalue = false;
    this.class = "";  
    this.selected = "";
    this.innerContent = Array.from(this.children);
    this.id= this.hasAttribute("id") ? this.getAttribute("id") : this.hasAttribute("name") ? this.getAttribute("name") : "n"+uuidv4();
    this.required = false;
    this.readonly = false;
    this.disabled = false;
    this.minlength = 0;
  }

 

  

  firstUpdated() {       
    
    this.minlength = Math.max(...this.innerContent.map(n=>n.querySelector(".df-option span").innerHTML.length),this.label.length*0.8, this.placeholder.length*0.8) ;   
    this.updateComplete.then(() => {  
      this.style.setProperty("--minlength",this.minlength + "rem");
      if(this.selected !== "") {      
        let option = [...this.querySelector(".df-select__list").children].filter(n=>n.value === this.selected || n.label === this.selected);              
        if (option.length > 0) {  
          option[0].checked = true;         
          this.querySelector(".df-select__value--visible").innerHTML = option[0].innerHTML;
          this.value = option[0].value;
        } else {
          console.log("Error finding the selected value!", this);
        }
        this.hasvalue = true;
      } else {
        let option = [...this.querySelector(".df-select__list").children].filter(n=>n.checked === true);       
        if(option.length > 0) {
          this.querySelector(".df-select__value--visible").innerHTML = option[0].innerHTML;
          this.value = option[0].value;          
        }
        
      }
    
    });    
    
  }

  updated(changedProperties) { 
    changedProperties.forEach((oldValue, propName) => {
      if(propName === "selected") {       
        let option = [...this.querySelector(".df-select__list").children].filter(n=>n.value === this.selected || n.label === this.selected);    
        if (option.length > 0) {  
          option[0].checked = true;         
          this.querySelector(".df-select__value--visible").innerHTML = option[0].innerHTML;
          this.value = option[0].value;
          this.updateComplete.then(()=>{
            this.hasvalue = true;   
            this.dispatchEvent(new Event("change", {bubbles: true,cancelable: true}));   
          })          
        } else {
          console.log("Error finding the selected value!", this);
        }
      }   
      if(propName === "value") {
        if(this.value === "") {
          this.hasvalue = false;
          this.selected = "";
          this.querySelector(".df-select__value--visible").innerHTML = "";
          this.dispatchEvent(new Event("change", {bubbles: true,cancelable: true}));   
          return;   
        }
        let option = [...this.querySelector(".df-select__list").children].filter(n=>n.value === this.value);    
        if (option.length > 0) {  
          option[0].checked = true;         
          this.querySelector(".df-select__value--visible").innerHTML = option[0].innerHTML;          
          this.updateComplete.then(()=>{
            this.hasvalue = true;   
            this.dispatchEvent(new Event("change", {bubbles: true,cancelable: true}));   
          })          
        } else {
           console.log("Error finding the selected value!", this);
           this.value = oldValue;
          // this.updateComplete.then(()=>{
          //   this.value = oldValue;
          // })
        }
      } 
    });
   }
  
  handleChange(e) {     
    e.stopImmediatePropagation();
    e.preventDefault();
    let target = e.detail.target;    
    this.value = target.value;
    this.selected = target.value;  
    this.error = false;        
    this.hasvalue = true;
    //this.open = false;
    this.writing = false; 
    this.updateComplete.then(()=>{     
      this.querySelector(".df-select__value--visible").innerHTML= target.innerHTML; 
      this.dispatchEvent(new Event("change", {bubbles: true,cancelable: true}));  
    });
            
  }

  

  // onFocusin(e) {
  //   this.focus = true;    
  //   this.hasvalue = true;
  //   if(this.writing !== true) {
  //     this.writing = true;
  //   }    
  //   if(this.open !== true) {
  //     this.open = true;
  //   }   
    
  // }

  // onBlur(e) {   
  //   if(this.value === "") {      
  //     this.focus = false;
  //     if(this.required) {
  //       this.error = true;
  //     } 
  //   }
  //   this.writing = false;   
  //   e.currentTarget.value = "";     
  // }
  
  // onKeyDown(e) {    
  //   if(e.which === 27) {     
  //     e.preventDefault();
  //     e.currentTarget.value = "";
  //     this.writing = false;
  //     this.open = false;
  //   }
  //   if(this.writing !== true) {
  //     this.writing = true;
  //   }    
  //   if(this.open !== true) {
  //     this.open = true;
  //   }    

  // }
  // onKeyUp(e) {   
  //   [...this.querySelector(".df-select__list").children].forEach(el=>el.classList.add("hidden"));
  //   let filteredOption = [...this.querySelector(".df-select__list").children].filter(n=>n.getAttribute("label").toLowerCase().includes(e.currentTarget.value.toLowerCase()));
  //   if(filteredOption.length >0) {
  //     this.error = false;
  //   }else {
  //     this.error= true;
  //   }
  //   filteredOption.forEach(el=>el.classList.remove("hidden"));   
  // }
    

  

  toggleList(e) {    
    if(!(this.disabled || this.readonly)) {
      this.open = !this.open; 
      if(this.open === false && this.required && this.value === "") {
        this.error = true;
      }
    }
    
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
    <div class="df-select" @selectChanged=${e=>this.handleChange(e)} @click=${(e)=>this.toggleList(e)}>
      <div class="df-select__value--visible"></div>     
      ${this.placeholder !== "" ? this.focus || this.hasvalue ? "" : html`<label class="df-select__label" for=${this.id}__element>${this.placeholder}</label>` : html`<label class="df-select__label" for=${this.id}__element>${this.label}</label> `}  
      <button type="button" class="df-select__trigger">
        ${this.open ? html`<ion-icon name="chevron-up"></ion-icon>` : html`<ion-icon name="chevron-down"></ion-icon>`}
      </button>
      <div class="df-select__list" >
        ${this.elementChildren}
      </div>
      <input type="hidden" name="${this.name}" value="${this.value}" ?disabled=${this.disabled} ?required=${this.required} ?readonly=${this.readonly} />
    </div> 
    `;
  }
}
customElements.define('df-select', SelectDefault);



window.addEventListener("click",e=>{    
  // console.log(e)
  let dfSelects = e.path.filter(el=>{   
    return el.tagName !== undefined && el.closest("df-select") !== null
    //return el.tagName !== undefined && el.tagName.includes("DF-SELECT")
  }).filter(el => el.open === true);  
  
  if(dfSelects.length === 0) {       
    [...document.querySelectorAll("df-select")].forEach(el => {
      if(el.writing || el.open) {
        el.writing = false;
        el.open = false;        
        if(el.required && el.value === "") {
          el.error = true;
        } 
      }
    });
  } else {
    [...document.querySelectorAll("df-select")].filter(n=>n!==dfSelects[0]).forEach(el => {
      if(el.writing || el.open) {
        el.writing = false;
        el.open = false;    
        if(el.required && el.value === "") {
          el.error = true;
        }    
      }
    });
  }
})









