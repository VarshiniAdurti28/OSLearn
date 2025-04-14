var part_size = [];
var total_mem_size = 0;
var num_parts = 0;
var myCanvas_width = 150;
var myCanvas_height = 500;
var myCanvas_x_start = 10;
var myCanvas_y_start = 10;
var part_start = [];
var part_end = [];
var part_pro_id = [];
var cur_pro_id = 0;
var last_alloc_end = 0;

var input_q_pro_id = [];
var input_q_pro_size = [];
var input_q_size = 0;

$(document).ready(function() {
    $("#mem-size-btn").click(function(){
        total_mem_size = Number($("#mem-size").val());
        startColumn2();
    }); 
}); 

function startColumn2() {
    var htmlText = `
        <button type="submit" class="btn btn-primary" id="add-pro-btn">Add process</button>
        <button type="submit" class="btn btn-primary" id="rem-pro-btn">Remove process</button>
    `;
    $("#add-rem-pro-btns").html(htmlText);

    var canvasHtml = `
        <canvas id="myCanvas" width="170" height="520" style="border:1px solid #d3d3d3;"></canvas>
    `;
    $("#canvas").html(canvasHtml);

    drawMemory();

    $(document).ready(function() {
        $("#add-pro-btn").click(addProcessSize);
        $("#rem-pro-btn").click(remProcessId);
    });
}

function addProcessSize() {
    var htmlText = `
        <div class="form-group">
            <label>Size of process to be added: </label>
            <input type="text" class="form-control" id="add-pro-size" placeholder="Enter size of process to be added">      
        </div>
        <button type="submit" class="btn btn-primary" id="add-btn">Add</button>
    `;
    $("#add-rem-pro").html(htmlText);

    $(document).ready(function() {
        $("#add-btn").click(function(){
            var pro_size = Number($("#add-pro-size").val());
            cur_pro_id += 1;
            addProcess(pro_size, cur_pro_id, 0);
        }); 
    }); 
}

function addProcess(pro_size, pro_id, fromQ) {
    let found = false;
    let start = 0;

    if (num_parts === 0) {
        found = true;
        addPart(0, pro_size, pro_id);
    } else {
        let spaceBeforeFirst = part_start[0];
        let i = 0;

        if (last_alloc_end <= spaceBeforeFirst && spaceBeforeFirst >= pro_size) {
            found = true;
            addPart(0, pro_size, pro_id);
        } else {
            for (i = 0; i <= num_parts; i++) {
                let holeStart = i === 0 ? 0 : part_end[i - 1];
                let holeEnd = i < num_parts ? part_start[i] : total_mem_size;
                let holeSize = holeEnd - holeStart;

                if (holeStart >= last_alloc_end && holeSize >= pro_size) {
                    found = true;
                    addPart(i, pro_size, pro_id);
                    break;
                }
            }

            if (!found) {
                for (i = 0; i <= num_parts; i++) {
                    let holeStart = i === 0 ? 0 : part_end[i - 1];
                    let holeEnd = i < num_parts ? part_start[i] : total_mem_size;
                    let holeSize = holeEnd - holeStart;

                    if (holeSize >= pro_size) {
                        found = true;
                        addPart(i, pro_size, pro_id);
                        break;
                    }
                }
            }
        }
    }

    if (!found && fromQ === 0) {
        alert("New process could not be added. Process added to Input Queue");
        calcExtFrag(pro_size);
        addToQ(pro_size, pro_id);
    }

    if (found && fromQ === 1) {
        removeFromQ(pro_id);
        alert("Process " + pro_id + " of size " + pro_size + " added to memory.");
    }

    drawInputQTable();
}

function addPart(index, pro_size, pro_id) {
    part_pro_id[num_parts] = pro_id;
    part_size[num_parts] = pro_size;

    if (index === 0) {
        part_start[num_parts] = 0;
    } else if (index < num_parts) {
        part_start[num_parts] = part_end[index - 1];
    } else {
        part_start[num_parts] = part_end[num_parts - 1];
    }

    part_end[num_parts] = part_start[num_parts] + pro_size;
    last_alloc_end = part_end[num_parts];
    num_parts += 1;

    sortPart();
    drawPart();
}

function sortPart() {
    for (let i = 0; i < num_parts; i++) {
        for (let j = 0; j < num_parts - i - 1; j++) {
            if (part_start[j] > part_start[j+1]) {
                [part_start[j], part_start[j+1]] = [part_start[j+1], part_start[j]];
                [part_end[j], part_end[j+1]] = [part_end[j+1], part_end[j]];
                [part_size[j], part_size[j+1]] = [part_size[j+1], part_size[j]];
                [part_pro_id[j], part_pro_id[j+1]] = [part_pro_id[j+1], part_pro_id[j]];
            }
        }
    }
}

function drawPart() {
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.clearRect(0, 0, 170, 520);
    ctx.beginPath();
    ctx.rect(myCanvas_x_start, myCanvas_y_start, myCanvas_width, myCanvas_height);
    ctx.fillStyle = "white";
    ctx.fill();

    for (let i = 0; i < num_parts; i++) {
        ctx.beginPath();
        ctx.rect(myCanvas_x_start, myCanvas_y_start + part_start[i] * (500/total_mem_size), myCanvas_width, part_size[i] * (500/total_mem_size));
        ctx.fillStyle = "green";
        ctx.fill();

        ctx.font = "14px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("P-" + part_pro_id[i], 50, myCanvas_y_start + part_start[i] * (500/total_mem_size) + part_size[i] * (500/total_mem_size) / 2);
    }
}

function remProcessId() {
    var htmlText = `
        <div class="form-group">
            <label>Id of process to be removed: </label>
            <input type="text" class="form-control" id="rem-pro-id" placeholder="Enter id of process to be removed">      
        </div>
        <button type="submit" class="btn btn-primary" id="rem-btn">Remove</button>
    `;
    $("#add-rem-pro").html(htmlText);

    $(document).ready(function() {
        $("#rem-btn").click(function(){
            var id_pro = Number($("#rem-pro-id").val());
            remProcess(id_pro);
        }); 
    }); 
}

function remProcess(id_pro) {
    let found = false;
    for (let i = 0; i < num_parts; i++) {
        if (part_pro_id[i] == id_pro && !found) {
            for (let j = i + 1; j < num_parts; j++) {
                part_pro_id[j - 1] = part_pro_id[j];
                part_start[j - 1] = part_start[j];
                part_end[j - 1] = part_end[j];
                part_size[j - 1] = part_size[j];
            }
            found = true;
            num_parts -= 1;
            break;
        }
    }

    if (found) {
        drawPart();
        for (let i = 0; i < input_q_size; i++) {
            addProcess(input_q_pro_size[i], input_q_pro_id[i], 1);
        }
    } else {
        alert("Process-" + id_pro + " not found in memory");
    }

    drawInputQTable();
}

function drawMemory() {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.rect(myCanvas_x_start, myCanvas_y_start, myCanvas_width, myCanvas_height);    
    ctx.stroke();  
}

function addToQ(pro_size, pro_id) {
    input_q_pro_id[input_q_size] = pro_id;
    input_q_pro_size[input_q_size] = pro_size;
    input_q_size += 1;
}

function removeFromQ(pro_id) {
    for (let i = 0; i < input_q_size; i++) {
        if (input_q_pro_id[i] == pro_id) {
            for (let j = i+1; j < input_q_size; j++) {
                input_q_pro_id[j-1] = input_q_pro_id[j];
                input_q_pro_size[j-1] = input_q_pro_size[j];
            }
            input_q_size -= 1;
            break;
        }
    }
}

function drawInputQTable() {
    var htmlText = `
        <button type="submit" class="btn btn-primary md-3" id="compact-btn">Compact</button> 
        <table>
        <tr><th colspan="0">Input Queue</th></tr>
        <tr><th>Process Id</th>
    `;

    for (let i = 0; i < input_q_size; i++) {
        htmlText += `<td>${input_q_pro_id[i]}</td>`;
    }

    htmlText += `
        </tr><tr><th>Process Size</th>
    `;

    for (let i = 0; i < input_q_size; i++) {
        htmlText += `<td>${input_q_pro_size[i]}</td>`;
    }

    htmlText += `</tr></table>`;
    $("#input-q-table").html(htmlText);

    $(document).ready(function() {
        $("#compact-btn").click(Compact);
    });
}

function Compact() {
    for (let i = 0; i < num_parts; i++) {
        part_start[i] = i === 0 ? 0 : part_end[i - 1];
        part_end[i] = part_start[i] + part_size[i];
    }
    drawPart();

    for (let i = 0; i < input_q_size; i++) {
        addProcess(input_q_pro_size[i], input_q_pro_id[i], 1);
    }
}

function calcExtFrag(pro_size) {
    var tot_hole_size = 0;
    for (let i = 0; i < num_parts; i++) {
        tot_hole_size += i === 0 ? part_start[i] : part_start[i] - part_end[i - 1];
    }
    tot_hole_size += total_mem_size - part_end[num_parts - 1];

    if (tot_hole_size > pro_size) {
        alert("External Fragmentation is " + tot_hole_size);
    }
}
