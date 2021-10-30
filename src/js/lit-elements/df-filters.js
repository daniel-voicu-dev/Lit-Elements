import { LitElement, html } from "lit-element"

// Extend the LitElement base class
export class FiltersDefault extends HTMLElement {

  constructor() {    
    super();    
    this.class = this.getAttribute('class');  
  }
  
  render() {    

    return html`
    <div class="${this.class}">      
      <slot></slot>
    </div> 
    `;
  }
}
customElements.define('df-filters', FiltersDefault);

export class FiltersWithButtons extends HTMLElement {

  constructor() {    
    super();    
    this.class = this.getAttribute('class');  
  }
  
  render() {    

    return html`
    <div class="${this.class}">      
      <slot></slot>
      <button type="button">Apply filters</button>
    </div> 
    `;
  }
}
customElements.define('df-filters-with-buttons', FiltersWithButtons);
