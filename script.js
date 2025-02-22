const board = document.querySelector('main')
const reader = document.getElementById('reader-widget')

panzoom(board, {
    bounds: true, 
    boundsPadding: 0.5,
    maxZoom: 3,
    minZoom: 0.1,
    beforeWheel: function(e) {
        // allow wheel-zoom only if altKey is down. Otherwise - ignore
        if (reader.matches(':hover')) {
            console.log('Mouse is over the element now.');
            return true
        }
    },
    beforeMouseDown: function(e) {
        // allow mouse-down panning only if altKey is down. Otherwise - ignore
        if (reader.matches(':hover')) {
            console.log('Mouse is over the element now.');
            return true
        }
    }
})

const converter = new showdown.Converter()

function createNode(data) {
    let node = document.createElement('div')
    node.setAttribute('id', data.id)
    if (data.type = 'file') node.setAttribute('data-file', data.file)
    node.style.cssText = `position: absolute; left: ${data.x + 5000}px; top: ${data.y + 5300}px; width: ${data.width}px; height: ${data.height}px; background-color: rgba(120, 120, 30, 0.3)`
    node.textContent = data[data.type]
    node.addEventListener('click', e => loadFile(e.target.getAttribute('data-file')))
    board.appendChild(node)
}

function loadFile(filename) {
    fetch(`content/${filename}`)
    .then(response => {
        if (!response.ok) { 
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(file => {
        let html = converter.makeHtml(file)
        reader.classList.remove('hidden')
        reader.innerHTML = html
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

for (let i = 0; i < nodeData.length; i++) {
    createNode(nodeData[i]);
}

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
  
    edgeData.forEach(edge => {
      const fromNode = document.getElementById(edge.fromNode);
      const toNode = document.getElementById(edge.toNode);
  
      if (fromNode && toNode) {
        const fromPoint = getAnchorPoint(fromNode, edge.fromSide);
        const toPoint = getAnchorPoint(toNode, edge.toSide);
  
        const curveTightness = 0.75;
        let controlPointX1, controlPointY1, controlPointX2, controlPointY2;

        if (edge.fromSide === 'top' || edge.fromSide === 'bottom') {
            controlPointX1 = fromPoint.x;
            controlPointY1 = fromPoint.y + (toPoint.y - fromPoint.y) * curveTightness;
        } else {
            controlPointX1 = fromPoint.x + (toPoint.x - fromPoint.x) * curveTightness;
            controlPointY1 = fromPoint.y;
        }

        if (edge.toSide === 'top' || edge.toSide === 'bottom') {
            controlPointX2 = toPoint.x;
            controlPointY2 = fromPoint.y + (toPoint.y - fromPoint.y) * (1 - curveTightness);
        } else {
            controlPointX2 = fromPoint.x + (toPoint.x - fromPoint.x) * (1 - curveTightness);
            controlPointY2 = toPoint.y;
        }
  
        const d = `M ${fromPoint.x} ${fromPoint.y} C ${controlPointX1} ${controlPointY1}, ${controlPointX2} ${controlPointY2}, ${toPoint.x} ${toPoint.y}`;
  
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        path.setAttribute('stroke', 'black');
        path.setAttribute('fill', 'none');
        /*if (edge.toEnd === 'arrow') {
          path.setAttribute('marker-end', 'url(#arrowhead)');
        }*/
  
        svgContainer.appendChild(path);
      }
    });
  }

  drawEdges()

/*
  const nodeData = [
    {
        "id": "spec",
        "type": "file",
        "x": 600,
        "y": 140,
        "width": 480,
        "height": 480,
        "file": "spec/1.0.md"
      },
      {
        "id": "readme",
        "type": "file",
        "x": 36,
        "y": 240,
        "width": 480,
        "height": 580,
        "file": "readme.md"
      },
      {
        "id": "nav",
        "type": "text",
        "x": 336,
        "y": 36,
        "width": 180,
        "height": 168,
        "text": "Learn more:\n- [Apps](/docs/apps)\n- [Spec](/spec/1.0)\n- [GitHub](https://github.com/obsidianmd/jsoncanvas)"
      },
      {
        "id": "logo",
        "type": "file",
        "x": 36,
        "y": 48,
        "width": 176,
        "height": 68,
        "file": "logo.svg"
      }
]

const edgeData = [
    {
        "id": "edge-readme-spec",
        "fromNode": "readme",
        "fromSide": "right",
        "fromEnd": "none",
        "toNode": "spec",
        "toSide": "left",
        "toEnd": "arrow"
      },
      {
        "id": "edge-logo-nav",
        "fromNode": "logo",
        "fromSide": "right",
        "fromEnd": "none",
        "toNode": "nav",
        "toSide": "left",
        "toEnd": "arrow"
      }
 ]
*/