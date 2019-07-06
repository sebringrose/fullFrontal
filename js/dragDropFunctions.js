// drag and drop functions for elements list and iframe
let prevTarget = document.body
let borderSetting = "none"
let borderColorSetting = "none"

function dragStartHandler() {
  // Add the target element's id to the data transfer object
  // this is to change so that it uses a data object containing attributes instead of just id
  event.dataTransfer.setData("object", event.target)
  event.dataTransfer.dropEffect = "move"
}

function dragOverHandler() {
  event.preventDefault()
  event.stopPropagation()

  if (event.target.tagName) {
    if (event.target !== prevTarget) {
      console.log("changed")
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
  console.log(event)
}
