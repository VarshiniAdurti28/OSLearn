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
var cpu_efficiency;

$(document).ready(function () {
    $('#start').click(function () {
        hrrn();
        var i = 0;
        var totalTime = sequence[total].start;
        pixel = parseInt(600 / totalTime);
        var containerWidth = pixel * totalTime + 2;
        $('#gantt-chart').css('width', containerWidth + 'px');
        // displayBlock(i);
    });
    var Q = [];
    function hrrn() {
        var proc = [];
        for (i = 0; i < stuff.length; i++) {
            proc.push(i + 1);
        }
        var n = stuff.length;
        for (i = 0; i < n; i++) {
            for (j = i + 1; j < n; j++) {
                if (stuff[i].at > stuff[j].at) {
                    var temp;
                    temp = stuff[i];
                    stuff[i] = stuff[j];
                    stuff[j] = temp;
                    temp = proc[i];
                    proc[i] = proc[j];
                    proc[j] = temp;
                }
            }
        }
        n = stuff.length;
        var time = 0;
        var complete = 0;
        var temp = null;
        var st_time;
        sequence = [];
        if (stuff[0].at > 0) {
            sequence.push({ start: 0, n: null });
            time += stuff[0].at;
        }
        console.log(stuff);
        while (complete != n) {
            var hrr = -999;
            var loc;
            for (i = 0; i < n; i++) {
                if (stuff[i].finish != 1) {
                    temp = (stuff[i].bt + time - stuff[i].at) / stuff[i].bt;
                    if (hrr < temp) {
                        hrr = temp;
                        loc = i;
                    }
                }
            }
            if (hrr != -999) {
                complete++;
                sequence.push({ start: time, n: proc[loc] });
                stuff[loc].finish = 1;
                time += stuff[loc].bt;
                stuff[loc].tat = time - stuff[loc].at;
                stuff[loc].wt = stuff[loc].tat - stuff[loc].bt;
            }
            console.log(complete);
            console.log(stuff);
            console.log(sequence);
        }
        // console.log('hrrn');
        // sequence.push({ start: time, n: -1 });
        // total = sequence.length - 1;
        // var sum_at = 0;
        // for (i = 0; i < n; i++)
        //     sum_at += stuff[i].wt;
        // average_wt = sum_at / n;
        // var pixel = 0;
        // var sum_null = 0;
        // var sum_tat = 0;
        // for (i = 0; i < n; i++)
        //     sum_tat += stuff[i].tat;
        // average_tat = sum_tat / n;
        // throughput = n / time;
        // for (i = 0; i < sequence.length; i++) {
        //     if (sequence[i].n == null) {
        //         sum_null += sequence[i + 1].start - sequence[i].start;
        //     }
        // }
        // cpu_efficiency = ((time - sum_null) / time) * 100;
    }


    function drawTable(i) {
        if (i < stuff.length) {
            var table = document.getElementById("ptable");
            $("#ptable").append("<tr><td>" + stuff[i].no + "</td><td>" + stuff[i].at + "</td><td>" + stuff[i].bt + "</td><td>" + stuff[i].wt + "</td><td>" + stuff[i].tat + "</td></tr>");
            drawTable(i + 1);
        }
        else {
            $("#average").append("<b>The average waiting time of the given processes is " + average_wt + "</b><br>");
            $("#average").append("<b>The average turn around time of the given processes is " + average_tat + "</b><br>");
            $("#average").append("<b>The throughput of the given processes is " + throughput + "</b><br>");
            $("#average").append("<b>The CPU efficiency is " + cpu_efficiency + "%</b><br>");
        }

    }

    function displayBlock(i) {
        if (i == total) {
            drawTable(0);
            return;
        }
        var blockWidth = (sequence[i + 1].start - sequence[i].start) * pixel;
        var processName = sequence[i].n;
        if (sequence[i].n == null) {
            $('#gantt-chart').append('<div class="block" id="process-' + sequence[i].start + '">CPU Idle<div class="bottom">' + sequence[i + 1].start + '</div></div>');
        }
        else {
            $('#gantt-chart').append('<div class="block" id="process-' + sequence[i].start + '">P-' + sequence[i].n + '<div class="bottom">' + sequence[i + 1].start + '</div></div>');
        }
        $('#process-' + sequence[i].start).css('width', blockWidth);
        $('#process-' + sequence[i].start).fadeIn('slow', function () {
            displayBlock(i + 1);
        });
    }
});