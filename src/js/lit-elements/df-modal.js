import {v4 as uuidv4} from "uuid"
import { LitElement, html } from "lit-element"
import {animateCSS} from "./utilities.js"

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
        console.log(this.querySelector(".modal"))
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
            <button type="button" class="btn-icon modal__close" @click=${e=>this.closeModal()}><ion-icon src="${window.variables.iconsURL}/close-raw.svg"></ion-icon></button>
            ${this.heading !== null ?
              html`<header><h2 class="modal__heading">${this.heading}</h2></header>` :
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