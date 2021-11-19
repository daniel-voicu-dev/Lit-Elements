import {} from "./df-select.sass"

import "./my-element"
import "./df-input"

document.querySelectorAll("df-input").forEach(el=>el.addEventListener("change", e=>{
  console.log(e.currentTarget.value);
}))