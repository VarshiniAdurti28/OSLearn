import { getReferenceString } from "./ds_base.js";

$(document).ready(function () {
    // Auto-load comparison data
    const savedData = localStorage.getItem('diskData');
    if (savedData) {
        const { head, min, max, requests } = JSON.parse(savedData);
        $("#head").val(head);
        $("#min").val(min);
        $("#max").val(max);
        $("#reference-string").val(requests.join(" "));
        setTimeout(calculateClook, 100); // Auto-calculate after short delay
    }
  let dp_clook = [];
  let clook_values = [];
  let data_clook = {};

  $("#calc").click(function calculateClook() {
    clook_values = [];
    dp_clook = [];
    data_clook = [];
    let totalMovement = 0;

    // Get user inputs
    let head = parseInt(document.getElementsByTagName("input")[0].value);
    let min = parseInt(document.getElementsByTagName("input")[1].value);
    let max = parseInt(document.getElementsByTagName("input")[2].value);

    if (head > max || head < min) {
      alert("The head position must be within the range of cylinders.");
      return;
    }

    // Get reference string
    clook_values.push(head);
    let in_arr = getReferenceString(head, max, min);
    if (!in_arr.length) {
      alert("Reference string is empty! Please provide valid inputs.");
      return;
    }

    // Sort reference string
    in_arr.sort((a, b) => a - b);

    // Find the first request greater than the head position
    let splitIndex = in_arr.findIndex((val) => val > head);

    // C-LOOK logic
    // First service higher requests (right side of the head)
    if (splitIndex !== -1) {
      clook_values.push(...in_arr.slice(splitIndex));
    }
    // Then wrap around to service lower requests (left side of the head)
    clook_values.push(...in_arr.slice(0, splitIndex));

    // Calculate total head movement
    for (let i = 1; i < clook_values.length; i++) {
      totalMovement += Math.abs(clook_values[i] - clook_values[i - 1]);
    }

    allocateClook();
    alert("Total head movement with C-LOOK: " + totalMovement);
  });

  function allocateClook() {
    let distance = -1;
    for (let i = 0; i < clook_values.length; i++) {
      distance++;
      let position = parseInt(clook_values[i]);
      dp_clook.push([position, distance]);
    }
    data_clook = {
      values: dp_clook
    };
    renderClookChart();
  }

  function renderClookChart() {
    zingchart.render({
      id: "chartContainer",
      output: "svg",
      height: 500,
      width: "80%",
      data: {
        type: "line",
        title: {
          text: "C-LOOK Head Movement Visualization"
        },
        series: [data_clook]
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


function runCLOOK(head, max, min, refStr = null, silent = false) {
  let sum = 0;
  let values = [head];
  const in_arr = refStr || getReferenceString(head, max, min);

  

  in_arr.sort((a, b) => a - b);
  let split = in_arr.findIndex(n => n >= head);

  for (let i = split; i < in_arr.length; ++i) values.push(in_arr[i]);
  for (let i = 0; i < split; ++i) values.push(in_arr[i]);

  for (let i = 1; i < values.length; i++) {
    sum += Math.abs(values[i] - values[i - 1]);
  }

 

  return { name: "CLOOK", totalHeadMovement: sum };
}

export { runCLOOK };
