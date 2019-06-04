function setElement(element) {
  console.log(element)

  // below not needed because this is now called from iframe. Also changed iframeDoc.document to just document
  // var iframeDoc = document.getElementsByTagName("iframe")[0].contentWindow
  var elmt = document.createElement(element)
  var elmtContent = document.createTextNode(element)
  elmt.appendChild(elmtContent)
  document.body.append(elmt)
}

function setStyle(style) {
  console.log(style)
  document.getElementById("styleLink").setAttribute("href", "./styles/" + style + ".css")
}

function logOutput() {
  console.log(document.documentElement.outerHTML)
}

export { setElement }
