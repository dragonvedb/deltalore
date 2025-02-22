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
    node.setAttribute('id', data.id)
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
    {"id":"1031dc2c679143dc","type":"file","file":"Mysterious Men.md","x":-1002,"y":-1732,"width":278,"height":120,"color":"5"},

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
        const controlPointX1 = fromPoint.x + (toPoint.x - fromPoint.x) * curveTightness;
        const controlPointX2 = fromPoint.x + (toPoint.x - fromPoint.x) * (1 - curveTightness);
        const controlPointY1 = fromPoint.y;
        const controlPointY2 = toPoint.y;
  
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