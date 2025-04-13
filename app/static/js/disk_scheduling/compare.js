import { getReferenceString } from "./ds_base.js";

// Store algorithm routes
const ALGORITHM_ROUTES = {
    FCFS: 'fcfs',
    SSTF: 'sstf',
    SCAN: 'scan',
    CSCAN: 'cscan',
    LOOK: 'look',
    CLOOK: 'clook'
};

$(document).ready(function () {
    let in_arr = [];
    let head, max, min;

    function validateInputs() {
        head = parseInt($("#head").val());
        min = parseInt($("#min").val());
        max = parseInt($("#max").val());

        if (isNaN(head) || head < min || head > max) {
            alert(`Head position must be between ${min} and ${max}`);
            return false;
        }

        in_arr = getReferenceString(head, max, min);
        if (in_arr.length < 3) {
            alert("Minimum 3 requests required");
            return false;
        }

        return true;
    }

    $("#calc").click(function () {
        if (!validateInputs()) return;

        // Store data for individual algorithm pages
        localStorage.setItem('comparisonData', JSON.stringify({
            head: head,
            min: min,
            max: max,
            requests: in_arr
        }));

        // Calculate results
        const results = {
            FCFS: calculate_fcfs(),
            SSTF: calculate_sstf(),
            SCAN: calculate_scan(),
            CSCAN: calculate_cscan(),
            LOOK: calculate_look(),
            CLOOK: calculate_clook()
        };

        renderComparisonChart(results);
    });

   function calculate_clook() {
    var i;
    var sum = 0;
    var diff;

    var len = in_arr.length-1;
    var p = parseInt(in_arr[len]);
    sum = sum + (p - head);
    
    var temp;
    var i,j,flag=1;

    for(i=in_arr.length-1;i>=0;--i)	
    {			
        var p = parseInt(in_arr[i]);
        if(p < head)
        {
            flag = i+1;
            break;
        }
    }

    var int = parseInt(in_arr[flag-1]);
    var int2 = parseInt(in_arr[0]);
    sum = sum + (int - int2);
    return sum;
  }

    function calculate_cscan() {
    var i;
    var sum = 0;
    var diff;

    sum = sum + (max - head);
    
    var temp;
    var i,j,flag=1;

    for(i=in_arr.length-1;i>=0;--i)	
    {			
        var p = parseInt(in_arr[i]);
        if(p < head)
        {
            flag = i+1;
            break;
        }
    }
        
    var int = parseInt(in_arr[flag-1]);
    sum = sum + (int);
    return sum;
  }

    function calculate_fcfs() {
    var i;
    var sum = 0;
    var diff;

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
    });

    return sum;
  }

    function calculate_look() {
        var i;
        var sum = 0;
        var diff;

        var i, j, flag = 1;
        for (i = in_arr.length - 1; i >= 0; --i) {
            var p = parseInt(in_arr[i]);
            if (p < head) {
                console.log(i + 1)
                flag = i + 1;
                break;
            }
        }

        var int = parseInt(in_arr[in_arr.length - 1]);	//last element
        sum = sum + (int - head);

        var int2 = parseInt(in_arr[0]);
        sum = sum + (int - int2);
        return sum;
    }

    function calculate_scan() {
    var i;
    var sum = 0;
    var diff;
    
    sum = sum + (max - head);
    
    var temp;
    var i,j,flag;

    for(i=in_arr.length-1;i>=0;--i)	
    {			
        var p = parseInt(in_arr[i]);
        if(p < head)
        {
            flag = i+1;
            break;
        }
    }

    var int = parseInt(in_arr[0]);
    sum = sum + (max - int);

    return sum;
  }

    function calculate_sstf() {
        var i;
        var sum = 0;
        var diff;
        
        var min = 9999;
        var done = [];		//a new empty array
        var flag;
        //make done as 0
        for (i = 0; i < in_arr.length - 2; ++i)		//-2 because there are 2 checkboxes , do -8 if min and max are included
            done.push(0);


        for (var j = 1; j <= in_arr.length - 2; ++j) {
            for (var i = 1; i <= in_arr.length - 2; ++i) {
                diff = head - in_arr[i];

                if (diff < 0)
                    diff = diff * (-1);

                if ((diff < min) && (done[i - 1] == 0)) {
                    min = diff;
                    flag = i;
                    //here we push the variables for the graph

                }
            }
            sum = sum + min;
            head = in_arr[flag];
            //dp_sstf.push([in_arr[flag],y_i]);
            done[flag - 1] = 1;
            min = 9999;
        }
        return sum;
    }

    function show_graph(fcfs, sstf, scan, cscan, look, clook) {
    // Store input fields and results in localStorage
    const comparisonData = {
        head: parseInt($("#head").val()),
        min: parseInt($("#min").val()),
        max: parseInt($("#max").val()),
        requests: $("#reference").val(),
        results: { fcfs, sstf, scan, cscan, look, clook }
    };
    localStorage.setItem("comparisonData", JSON.stringify(comparisonData));

    // Render the chart
    const chart = new CanvasJS.Chart("chartContainer", {
        title: { text: "Algorithm Comparison Results" },
        axisY: { title: "Total Head Movement" },
        data: [{
            type: "column",
            dataPoints: [
                { label: "FCFS", y: fcfs, click: () => navigateToAlgorithm("fcfs") },
                { label: "SSTF", y: sstf, click: () => navigateToAlgorithm("sstf") },
                { label: "SCAN", y: scan, click: () => navigateToAlgorithm("scan") },
                { label: "CSCAN", y: cscan, click: () => navigateToAlgorithm("cscan") },
                { label: "LOOK", y: look, click: () => navigateToAlgorithm("look") },
                { label: "CLOOK", y: clook, click: () => navigateToAlgorithm("clook") }
            ]
        }]
    });

    chart.render();
}

// Navigate to individual algorithm page
function navigateToAlgorithm(algorithm) {
    window.location.href = `/disk-scheduling/${algorithm}`;
}


    function renderComparisonChart(results) {
        const chart = new CanvasJS.Chart("chartContainer", {
            title: { 
                text: "Algorithm Performance Comparison",
                fontSize: 20
            },
            axisY: { 
                title: "Total Head Movement",
                titleFontSize: 14
            },
            data: [{
                type: "column",
                dataPoints: Object.entries(results).map(([algorithm, value]) => ({
                    label: algorithm,
                    y: value,
                    click: function() {
                        // Navigate to algorithm page on bar click
                        window.location.href = `/disk-scheduling/${ALGORITHM_ROUTES[algorithm]}`;
                    }
                }))
            }],
            options: {
                indexLabel: "{y}",
                indexLabelFontSize: 12,
                toolTip: {
                    content: "{label}: {y} movements"
                }
            }
        });

        chart.render();
    }
});
