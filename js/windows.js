function setupPopables() {
  Array.from(document.getElementsByClassName("popable")).forEach(poppable => {
    let popOutButton = document.createElement("button")
    popOutButton.className = "pop-out-button"
    popOutButton.textContent = "pop-out"
    popOutButton.addEventListener("click", popOut)
    poppable.insertBefore(popOutButton, poppable.childNodes[0])
  })
}

function popOut() {
  console.log("popped")
  window.open(event.target.parentNode)
}

setupPopables()
