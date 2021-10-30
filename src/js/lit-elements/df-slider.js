import { LitElement, html } from "lit-element"
import Glide, { Controls, Breakpoints, Autoplay, Swipe } from "@glidejs/glide/dist/glide.modular.esm.js"
import {animateCSS, uuidv4} from "./../../utilities.js"


export class SliderDefault extends LitElement {
  static get properties() {
    return {     
      bullets: {type: Boolean},      
    };
  }
  constructor() {
    super();
    // this.navigation = this.hasAttribute("navigation") ? true : false;
    this.bullets = true; 
    this.navigation = true;   
    this.class= this.hasAttribute("class") ? this.getAttribute('class') : "";
    this.id= this.hasAttribute("id")? this.getAttribute('id') :  "n" + uuidv4();
    this.autoplay = this.hasAttribute("autoplay") ? this.getAttribute("autoplay") !== "" ? this.getAttribute("autoplay") : 2000 : false;
    this.innerContent = Array.from(this.children).map(n=>{
      let slide = document.createElement("li");
      slide.classList.add("glide__slide");
      slide.append(n);
      return slide;
    });
    console.log(this.innerContent);
    
  }

  firstUpdated() {
    this.updateComplete.then(()=>{
      //this.querySelector(".glide").style.setProperty("width",`${this.parentNode.offsetWidth}px`)
      let parent = document.querySelector(`#${this.id}`).parentNode;
      this.style.setProperty("width", parent.offsetWidth +"px");
      let carousel = new Glide(`#${this.id}`,{
        type: 'slider',
        perView: 1,
        autoplay: this.autoplay,
        animationDuration: 1200,        
      })     
      carousel.on('build.after', () => {
        let imageToBeLoaded = this.querySelectorAll("[data-src]:not(.lazyloaded)");
        let imageCount = imageToBeLoaded.length;
        let imageLoaded = 0;        
        this.querySelectorAll(".lazyloading").forEach(el=>{
          lazySizes.loader.unveil(el);
        });
        this.querySelectorAll(".lazyload").forEach(el=>{        
          lazySizes.loader.unveil(el);
        })        
        this.querySelectorAll("[data-src]:not(.lazyloaded)").forEach(el=>el.addEventListener("lazyloaded", (e) => {
          imageLoaded++;         
          if(imageLoaded >= 3) {
            return;
          }
          if(imageLoaded === 2) {
            animateCSS(this,"fadeIn",()=>{
              this.classList.add("opacity-1");
            });
            
          }
        }))
      });
      
      carousel.mount({ Controls, Breakpoints, Autoplay, Swipe});
      
      


      // carousel.on('resize', () => {
      //   //console.log("resize");
      //   [...this.querySelector(".glide__slides").children].forEach(el=> el.style.removeProperty("height"));
      //   let heights = [...this.querySelectorAll(".glide__slide")].map(el=>el.children[0].offsetHeight);
      //   //console.log(heights);
      //   let biggestHeight = Math.max(...heights);
      //   [...this.querySelector(".glide__slides").children].forEach(el=> el.style.setProperty("height", `${biggestHeight}px`));
      //   let parentNode = document.querySelector(`#${this.id}`).parentNode;        
      //   this.style.setProperty("width", parentNode.offsetWidth +"px");
      // });
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
    <div class="glide">
      <div class="glide__track" data-glide-el="track">
        <ul class="glide__slides">
            ${this.elementChildren}         
        </ul>
      </div>
      ${this.navigation ?
      html`<div class="glide__arrows" data-glide-el="controls">
        <button class="btn-icon glide__arrow glide__arrow--left" data-glide-dir="<" aria-label="Go to next slide">
        <div class="ico icon-xlarge color-light"><svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'><path d='M256,64C150,64,64,150,64,256s86,192,192,192,192-86,192-192S362,64,256,64Z' style='fill:none;stroke:var(--icon-color, var(--color-brand));stroke-miterlimit:10;stroke-width:32px'/><polyline points='296 352 200 256 296 160' style='fill:none;stroke:var(--icon-color, var(--color-brand));stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg></div>
</button>
        <button class="glide__arrow glide__arrow--right" data-glide-dir=">" aria-label="Go to previous slide">
        <div class="ico icon-xlarge color-light"><svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'><path d='M64,256c0,106,86,192,192,192s192-86,192-192S362,64,256,64,64,150,64,256Z' style='fill:none;stroke:var(--icon-color, var(--color-brand));stroke-miterlimit:10;stroke-width:32px'/><polyline points='216 352 312 256 216 160' style='fill:none;stroke:var(--icon-color, var(--color-brand));stroke-linecap:round;stroke-linejoin:round;stroke-width:32px'/></svg></div>
</button>
        </div>` :
      html``
    }
      ${this.bullets === true ?
      html`<div class="glide__bullets" data-glide-el="controls[nav]">
            ${[...this.innerContent].map((n,i) => html`<button class="glide__bullet btn-icon btn-inline h-unset" data-glide-dir="=${i}" aria-label="Go to slide number ${i}"><div class="ico icon-default"><svg xmlns='http://www.w3.org/2000/svg' width='512' height='512' viewBox='0 0 512 512'><path d='M256,464C141.31,464,48,370.69,48,256S141.31,48,256,48s208,93.31,208,208S370.69,464,256,464Z'/></svg></div></button>`)} 
      </div>` :
      html``
    }
      
    </div> 
    `;
  }
}
customElements.define('df-slider', SliderDefault);