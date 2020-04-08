export const animateCSS = (node, animationName, callback) => { 
  node.classList.add('animated', animationName)

  let handleAnimationEnd = () => {
      node.classList.remove('animated', animationName)
      node.removeEventListener('animationend', handleAnimationEnd)

      if (typeof callback === 'function') callback()
  }
  node.removeEventListener('animationend', handleAnimationEnd);
  node.addEventListener('animationend', handleAnimationEnd)
};

export const siblings = n => [...n.parentElement.children].filter(c=>c.nodeType === 1 && c!==n);

export const isValidEmail = (value) => {
  if (value !== "") {
    return value.indexOf("@") > 0 && value.indexOf(".") > 0 && value.length > 5 && value.indexOf(".") < value.length - 1 && value.indexOf("@") < value.lastIndexOf(".") - 1;
  }
  return false;
}

