import { getReferenceString } from "./ds_base.js";

$(document).ready(function () {
  let dp_sstf = [];
  let sstf_values = [];
  let data_sstf = {};

  $("#calc").click(function calculateSSTF() {
    sstf_values = [];
    dp_sstf = [];
    data_sstf = [];
    let totalMovement = 0;

    // Get user inputs
    const head = parseInt(document.getElementsByTagName("input")[0].value);
    const min = parseInt(document.getElementsByTagName("input")[1].value);
    const max = parseInt(document.getElementsByTagName("input")[2].value);

    if (head > max || head < min) {
      alert("The head position must be within the range of cylinders.");
      return;
    }

    // Get reference string
    sstf_values.push(head);
    const in_arr = getReferenceString(head, max, min);
    if (!in_arr.length) {
      alert("Reference string is empty! Please provide valid inputs.");
      return;
    }

    // SSTF Algorithm
    let current = head;
    const requests = [...in_arr];
    while (requests.length > 0) {
      // Find the closest request to the current position
      const nearest = requests.reduce((closest, request) =>
        Math.abs(request - current) < Math.abs(closest - current) ? request : closest
      );

      // Calculate movement and update current position
      totalMovement += Math.abs(nearest - current);
      current = nearest;

      // Update visited sequence
      sstf_values.push(nearest);

      // Remove the processed request
      requests.splice(requests.indexOf(nearest), 1);
    }

    allocateSSTF();
    alert(`Total head movement with SSTF: ${totalMovement}`);
    return totalMovement;
  });

  function allocateSSTF() {
    sstf_values.forEach((value, index) => {
      dp_sstf.push([value, index]);
    });

    data_sstf = {
      values: dp_sstf
    };

    renderSSTFChart();
  }

  function renderSSTFChart() {
    zingchart.render({
      id: "chartContainer",
      output: "svg",
      height: 500,
      width: "80%",
      data: {
        type: "line",
        title: {
          text: "SSTF Head Movement Visualization"
        },
        series: [data_sstf]
      },
      "scale-x": {
        title: {
          text: "Request Track Number"
        }
      },
      "scale-y": {
        title: {
          text: "Head Movement (Distance)"
        }
      }
    });

    $("#chartContainer").removeClass("hidden");
  }
});


function runSSTF(head, max, min, refStr = null, silent = false) {
  let sum = 0;
  let seek = head;
  const in_arr = refStr || getReferenceString(head, max, min);
  const visited = new Array(in_arr.length).fill(false);

  

  for (let i = 0; i < in_arr.length; ++i) {
    let minDist = Infinity, index = -1;
    for (let j = 0; j < in_arr.length; ++j) {
      if (!visited[j] && Math.abs(in_arr[j] - seek) < minDist) {
        minDist = Math.abs(in_arr[j] - seek);
        index = j;
      }
    }
    visited[index] = true;
    sum += Math.abs(in_arr[index] - seek);
    seek = in_arr[index];
  }

  

  return { name: "SSTF", totalHeadMovement: sum };
}

export { runSSTF };

