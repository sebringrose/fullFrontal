// drag and drop functions for elements list and iframe
function dragStartHandler() {
  // Add the target element's id to the data transfer object
  // this is to change so that it uses a data object containing attributes instead of just id
  event.dataTransfer.setData("text/plain", event.target.textContent)
  event.dataTransfer.dropEffect = "move"
  console.log(event.target)
}

function dragOverHandler() {
  event.preventDefault();
  event.stopPropagation();
  console.log(event)
}

function dropHandler() {
  event.preventDefault();
  event.stopPropagation();
  console.log(event)
}
