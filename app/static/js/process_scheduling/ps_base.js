var sequence = [];
var complete;
var time;
var i;
var total;
var proc;
var n;
var average_wt = 0;
var average_tat = 0;
var stuff = [];
var index = 1;
var throughput;
var index = 1;
var cpu_efficiency;

$(document).ready(function () {
    $('#tq').hide();

    $('#add').click(function () {
        addtoList();
    });

    function displayList() {
        var table = document.getElementById("ept");
        $('#ept').append("<tr><td>" + stuff[stuff.length - 1].no + "</td><td>" + stuff[stuff.length - 1].at + "</td><td>" + stuff[stuff.length - 1].bt1 + "</td><td>" + stuff[stuff.length - 1].p + "</td></tr>");
    };

    function addtoList() {
        var arrivalTime = parseInt(document.getElementById("at1").value);
        var burstTime = parseInt(document.getElementById("bt1").value);
        var ioTime = parseInt(document.getElementById("io").value);
        var FinalburstTime = parseInt(document.getElementById("bt2").value);
        var priority = parseInt(document.getElementById("priority").value);
        var rtj = [];
        rtj.push(burstTime);
        rtj.push(ioTime);
        rtj.push(FinalburstTime);
        stuff.push({
            "at": arrivalTime,
            "bt1": burstTime,
            "io": ioTime,
            "bt2": FinalburstTime,
            "check": parseInt("0"),
            "finish": parseInt("0"),
            "no": index,
            "rt": rtj,
            "point": parseInt("0"),
            "p": priority,
            "wt": parseInt("0"),
            "tat": parseInt("0")

        });
        index = index + 1;
        document.getElementById("at1").value = "";
        document.getElementById("bt1").value = "";
        document.getElementById("io").value = "0";
        document.getElementById("bt2").value = "0";
        document.getElementById("priority").value = "";
        displayList();
    };
});