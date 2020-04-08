import { LitElement, html } from "lit-element"

// Extend the LitElement base class
export class RadioDefault extends LitElement {
  static get properties() { 
    return {     
      checked: { type: Boolean, attribute: "checked"},   
      required: {type: Boolean, attribute: "required" },     
    };
}  
  constructor() {    
    super();    
    this.name = this.getAttribute('name');  
    this.class = this.getAttribute('icon-style');  
    this.value = this.getAttribute('value');
    this.id = this.hasAttribute("id") ? this.getAttribute("id") : (this.name + this.value).replace(" ", "");
  }

  createRenderRoot() {
    return this;
  }


  connectedCallback() {
    this.elementChildren = Array.from(this.children);
    super.connectedCallback();
  }
  
  onClick(e) {    
    e.stopImmediatePropagation();
    [...document.querySelectorAll(`df-radio[name="${this.name}"]`)].filter(el=>el.checked === true).forEach(el=>el.checked = false);
    this.checked = true;
    this.dispatchEvent(new Event("change", {bubbles: true, cancelable: true}));
  }
  
  render() {    

    return html`
    <div class="radio ${this.checked ? "checked":""}">
      <label for="${this.id}__element" @click=${e=>this.onClick(e)}>
        ${this.checked ? 
          html`<ion-icon src="${window.variables.iconsURL}/radio-on.svg" role="img" class="md hydrated ${this.class}" aria-label="radio button on"></ion-icon>` : 
          html`<ion-icon src="${window.variables.iconsURL}/radio-off.svg" role="img" class="md hydrated ${this.class}" aria-label="radio button off"></ion-icon>`
        }
        ${this.elementChildren}
      </label>
      <input id="${this.id}__element" type="radio" name="${this.name}" value="${this.value}" ?checked=${this.checked} ?required=${this.required} style="display: none" >
    </div> 
    `;
  }
}
customElements.define('df-radio', RadioDefault);

// [...document.querySelectorAll('df-radio')].forEach(el=>el.addEventListener("click",e=>{  
//   e.preventDefault();  
//   console.log(e, 'this is happening');
//   [...document.querySelectorAll(`df-radio[name="${e.currentTarget.name}"]`)].filter(el=>el.hasAttribute("checked")).forEach(el=>el.removeAttribute("checked")); 
//   e.currentTarget.setAttribute("checked",true);  
// }));