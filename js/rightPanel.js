import { getState, setState } from "/js/state.js"

let defaultAtrtibutes = {
  default: [ "id", "class" ],
  img: [ "src", "alt", "width" ],
  a: [ "href", "text-content" ],
  p: [ "text-content" ],
  h1: [ "text-content" ],
  h2: [ "text-content" ],
  h3: [ "text-content" ],
  h4: [ "text-content" ],
}

let attributesList = document.querySelector("#attributes-list")
let stylesList = document.querySelector("#styles-list")
let eventsList = document.querySelector("#events-list")

function handleSelectedElementChange() {
  showAttributes()
}

function onValueChange() {
  console.log(event.target.value)
}

function removeChildren(e) {
  let child = e.lastElementChild;
  while (child) {
      e.removeChild(child);
      child = e.lastElementChild;
    }
}

function showAttributes() {
  // refresh for new element selection
  removeChildren(attributesList)
  removeChildren(attributesList)
  removeChildren(attributesList)


}

export { handleSelectedElementChange }
