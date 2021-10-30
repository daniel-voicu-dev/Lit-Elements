import { LitElement, html } from "lit-element"
import {animateCSS, uuidv4} from "./../../utilities.js"

export class ModalDefault extends LitElement {
  static get properties() {
    return {
      open: {type: Boolean, attribute: "open", reflect: true}    
    };
  }


  constructor() {
    super();
    this.heading = this.hasAttribute("heading") ? this.getAttribute("heading") : null
    this.class= this.hasAttribute("class") ? this.getAttribute('class') : "";
    this.id= this.hasAttribute("id")? this.getAttribute('id') : uuidv4();
    this.innerContent = Array.from(this.children);
  }
  createRenderRoot() {
    return this;
  }
  
  updated(){
    this.updateComplete.then(()=>{
     
      if(this.open === true) {
        document.querySelector("body").style.setProperty("height","100vh");
        document.querySelector("body").style.setProperty("overflow-y","hidden");
        this.querySelector(".modal").style.setProperty("display","flex");
        animateCSS(this.querySelector(".modal"),"fadeIn",()=>{
          this.querySelector(".modal").style.setProperty("opacity","1");
          this.dispatchEvent(new CustomEvent("modalOpened", {bubbles: true,cancelable: true, detail: this}));  
        });
      } else if(this.open === false){
        document.querySelector("body").style.removeProperty("height");
        document.querySelector("body").style.removeProperty("overflow-y");
        animateCSS(this.querySelector(".modal"),"fadeOut",()=>{
          this.querySelector(".modal").style.removeProperty("opacity");
          this.querySelector(".modal").style.removeProperty("display");          
          this.querySelector(".modal").classList.remove("fadeOut","fadeIn");
          this.dispatchEvent(new CustomEvent("modalClosed", {bubbles: true,cancelable: true, detail: this}));
        });
      }
    });
  }


  connectedCallback() {
    this.elementChildren = this.innerContent;
    super.connectedCallback();
  }
  
  onBackdropClick(e) {
    // console.log(e);
    // if (e.target.classList.contains("modal")) {
    //   this.closeModal();
    // }
  }
  
  closeModal() {
    this.open = false;
  }
  
  render() {

    return html`
    <section id="${this.id}__id" class="modal ${this.class}" @click=${e =>this.onBackdropClick(e)}>        
        <article class="modal__content">
            <button type="button" class="btn-icon bg-light modal__close" @click=${e=>this.closeModal()}><div class="ico"><svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'><line x1='368' y1='368' x2='144' y2='144' style='fill:none;stroke:var(--icon-color, #2e3b42);stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/><line x1='368' y1='144' x2='144' y2='368' style='fill:none;stroke:var(--icon-color, #2e3b42);stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg></div></button>
            ${this.heading !== null ?
              html`<header><h6 class="modal__heading h4 text-uppercase letter-spacing line-height-inline">${this.heading}</h6></header>` :
              html``
            } 
            <main>
                ${this.elementChildren}
            </main>
        </article> 
    </section> 
    `;
  }
}
customElements.define('df-modal', ModalDefault);