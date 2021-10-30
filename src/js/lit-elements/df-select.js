import { LitElement, html } from "lit-element"
import {siblings, uuidv4} from "./../../utilities.js"

export class SelectOptionDefault extends LitElement {
  static get properties() {
    return {
      checked: { type: Boolean, reflect: true},
      label: { type: String},
      value: { type: String},
      innerContent: {type: Array},
      cancel: {type:Boolean, attribute:false},
      firstUpdate: {type: Boolean, attribute:false}
    };
  }

  constructor(){
    super();
    // this.checked = false;
    this.label = "";
    this.value = "";
    this.innerContent = Array.from(this.children);
    this.cancel = false;
    this.firstUpdate = false;
    this.checked = false;
  }

  handleClick(e){
    this.checked = true;
  }
  firstUpdated() {
    this.firstUpdate = true;
  }
  updated(changedProperties) {    
    changedProperties.forEach((oldValue, propName) => {
      // if(propName === "checked") {
      //   console.log({oldValue, currentValue: this.checked, propName, el: this.label});  
      // }
      if(propName === "checked" && this.checked === true && oldValue === false) {
        // console.log({oldValue, currentValue: this.checked, propName, el: this.label});

        this.dispatchEvent(new CustomEvent("selectChanged", {bubbles: true,cancelable: true, detail: {target: this, cancel: this.cancel}}));  
        
         
      }
    });
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
      id: {type: String, reflect: true},
      value: {type: String, reflect: true},
      open: {type: Boolean, reflect: true},
      writing: {type: Boolean, reflect: true},
      error: {type: Boolean, reflect: true},
      focus: {type: Boolean, reflect: true},
      hasvalue: {type: Boolean, reflect: true},
      innerContent: {type: Array},
      readonly: {type: Boolean, reflect: true},
      disabled: {type: Boolean, reflect: true},
      required: {type: Boolean, reflect: true},
      selected: {type: String}

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
  }





  firstUpdated() {
    if(this.selected !== "") {
      
      let option = [...this.querySelector(".df-select__list").children].filter(n=>n.value === this.selected || n.label === this.selected);
      // console.log(option[0].value);
      if (option.length > 0) {
        option[0].cancel = true;
        this.value = option[0].value;
        this.updateComplete.then(()=>{
          option[0].cancel = false;
         })
      } else {
        console.log("Error finding the selected value!", this);
      }
    } else {
      let option = [...this.querySelector(".df-select__list").children].filter(n=>n.checked === true);
      if (option.length > 0) {
        option[0].cancel = true;
        this.value = option[0].value;
        this.error = false;
        this.hasvalue = true;
        this.writing = false;
        this.querySelector(".df-select__value--visible").innerHTML= option[0].innerHTML;
        this.updateComplete.then(()=>{
          option[0].cancel = false;
        })
      } else {
        if(this.value !== "") {
          console.log("Error finding the selected value!", this);
        }

      }
    }
  }
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if(propName === "value" && this.value !== undefined && oldValue !== undefined) {
        //console.log({oldValue, "newValue": this.value, node: this})
        if(this.value === "" && oldValue !== undefined ) {
          this.hasvalue = false;
          this.selected = "";
          this.querySelector(".df-select__value--visible").innerHTML = "";
          [...this.querySelectorAll("df-option")].forEach(el=>el.checked = false);
          return;
        } else {
          // console.log("value:",this.value)   
          let option = [...this.querySelector(".df-select__list").children].filter(n=>n.value === this.value);
          if (option.length > 0) {
            option[0].checked = true;
          } else {
            //console.log("Error finding the selected value!", this);
            this.value = oldValue;
            return;
          }
        }
      }
    });
  }

  handleChange(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
    let {target, cancel} = e.detail;
    [...siblings(target)].forEach(el=>el.checked = false);
    this.value = target.value;
    this.selected = target.value;
    this.error = false;
    this.hasvalue = true;
    this.writing = false;
    this.querySelector(".df-select__value--visible").innerHTML= target.innerHTML;
    // alert("value:" + cancel);
    this.updateComplete.then(()=>{
      if(!cancel) {
        this.dispatchEvent(new Event("change", {bubbles: true,cancelable: true}));
      }  
    })
    
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
      <button type="button" class="df-select__trigger" aria-label="Open select values">
        ${this.open ? html`<ion-icon src="${window.variables.iconsURL}chevron-up.svg"></ion-icon>` : html`<ion-icon src="${window.variables.iconsURL}chevron-down.svg"></ion-icon>`}
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
  let dfSelects = e.composedPath().filter(el=>{
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