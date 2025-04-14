var part_size = [];
var total_mem_size = 0;
var num_parts = 0;
var myCanvas_width = 150;
var myCanvas_height = 500;
var myCanvas_x_start = 10;
var myCanvas_y_start = 10;
var part_myCanvas_start = [];
var part_myCanvas_end = [];
var part_pro_id = [];
cur_pro_id = 0;
var part_occupied = [];
var input_q_pro_id = [];
var input_q_pro_size = [];
var input_q_size = 0;
var last_allocated_index = 0;

$(document).ready(function () {
    $("#num-parts-btn").click(function () {
        displayPartSize();
    });
});

function displayPartSize() {
    num_parts = Number($("#num-parts").val());
    var htmlText = '';
    for (let i = 1; i <= num_parts; i++) {
        htmlText += `
            <div class="form-group">
                <label class="form-label">Size of partition ${i}</label>
                <input type="text" class="form-control" id="part-size-${i}" placeholder="Size of partition ${i}">
            </div>
        `;
    }
    htmlText += `<button type="submit" class="btn btn-primary" id="parts-size-btn">Go</button>`;
    $("#parts-size-form").html(htmlText);
    $("#parts-size-btn").click(function () {
        startColumn2();
    });
}

function startColumn2() {
    $("#add-rem-pro-btns").html(`
        <button type="submit" class="btn btn-primary" id="add-pro-btn">Add process</button>
        <button type="submit" class="btn btn-primary" id="rem-pro-btn">Remove process</button>
    `);
    $("#canvas").html(`
        <canvas id="myCanvas" width="170" height="520" style="border:1px solid #d3d3d3;">
            Your browser does not support the HTML5 canvas tag.
        </canvas>
    `);
    drawPartMemory();
    $("#add-pro-btn").click(addProcessSize);
    $("#rem-pro-btn").click(remProcessId);
}

function addProcessSize() {
    $("#add-rem-pro").html(`
        <div class="form-group">
            <label>Size of process to be added: </label>
            <input type="text" class="form-control" id="add-pro-size" placeholder="Enter size of process to be added">      
        </div>
        <button type="submit" class="btn btn-primary" id="add-btn">Add</button>
    `);
    $("#add-btn").click(function () {
        var pro_size = Number($("#add-pro-size").val());
        cur_pro_id += 1;
        addProcess(pro_size, cur_pro_id, 0);
    });
}

function addProcess(pro_size, pro_id, fromQ) {
    var found = 0;
    var i = last_allocated_index;
    var start_index = i;

    do {
        if (part_occupied[i] == 0 && pro_size <= part_size[i]) {
            found = 1;
            break;
        }
        i = (i + 1) % num_parts;
    } while (i !== start_index);

    if (found) {
        last_allocated_index = i;
        part_occupied[i] = 1;
        part_pro_id[i] = pro_id;
        drawPart(pro_size, pro_id, i);
    } else if (!fromQ) {
        alert('New process could not be added. Process added to Input Queue');
        addToQ(pro_size, pro_id);
    } else {
        removeFromQ(pro_id);
        alert(`Process ${pro_id} of size ${pro_size} added to memory.`);
    }
    drawInputQTable();
}

function remProcessId() {
    $("#add-rem-pro").html(`
        <div class="form-group">
            <label>Id of process to be removed: </label>
            <input type="text" class="form-control" id="rem-pro-id" placeholder="Enter id of process to be removed">      
        </div>
        <button type="submit" class="btn btn-primary" id="rem-btn">Remove</button>
    `);
    $("#rem-btn").click(function () {
        var id_pro = Number($("#rem-pro-id").val());
        remProcess(id_pro);
    });
}

function remProcess(id_pro) {
    var found = 0;
    for (let i = 0; i < num_parts; i++) {
        if (part_pro_id[i] == id_pro) {
            part_occupied[i] = 0;
            part_pro_id[i] = -1;
            found = 1;
            let ctx = document.getElementById("myCanvas").getContext("2d");
            ctx.beginPath();
            ctx.rect(myCanvas_x_start, part_myCanvas_start[i], myCanvas_width, part_size[i] * (500 / total_mem_size));
            ctx.fillStyle = "white";
            ctx.fill();
            ctx.stroke();
            break;
        }
    }
    if (found) {
        for (let i = 0; i < input_q_size; i++) {
            addProcess(input_q_pro_size[i], input_q_pro_id[i], 1);
        }
    }
    drawInputQTable();
}

function drawPartMemory() {
    var ctx = document.getElementById("myCanvas").getContext("2d");
    ctx.rect(myCanvas_x_start, myCanvas_y_start, myCanvas_width, myCanvas_height);
    for (let i = 0; i < num_parts; i++) {
        part_size[i] = Number($(`#part-size-${i + 1}`).val());
        total_mem_size += part_size[i];
        part_occupied[i] = 0;
    }

    for (let i = 0; i < num_parts; i++) {
        part_myCanvas_start[i] = i == 0 ? myCanvas_y_start : part_myCanvas_end[i - 1];
        part_myCanvas_end[i] = part_myCanvas_start[i] + part_size[i] * (500 / total_mem_size);
        ctx.rect(myCanvas_x_start, part_myCanvas_start[i], myCanvas_width, part_size[i] * (500 / total_mem_size));
    }
    ctx.stroke();
}

function drawPart(pro_size, pro_id, index) {
    var ctx = document.getElementById("myCanvas").getContext("2d");

    ctx.beginPath();
    ctx.rect(myCanvas_x_start, part_myCanvas_start[index], myCanvas_width, part_size[index] * (500 / total_mem_size));
    ctx.fillStyle = "red";
    ctx.fill();

    ctx.beginPath();
    ctx.rect(myCanvas_x_start, part_myCanvas_start[index], myCanvas_width, pro_size * (500 / total_mem_size));
    ctx.fillStyle = "green";
    ctx.fill();

    ctx.font = "14px Arial bold";
    ctx.fillStyle = "black";
    ctx.fillText(`P-${pro_id}, size=${pro_size}`, myCanvas_width / 2, part_myCanvas_start[index] + pro_size * (500 / total_mem_size) / 2);
}

function addToQ(pro_size, pro_id) {
    input_q_size += 1;
    input_q_pro_id[input_q_size - 1] = pro_id;
    input_q_pro_size[input_q_size - 1] = pro_size;
}

function removeFromQ(pro_id) {
    for (let i = 0; i < input_q_size; i++) {
        if (input_q_pro_id[i] == pro_id) {
            for (let j = i + 1; j < input_q_size; j++) {
                input_q_pro_id[j - 1] = input_q_pro_id[j];
                input_q_pro_size[j - 1] = input_q_pro_size[j];
            }
            break;
        }
    }
    input_q_size -= 1;
}

function drawInputQTable() {
    let htmlText = `<table><tr><th colspan="0">Input Queue</th></tr><tr><th>Process Id</th>`;
    for (let i = 0; i < input_q_size; i++) htmlText += `<td>${input_q_pro_id[i]}</td>`;
    htmlText += `</tr><tr><th>Process Size</th>`;
    for (let i = 0; i < input_q_size; i++) htmlText += `<td>${input_q_pro_size[i]}</td>`;
    htmlText += `</tr></table>`;
    $("#input-q-table").html(htmlText);
}
