// drag and drop functions for elements list and iframe
// this needs to be a mdoule too
import { getState, setState } from "/js/state.js"

// set up events

// left panel
dragEl.draggable = "true"
dragEl.setAttribute("ondragstart", "dragStartHandler()")

// iframe
el.setAttribute("draggable", true)
el.setAttribute("ondragstart", "dragStartHandler()")
el.setAttribute("ondragover", "dragOverHandler()")
el.setAttribute("ondrop", "dropHandler()")

let prevTarget = document.body
prevTarget.setAttribute("ondrop", "dropHandler()")
let borderSetting = "none"
let borderColorSetting = "none"


function dragStartHandler() {
  console.log("drag started")

  event.dataTransfer.setData("object", event.target)
  event.dataTransfer.dropEffect = "move"
}

function dragOverHandler() {
  event.preventDefault()
  event.stopPropagation()

  if (event.target.tagName) {
    if (event.target !== prevTarget) {
      prevTarget.style.border = borderSetting
      prevTarget.style.borderColor = borderColorSetting

      borderSetting = event.target.style.border
      borderColorSetting = event.target.style.borderColor

      event.target.style.border = "solid"
      event.target.style.borderColor = "yellow"

      prevTarget = event.target
    }
  }
}

function dropHandler() {
  event.preventDefault()
  event.stopPropagation()

  console.log("called")

  document.body.style.border = "none"
  document.body.style.borderColor = "none"

  console.log(event)
}
