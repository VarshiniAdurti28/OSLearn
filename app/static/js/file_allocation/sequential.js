$(document).ready(function () {
    var canv = document.getElementById("can");
    var ctx = canv.getContext("2d");
    var colors = new Array(200);
    var file_sizes = new Array(200);
    var file_names = new Array(200);
    var starts = new Array(200);
    var ends = new Array(200);
    var count = 0;
    var point = -1;
    var memSize;
    var a = 0, b = 0;

    $('#find').click(function getSize() {
        memSize = document.getElementById("nof").value;
        if (memSize != "") {
            vis2 = document.getElementById("vis2");
            vis2.style.display = "block";
        }
        else {
            alert("Please enter valid size!");
        }
    });

    $('#add').click(function addFile() {
        if (count == 0) {
            for (var i = 0; i < 200; i++) {
                colors[i] = color();
                file_sizes[i] = 0;
                file_names[i] = "";
                starts[i] = 0;
                ends[i] = 0;
            }
            start = 0;
            end = 0;

        }
        var name = document.getElementById("file_name").value;
        var size = document.getElementById("file_size").value;
        size = parseInt(size);
        if (name != "" && size != "") {
            if (point + size > memSize - 1) {
                alert("Cannot allocate!!");
            }
            else {
                starts[count] = point + 1;
                point = ends[count] = point + size;
                file_names[count] = name;
                file_sizes[count] = size;
                count++;
                showOutput();
            }
        }
        else {
            alert("Please enter all details!!");
        }
    });

    function showOutput() {
        var html = "";
        ctx.fillStyle = "#f1f1f1";
        ctx.fillRect(0, 0, canv.width, canv.height);
        for (var i = 0; i < count; i++) {
            html += `
                <div class="card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${file_names[i]}</h5>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Start: ${starts[i]}, End: ${ends[i]}</li>
                    <li class="list-group-item">Size: ${file_sizes[i]}</li>
                </ul>
                </div>
            `
            ctx.fillStyle = colors[i];
            ctx.fillRect(starts[i] * canv.width / memSize, 0, (ends[i] + 1 - starts[i]) * canv.width / memSize, canv.height);
            if ((ends[i] - starts[i]) * canv.width / memSize > 30) {
                ctx.font = "50px Georgia";
            }
            else {
                ctx.font = "20px Georgia";
            }
            ctx.strokeText(file_names[i], starts[i] * canv.width / memSize, canv.height * 3 / 4);
        }
        document.getElementById("op").innerHTML = html;
    }

    function color() {
        var hex = '0123456789abcdef';
        var col = '#';
        for (i = 0; i < 6; i++)
            col += hex[Math.floor(Math.random() * 16)]
        return col;
    }
});