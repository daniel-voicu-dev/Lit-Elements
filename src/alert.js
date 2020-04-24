import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/metroui.css'

import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

import './sass/alert.sass'


Noty.overrideDefaults({
  layout   : 'center',
  theme    : 'metroui',
  timeout: 2000,
  killer: true,
  progressBar: false
  // closeWith: ['click', 'button'],
  // animation: {
  //     open : 'animated fadeInRight',
  //     close: 'animated fadeOutRight'
  // }
});


export const Alert = ({mode, node, message, type}) => {
  if(mode ==="tooltip") {
    document.dispatchEvent(new CustomEvent("Tooltip", {detail: {node,message, type}}));
  } else if(mode === "notification") {
    document.dispatchEvent(new CustomEvent("Notification", {detail: {message, type}}));
  } 
}

export const AlertEvents = () => {
  document.addEventListener("Notification", e =>{
    let {message} = e.detail;
    let {content, type} = message;
    new Noty({    
      text: content,
      type: type
    }).show();
  });

  document.addEventListener("Tooltip", e =>{
    let {node, message, type} = e.detail;
    if(node._tippy !== undefined) {
      node._tippy.destroy();
    }
    let instance = tippy(node);    
    if(type === undefined) {
      type = "default";
    }
    instance.setContent(message);    
    instance.setProps({     
      zIndex: 9999,
      theme: type      
    })
    instance.show();    
  })
}
