var rowIdSequence = 100;

var columnDefs = [
    { valueGetter: "'Drag'", rowDrag: true, checkboxSelection: function() { return true; } },
    { field: "id" },
    { field: "color" },
    { field: "value1" },
    { field: "value2" }
];

var gridOptions = {
    defaultColDef: {
        width: 80,
        sortable: true,
        filter: true,
        resizable: true
    },
    rowSelection: 'multiple',
    rowDeselection: true,
    enableMultiRowDragging: true,
    suppressMoveWhenRowDragging: true,
    rowClassRules: {
        "red-row": 'data.color == "Red"',
        "green-row": 'data.color == "Green"',
        "blue-row": 'data.color == "Blue"',
    },
    rowData: createRowData(),
    rowDragManaged: true,
    columnDefs: columnDefs,
    animateRows: true
};

function createRowData() {
    var data = [];
    ['Red', 'Green', 'Blue','Red', 'Green', 'Blue','Red', 'Green', 'Blue'].forEach(function(color) {
        var newDataItem = {
            id: rowIdSequence++,
            color: color,
            value1: Math.floor(Math.random()*100),
            value2: Math.floor(Math.random()*100)
        };
        data.push(newDataItem);
    });
    return data;
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function() {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);

    gridOptions.api.addDropZone(
        document.querySelector('#eJsonDisplay'),
        null,
        function(params) {
            var eJsonDisplay = document.querySelector('#eJsonDisplay'),
                selected = params.api.getSelectedNodes(),
                eJsonRow;

            if (selected.indexOf(params.dragItem.rowNode) === -1) {
                selected.push(params.dragItem.rowNode)
            }
            
            for (var i = 0; i < selected.length; i++) {
                eJsonRow = document.createElement('div');
                eJsonRow.classList.add('json-row');
                eJsonRow.innerText = JSON.stringify(selected[i].data);
                eJsonDisplay.appendChild(eJsonRow);
            }
        }
    );
});
