import { LitElement, html, css } from "lit-element"

export class LitBenefits extends LitElement {
  static get styles() {
    return css`
      :host {
        display: inline-flex;
        font-size: 10px;       
      }      
      .component-benefits {
        display: grid;
        grid-template-columns: var(--layout, auto 1fr);
        column-gap: var(--gap, 2rem);
        width: 100%;
        padding: var(--padding, 2rem);
        border-radius: var(--border-radius, 2rem);
        background: var(--background, whitesmoke);
        box-shadow: var(--box-shadow, none);
        border: var(--border, none);
      }
      svg {
        color: var(--icon-color, #000);
      }
      img {
        width: 100%;
        max-width: 8rem;
        display: block;
      }     
      ion-icon {
        color: var(--icon-color, #000);
        font-size: 4rem;
      }
      .component-benefits__image {
        display: flex;
        flex-wrap: wrap;
        align-self: center;        
      }
      .component-benefits__title {
        font-family: var(--title-font-family, inherit);
        font-size: var(--title-font-size, 1.4rem);
        font-weight: var(--title-font-weight, 600);
        text-transform: var(--title-text-transform, none);
        color: var(--title-color, #000);
        align-self: center;       
        line-height: var(--title-line-height, 1.4);       
      }
      .component-benefits__content {      
        font-size: var(--content-font-size, 1.2rem);
        color: var(--content-color, #000);
        line-height: 1.4;
        align-self: flex-end;
       
      }
      .component-benefits__content--aside {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
      .image-right {
        grid-template-columns: var(--layout, 1fr auto);
      }     
      .image-right .component-benefits__image {
        grid-area: 1/2/1/3;
      }
      .image-right .component-benefits__title {
        grid-area: 1/1/1/2;
      }     
      .image-right.content-aside .component-benefits__content--aside {
        grid-area: 1/1/1/2;
      }
      .image-left .component-benefits__image {
        grid-area: 1/1/1/2;
      }
      .image-left .component-benefits__title {
        grid-area: 1/2/1/3;
      }       
      .image-left.content-aside .component-benefits__content--aside {
        grid-area: 1/2/1/3;
      }
      .image-left .component-benefits__content, .image-right .component-benefits__content {
        grid-area: 2/1/2/3
      }
      .image-center {
        grid-template-columns: 1fr;
        text-align: center;
      }
      .image-center > div {
        margin-bottom: var(--spacing, 1rem);
        justify-content: center;
      }
      .image-center > div:last-child {
        margin-bottom: 0;
      }
      .c0 .component-benefits__title {
        margin-bottom: var(--spacing, 1rem)
      }
    `;
  }
  static get properties() {
    return {
      title: {type: String},
      content: {type: String},
      image: {type: String},

      imagePosition: {type:String, attribute: "image-position"},
      contentPosition: {type:String, attribute: "content-position"},

      type: {type: String},
    }
  }
  constructor() {
    super();
    this.type = "image-left-one-third";
  }

  render() {
    let imagePosition = this.imagePosition !== undefined ? "image-" + this.imagePosition : "";
    let contentPosition = this.contentPosition !== undefined ? "content-" + this.contentPosition : "";
    return html`
    <div class="component-benefits ${imagePosition} ${contentPosition}" >
      <div class="component-benefits__image"><ion-icon src="${this.image}"></ion-icon></div>
      ${contentPosition !== "" ? html`
      <div class="component-benefits__content--aside">
        <div class="c0">
          <div class="component-benefits__title">${this.title}</div>
          <div class="component-benefits__content"><slot></slot></div>
        </div>
      </div>
      `: html`
        <div class="component-benefits__title">${this.title}</div>
        <div class="component-benefits__content"><slot></slot></div>
      `}
    
    </div>`
  }
}

customElements.define('df-benefits', LitBenefits);