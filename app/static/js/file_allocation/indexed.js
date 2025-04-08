$(document).ready(function () {
    var canv = document.getElementById("can");
    var ctx = canv.getContext("2d");
    var used, next, remaining, allocations;
    var colors = new Array(200);
    var file_sizes = new Array(200);
    var file_names = new Array(200);
    var starts = new Array(200);
    var ends = new Array(200);
    var count = 0;
    var point = -1;
    var allocated;
    var memSize;
    var a = 0, b = 0;
    var index;
    
    $('#find').click(function getSize() {
        memSize = document.getElementById("nof").value;
        if (memSize != "") {
            allocated = Array(memSize).fill(false);
            remaining = memSize;
            vis2 = document.getElementById("vis2");
            vis2.style.display = "block";
        }
        else {
            alert("Please enter valid size!");
        }
    });
    
    $('#add').click(function addFile() {
        var name = document.getElementById("file_name").value;
        var size = document.getElementById("file_size").value;
        size = parseInt(size);
        if (name != "" && size != "") {
            if (size+1 > remaining) {
                alert("Cannot allocate!");
            }
            else {
                const allocations = []
                 while(true) {
                        const b = Math.floor(Math.random() * memSize)
                        if(allocated[b]) {
                            continue;
                        }
                        allocated[b] = true;
                        index = b;
                        break;
                    }
                for (let i = 0; i < size; i++) {
                    while(true) {
                        const b = Math.floor(Math.random() * memSize)
                        if(allocated[b]) {
                            continue;
                        }
                        allocated[b] = true;
                        allocations.push(b);
                        break;
                    }
                }
                
                remaining = remaining - size-1;
                showOutput(name, allocations, index);
            }
        }
        else {
            alert("Please enter all details!!");
        }
    });
    
    function showOutput(name, allocations, index) {
        var file = `
            <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${name} (${index})</h5>
            </div>
            <ul class="list-group list-group-flush">
        `
        for (var i = 0; i < allocations.length; i++) {
            file += `<li class="list-group-item">#${i} -> ${allocations[i]}</li>`
        }
        file += `       
            </ul>
            </div>
        `
        document.getElementById("op").innerHTML = document.getElementById("op").innerHTML + file;
    }
});
