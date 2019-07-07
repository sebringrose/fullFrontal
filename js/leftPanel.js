import { getState, setState } from "/js/state.js"

function setUpDraggableEls() {
  let dragEls = {
    div: {
      innerHTML: "Do not delete this text without inserting elements or setting this div's width and/or height in style."
    },
    span: {
      innerHTML: "Do not delete this text without inserting elements or setting this span's width and/or height in style."
    },
    ol: {
      innerHTML: "<li>Ordered list example item.</li>"
    },
    ul: {
      innerHTML: "<li>Unordered list example item</li>"
    },
    li: {
      innerHTML: "List item"
    },
    h1: {
      innerHTML: "Heading 1"
    },
    h2: {
      innerHTML: "Heading 2"
    },
    h3: {
      innerHTML: "Heading 3"
    },
    h4: {
      innerHTML: "Heading 4"
    },
    p: {
      innerHTML: "Paragragh. Lorem ipsum blah blah blah..."
    },
    a: {
      innerHTML: "I am a link",
      href: "https://i.hope.this.site.does.not.exist.net",
      target: "_blank"
    },
    img: {
      src: "https://image.flaticon.com/icons/png/512/23/23765.png",
      alt: "image alt text"
    },
    hr: {}
  }
  let elList = document.querySelector("#elements-list")

  for (let el in dragEls ) {
    let dragEl = document.createElement("li")
    dragEl.className = "draggable-element"
    dragEl.textContent = el
    for (let attr in dragEls[el]) {
      dragEl.setAttribute(attr, dragEls[el][attr])
    }
    elList.appendChild(dragEl)
  }
}

function logOutput() {
  console.log(document.documentElement.outerHTML)
}

setUpDraggableEls()
