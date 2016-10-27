/*
  You should then use JavaScript to create all of the content of this page and append it to the body of the page. That content should include:
 
 A 4x4 table
 The top row should be a header row with header cells
 The 4 header cells, from left to right should say "Header 1", "Header 2" ... "Header 4
 The non header cells should contain their position. The upper left cell should contain the text "1, 1", the cell to its right "2, 1", the cell below it "1, 2" and so on.
 4 directional buttons (up, down, left right)
 A button labeled "Mark Cell"
 When the page is loaded the upper left, non-header cell of the table should be 'selected'. This is denoted by it having a thicker border than the other cells. If you push the directional buttons other cells should be selected instead. So if you press the right button, cell 1,1 should no longer be selected and 2,1 should be selected instead.
 
 If you are already on the top row and hit 'up' nothing should happen (you should not be able to move into the header cells). Likewise if you are all the way right and hit right or all the way at the bottom and hit down.
 
 Hitting the "Mark Cell" button should permanently change the background of the selected cell to yellow. This should persist even after other cells are selected or marked.
 
 Suggestion: If you are having a lot of trouble getting the page populated the way you want using JavaScript, just manually make the HTML so that you can continue to work on the rest of the assignment involving selecting and marking cells.
 
 Note: When generating content for the page you will not get credit for simply using the innerHTML property of the body element to parse a string of HTML content. The purpose is to use the process of creating and appending element nodes to the document. 
 */
var tableView = function() {
    var curCol = 1;
    var curRow = 1;
    
    function tableCreate(cb) {
        var body = document.body;
        var table = document.createElement('table');
        var tableBody = document.createElement('tbody');
        
        table.style.width = '100%';
        table.setAttribute('border', '1');
        
        for (var i = 0; i < 4; i++) {
            var tr = document.createElement('tr');
            for (var j = 0; j < 4; j++) {
                if (i === 4 && j === 4) {
                    break;
                } else {
                    if (i === 0) {
                        var th = document.createElement('th');
                        th.appendChild(document.createTextNode("Header " + (j + 1)));
                        tr.appendChild(th);
                    } else {
                        var td = document.createElement('td');
                        var label = (j + 1) + "," + i;
                        td.appendChild(document.createTextNode(label));
                        td.setAttribute('id', label);
                        if (j === 0 && i === 1) {
                            td.style.border = "3px solid black";
                        }
                        tr.appendChild(td);
                    }
                }
            }
            tableBody.appendChild(tr);
        }
        table.appendChild(tableBody);
        body.appendChild(table);
        
        if (cb) {
            cb();
        }
    }
    
    function appendButtons(cb) {
        var body = document.body;
        var labels = ["Left", "Up", "Right", "Down", "Mark Cell"];
        
        for (var i = 0; i < labels.length; i++) {
            var button = document.createElement('button');
            button.appendChild(document.createTextNode(labels[i]));
            body.appendChild(button);
            var dir = labels[i];
            button.addEventListener("click", function(e) {
                                    if (e.target.innerText !== "Mark Cell") {
                                    moveCursor(e.target.innerText);
                                    } else {
                                    markCell();
                                    }
                                    });
        }
    }
    
    function markCell() {
        var cell = document.getElementById(curRow + "," + curCol);
        cell.style["background-color"] = "yellow";
    }
    
    function moveCursor(dir) {
        var currentCellId = curRow + "," + curCol;
        var currentCell = document.getElementById(currentCellId);
        currentCell.style.border = "1px solid black";
        
        switch (dir) {
            case "Up":
                if (curCol !== 1) {
                    curCol--;
                }
                break;
            case "Down":
                if (curCol !== 3) {
                    curCol++;
                }
                break;
            case "Left":
                if (curRow !== 1) {
                    curRow--;
                }
                break;
            case "Right":
                if (curRow !== 4) {
                    curRow++;
                }
                break;
        }
        
        currentCellId = curRow + "," + curCol;
        currentCell = document.getElementById(currentCellId);
        currentCell.style.border = "3px solid black";
    }
    
    tableCreate(appendButtons);
};

tableView();
