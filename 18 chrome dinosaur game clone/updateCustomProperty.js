export function getCustomProperty(htmlEl, prop) {
  return (
    Number.parseFloat(getComputedStyle(htmlEl).getPropertyValue(prop)) || 0
  );
}

export function setCustomProperty(htmlEl, prop, value) {
  htmlEl.style.setProperty(prop, value);
}

export function incrementCustomProperty(htmlEl, prop, incValue) {
  setCustomProperty(htmlEl, prop, getCustomProperty(htmlEl, prop) + incValue);
}
