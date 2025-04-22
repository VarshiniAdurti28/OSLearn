import { getReferenceString } from "./pr_base.js"

var pages = [];
var pf;
var ph;
var f;
var rs;

$('#compute-btn').click(function clock() {
    f = document.getElementById("frames").value;
    if (f <= 0) {
        alert("Number of frames must be greater than zero.");
        return -10;
    }

    rs = getReferenceString();
    pf = 0;
    ph = 0;
    let pointer = 0; // Pointer to indicate the next frame to be considered
    let row = Number(f) + 1; // Adding an extra row for displaying PF/PH
    let col = rs.length; // Length of reference string

    // Initialize the frame buffer and reference bits (all set to 0 initially)
    pages = new Array(row).fill(null).map(() => new Array(col).fill("--"));
    let frameBuffer = new Array(f).fill(null); // Page frames
    let refBits = new Array(f).fill(0);        // Reference bits (0 means no second chance, 1 means second chance given)

    for (let j = 0; j < col; j++) {
        let page = rs[j];
        let hit = false;

        // Copy previous state (from the previous iteration)
        if (j > 0) {
            for (let i = 0; i < row - 1; i++) {
                pages[i][j] = pages[i][j - 1];
            }
        }

        // Check if the page is already in one of the frames (hit)
        for (let i = 0; i < f; i++) {
            if (frameBuffer[i] === page) {
                refBits[i] = 1; // Give second chance
                hit = true;
                break;
            }
        }

        if (hit) {
            ph++; // Page hit
            pages[row - 1][j] = "PH";
        } else {
            // Page fault, need to replace a page
            while (true) {
                if (refBits[pointer] === 0) {
                    // Replace the page at the current pointer
                    frameBuffer[pointer] = page;
                    refBits[pointer] = 1; // Set reference bit to 1
                    break;
                } else {
                    // Give a second chance to the page at pointer
                    refBits[pointer] = 0;
                    pointer = (pointer + 1) % f; // Move to the next frame in a circular manner
                }
            }

            // Update the page frames
            for (let i = 0; i < f; i++) {
                pages[i][j] = frameBuffer[i] || "--";
            }

            pf++; // Page fault
            pages[row - 1][j] = "PF";
        }

        // Move the pointer circularly (it wraps around after reaching the last frame)
        pointer = (pointer + 1) % f;
    }

    // Create the table for visualization
    let $table = $("<table border='1'></table>").addClass('table table-striped');
    let $tbody = $("<tbody></tbody>");
    let m = 0;

    // Construct table rows
    for (let i = 0; i < row; i++) {
        let line = $("<tr></tr>").css({ 'background-color': getRandomColor() });
        for (let j = 0; j < col; j++) {
            if (i === row - 1) {
                // Show PF/PH in the last row
                let color = pages[i][j] === "PH" ? "green" : "red";
                line.append(`<td style="color:${color}">${pages[i][j]}</td>`);
            } else {
                // Display the current page in the table
                line.append(`<td>${pages[i][j]}</td>`);
            }
        }
        $tbody.append(line);
    }

    $table.append($tbody);
    $('#table-div').empty().append($table);
    $("#sp1").html(`<p style="text-align:center"><b>Page faults:</b> <span style="color:red">${pf}</span></p>`);
    $("#sp2").html(`<p style="text-align:center"><b>Page hits:</b> <span style="color:green">${ph}</span></p>`);

    function getRandomColor() {
        m++;
        const colors = ['Green', 'Orange', 'Yellow', 'LightGray'];
        return colors[(m - 1) % colors.length];
    }
});
