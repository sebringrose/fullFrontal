var iframeDoc = document.getElementsByTagName("iframe")[0].contentWindow;

setElement = (element) => {
  console.log(element)
  var elmt = iframeDoc.document.createElement(element)
  var elmtContent = document.createTextNode(element)
  elmt.appendChild(elmtContent)
  iframeDoc.document.body.append(elmt)
}

setStyle = (style) => {
  console.log(style)
  iframeDoc.document.getElementById("styleLink").setAttribute("href", "./styles/" + style + ".css")
}

logOutput = () => {
  console.log(iframeDoc)
}
