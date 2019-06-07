import { getState, setState } from "/js/state.js"

let elementSettings = {
  default: {
    attributes: [ "id", "class" ],
    styles: [ "margin", "padding", "color", "backgroundColor", "textDecoration", "border", "boxShadow" ],
    events: [ "onclick" ]
  }
}

let elType = document.querySelector("#element-type")
let attributesList = document.querySelector("#attributes-list")
let elStylesList = document.querySelector("#element-styles-list")
let classStylesList = document.querySelector("#class-styles-list")
let eventsList = document.querySelector("#events-list")

function handleSelectedElementChange() {
  showAttributes()
}

function onValueChange() {
  let selectedElement = getState("selectedElement")
  if (elementSettings.default.styles.find(style => { return style === event.target.name})) {
    selectedElement.style[event.target.name] = event.target.value
    selectedElement.style.margin = event.target.value
    return
  }
  selectedElement.setAttribute(event.target.name, event.target.value)
}

function removeChildren(e) {
  let child = e.lastElementChild;
  while (child) {
      e.removeChild(child);
      child = e.lastElementChild;
    }
}

function createListItems(items, target) {
  let selectedElement = getState("selectedElement")
  items.forEach( item => {
    let li = document.createElement("li")
    li.style.className = "settings-li"
    let key = document.createElement("strong")
    let value = document.createElement("input")
    key.textContent = item + ": "
    value.value = selectedElement.getAttribute(item)
    value.name = item
    value.addEventListener("input", onValueChange)
    li.appendChild(key)
    li.appendChild(value)

    target.appendChild(li)
  })
}

function showAttributes() {
  // refresh for new element selection
  removeChildren(attributesList)
  removeChildren(elStylesList)
  removeChildren(classStylesList)
  removeChildren(eventsList)

  elType.textContent = getState("selectedElement").tagName
  // create default settings for element and append to lists
  // NOTE: defaultStyles is for element styles only
  createListItems(elementSettings.default.attributes, attributesList)
  createListItems(elementSettings.default.styles, elStylesList)
  createListItems(elementSettings.default.events, eventsList)
}

export { handleSelectedElementChange }
