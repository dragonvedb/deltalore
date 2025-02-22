const board = document.querySelector('main')
console.log(board)

panzoom(board, {
    bounds: true, 
    boundsPadding: 0.5,
    maxZoom: 3,
    minZoom: 0.4
}) 