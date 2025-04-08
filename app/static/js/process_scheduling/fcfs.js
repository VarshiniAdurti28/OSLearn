$(document).ready(function () {
    $('#start').click(function () {
        fcfs();
        var i = 0;
        var totalTime = sequence[total].start;
        pixel = parseInt(600 / totalTime);
        var containerWidth = pixel * totalTime + 2;
        $('#gantt-chart').css('width', containerWidth + 'px');
        displayBlock(i);
    });
    var Q = [];
    function fcfs() {
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
        Enqueue(0);
        var temp = null;
        while (complete != n) {
            var index;
            if (Q.length > 0)
                index = Dequeue();
            else
                index = null;
            if (index != null) {
                if (stuff[index].point == 0) {
                    stuff[index].point++;
                    stuff[index].check = 1;
                    sequence.push({ start: time, n: proc[index] });
                    time += stuff[index].rt[0];
                    if (stuff[index].rt[1] == 0 && stuff[index].rt[2] == 0) {
                        complete++;
                        stuff[index].finish = 1;
                        stuff[index].tat = time - stuff[index].at;
                        stuff[index].wt = time - stuff[index].at - stuff[index].bt1;
                    }
                    for (j = 0; j < n; j++) {
                        if (stuff[j].at <= time && stuff[j].finish == 0 && stuff[j].check == 0 && Q.indexOf(j) == -1)
                            Enqueue(j);
                        if (stuff[j].at <= time && stuff[j].check == 1 && stuff[j].finish == 0 && j != index) {
                            stuff[j].rt[1] -= stuff[index].rt[0];
                            if (stuff[j].rt[1] <= 0) {
                                stuff[j].check = 0;
                                Enqueue(j);
                                stuff[j].point = 2;
                            }
                        }
                    }

                }
                else if (stuff[index].point == 2) {
                    complete++;
                    stuff[index].finish = 1;
                    sequence.push({ start: time, n: proc[index] });
                    time += stuff[index].rt[2];
                    stuff[index].tat = time - stuff[index].at;
                    stuff[index].wt = time - stuff[index].bt1 - stuff[index].bt2 - stuff[index].at;
                    for (j = 0; j < n; j++) {
                        if (stuff[j].at <= time && stuff[j].finish == 0 && stuff[j].check == 0 && Q.indexOf(j) == -1)
                            Enqueue(j);
                        if (stuff[j].at <= time && stuff[j].check == 1 && stuff[j].finish == 0 && j != index) {
                            stuff[j].rt[1] -= stuff[index].rt[2];
                            if (stuff[j].rt[1] <= 0) {
                                stuff[j].check = 0;
                                Enqueue(j);
                                stuff[j].point = 2;
                            }
                        }
                    }
                }
                temp = index;
            }
            else if (index == null) {
                if (temp != index) {
                    sequence.push({ start: time, n: null });
                }
                time++;
                for (j = 0; j < n; j++) {
                    if (stuff[j].at <= time && stuff[j].finish == 0 && stuff[j].check == 0 && Q.indexOf(j) == -1)
                        Enqueue(j);
                    if (stuff[j].at <= time && stuff[j].check == 1 && stuff[j].finish == 0 && j != index) {
                        stuff[j].rt[1]--;
                        if (stuff[j].rt[1] <= 0) {
                            stuff[j].check = 0;
                            Enqueue(j);
                            stuff[j].point++;
                        }
                    }
                }
                temp = index;
            }

        }
        sequence.push({ start: time, n: -1 });
        total = sequence.length - 1;
        var sum_at = 0;
        for (i = 0; i < n; i++)
            sum_at += stuff[i].wt;
        average_wt = sum_at / n;
        var sum_tat = 0;
        for (i = 0; i < n; i++)
            sum_tat += stuff[i].tat;
        average_tat = sum_tat / n;
        var pixel = 0;
        var sum_null = 0;
        throughput = n / time;
        for (i = 0; i < sequence.length; i++) {
            if (sequence[i].n == null) {
                sum_null += sequence[i + 1].start - sequence[i].start;
            }
        }
        cpu_efficiency = ((time - sum_null) / time) * 100;
    }

    function Enqueue(i) {
        Q.push(i);
    }

    function Dequeue(i) {
        return Q.shift();
    }

    function drawTable(i) {
        if (i < stuff.length) {
            $("#ptable").append("<tr><td>" + stuff[i].no + "</td><td>" + stuff[i].at + "</td><td>" + stuff[i].bt1 + "</td><td>" + stuff[i].wt + "</td><td>" + stuff[i].tat + "</td></tr>");
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
