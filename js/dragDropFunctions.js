// drag and drop functions for elements list and iframe
import { getState, setState } from "/js/state.js"

let prevTarget = document.body

function dragStartHandler() {
  event.stopPropagation()
  event.dataTransfer.setData("text/plain", event.target.tagName)
  console.log(event)
  event.stopPropagation()
}

function dragOverHandler() {
  event.stopPropagation()

  if (event.target.tagName) {
    if (event.target !== prevTarget) {
      prevTarget.classList.remove("drg-spcl-hghlght")
      event.target.classList.add("drg-spcl-hghlght")
      prevTarget = event.target
    }
  }

  event.preventDefault()
}

function dropHandler() {
  event.stopPropagation()

  console.log("drop called. Target:")
  console.log(event)

  event.preventDefault()
}

function dragEndHandler() {
  event.stopPropagation()

  console.log("drag ended")
  console.log(event.dataTransfer.getData("text"))
  prevTarget.classList.remove("drg-spcl-hghlght")

  event.preventDefault()
}

export { dragStartHandler, dragOverHandler, dropHandler, dragEndHandler }
