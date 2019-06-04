let dom = document

function elementBuilder(elementObj) {
  console.log(elementObj)
  let element = dom.createElement(elementObj.elementType)

  elementObj.attributes.forEach(attribute => {
    console.log(attribute)
    element[attribute[0]] = attribute[1]
  })

  elementObj.styles.forEach(style => {
    console.log(style)
    element.style[style[0]] = style[1]
  })

  console.log(element)
}

export { elementBuilder }
