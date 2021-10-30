import { LitElement, html } from "lit-element"
import Glide, { Controls, Breakpoints, Autoplay, Swipe } from "@glidejs/glide/dist/glide.modular.esm.js"
import {animateCSS, uuidv4, loadImg} from "./../../utilities.js"


export class CarouselDefault extends LitElement {
  static get properties() {
    return {       
      slides: {type: String, attribute: "slides", reflect: true},   
      bullets: {type: Boolean, attribute: "bullets", reflect: true},
      mobile: {type: Number},
      tablet: {type: Number},
      normalizeHeight: {type: Boolean},
      gap: {type: Number}
    };
  }
  constructor() {
    super();    
    // this.navigation = this.hasAttribute("navigation") ? true : false;
    this.gap = 10;
    this.navigation = true;
    this.autoplay = this.hasAttribute("autoplay") ? this.getAttribute("autoplay") !== "" ? this.getAttribute("autoplay") : 2000 : false; 
    this.class= this.hasAttribute("class") ? this.getAttribute('class') : "";
    this.id= this.hasAttribute("id")? this.getAttribute('id') : "n" + uuidv4();
    this.innerContent = Array.from(this.children).map(n=>{
      let slide = document.createElement("li");
      slide.classList.add("glide__slide");
      slide.append(n);
      return slide;
    });
    this.mobile = 1;
    this.tablet = 3;
    this.normalizeHeight = false;
    //alert(this.id);
  }

  firstUpdated() {    
    this.updateComplete.then(()=>{      
      //this.querySelector(".glide").style.setProperty("width",`${this.parentNode.offsetWidth}px`)
      let parent = document.querySelector(`#${this.id}`).parentNode;
      this.style.setProperty("width", parent.offsetWidth +"px");
      let carousel = new Glide(`#${this.id}`,{
        type: 'carousel',
        startAt: 0,
        perView: this.slides,
        autoplay: this.autoplay,
        breakpoints: {
          767: { perView: this.mobile },
          1024: { perView: this.tablet },
          1920: { perView: this.slides}
        },
        throttle: 1000,
        gap: this.gap
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
          if(imageLoaded >= this.slides + 1) {
            return;
          }
          if(imageLoaded === this.slides) {
            animateCSS(this,"fadeIn",()=>{
              this.classList.add("opacity-1");
            });

          }
        }))
      });
      //WIP RESIZE
      carousel.on('resize', () => {
       
        this.style.display = "none";
        let parentNode = document.querySelector(`#${this.id}`).parentNode;
        let parentNodeWidth = parentNode.offsetWidth;        
        this.style.setProperty("width", parentNodeWidth +"px");
        this.style.removeProperty("display");

        if(this.normalizeHeight) {
          [...this.querySelector(".glide__slides").children].forEach(el=> el.style.removeProperty("height"));
          let heights = [...this.querySelectorAll(".glide__slide")].map(el=>el.children[0].offsetHeight);
          //console.log(heights);
          let biggestHeight = Math.max(...heights);
          [...this.querySelector(".glide__slides").children].forEach(el=> el.style.setProperty("height", `${biggestHeight}px`));  
        }
        
      });
      carousel.mount({ Controls, Breakpoints, Autoplay, Swipe });
      animateCSS(this,"fadeIn",()=>{
        this.classList.add("animated","fadeIn");
      });
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
        <button class="btn-icon glide__arrow glide__arrow--left" data-glide-dir="<" aria-label="Show next items"><ion-icon src="/Files/Templates/Designs/Wizaris/icons/default/chevron-back.svg"></ion-icon></button>
        <button class="btn-icon glide__arrow glide__arrow--right" data-glide-dir=">" aria-label="Show previous items"><ion-icon src="/Files/Templates/Designs/Wizaris/icons/default/chevron-forward.svg"></ion-icon></button>
        </div>` :
          html``
      }
      
    </div> 
    `;
  }
}
customElements.define('df-carousel', CarouselDefault);


// bullets
// ${this.bullets === true ? 
//         html`<div class="glide__bullets" data-glide-el="controls[nav]">
//             ${this.innerContent.forEach((n,i) => html`<button class="glide__bullet" data-glide-dir="=${i}"></button>`)}       
// </div>` : 
// html``
// }