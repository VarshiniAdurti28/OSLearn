import { runFCFS } from './fcfs.js';
import { runSSTF } from './sstf.js';
import { runSCAN } from './scan.js';
import { runCSCAN } from './cscan.js';
import { runLOOK } from './look.js';
import { runCLOOK } from './clook.js';

$(document).ready(function () {
  $("#calc").click(function () {
    const head = parseInt($("#head").val());
    const min = parseInt($("#min").val());
    const max = parseInt($("#max").val());
    const referenceInput = $("#reference-string").val();

    if (!referenceInput) {
      alert("Reference string is empty!");
      return;
    }

    if (isNaN(head) || head < min || head > max) {
      alert("Head position must be within cylinder range.");
      return;
    }

    const referenceString = referenceInput.split(" ").map(Number).filter(n => !isNaN(n));

    const algorithms = [
      runFCFS,
      runSSTF,
      runSCAN,
      runLOOK,
      runCSCAN,
      runCLOOK
    ];

    // Pass silent=true to suppress alerts
    const results = algorithms.map(algo => algo(head, max, min, referenceString, true));

    renderChart(results);
  });

  function renderChart(results) {
    const dataPoints = results.map(algo => ({
      label: algo.name,
      y: algo.totalHeadMovement
    }));

    const chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2",
      title: {
        text: "Disk Scheduling Algorithm Comparison"
      },
      axisY: {
        title: "Total Head Movement"
      },
      data: [{
        type: "column",
        dataPoints: dataPoints
      }]
    });
    console.log("Algorithm results: ", results);
    chart.render();
  }
});
