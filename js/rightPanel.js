import { getState, setState } from "/js/state.js"

let attributesList = document.querySelector("#attributes-list")
let stylesList = document.querySelector("#styles-list")

function handleSelectedElementChange() {
  showElInfo()
}

function onValueChange() {
  if (event.target.name.substring(0,5) = "style") {
    // do style sheet stuff here
    // will need to check if editing id or class styles first
  }
  let selectedElement = getState("selectedElement")
  selectedElement[event.target.name] = event.target.value
}

function removeChildren(e) {
  let child = e.lastElementChild;
  while (child) {
      e.removeChild(child);
      child = e.lastElementChild;
    }
}

function createListItem(item, itemValue) {
  let li = document.createElement("li")
  li.style.className = "rpanel-li"
  let key = document.createElement("strong")
  let value = document.createElement("input")
  key.textContent = item + ": "
  value.value = itemValue
  value.name = item
  value.addEventListener("input", onValueChange)
  li.appendChild(key)
  li.appendChild(value)

  return li
}

function createSelectOption(type, item) {
  let option = document.createElement("option")
  option.value = item
  option.textContent = item
  if (type === "attributes") {
    document.querySelector("#attribute-select").appendChild(option)
  } else if (type === "style") {
    document.querySelector("#style-select").appendChild(option)
  }
}

function showAttributes(element) {
  if (!(element.tagName === "BODY" || element.tagName === "body") && !document.querySelector("#text-content-li")) {
    let item = "textContent"
    let itemValue = element.textContent
    let li = createListItem(item, itemValue)
    li.id = "text-content-li"
    document.querySelector("#attributes-list").appendChild(li)
  }
  for (let item in element) {
    let itemValue = element.getAttribute(item)
    if (itemValue) {
      // put attribute in list so it can be edited
      let li = createListItem(item, itemValue)
      document.querySelector("#attributes-list").appendChild(li)
    } else {
      // put attribute in dropdown so it can be added
      createSelectOption("attributes", item)
    }
  }
}

function showStyles() {
  console.log(getState("iFrameCSS"))
}

function showElInfo() {
  // refresh for new element selection
  removeChildren(attributesList)
  removeChildren(stylesList)

  // display functions
  showAttributes(getState("selectedElement"))
  showStyles(getState("selectedElement"))
}

function createAttribute() {
  console.log('in here')
  let li = createListItem(event.target.value, "")
  if (event.target.id === "attribute-select") {
    attributesList.appendChild(li)
  } else if (event.target.id === "style-select") {
    stylesList.appendChild(li)
  }
}

document.querySelector("#style-target-select")["onchange"] = showStyles
document.querySelector("#attribute-select")["onchange"] = createAttribute
document.querySelector("#style-select")["onchange"] = createAttribute

export { handleSelectedElementChange }
