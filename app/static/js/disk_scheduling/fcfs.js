import { getReferenceString } from "./ds_base.js";

$(document).ready(function () {
  var dp_fcfs = [];
  var fcfs_values = [];
  var data_fcfs = {};

  $("#calc").click(function calculate() {
    fcfs_values = [];
    dp_fcfs = [];
    data_fcfs = [];
    
    var head = parseInt($("#head").val());
    var min = parseInt($("#min").val());
    var max = parseInt($("#max").val());
    
    console.log("Head:", head, "Min:", min, "Max:", max);

    if (head > max || head < min) {
      alert("Initial head position should be between Min and Max track numbers.");
      return;
    }

    fcfs_values.push(head);

    var in_arr = getReferenceString(head, max, min);
    if (!in_arr.length) {
      alert("Reference string is empty!");
      return;
    }

    var sum = 0;
    in_arr.forEach((num) => {
      var diff = Math.abs(head - num);
      sum += diff;
      head = num;
      fcfs_values.push(num);
    });

    allocate_fcfs();
    
    alert("Total head movement: " + sum);
  });

  function allocate_fcfs() {
    var d = -1;
    for (var i = 0; i < fcfs_values.length; ++i) {
      d++;
      var a = fcfs_values[i];
      dp_fcfs.push([a, d]);
    }
    data_fcfs = {
      values: dp_fcfs
    };
    fcfsModal();
  }

  function fcfsModal() {
    zingchart.render({
      id: "chartContainer",
      output: "svg",
      height: 500,
      width: "80%",
      data: {
        type: "line",
        title: {
          text: "FCFS Head Movement"
        },
        series: [data_fcfs]
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
