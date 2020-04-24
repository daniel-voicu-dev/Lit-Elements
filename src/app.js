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

});


