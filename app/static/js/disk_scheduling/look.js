import { getReferenceString } from "./ds_base.js";

$(document).ready(function () {
    // var dp_fcfs = [];
    // var dp_sstf = [];
    // var dp_scan = [];
    // var dp_scan = [];
    var dp_look = [];
    // var dp_clook = [];
    // var fcfs_values = [];
    // var sstf_values=[];
    // var scan_values = [];
    // var scan_values=[];
    var look_values = [];
    // var clook_values = [];
    var data_look = {};

    $("#calc").click(function calculate() {
        look_values = [];
        dp_look = [];
        data_look = [];
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

        look_values.push(head);
        var in_arr = getReferenceString(head, max, min);
        //sort the inputs
        in_arr.sort(function (a, b) { return a - b });

        var i, j, flag = 1;
        for (i = in_arr.length - 1; i >= 0; --i) {
            var p = parseInt(in_arr[i]);
            if (p < head) {
                console.log(i + 1)
                flag = i + 1;
                break;
            }
        }
        var p_i;
        for (j = flag; j < in_arr.length; ++j) {
            p_i = parseInt(in_arr[j]);
            look_values.push(p_i);
            console.log(look_values);
        }

        for (j = flag - 1; j >= 0; --j) {
            p_i = parseInt(in_arr[j]);
            look_values.push(p_i);
            console.log(look_values);
        }

        var int = parseInt(in_arr[in_arr.length - 1]);	//last element
        sum = sum + (int - head);

        var int2 = parseInt(in_arr[0]);
        sum = sum + (int - int2);
        console.log(look_values)
        allocate_look();
        return sum;
    });

    function allocate_look() {
        var d = -1;
        for (var i = 0; i < look_values.length; ++i) {
            d++;
            var a = parseInt(look_values[i]);
            dp_look.push([a, d]);
        }
        data_look = {
            values: dp_look,
        };
        lookModal();
    }

    function lookModal() {
        var max_val = document.getElementsByTagName("input")[2].value;
        zingchart.render({
            id: "chartContainer",
            output: "svg",
            height: 500,
            width: "80%",
            data: {
                "type": "line",
                "title": {
                    "text": "LOOK Header Movement"
                },
                "series": [
                    data_look
                ]
            }
        });
    }
});