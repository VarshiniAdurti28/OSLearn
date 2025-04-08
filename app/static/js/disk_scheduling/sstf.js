import { getReferenceString } from "./ds_base.js";

$(document).ready(function () {
    // var dp_fcfs = [];
    var dp_sstf = [];
    // var dp_scan = [];
    // var dp_scan = [];
    // var dp_look = [];
    // var dp_clook = [];
    // var fcfs_values = [];
    var sstf_values = [];
    // var scan_values = [];
    // var scan_values=[];
    // var look_values = [];
    // var clook_values = [];
    var data_sstf = {};

    $("#calc").click(function calculate() {
        sstf_values = [];
        dp_sstf = [];
        data_sstf = [];
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

        sstf_values.push(head);
        var in_arr = getReferenceString(head, max, min);

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
            sstf_values.push(in_arr[flag]);
            done[flag - 1] = 1;
            min = 9999;
        }
        allocate_sstf();
        return sum;
    });

    function allocate_sstf() {
        var d = -1;
        for (var i = 0; i < sstf_values.length; ++i) {
            d++;
            var a = parseInt(sstf_values[i]);
            dp_sstf.push([a, d]);
        }
        data_sstf = {
            values: dp_sstf,
        };
        sstfModal();
    }

    function sstfModal() {
        var max_val = document.getElementsByTagName("input")[2].value;
        zingchart.render({
            id: "chartContainer",
            output: "svg",
            height: 500,
            width: "80%",
            data: {
                "type": "line",
                "title": {
                    "text": "SSTF Header Movement"
                },
                "series": [
                    data_sstf
                ]
            }
        });
    }
});