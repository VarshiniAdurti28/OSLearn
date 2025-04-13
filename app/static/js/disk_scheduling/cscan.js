import { getReferenceString } from "./ds_base.js";

$(document).ready(function () {
  var dp_cscan = [];
  var cscan_values = [];
  var data_cscan = {};

  $("#calc").click(function calculate() {
    cscan_values = [];
    dp_cscan = [];
    data_cscan = [];
    let sum = 0;

    const head = parseInt(document.getElementsByTagName("input")[0].value);
    const min = parseInt(document.getElementsByTagName("input")[1].value);
    const max = parseInt(document.getElementsByTagName("input")[2].value);

    if (head > max) {
      alert("Head is larger than the last cylinder number.");
      return;
    }

    if (head < min) {
      alert("Head is smaller than the first cylinder number.");
      return;
    }

    cscan_values.push(head);
    const in_arr = getReferenceString(head, max, min);
    if (!in_arr.length) {
      alert("Reference string is empty!");
      return;
    }

    in_arr.sort((a, b) => a - b);

    let flag = 1;
    for (let i = in_arr.length - 1; i >= 0; --i) {
      if (parseInt(in_arr[i]) < head) {
        flag = i + 1;
        break;
      }
    }

    // Right pass
    for (let j = flag; j < in_arr.length; ++j) {
      cscan_values.push(parseInt(in_arr[j]));
    }
    cscan_values.push(max); // end of disk
    cscan_values.push(min); // jump to beginning

    // Left pass
    for (let j = 0; j <= flag - 1; ++j) {
      cscan_values.push(parseInt(in_arr[j]));
    }

    // Calculate total head movement
    for (let i = 1; i < cscan_values.length; i++) {
      sum += Math.abs(cscan_values[i] - cscan_values[i - 1]);
    }

    allocate_cscan();
    alert("Total head movement: " + sum);
    return sum;
  });

  function allocate_cscan() {
    let d = -1;
    for (let i = 0; i < cscan_values.length; ++i) {
      d++;
      const a = parseInt(cscan_values[i]);
      dp_cscan.push([a, d]);
    }
    data_cscan = {
      values: dp_cscan
    };
    cscanModal();
  }

  function cscanModal() {
    zingchart.render({
      id: "chartContainer",
      output: "svg",
      height: 500,
      width: "80%",
      data: {
        type: "line",
        title: {
          text: "CSCAN Head Movement"
        },
        series: [data_cscan]
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
