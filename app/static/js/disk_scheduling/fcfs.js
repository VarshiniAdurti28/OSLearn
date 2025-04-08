import { getReferenceString } from "./ds_base.js";

$(document).ready(function () {
  var dp_fcfs = [];
  // var dp_sstf = [];
  // var dp_scan = [];
  // var dp_cscan = [];
  // var dp_look = [];
  // var dp_clook = [];
  var fcfs_values = [];
  // var sstf_values=[];
  // var scan_values = [];
  // var cscan_values=[];
  // var look_values = [];
  // var clook_values = [];
  var data_fcfs = {};

  $("#calc").click(function calculate() {
    fcfs_values = [];
    dp_fcfs = [];
    data_fcfs = [];
    var i;
    var sum = 0;
    var diff;

    var head = parseInt(document.getElementsByTagName("input")[0].value);
    var max = parseInt(document.getElementsByTagName("input")[2].value);
    var min = parseInt(document.getElementsByTagName("input")[1].value);
    console.log(max, min);
    if (head > max) {
      alert("fcfs head is larger than last cylinder number");
      return -10;
    }

    if (head < min) {
      alert("fcfs head is smaller than first cylinder number");
      return -10;
    }

    fcfs_values.push(head);
    var in_arr = getReferenceString(head, max, min);
    if (!in_arr.length) {
      return -10;
    }

    in_arr.forEach((num) => {
      diff = head - num;
      if (diff < 0) {
        diff = diff * -1;
      }
      sum = sum + diff;
      head = num;
      fcfs_values.push(num);
    });

    allocate_fcfs();
    return sum;
  });

  function allocate_fcfs() {
    var d = -1;
    for (var i = 0; i < fcfs_values.length; ++i) {
      d++;
      var a = parseInt(fcfs_values[i]);
      dp_fcfs.push([a, d]);
    }
    data_fcfs = {
      values: dp_fcfs,
    };
    fcfsModal();
  }

  function fcfsModal() {
    var max_val = document.getElementsByTagName("input")[2].value;

    zingchart.render({
      id: "chartContainer",
      output: "svg",
      height: 500,
      width: "80%",
      data: {
        type: "line",
        title: {
          text: "FCFS Header Movement",
        },
        series: [data_fcfs],
      },

      "scale-x": {
        title: {
          text: "Request Track Number",
        },
      },

      "scale-y": {
        title: "Request Number",
      },
    });
  }
});
