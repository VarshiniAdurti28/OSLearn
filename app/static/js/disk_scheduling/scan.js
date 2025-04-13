import { getReferenceString } from "./ds_base.js";

$(document).ready(function () {
  var dp_scan = [];
  var scan_values = [];
  var data_scan = {};

  $("#calc").click(function calculate() {
    scan_values = [];
    dp_scan = [];
    data_scan = [];
    var sum = 0;

    var head = parseInt(document.getElementsByTagName("input")[0].value);
    var min = parseInt(document.getElementsByTagName("input")[1].value);
    var max = parseInt(document.getElementsByTagName("input")[2].value);

    if (head > max) {
      alert("Head is larger than the last cylinder number.");
      return;
    }

    if (head < min) {
      alert("Head is smaller than the first cylinder number.");
      return;
    }

    scan_values.push(head);
    var in_arr = getReferenceString(head, max, min);
    if (!in_arr.length) {
      alert("Reference string is empty!");
      return;
    }

    // Sort inputs
    in_arr.sort(function (a, b) {
      return a - b;
    });

    let flag;
    for (let i = in_arr.length - 1; i >= 0; --i) {
      if (parseInt(in_arr[i]) < head) {
        flag = i + 1;
        break;
      }
    }

    // Move right (towards max)
    for (let j = flag; j < in_arr.length; ++j) {
      scan_values.push(parseInt(in_arr[j]));
    }
    scan_values.push(max);

    // Move left (towards min)
    for (let j = flag - 1; j >= 0; --j) {
      scan_values.push(parseInt(in_arr[j]));
    }

    // Calculate total head movement
    for (let i = 1; i < scan_values.length; i++) {
      sum += Math.abs(scan_values[i] - scan_values[i - 1]);
    }

    allocate_scan();
    alert("Total head movement: " + sum);
    return sum;
  });

  function allocate_scan() {
    var d = -1;
    for (var i = 0; i < scan_values.length; ++i) {
      d++;
      var a = parseInt(scan_values[i]);
      dp_scan.push([a, d]);
    }
    data_scan = {
      values: dp_scan
    };
    scanModal();
  }

  function scanModal() {
    var max_val = document.getElementsByTagName("input")[2].value;
    zingchart.render({
      id: "chartContainer",
      output: "svg",
      height: 500,
      width: "80%",
      data: {
        type: "line",
        title: {
          text: "SCAN Head Movement"
        },
        series: [data_scan]
      },
      "scale-x": {
        title: {
          text: "Request Track Number"
        }
      },
      "scale-y": {
        title: "Head Movement (Distance)"
      }
    });

    $("#chartContainer").removeClass("hidden");
  }
});
