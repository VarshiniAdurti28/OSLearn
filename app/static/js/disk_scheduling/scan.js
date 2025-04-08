import { getReferenceString } from "./ds_base.js";

$(document).ready(function () {
  // var dp_fcfs = [];
  // var dp_sstf = [];
  // var dp_scan = [];
  var dp_scan = [];
  // var dp_look = [];
  // var dp_clook = [];
  // var fcfs_values = [];
  // var sstf_values=[];
  // var scan_values = [];
  var scan_values=[];
  // var look_values = [];
  // var clook_values = [];
  var data_scan = {};

  $("#calc").click(function calculate() {
    scan_values = [];
    dp_scan = [];
    data_scan = [];
    var i;
    var sum = 0;
    var diff;

    var head = parseInt(document.getElementsByTagName("input")[0].value);
    var max = parseInt(document.getElementsByTagName("input")[2].value);
    var min = parseInt(document.getElementsByTagName("input")[1].value);
    if (head > max) {
      alert("fcfs head is larger than last cylinder number");
      return -10;
    }

    if (head < min) {
      alert("fcfs head is smaller than first cylinder number");
      return -10;
    }

    scan_values.push(head);
    var in_arr = getReferenceString(head, max, min);

    //sort the inputs
    in_arr.sort(function(a, b){return a - b});
    
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

    var p_i;
    for(j=flag;j<in_arr.length;++j)
    {
        p_i = parseInt(in_arr[j]);
        scan_values.push(p_i);
    }

    scan_values.push(max);

    for(j=flag-1; j>=0 ;--j)
    {
        p_i = parseInt(in_arr[j]);
        scan_values.push(p_i);
    }

    var int = parseInt(in_arr[0]);
    sum = sum + (max - int);

    allocate_scan();
    return sum;
  });

  function allocate_scan(){
    var d=-1;
    for(var i=0;i<scan_values.length;++i)
    {
        d++;
        var a = parseInt(scan_values[i]);
        dp_scan.push([a,d]);
    }
      data_scan = {
      values: dp_scan,
    };
      scanModal();
}

  function scanModal()
{
    var max_val = document.getElementsByTagName("input")[2].value;
    zingchart.render({
    id:"chartContainer",
    output:"svg",
    height:500,
    width:"80%",
    data:{
        "type":"line",
        "title":{
            "text":"SCAN Header Movement"
        },
        "series":[
            data_scan
        ]
    }
    });	
}
});