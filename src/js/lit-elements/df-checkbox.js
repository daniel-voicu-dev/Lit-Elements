import { LitElement, html } from "lit-element"

// Extend the LitElement base class
export class CheckboxDefault extends LitElement {
  static get properties() { 
    return {      
      checked: { type: Boolean, attribute: "checked", reflect: true},
      required: {type: Boolean, attribute: "required"}, 
      name: {type: String}
    };
  }  
  constructor() {    
    super();    
    this.checked = false;   
    this.value = this.hasAttribute("value") ? this.getAttribute('value') : "on";
    this.innerContent = Array.from(this.children);
    this.id = this.hasAttribute("id") ? this.getAttribute("id") : (this.name + this.value).replace(" ", ""); 
  }

  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      if(propName === "checked" && oldValue !== undefined) {
        console.log("checked changed");
        this.updateComplete.then(()=>{
          this.dispatchEvent(new Event("change", {bubbles: true,cancelable: true}));  
        })
        
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

  handleClick(e) {
    e.stopImmediatePropagation();   
    e.preventDefault();
    this.checked = !this.checked;
  }
  
  render() {    

    return html`
    <div class="checkbox ${this.checked ? "checked":""}">
      
        ${this.checked ? 
          html`<div class="ico icon-small" @click=${(e) => this.handleClick(e)}>
               <svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'>
               <rect x='64' y='64' width='384' height='384' rx='48' ry='48' style='fill:var(--icon-color, var(--color-brand));stroke:var(--icon-color, var(--color-brand));stroke-linejoin:round;stroke-width:54px'/>
               <polyline points='352 176 217.6 336 160 272' style='fill:none;stroke:var(--color-light);stroke-linecap:round;stroke-linejoin:round;stroke-width:54px'/>
               </svg>
            </div>` :
          html`<div class="ico icon-small" @click=${(e) => this.handleClick(e)}>
            <svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'><path d='M416,448H96a32.09,32.09,0,0,1-32-32V96A32.09,32.09,0,0,1,96,64H416a32.09,32.09,0,0,1,32,32V416A32.09,32.09,0,0,1,416,448Z' style='fill:none;stroke:var(--icon-color, var(--color-brand));stroke-linecap:round;stroke-linejoin:round;stroke-width:54px'/></svg>`
        }
        ${this.elementChildren}
      
      ${this.name !== undefined ?
        html`<input id="${this.id}__element" type="checkbox" name="${this.name}" value="${this.value}" ?checked=${this.checked} ?required=${this.required} style="display: none">` :
        html`<input id="${this.id}__element" type="checkbox" value="${this.value}" ?checked=${this.checked} ?required=${this.required} style="display: none">`
      }
      
    </div> 
    `;
  }
}
customElements.define('df-checkbox', CheckboxDefault);



