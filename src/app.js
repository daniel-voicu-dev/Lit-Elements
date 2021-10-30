import "./sass/app.sass"
import {Alert, AlertEvents} from "./alert.js"

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

document.addEventListener("DOMContentLoaded", ()=>{
  AlertEvents();
  tippy(document.querySelectorAll('[data-tooltip-content]'), {
    content: (reference) => reference.getAttribute('data-tooltip-content')
  });
  document.querySelector(".alert").addEventListener("click",()=>{    
    Alert({mode: "notification", message: {content: "Message Notification", type: "error"}});
  })
  document.querySelector(".tooltip").addEventListener("click", e =>{    
    Alert({mode: "tooltip", node: document.querySelector("#tooltip-test"), message: "Text 1"});
  })
  document.querySelector(".tooltip2").addEventListener("click", e =>{    
    Alert({mode: "tooltip", node: document.querySelector("#tooltip-test"), message: "Text 2", type: "error"});
  })

  if(document.querySelector("#testEvents") !== null) {
    document.querySelector("#testEvents").addEventListener("change", e => console.log("change", e.target))
    document.querySelector("#testEvents").addEventListener("focusin", e => console.log("focusin", e.target))
    document.querySelector("#testEvents").addEventListener("blur", e => console.log("blur", e.target))
    document.querySelector("#testEvents").addEventListener("keyup", e => console.log("keyup", e.target))
    document.querySelector("#testEvents").addEventListener("keydown", e => console.log("keydown", e.target))
  }
  if(document.querySelector("#testSelect") !== null) {
    document.querySelector("#testSelect").addEventListener("change", e => console.log("change", e.target));   
    document.querySelector("#testSelect").addEventListener("blur", e => console.log("blur", e.target));
  }
  if(document.querySelector("#testSelect2") !== null) {
    console.log("EVENTSLOADED")
    document.querySelector("#testSelect2").addEventListener("change", e => console.log("change", e.target));   
    document.querySelector("#testSelect2").addEventListener("blur", e => console.log("blur", e.target));
  }
  

});


