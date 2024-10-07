import {} from "./df-input.sass"
import { html, LitElement } from "lit";
import { classMap } from "lit/directives/class-map.js";

export class DefaulInput extends LitElement {
  static properties = {
    value: { type: String },
    name: { type: String },
    id: { type: String },
    type: { type: String },
    label: { type: String },
    placeholder: { type: String },
    _focused: { state: true},
    required: { type: Boolean },
    error: {type: Boolean},
    pattern: {type: String},
    patternhelp: {type: String},
    _showPatternHelp: { state: true},
    //_error: { state: true, attribute: "error" },
  };

  constructor() {
    super();
    this.value = "";
    this.id = "";
    this.name = "";
    this.label = "";
    this._focused = this.hasAttribute("value");
    this._showPatternHelp = false;
    this.required = false;
    this.error = false;
    this.pattern = "";
    this.patternhelp = "";
  }

  createRenderRoot() {
    return this;
  }


  RenderPatternHelp() {
    let classes = {error: this.error}
    return html`
    <div class="tooltip">
      <span class="tooltip__icon icon icon-help ${classMap(classes)}">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 80a176 176 0 10176 176A176 176 0 00256 80z" fill="none" stroke="currentColor" stroke-miterlimit="10" stroke-width="32"/><path d="M200 202.29s.84-17.5 19.57-32.57C230.68 160.77 244 158.18 256 158c10.93-.14 20.69 1.67 26.53 4.45 10 4.76 29.47 16.38 29.47 41.09 0 26-17 37.81-36.37 50.8S251 281.43 251 296" fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10" stroke-width="28"/><circle cx="250" cy="348" r="20"/></svg>      
      </span>
    <div class="tooltip__content">${this.patternhelp}</div>
    </div>
    `
  }

  RenderLabel() {
    return this.label !== ""
      ? html`<span class="df-input__label">${this.label}</span>`
      : this.placeholder !== "" && this._focused === false
      ? html`<span class="df-input__placeholder">${this.placeholder}</span>`
      : null;
  }

  onFocusIn(e) {
    this._focused = true;
    // this.error = false;
    // this._showPatternHelp = false;
  }
  onBlur(e) {
    this._focused = this.value !== "";   
    //this.error = this.required && this.value === "" || this.pattern !== "" ? !RegExp(this.pattern).test(e.currentTarget.value) : false;
    // this._showPatternHelp = this.pattern !== "" && this.error;
  }
  onInput(e) {
    this.value=e.target.value;  
    this.error = this.required && this.value === "" || this.pattern !== "" ? !RegExp(this.pattern).test(e.currentTarget.value) : false; 
    this._showPatternHelp = this.pattern !== "" && this.error;
  }

  render() {
    let classes = {error: this.error, focused: this._focused, disabled: this.disabled}
    return html`
      <div class="df-input ${classMap(classes)}">
        ${this.RenderLabel()}
        <input
          class="df-input__input"
          type=${this.type}
          name=${this.name}
          id=${this.name}
          .value=${this.value}
          @focusin=${(e) => this.onFocusIn(e)}
          @blur=${(e) => this.onBlur(e)}
          @input=${this.onInput}
        />
        ${this._showPatternHelp ? this.RenderPatternHelp() : null}
      </div>
    `;
  }
}
customElements.define("df-input", DefaulInput);
