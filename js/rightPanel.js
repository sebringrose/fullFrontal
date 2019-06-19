import { getState, setState } from "/js/state.js"

let attributesList = document.querySelector("#attributes-list")

function handleSelectedElementChange() {
  showElInfo()
}

function onValueChange() {
  let iFrameCSS = getState("iFrameCSS")
  let existingStyle
  let selectedElement = getState("selectedElement")
  try {
    selectedElement[event.target.name] = event.target.textContent
  } catch (err) {
    alert(err)
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
  value.innerHTML = itemValue
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
  attributesList.appendChild(li)
}

function showAttributes(element) {
  let defaultAttributes = [
    "tagName", "id", "classList", "innerHTML", "style"
  ]
  let ignoredAttributes = [
    "translate", "tabIndex", "spellcheck", "contentEditable", "offsetWidth", "offsetHeight", "innerText", "outerText", "namespaceURI",
     "localName", "outerHTML", "scrollWidth", "scrollHeight", "clientWidth", "clientHeight", "childElementCount", "nodeType", "nodeName",
      "baseURI", "isConnected", "textContent", "offsetTop", "className"
  ]
  for (let item in element) {
    let itemValue = element[item]
    if (defaultAttributes.includes(item) || (itemValue && typeof itemValue !== "function" && typeof itemValue !== "object" && item[0] === item[0].toLowerCase() && !ignoredAttributes.includes(item))) {
      // put attribute in list so it can be edited
      let li = createListItem(item, itemValue)
      li.id = item + "-input"
      document.querySelector("#attributes-list").appendChild(li)
    } else {
      // put attribute in dropdown so it can be added
      if (typeof itemValue !== "function" && item[0] === item[0].toLowerCase()) {
        let attributeOption = createSelectOption(item)
        document.querySelector("#attribute-select").appendChild(attributeOption)
      }
    }
  }

  // order default attributes to top
  let styleLi = document.querySelector("#style-input")
  let innerHtmlLi = document.querySelector("#innerHTML-input")
  let classListLi = document.querySelector("#classList-input")
  let idLi = document.querySelector("#id-input")
  let tagNameLi = document.querySelector("#tagName-input")
  attributesList.removeChild(styleLi)
  attributesList.prepend(styleLi)
  attributesList.removeChild(innerHtmlLi)
  attributesList.prepend(innerHtmlLi)
  attributesList.removeChild(classListLi)
  attributesList.prepend(classListLi)
  attributesList.removeChild(idLi)
  attributesList.prepend(idLi)
  attributesList.removeChild(tagNameLi)
  attributesList.prepend(tagNameLi)

  // move style input to bottom and set value to string
  let styleInputDiv = styleLi.getElementsByTagName("div")[0]
  styleInputDiv.innerHTML = getState("selectedElement").style.cssText
}

function showElInfo() {
  // refresh for new element selection
  removeChildren(attributesList)

  // display functions
  showAttributes(getState("selectedElement"))
}

document.querySelector("#attribute-select")["onchange"] = createAttribute

export { handleSelectedElementChange }
