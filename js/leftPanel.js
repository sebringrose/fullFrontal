import { getState, setState } from "/js/state.js"

let iframeDoc = getState("iframe").contentWindow.document

function elementBuilder(elementObj) {
  console.log(elementObj)
  let element = iframeDoc.createElement(elementObj.elementType)

  elementObj.attributes.forEach(attribute => {
    element[attribute[0]] = attribute[1]
  })

  console.log(element)
  return element
}

// drag and drop functions for elements list and iframe
function dragStartHandler(ev) {
 // Add the target element's id to the data transfer object
 // this is to change so that it uses a data object containing attributes instead of just id
 ev.dataTransfer.setData("text/plain", ev.target.id)
 ev.dataTransfer.dropEffect = "move"

 console.log(ev.target)
}

function dragOverHandler(ev) {
 // Set the dropEffect to move
 ev.dataTransfer.dropEffect = "move"
}

async function dragDropHandler(ev) {
 // Get the id of the target and add the moved element to the target's DOM
 // change to use object
 let data = ev.dataTransfer.getData("text/plain")
 let element = elementBuilder(data)
 let target = ev.target
 target.appendChild(element)
}

function logOutput() {
  console.log(document.documentElement.outerHTML)
}
