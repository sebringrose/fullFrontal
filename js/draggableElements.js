function dragstart_handler(ev) {
 // Add the target element's id to the data transfer object
 ev.dataTransfer.setData("text/plain", ev.target.id)
 ev.dataTransfer.dropEffect = "move"

 console.log(ev.target)
}

function dragover_handler(ev) {
 ev.preventDefault()
 // Set the dropEffect to move
 ev.dataTransfer.dropEffect = "move"
}

async function drop_handler(ev) {
 ev.preventDefault()
 // Get the id of the target and add the moved element to the target's DOM
 var data = ev.dataTransfer.getData("text/plain")
 let iframeEditor = await import('./iframeEditor.js')
 iframeEditor.setElement(data)
}
