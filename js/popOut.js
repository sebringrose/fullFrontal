function popOut() {
  window.open(event.target.parentNode)
}

document.getElementsByClassName("popable").querySelector("#pop-out-button").addEventListener("click", popOut)
