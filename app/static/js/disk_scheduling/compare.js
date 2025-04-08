import { getReferenceString } from "./ds_base.js";

$(document).ready(function () {
    var in_arr = [];
    var head, max, min

    function getInputs() {
        head = parseInt(document.getElementsByTagName("input")[0].value);
    max = parseInt(document.getElementsByTagName("input")[2].value);
    min = parseInt(document.getElementsByTagName("input")[1].value);
    if (head > max) {
      alert("fcfs head is larger than last cylinder number");
      return -10;
    }

    if (head < min) {
      alert("fcfs head is smaller than first cylinder number");
      return -10;
    }

    in_arr = getReferenceString(head, max, min);
    }

  $("#calc").click(function calculate() {
      
    getInputs();

    var fcfsv=0,sstfv=0,scanv=0,cscanv=0,lookv=0,clookv=0;

        fcfsv = calculate_fcfs();
        sstfv = calculate_sstf();  
        in_arr.sort(function(a, b){return a - b});
        scanv = calculate_scan();    
        cscanv = calculate_cscan();
        lookv = calculate_look();
        clookv = calculate_clook();
      
        show_graph(fcfsv,sstfv,scanv,cscanv,lookv,clookv);
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

    window.onload = function () {
        CanvasJS.addColorSet("myColors",
                [//colorSet Array
                "#5CDB95",
                "#3500D3",
                "#86C232",
                "#FFE400",
                "#FF652F",
                "red"                
                ]);
    }

    function show_graph(fcfs,sstf,scan,cscan,look,clook)
    {
        
        var chart = new CanvasJS.Chart("chartContainer", {
        title:{
            text: "RESULTS OF DISK SCHEDULING ALGORITHMS"              
        },
        
        data: [              
        {
            // Change type to, "line", "splineArea", etc.
            type: "column",				
            dataPoints: [
                { label: "FCFS",  y: fcfs  },
                { label: "SSTF", y: sstf  },
                { label: "SCAN", y: scan  },
                { label: "CSCAN",  y: cscan  },
                { label: "LOOK",  y: look  },
                { label: "CLOOK",  y: clook  }
            ]
        }
        ],

        axisY:{
            title:"Total Head Movement"
        },

        animationEnabled : true,
        animationDuration :6000,
        colorSet: "myColors"
    });
    chart.render();
    }
});