import { getReferenceString } from "./ds_base.js";

$(document).ready(function () {
  let dp_look = [];
  let look_values = [];
  let data_look = {};

  $("#calc").click(function calculateLOOK() {
    look_values = [];
    dp_look = [];
    data_look = [];
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
    look_values.push(head);
    const in_arr = getReferenceString(head, max, min);
    if (!in_arr.length) {
      alert("Reference string is empty! Please provide valid inputs.");
      return;
    }

    // Sort reference string
    in_arr.sort((a, b) => a - b);

    // Find the breakpoint for higher and lower requests
    const higher = in_arr.filter((req) => req >= head);
    const lower = in_arr.filter((req) => req < head).reverse();

    // LOOK Algorithm: Move in one direction first, then reverse
    let current = head;
    higher.forEach((req) => {
      totalMovement += Math.abs(current - req);
      look_values.push(req);
      current = req;
    });

    lower.forEach((req) => {
      totalMovement += Math.abs(current - req);
      look_values.push(req);
      current = req;
    });

    allocateLOOK();
    alert(`Total head movement with LOOK: ${totalMovement}`);
    return totalMovement;
  });

  function allocateLOOK() {
    look_values.forEach((value, index) => {
      dp_look.push([value, index]);
    });

    data_look = {
      values: dp_look
    };

    renderLOOKChart();
  }

  function renderLOOKChart() {
    zingchart.render({
      id: "chartContainer",
      output: "svg",
      height: 500,
      width: "80%",
      data: {
        type: "line",
        title: {
          text: "LOOK Head Movement Visualization"
        },
        series: [data_look]
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
