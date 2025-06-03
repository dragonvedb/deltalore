let canvas = fetch(`DELTALORE_prod.canvas`)
.then(response => {
    if (!response.ok) { 
        throw new Error('Network response was not ok');
    }
    return response.text();
})
.then(file => {
    canvas = JSON.parse(file)
    for (let i = 0; i < canvas.nodes.length; i++) {
        createNode(canvas.nodes[i]);
    }
    drawEdges()
    return 
})
.catch(error => {
    console.error('Error fetching the file:', error);
});


const board = document.querySelector('main')
const reader = document.getElementById('reader-widget')
const readerContent = document.querySelector('#reader-widget .content')
const readerCloseButton = document.querySelector('#reader-widget .close-button')
readerCloseButton.addEventListener('click', (e) => {
    reader.classList.add('hidden')
    if (selectedCard) document.getElementById(selectedCard).classList.remove("selected")
})
const edgeInfoBox = document.querySelector('#edge-info')
onmousemove = (e) => edgeInfoBox.style.cssText = `left: ${e.pageX}px; top: ${e.pageY}px`

let selectedCard = ""

const zoom = panzoom(board, {
    //bounds: true, 
    //boundsPadding: 1,
    maxZoom: 1,
    minZoom: 0.1,
    initialX: -425,
    initialY: -525,
    initialZoom: 0.125,
    beforeWheel: function(e) { if (reader.matches(':hover')) return true }, // allow wheel-zoom only if altKey is down. Otherwise - ignore
    beforeMouseDown: function(e) { if (reader.matches(':hover')) return true }, // allow mouse-down panning only if altKey is down. Otherwise - ignore
})

const converter = new showdown.Converter()

function createNode(data) {
    let node = document.createElement('div')
    node.setAttribute('data-id', data.id)
    node.classList.add('node')
    if (data.color == '2') node.classList.add('pic')
    if (data.color == '5') node.classList.add('meta')
    node.style.cssText = `left: ${data.x + 9000}px; top: ${data.y + 9000}px; width: ${data.width}px; height: ${data.height}px;`
    node.textContent = data[data.type].replace('.md', '')
    if (data.type == 'file') {
        node.setAttribute('data-file', data.file)
        node.addEventListener('click', e => {
            if (selectedCard) document.getElementById(selectedCard).classList.remove("selected")
            selectedCard = e.target.getAttribute('id')
            loadFile(e.target.getAttribute('data-file'))
        })
    } 
    board.appendChild(node)
}

function loadFile(filename, id) {
    fetch(`content/${filename}`)
    .then(response => {
        if (!response.ok) { 
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(file => {
        file = file.replaceAll(/[^[]+\|/g, '').replaceAll('[[', '').replaceAll(']]', '')
        let html = converter.makeHtml(file)
        //html = html.replaceAll(/(\[\[)\w+\|/g).replaceAll('[[', '').replaceAll(']]', '')
        reader.classList.remove('hidden')
        readerContent.innerHTML = html
        readerContent.scroll({top: 0})

        //document.getElementById(selectedCard).classList.add("selected")
    })
    .catch(error => {
        console.error('Error fetching the file:', error);
    });
}

const nodeData = [
    {"id":"2844b69d09715c4e","x":-4971,"y":-5252,"width":341,"height":151,"type":"text","text":"# **ANCHOR**"},
    {"id":"d51f0adf51d6e97a","type":"file","file":"Doctor W. D. Gaster.md","x":-1244,"y":-2651,"width":365,"height":509},
    {"id":"269b859efc7eeb63","type":"text","text":"# Skeleton?","x":-1020,"y":-2183,"width":250,"height":71},
    {"id":"2060522f9c0d01f7","type":"file","file":"Sans.md","x":-1294,"y":-909,"width":260,"height":360},
	{"id":"cade8750930833c2","type":"text","text":"# Gaster Blasters","x":-1228,"y":-952,"width":258,"height":72},
	{"id":"c8d872e4efae9920","type":"file","file":"Sans.md","x":-703,"y":-897,"width":262,"height":344},
    {"id":"1031dc2c679143dc","type":"file","file":"Mysterious Men.md","x":-1002,"y":-1732,"width":278,"height":120,"color":"5"},
    {"id":"6aa9d91dad468dc7","type":"file","file":"Papyrus.md","x":-2045,"y":-923,"width":246,"height":367},
	{"id":"dd8b825f0361b955","type":"file","file":"Papyrus.md","x":-122,"y":-649,"width":265,"height":400},
    {"id":"45e813e6a1d0684e","type":"file","file":"River Person.md","x":-701,"y":-1402,"width":250,"height":243},

]



function getAnchorPoint(node, side) {
    const x = parseInt(node.style.left, 10);
    const y = parseInt(node.style.top, 10);
    const width = node.offsetWidth;
    const height = node.offsetHeight;
  
    switch (side) {
      case 'top':
        return { x: x + width / 2, y: y };
      case 'right':
        return { x: x + width, y: y + height / 2 };
      case 'bottom':
        return { x: x + width / 2, y: y + height };
      case 'left':
        return { x: x, y: y + height / 2 };
      default: // center or unspecified case
        return { x: x + width / 2, y: y + height / 2 };
    }
  }

  const edgeData = [
    {"id":"58bec9803645b6bb","fromNode":"d51f0adf51d6e97a","fromSide":"bottom","toNode":"2060522f9c0d01f7","toSide":"top","fromEnd":"arrow","color":"2","label":"related to"},
    {"id":"3b880575667b7f31","fromNode":"2060522f9c0d01f7","fromSide":"right","toNode":"c8d872e4efae9920","toSide":"left","toEnd":"none","color":"2","label":"same person?"},
    {"id":"0990b9736c1fc06a","fromNode":"1031dc2c679143dc","fromSide":"top","toNode":"d51f0adf51d6e97a","toSide":"bottom","label":"TEST"},
    {"id":"d36dd1056e52a9b4","fromNode":"2060522f9c0d01f7","fromSide":"left","toNode":"6aa9d91dad468dc7","toSide":"right","fromEnd":"arrow","color":"4","label":"brothers"},
    {"id":"b203adf77e507881","fromNode":"c8d872e4efae9920","fromSide":"right","toNode":"dd8b825f0361b955","toSide":"left","color":"4","label":"brothers"},
    {"id":"eccd0f27eb549af0","fromNode":"45e813e6a1d0684e","fromSide":"left","toNode":"2060522f9c0d01f7","toSide":"top","color":"2","label":"\"man who came from\nanother world\""},
  ]

  
  function drawEdges() {
    const svgContainer = document.getElementById('edge-paths');
  
    canvas.edges.forEach(edge => {
      const fromNode = document.querySelector(`[data-id="${edge.fromNode}"]`);
      const toNode = document.querySelector(`[data-id="${edge.toNode}"]`);
  
      if (fromNode && toNode) {
        const fromPoint = getAnchorPoint(fromNode, edge.fromSide);
        const toPoint = getAnchorPoint(toNode, edge.toSide);
  
        const curveTightness = 0.2;
        const minOffset = 150
        let controlPointX1, controlPointY1, controlPointX2, controlPointY2;

        if (edge.fromSide === 'top' || edge.fromSide === 'bottom') {
            controlPointX1 = fromPoint.x;
            controlPointY1 = fromPoint.y + (toPoint.y - fromPoint.y) * curveTightness;
        } else {
            if (edge.fromSide === 'left'){
                controlPointX1 = Math.min(fromPoint.x + (toPoint.x - fromPoint.x) * curveTightness, fromPoint.x - minOffset);
            } else controlPointX1 = Math.max(fromPoint.x + (toPoint.x - fromPoint.x) * curveTightness, fromPoint.x + minOffset);
            controlPointY1 = fromPoint.y;
        }

        if (edge.toSide === 'top' || edge.toSide === 'bottom') {
            controlPointX2 = toPoint.x;
            controlPointY2 = fromPoint.y + (toPoint.y - fromPoint.y) * (1 - curveTightness);
        } else {
            if (edge.toSide === 'left'){
                controlPointX2 = Math.min(fromPoint.x + (toPoint.x - fromPoint.x) * (1 - curveTightness), toPoint.x - minOffset);
            } else controlPointX2 = Math.max(fromPoint.x + (toPoint.x - fromPoint.x) * (1 - curveTightness), toPoint.x + minOffset);
            controlPointY2 = toPoint.y;
        }
  
        const d = `M ${fromPoint.x} ${fromPoint.y} C ${controlPointX1} ${controlPointY1}, ${controlPointX2} ${controlPointY2}, ${toPoint.x} ${toPoint.y}`;
  
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        path.setAttribute('data-label', edge.label)
        let edgeColor
        switch (edge.color) {
            case '2':
                edgeColor = 'orange'
                break;
            case '4':
                edgeColor = 'green'
                break;
            default:
                edgeColor = 'gray'
                break;
        }
        path.setAttribute('stroke', edgeColor);
        path.setAttribute('fill', 'none');
        /*if (edge.toEnd === 'arrow') {
          path.setAttribute('marker-end', 'url(#arrowhead)');
        }*/
        path.addEventListener('mouseover', (e) => {
            let label = e.target.getAttribute('data-label')
            if (label !== 'undefined') {
                edgeInfoBox.textContent = e.target.getAttribute('data-label')
                edgeInfoBox.classList.remove('hide')
            }
            
        })
        path.addEventListener('mouseout', (e) => {
            edgeInfoBox.classList.add('hide')
        })
  
        svgContainer.appendChild(path);
      }
    });
  }

