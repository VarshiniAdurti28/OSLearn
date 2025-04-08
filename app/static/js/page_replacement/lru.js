import { getReferenceString } from "./pr_base.js"

var count = 0;
var pages = [];
var pf;
var ph;
var f;
var rs;
var txt;

$('#compute-btn').click(function lru() {
	f = document.getElementById("frames").value;
	if (f <= 0) {
		alert("Number of frames has to be greater than zero.")
		return -10;
	}
	rs = getReferenceString();
	var prev;
	pf = 0;
	ph = 0;
	var k = 0;
	var l;
	var least;
	var index;
	var i, row = Number(f) + 1, j, col = rs.length;

	pages = new Array(row);
	for (i = 0; i < row; i++)
		pages[i] = new Array(col);

	for (i = 0; i < row - 1; i++) {
		for (j = 0; j < col; j++)
			pages[i][j] = "--";
	}

	for (j = 0; j < col; j++) {
		var smallest = -1;
		var flag = false;
		if (j > 0) {
			for (i = 0; i < row - 1; i++)
				pages[i][j] = pages[i][j - 1];
		}
		for (i = 0; i < row - 1; i++) {
			if (rs[k] == pages[i][j])
				flag = true;
		}
		if (flag == false) {
			for (i = 0; i < row - 1; i++) {
				if (pages[i][j] == "--") {
					smallest = i;
					break;
				}
			}
			if (smallest != -1) {
				pages[smallest][j] = rs[k];
			}
			else {
				index = 9999;
				for (i = 0; i < row - 1; i++) {
					for (l = j - 1; l >= 0; l--) {
						if (pages[i][j] == rs[l]) {
							least = l;
							break;
						}

					}
					if (index > least)
						index = least;

				}

				for (i = 0; i < row - 1; i++) {
					if (pages[i][j] == rs[index])
						break;
				}

				pages[i][j] = rs[k];
			}
			pages[row - 1][j] = "PF";
			k++;
			pf++;
			console.log("pf=", pf);
		}
		else {
			ph++;
			k++;
			console.log("ph=", ph);
			pages[row - 1][j] = "PH";
		}
	}
	txt = " "; var real; var m = 0;
	var $table = $("<table border='1'></table>");
	$table.addClass('table table-striped');
	var $tbody = $("<tbody></tbody>");
	for (i = 0; i < row; i++) {
		var line = $("<tr></tr>");
		line.css({ 'background-color': getRandomColor() });
		for (j = 0; j < col; j++) {

			if (i == row - 1) {


				if (("PH".localeCompare(pages[i][j]) == 0)) {
					line.append('<td style="color:green">' + 'PH' + '</td>');
				}
				else {
					line.append('<td style="color:red">' + 'PF' + '</td>');
				}

				$tbody.append(line);

			}
			else {
				line.append($("<td></td>").html(pages[i][j] + ""));
				$tbody.append(line);
			}


		}
	}

	$table.append($tbody);
	$('#table-div').empty();
	$table.appendTo($("#table-div"));
	$("#sp1").html('<p style="text-align:center">' + "<b>Page faults:</b>" + "   " + '<span style="color:red">' + pf + '</span>' + '</p>')
	$("#sp2").html('<p style="text-align:center">' + "<b>Page hits:</b>" + "   " + '<span style="color:green">' + ph + '</span>' + '</p>')
	function getRandomColor() {
		m = m + 1;
		var color = '';
		if (m == 1) {
			color = 'Green';
		}
		if (m == 2) {
			color = 'Orange';
		}
		if (m == 3) {
			color = 'Yellow';
		}
		if (m == 4) {
			color = 'LightGray';
		}

		return color;
	}
	console.log(m);
	txt = txt + "\n";
});