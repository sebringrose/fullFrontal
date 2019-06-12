import { getState, setState } from "/js/state.js"

let attributesList = document.querySelector("#attributes-list")
let stylesList = document.querySelector("#styles-list")
let idsList = document.querySelector("#style-id-target-select")
let classesList = document.querySelector("#style-class-target-select")
let styleSelect = document.querySelector("#style-select")

function handleSelectedElementChange() {
  showElInfo()
}

function onValueChange() {
  let iFrameCSS = getState("iFrameCSS")
  let existingStyle
  if (event.target.parentNode.parentNode.id === "styles-list") {
    // this all works but needs to be changed to save existing rules!
    Array.from(iFrameCSS.cssRules).forEach( (rule, index) => {
      if (rule.selectorText === getState("activeStyleTarget")) {
        iFrameCSS.deleteRule(index)
      }
    })
    iFrameCSS.insertRule(getState("activeStyleTarget") + " { " + event.target.name + ": " + event.target.textContent + "; }")
    console.log(iFrameCSS)
    return
  }
  let selectedElement = getState("selectedElement")
  try {
    selectedElement[event.target.name] = event.target.textContent
  } catch (err) {
    alert(err)
    event.target.textContent = selectedElement[event.target.name]
  }
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
  let value = document.createElement("div")
  value.setAttribute("contenteditable", true)
  value.className = "el-param-input"
  value.textContent = itemValue
  value.name = item
  key.textContent = item + ": "
  value.addEventListener("input", onValueChange)
  li.appendChild(key)
  li.appendChild(value)

  return li
}

function createSelectOption(item) {
  let option = document.createElement("option")
  option.value = item
  option.textContent = item
  return option
}

function createAttribute() {
  let li = createListItem(event.target.value, getState("selectedElement")[event.target.value])
  if (event.target.id === "attribute-select") {
    attributesList.appendChild(li)
  } else if (event.target.id === "style-select") {
    stylesList.appendChild(li)
  }
}

function showAttributes(element) {
  let defaultAttributes = [
    "tagName", "id", "classList"
  ]
  for (let item in element) {
    let itemValue = element[item]
    if (defaultAttributes.includes(item)) {
      // put attribute in list so it can be edited
      let li = createListItem(item, itemValue)
      document.querySelector("#attributes-list").appendChild(li)
    } else {
      // put attribute in dropdown so it can be added
      let attributeOption = createSelectOption(item)
      document.querySelector("#attribute-select").appendChild(attributeOption)
    }
  }
}

function showStyles() {
  let ids = []
  let classes = []
  let iFrameCSS = getState("iFrameCSS")
  Array.from(getState("iframe").contentWindow.document.getElementsByTagName("*")).forEach( element => {
    if (!ids.includes("#" + element.id)) ids.push("#" + element.id)
    if (!classes.includes("." + element.className)) classes.push("." + element.className)
  })

  ids.forEach( id => {
    let idOption = createSelectOption(id)
    idsList.appendChild(idOption)
  })

  classes.forEach( className => {
    let classOption = createSelectOption(className)
    classesList.appendChild(classOption)
  })
}

function showStyleRules() {
  let iFrameCSS = getState("iFrameCSS")
  let hiddenStyleProperties = [ "item", "length" ]
  setState("activeStyleTarget", event.target.value)
  document.querySelector("#style-target").textContent = "Editing: " + getState("activeStyleTarget")
  if (event.target.id === "style-id-target-select") {
    // iFrameCSS.cssRules.forEach( rule => {
    //   console.log(rule)
    // })
  } else {
    Array.from(iFrameCSS.cssRules).forEach( rule => {
      if (rule.selectorText === event.target.value) {
        for (let property in rule.style) {
          if (rule.style[property] && property.length > 2 && !hiddenStyleProperties.includes(property) && !property.match(/[A-Z]/g)) {
            // create editable style li
            let styleLi = createListItem(property, rule.style[property])
            stylesList.appendChild(styleLi)
          } else if (property.length > 2 && !hiddenStyleProperties.includes(property) && !property.match(/[A-Z]/g)) {
            let styleOption = createSelectOption(property)
            styleSelect.appendChild(styleOption)
          }
        }
      }
    })
  }
}

function showElInfo() {
  // refresh for new element selection
  removeChildren(attributesList)
  removeChildren(idsList)
  removeChildren(classesList)

  // display functions
  showAttributes(getState("selectedElement"))
  showStyles(getState("selectedElement"))
}

idsList["onchange"] = showStyleRules
classesList["onchange"] = showStyleRules
document.querySelector("#attribute-select")["onchange"] = createAttribute
styleSelect["onchange"] = createAttribute

export { handleSelectedElementChange }
