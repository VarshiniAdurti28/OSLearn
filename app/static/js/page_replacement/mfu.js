import { getReferenceString } from "./pr_base.js"

var count = 0;
var pages = [];
var pf;
var ph;
var f;
var rs;
var txt;

$('#compute-btn').click(function lfu() {
    f = document.getElementById("frames").value;
    if (f <= 0) {
        alert("Number of frames has to be greater than zero.")
        return -10;
    }
    rs = getReferenceString();
    var freq = {};
    pf = 0;
    ph = 0;
    var k = 0;
    var i, row = Number(f) + 1, j, col = rs.length;

    pages = new Array(row);
    for (i = 0; i < row; i++)
        pages[i] = new Array(col);

    for (i = 0; i < row - 1; i++) {
        for (j = 0; j < col; j++)
            pages[i][j] = "--";
    }

    for (j = 0; j < col; j++) {
        var page = rs[j];
        freq[page] = (freq[page] || 0) + 1;
        var found = false;

        if (j > 0) {
            for (i = 0; i < row - 1; i++) {
                pages[i][j] = pages[i][j - 1];
            }
        }

        for (i = 0; i < row - 1; i++) {
            if (pages[i][j] == page) {
                found = true;
                break;
            }
        }

        if (!found) {
            var placed = false;
            for (i = 0; i < row - 1; i++) {
                if (pages[i][j] == "--") {
                    pages[i][j] = page;
                    placed = true;
                    break;
                }
            }

            if (!placed) {
                let minFreq = Infinity;
                let replaceIndex = -1;

                for (i = 0; i < row - 1; i++) {
                    let currentPage = pages[i][j];
                    if (freq[currentPage] < minFreq) {
                        minFreq = freq[currentPage];
                        replaceIndex = i;
                    }
                }

                pages[replaceIndex][j] = page;
            }

            pf++;
            pages[row - 1][j] = "PF";
        } else {
            ph++;
            pages[row - 1][j] = "PH";
        }
    }

    var $table = $("<table border='1'></table>");
    $table.addClass('table table-striped');
    var $tbody = $("<tbody></tbody>");
    var m = 0;

    for (i = 0; i < row; i++) {
        var line = $("<tr></tr>");
        line.css({ 'background-color': getRandomColor() });
        for (j = 0; j < col; j++) {
            if (i == row - 1) {
                if (pages[i][j] == "PH") {
                    line.append('<td style="color:green">' + 'PH' + '</td>');
                } else {
                    line.append('<td style="color:red">' + 'PF' + '</td>');
                }
            } else {
                line.append($("<td></td>").html(pages[i][j] + ""));
            }
        }
        $tbody.append(line);
    }

    $table.append($tbody);
    $('#table-div').empty().append($table);
    $("#sp1").html('<p style="text-align:center"><b>Page faults:</b> <span style="color:red">' + pf + '</span></p>');
    $("#sp2").html('<p style="text-align:center"><b>Page hits:</b> <span style="color:green">' + ph + '</span></p>');

    function getRandomColor() {
        m++;
        const colors = ['Green', 'Orange', 'Yellow', 'LightGray'];
        return colors[(m - 1) % colors.length];
    }
});
