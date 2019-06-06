function popOut() {
  console.log("popped")
  let appView = document.querySelector("#app-view")
  window.open(appView.src, "Full Frontal", "width=400,height=600")
}

function toggleEdit() {
  if (event.target.style.backgroundColor !== "green") {
    // edit mode on
    event.target.style.backgroundColor = "green"

    // make all elements of app-view selectable and not interactable
    return
  }

  // edit mode off
  // elements unselectable and interactable
}

console.log(document.querySelector("#pop-out-button"))
document.querySelector("#pop-out-button").addEventListener("click", popOut)
document.querySelector("#edit-button").addEventListener("click", toggleEdit)
