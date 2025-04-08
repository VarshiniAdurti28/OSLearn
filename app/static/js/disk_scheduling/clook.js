import { getReferenceString } from "./ds_base.js";

$(document).ready(function () {
    // var dp_fcfs = [];
    // var dp_sstf = [];
    // var dp_scan = [];
    // var dp_scan = [];
    // var dp_look = [];
    var dp_clook = [];
    // var fcfs_values = [];
    // var sstf_values=[];
    // var scan_values = [];
    // var scan_values=[];
    // var look_values = [];
    var clook_values = [];
    var data_clook = {};

    $("#calc").click(function calculate() {
        clook_values = [];
        dp_clook = [];
        data_clook = [];
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

        clook_values.push(head);
        var in_arr = getReferenceString(head, max, min);
        //sort the inputs
        in_arr.sort(function (a, b) { return a - b });

        var len = in_arr.length - 1;
        var p = parseInt(in_arr[len]);
        sum = sum + (p - head);

        var temp;
        var i, j, flag = 1;

        for (i = in_arr.length - 1; i >= 0; --i) {
            var p = parseInt(in_arr[i]);
            if (p < head) {
                flag = i + 1;
                break;
            }
        }
        var p_i;
        for (j = flag; j < in_arr.length; ++j) {
            p_i = parseInt(in_arr[j]);
            clook_values.push(p_i);
        }

        for (j = 0; j <= flag - 1; ++j) {
            p_i = parseInt(in_arr[j]);
            clook_values.push(p_i);
        }

        var int = parseInt(in_arr[flag - 1]);
        var int2 = parseInt(in_arr[0]);
        sum = sum + (int - int2);

        allocate_clook();
        return sum;
    });

    function allocate_clook() {
        var d = -1;
        for (var i = 0; i < clook_values.length; ++i) {
            d++;
            var a = parseInt(clook_values[i]);
            dp_clook.push([a, d]);
        }
        data_clook = {
            values: dp_clook,
        };
        clookModal();
    }

    function clookModal() {
        var max_val = document.getElementsByTagName("input")[2].value;
        zingchart.render({
            id: "chartContainer",
            output: "svg",
            height: 500,
            width: "80%",
            data: {
                "type": "line",
                "title": {
                    "text": "CLOOK Header Movement"
                },
                "series": [
                    data_clook
                ]
            }
        });
    }
});