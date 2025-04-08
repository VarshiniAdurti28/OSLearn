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

$(document).ready(function () {
    $("#num-parts-btn").click(function () {
        displayPartSize();
    });
});

function displayPartSize() {
    num_parts = Number($("#num-parts").val());
    var htmlText = '';
    var i;
    for (i = 1; i <= num_parts; i++) {
        htmlText +=
            `
        <div class="form-group">
            <label class="form-label">Size of partition ${i}</label>
            <input type="text" class="form-control" id="part-size-${i}" placeholder="Size of partitition ${i}">
        </div>
        `;
    }
    htmlText +=
        `
    <button type="submit" class="btn btn-primary" id="parts-size-btn">Go</button>
    `;
    $("#parts-size-form").html(htmlText);
    $(document).ready(function () {
        $("#parts-size-btn").click(function () {
            startColumn2();
        });
    });
}

function startColumn2() {
    var htmlText =
        `
    <button type="submit" class="btn btn-primary" id="add-pro-btn">Add process</button>
    <button type="submit" class="btn btn-primary" id="rem-pro-btn">Remove process</button>
    `;
    $("#add-rem-pro-btns").html(htmlText);
    var htmlText =
        `
    <canvas id="myCanvas" width="170" height="520" style="border:1px solid #d3d3d3;">
                Your browser does not support the HTML5 canvas tag.</canvas>
    `;
    $("#canvas").html(htmlText);
    drawPartMemory();
    $(document).ready(function () {
        $("#add-pro-btn").click(function () {
            addProcessSize();
        });
        $("#rem-pro-btn").click(function () {
            remProcessId();
        });
    });

}

function addProcessSize() {
    var htmlText =
        `
    <div class="form-group">
        <label>Size of process to be added: </label>
        <input type="text" class="form-control" id="add-pro-size" placeholder="Enter size of process to be added">      
    </div>
    <button type="submit" class="btn btn-primary" id="add-btn">Add</button>
    `;
    $("#add-rem-pro").html(htmlText);
    $(document).ready(function () {
        $("#add-btn").click(function () {
            var pro_size = Number($("#add-pro-size").val());
            cur_pro_id += 1;
            addProcess(pro_size, cur_pro_id, 0);
        });
    });
}

function addProcess(pro_size, pro_id, fromQ) {
    var i;
    var found = 0;
    var worst_ind = -1;
    var worst_size;
    for (i = 0; i < num_parts; i++) {
        if (part_occupied[i] == 0) {
            if (pro_size <= part_size[i]) {
                if (worst_ind == -1 || (part_size[i] > worst_size)) {
                    found = 1;
                    worst_ind = i;
                    worst_size = part_size[i];
                }
            }
        }
    }
    if (found == 1) {
        part_occupied[worst_ind] = 1;
        part_pro_id[worst_ind] = pro_id;
        drawPart(pro_size, pro_id, worst_ind);
    }
    if (found == 0 && fromQ == 0) {
        alert('New process could not be added. Process added to Input Queue');
        addToQ(pro_size, pro_id);
    }
    if (found == 1 && fromQ == 1) {
        removeFromQ(pro_id);
        alert('Process ' + pro_id + ' of size ' + pro_size + ' added to memory.');
    }
    drawInputQTable();
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
    ctx.fillText("P-" + String(pro_id), myCanvas_width / 2, part_myCanvas_start[index] + pro_size * (500 / total_mem_size) / 2);
}

function remProcessId() {
    var htmlText =
        `
    <div class="form-group">
        <label>Id of process to be removed: </label>
        <input type="text" class="form-control" id="rem-pro-id" placeholder="Enter id of process to be removed">      
    </div>
    <button type="submit" class="btn btn-primary" id="rem-btn">Remove</button>
    `;
    $("#add-rem-pro").html(htmlText);
    $(document).ready(function () {
        $("#rem-btn").click(function () {
            var id_pro = Number($("#rem-pro-id").val());
            remProcess(id_pro);
        });
    });
}

function remProcess(id_pro) {
    var i;
    var found = 0;
    for (i = 0; i < num_parts; i++) {
        if (part_pro_id[i] == id_pro && found == 0) {

            part_occupied[i] = 0;
            part_pro_id[i] = -1;
            found = 1;
            var ctx = document.getElementById("myCanvas").getContext("2d");
            ctx.beginPath();
            ctx.rect(myCanvas_x_start, part_myCanvas_start[i], myCanvas_width, part_size[i] * (500 / total_mem_size));
            ctx.fillStyle = "white";
            ctx.fill();

            ctx.rect(myCanvas_x_start, part_myCanvas_start[i], myCanvas_width, part_size[i] * (500 / total_mem_size))
            ctx.stroke();
            break;
        }
    }
    if (found == 1) {
        var i;
        for (i = 0; i < input_q_size; i++) {
            addProcess(input_q_pro_size[i], input_q_pro_id[i], 1);
        }
    }
    drawInputQTable();
}

function drawPartMemory() {

    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.rect(myCanvas_x_start, myCanvas_y_start, myCanvas_width, myCanvas_height);

    var i;
    for (i = 0; i < num_parts; i++) {
        var size = Number($("#part-size-" + String(i + 1)).val());
        part_size[i] = size;
        total_mem_size += size;
        part_occupied[i] = 0;
    }

    for (i = 0; i < num_parts; i++) {
        if (i == 0) {
            part_myCanvas_start[i] = myCanvas_y_start;
            part_myCanvas_end[i] = part_myCanvas_start[i] + part_size[i] * (500 / total_mem_size);
        }
        else {
            part_myCanvas_start[i] = part_myCanvas_end[i - 1];
            part_myCanvas_end[i] = part_myCanvas_start[i] + part_size[i] * (500 / total_mem_size);
        }
        ctx.rect(myCanvas_x_start, part_myCanvas_start[i], myCanvas_width, part_size[i] * (500 / total_mem_size));
        console.log(part_myCanvas_start[i], part_myCanvas_end[i], total_mem_size);
        console.log(part_size[i] * (500 / total_mem_size));
    }

    ctx.stroke();
}

function addToQ(pro_size, pro_id) {
    input_q_size += 1;
    input_q_pro_id[input_q_size - 1] = pro_id;
    input_q_pro_size[input_q_size - 1] = pro_size;
}

function removeFromQ(pro_id) {
    var i;
    for (i = 0; i < input_q_size; i++) {
        if (input_q_pro_id[i] == pro_id) {
            for (j = i + 1; j < input_q_size; j++) {
                input_q_pro_id[j - 1] = input_q_pro_id[j];
                input_q_pro_size[j - 1] = input_q_pro_size[j];
            }
        }
    }
    input_q_size -= 1;
}

function drawInputQTable() {
    var htmlText =
        `
    <table>
    <tr>
        <th colspan="0">Input Queue</th>
    </tr>
    <tr>
        <th>Process Id</th>
    `;
    for (var i = 0; i < input_q_size; i++) {
        htmlText +=
            `
        <td>` + input_q_pro_id[i] + `</td>
        `;
    }

    htmlText +=
        `
    <tr>
        <th>Process Size</th>
    `;
    for (var i = 0; i < input_q_size; i++) {
        htmlText +=
            `
        <td>` + input_q_pro_size[i] + `</td>
        `;
    }

    htmlText +=
        `
    </tr>
    </table>
    `;
    $("#input-q-table").html(htmlText);
}