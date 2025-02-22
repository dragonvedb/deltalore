const board = document.querySelector('main')
console.log(board)

panzoom(board, {
    bounds: true, 
    boundsPadding: 0.5,
    maxZoom: 3,
    minZoom: 0.1
}) 

function createNode(data) {
    let node = document.createElement('div')
    node.style.cssText = `position: absolute; left: ${data.x + 5000}px; top: ${data.y + 5300}px; width: ${data.width}px; height: ${data.height}px; background-color: rgba(120, 120, 30, 0.3)`
    node.textContent = data[data.type]
    //node.style.cssText = "width: 200px; height: 150px"
    board.appendChild(node)
}

const nodeData = [
    {"id":"2844b69d09715c4e","x":-4971,"y":-5252,"width":341,"height":151,"type":"text","text":"# **ANCHOR**"},
    {"id":"d51f0adf51d6e97a","type":"file","file":"Doctor W. D. Gaster.md","x":-1244,"y":-2651,"width":365,"height":509},
    {"id":"269b859efc7eeb63","type":"text","text":"# Skeleton?","x":-1020,"y":-2183,"width":250,"height":71},
    {"id":"2060522f9c0d01f7","type":"file","file":"Sans.md","x":-1294,"y":-909,"width":260,"height":360},
	{"id":"cade8750930833c2","type":"text","text":"# Gaster Blasters","x":-1228,"y":-952,"width":258,"height":72},
	{"id":"c8d872e4efae9920","type":"file","file":"Sans.md","x":-703,"y":-897,"width":262,"height":344},
]

for (let i = 0; i < nodeData.length; i++) {
    createNode(nodeData[i]);
}