import { LitElement, html } from "lit-element"


// Extend the LitElement base class
export class FacetDefault extends LitElement {

  static get properties() {
    return {
      name: {type: String},      
      value: {type: String},
      class: {type: String},
      group: {type: String},
      label: {type: String},
    };
  }
  
  constructor() {    
    super();    
    this.name = ""; 
    this.value = "";
    this.class = "";
    this.group = "";
    this.label = "";
  }

  createRenderRoot() {
    return this;
  }

  
  connectedCallback() {
    this.elementChildren = Array.from(this.children);
    super.connectedCallback();
  }

  handleClick(e) {
    e.stopImmediatePropagation();
    e.preventDefault();    
    this.dispatchEvent(new CustomEvent("facetChanged", {bubbles: true,cancelable: true, detail: {name: this.name, value: this.value, node: this}}));
  }
  
  render() {   
    return html`
    <div class="facet" @click=${(e)=>this.handleClick(e)}>
      <button type="button" class="btn-fill--brand p-0 px-2" icon-position="right">
        ${this.elementChildren}
        <div class="icon">
            <div class="ico">
                <svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><path d="M289.94,256l95-95A24,24,0,0,0,351,127l-95,95-95-95A24,24,0,0,0,127,161l95,95-95,95A24,24,0,1,0,161,385l95-95,95,95A24,24,0,0,0,385,351Z"/></svg>
            </div>
        </div>
         
      </button>
    </div> 
    `;
  }
}
customElements.define('df-facet', FacetDefault);