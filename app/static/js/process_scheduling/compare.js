$(document).ready(function () {
    $('#tq').show();
    $('#ptab').hide();

    $('#start').click(function () {
        tq = parseInt(document.getElementById("tq").value);
        fcfs();
        for (i = 0; i < stuff.length; i++) {
            stuff[i].finish = 0;
            stuff[i].check = 0;
            stuff[i].rt = [];
            stuff[i].rt.push(stuff[i].bt1);
            stuff[i].rt.push(stuff[i].io);
            stuff[i].rt.push(stuff[i].bt2);
            stuff[i].point = 0;

        }
        sjf();
        for (i = 0; i < stuff.length; i++) {
            stuff[i].finish = 0;
            stuff[i].check = 0;
            stuff[i].rt = [];
            stuff[i].rt.push(stuff[i].bt1);
            stuff[i].rt.push(stuff[i].io);
            stuff[i].rt.push(stuff[i].bt2);
            stuff[i].point = 0;

        }
        srtf();
        for (i = 0; i < stuff.length; i++) {
            stuff[i].finish = 0;
            stuff[i].check = 0;
            stuff[i].rt = [];
            stuff[i].rt.push(stuff[i].bt1);
            stuff[i].rt.push(stuff[i].io);
            stuff[i].rt.push(stuff[i].bt2);
            stuff[i].point = 0;

        }
        prior();
        for (i = 0; i < stuff.length; i++) {
            stuff[i].finish = 0;
            stuff[i].check = 0;
            stuff[i].rt = [];
            stuff[i].rt.push(stuff[i].bt1);
            stuff[i].rt.push(stuff[i].io);
            stuff[i].rt.push(stuff[i].bt2);
            stuff[i].point = 0;

        }
        priornonpre();
        for (i = 0; i < stuff.length; i++) {
            stuff[i].finish = 0;
            stuff[i].check = 0;
            stuff[i].rt = [];
            stuff[i].rt.push(stuff[i].bt1);
            stuff[i].rt.push(stuff[i].io);
            stuff[i].rt.push(stuff[i].bt2);
            stuff[i].point = 0;

        }
        ljf();
        for (i = 0; i < stuff.length; i++) {
            stuff[i].finish = 0;
            stuff[i].check = 0;
            stuff[i].rt = [];
            stuff[i].rt.push(stuff[i].bt1);
            stuff[i].rt.push(stuff[i].io);
            stuff[i].rt.push(stuff[i].bt2);
            stuff[i].point = 0;

        }
        lrtf();
        for (i = 0; i < stuff.length; i++) {
            stuff[i].finish = 0;
            stuff[i].check = 0;
            stuff[i].rt = [];
            stuff[i].rt.push(stuff[i].bt1);
            stuff[i].rt.push(stuff[i].io);
            stuff[i].rt.push(stuff[i].bt2);
            stuff[i].point = 0;

        }
        drawChart();

    })
    var Q = [];
    function drawChart() {
        var myChart = new Chart(document.getElementById("bar-chart"), {
            type: 'bar',
            data: {
                labels: ["FCFS", "SJF", "SRTF", "Priority Preemptive", "Priority Nonpreemptive", "Longest Job First", "Largest Remaining Time First"],
                datasets: [
                    {
                        label: "Average Waiting Time",
                        backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#ff6666", "#ffc34d"],
                        data: [average_wt_fcfs, average_wt_sjf, average_wt_srtf, average_wt_priority, average_wt_prnonpre, average_wt_ljf, average_wt_lrtf]
                    }
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Average waiting Times'
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
    }
    Q = [];
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
        var sum_at = 0;
        for (i = 0; i < n; i++)
            sum_at += stuff[i].wt;
        average_wt_fcfs = sum_at / n;
    }
    function Enqueue(i) {
        Q.push(i);
    }
    function Dequeue(i) {
        return Q.shift();
    }
    function sjf() {
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
        var time = 0;
        var complete = 0;
        var temp = -1000;
        var st_time;
        sequence = [];
        var minus;
        while (complete != n) {
            var min = 1000;
            var minindex = 100;
            for (i = 0; i < n; i++) {
                if (stuff[i].at <= time && stuff[i].finish == 0 && (stuff[i].point == 0 || stuff[i].point == 2) && stuff[i].check == 0 && stuff[i].rt[stuff[i].point] < min) {
                    min = stuff[i].rt[stuff[i].point];
                    minindex = i;
                }
            }
            if (minindex < stuff.length) {
                if (temp != minindex) {
                    st_time = time;
                }
                minus = stuff[minindex].rt[stuff[minindex].point];
                stuff[minindex].rt[stuff[minindex].point] = 0;
                time = time + minus;
                if (temp != minindex) {
                    sequence.push({ start: st_time, n: stuff[minindex].no });
                }
                for (i = 0; i < stuff.length; i++) {
                    if (stuff[i].check == 1) {
                        stuff[i].rt[stuff[i].point] -= minus;
                        if (stuff[i].rt[stuff[i].point] <= 0) {
                            stuff[i].check = 0;
                            stuff[i].point++;
                        }
                    }
                }
                if (stuff[minindex].rt[stuff[minindex].point] == 0) {
                    if (stuff[minindex].point == 0) {
                        stuff[minindex].check = 1;
                        stuff[minindex].point = 1;
                        if (stuff[minindex].rt[1] == 0 && stuff[minindex].rt[2] == 0) {
                            stuff[minindex].finish = 1;
                            complete++;
                            stuff[minindex].tat = time - stuff[minindex].at;
                            stuff[minindex].wt = stuff[minindex].tat - stuff[minindex].bt1 - stuff[minindex].bt2;
                        }
                    }
                    if (stuff[minindex].point == 2) {
                        complete = complete + 1;
                        stuff[minindex].tat = time - stuff[minindex].at;
                        stuff[minindex].wt = stuff[minindex].tat - stuff[minindex].bt1 - stuff[minindex].bt2;
                        stuff[minindex].finish = 1;
                    }
                }
                temp = minindex;
            }
            if (min == 1000 && minindex == 100) {
                var temp1 = null;
                if (temp != temp1)
                    st_time = time;
                time = time + 1;
                if (temp != temp1) {
                    sequence.push({ start: st_time, n: null });
                }
                for (i = 0; i < stuff.length; i++) {
                    if (stuff[i].check == 1) {
                        stuff[i].rt[stuff[i].point]--;
                        if (stuff[i].rt[stuff[i].point] == 0) {
                            stuff[i].check = 0;
                            stuff[i].point = 2;
                        }
                    }
                }
                temp = null;
            }
        }
        var sum_at = 0;
        for (i = 0; i < n; i++)
            sum_at += stuff[i].wt;
        average_wt_sjf = sum_at / n;
        var pixel = 0;
    }
    function srtf() {
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
        var time = 0;
        var complete = 0;
        var temp = -1000;
        var st_time;
        sequence = [];
        while (complete != n) {
            var min = 1000;
            var minindex = 100;
            for (i = 0; i < n; i++) {
                if (stuff[i].at <= time && stuff[i].finish == 0 && (stuff[i].point == 0 || stuff[i].point == 2) && stuff[i].check == 0 && stuff[i].rt[stuff[i].point] < min) {
                    min = stuff[i].rt[stuff[i].point];
                    minindex = i;
                }
            }
            if (minindex < stuff.length) {
                if (temp != minindex) {
                    st_time = time;
                }
                stuff[minindex].rt[stuff[minindex].point] = stuff[minindex].rt[stuff[minindex].point] - 1;
                time = time + 1;
                if (temp != minindex) {
                    sequence.push({ start: st_time, n: stuff[minindex].no });
                }
                for (i = 0; i < stuff.length; i++) {
                    if (stuff[i].check == 1) {
                        stuff[i].rt[stuff[i].point]--;
                        if (stuff[i].rt[stuff[i].point] == 0) {
                            stuff[i].check = 0;
                            stuff[i].point++;
                        }
                    }
                }
                if (stuff[minindex].rt[stuff[minindex].point] == 0) {
                    if (stuff[minindex].point == 0) {
                        if (stuff[minindex].rt[1] == 0 && stuff[minindex].rt[2] == 0) {
                            complete++;
                            stuff[minindex].finish = 1;
                            stuff[minindex].tat = time - stuff[minindex].at;
                            stuff[minindex].wt = stuff[minindex].tat - stuff[minindex].bt1 - stuff[minindex].bt2;
                        }
                        stuff[minindex].check = 1;
                        stuff[minindex].point = 1;
                    }
                    if (stuff[minindex].point == 2) {
                        complete = complete + 1;
                        stuff[minindex].tat = time - stuff[minindex].at;
                        stuff[minindex].wt = stuff[minindex].tat - stuff[minindex].bt1 - stuff[minindex].bt2;
                        stuff[minindex].finish = 1;
                    }
                }
                temp = minindex;
            }
            if (min == 1000 && minindex == 100) {
                var temp1 = null;
                if (temp != temp1)
                    st_time = time;
                time = time + 1;
                if (temp != temp1) {
                    sequence.push({ start: st_time, n: null });
                }
                for (i = 0; i < stuff.length; i++) {
                    if (stuff[i].check == 1) {
                        stuff[i].rt[stuff[i].point]--;
                        if (stuff[i].rt[stuff[i].point] == 0) {
                            stuff[i].check = 0;
                            stuff[i].point = 2;
                        }
                    }
                }
                temp = null;
            }
        }
        var sum_at = 0;
        for (i = 0; i < n; i++)
            sum_at += stuff[i].wt;
        average_wt_srtf = sum_at / n;
        var pixel = 0;
    }
    function ljf() {
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
        var time = 0;
        var complete = 0;
        var temp = -1000;
        var st_time;
        sequence = [];
        var minus;
        while (complete != n) {
            var min = 0;
            var minindex = 100;
            for (i = 0; i < n; i++) {
                if (stuff[i].at <= time && stuff[i].finish == 0 && (stuff[i].point == 0 || stuff[i].point == 2) && stuff[i].check == 0 && stuff[i].rt[stuff[i].point] > min) {
                    min = stuff[i].rt[stuff[i].point];
                    minindex = i;
                }
            }
            if (minindex < stuff.length) {
                if (temp != minindex) {
                    st_time = time;
                }
                minus = stuff[minindex].rt[stuff[minindex].point];
                stuff[minindex].rt[stuff[minindex].point] = 0;
                time = time + minus;
                if (temp != minindex) {
                    sequence.push({ start: st_time, n: stuff[minindex].no });
                }
                for (i = 0; i < stuff.length; i++) {
                    if (stuff[i].check == 1) {
                        stuff[i].rt[stuff[i].point] -= minus;
                        if (stuff[i].rt[stuff[i].point] <= 0) {
                            stuff[i].check = 0;
                            stuff[i].point++;
                        }
                    }
                }
                if (stuff[minindex].rt[stuff[minindex].point] == 0) {
                    if (stuff[minindex].point == 0) {
                        if (stuff[minindex].rt[1] == 0 && stuff[minindex].rt[2] == 0) {
                            complete++;
                            stuff[minindex].finish = 1;
                            stuff[minindex].tat = time - stuff[minindex].at;
                            stuff[minindex].wt = stuff[minindex].tat - stuff[minindex].bt1 - stuff[minindex].bt2;
                        }
                        stuff[minindex].check = 1;
                        stuff[minindex].point = 1;
                    }
                    if (stuff[minindex].point == 2) {
                        complete = complete + 1;
                        stuff[minindex].tat = time - stuff[minindex].at;
                        stuff[minindex].wt = stuff[minindex].tat - stuff[minindex].bt1 - stuff[minindex].bt2;
                        stuff[minindex].finish = 1;
                    }
                }
                temp = minindex;
            }
            if (min == 0 && minindex == 100) {
                var temp1 = null;
                if (temp != temp1)
                    st_time = time;
                time = time + 1;
                if (temp != temp1) {
                    sequence.push({ start: st_time, n: null });
                }
                for (i = 0; i < stuff.length; i++) {
                    if (stuff[i].check == 1) {
                        stuff[i].rt[stuff[i].point]--;
                        if (stuff[i].rt[stuff[i].point] == 0) {
                            stuff[i].check = 0;
                            stuff[i].point = 2;
                        }
                    }
                }
                temp = null;
            }
        }
        var sum_at = 0;
        for (i = 0; i < n; i++)
            sum_at += stuff[i].wt;
        average_wt_ljf = sum_at / n;
        var pixel = 0;
    }
    function lrtf() {
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
        var time = 0;
        var complete = 0;
        var temp = -1000;
        var st_time;
        sequence = [];
        while (complete != n) {
            var min = 0;
            var minindex = 100;
            for (i = 0; i < n; i++) {
                if (stuff[i].at <= time && stuff[i].finish == 0 && (stuff[i].point == 0 || stuff[i].point == 2) && stuff[i].check == 0 && stuff[i].rt[stuff[i].point] > min) {
                    min = stuff[i].rt[stuff[i].point];
                    minindex = i;
                }
            }
            if (minindex < stuff.length) {
                if (temp != minindex) {
                    st_time = time;
                }
                stuff[minindex].rt[stuff[minindex].point] = stuff[minindex].rt[stuff[minindex].point] - 1;
                time = time + 1;
                if (temp != minindex) {
                    sequence.push({ start: st_time, n: stuff[minindex].no });
                }
                for (i = 0; i < stuff.length; i++) {
                    if (stuff[i].check == 1) {
                        stuff[i].rt[stuff[i].point]--;
                        if (stuff[i].rt[stuff[i].point] == 0) {
                            stuff[i].check = 0;
                            stuff[i].point++;
                        }
                    }
                }
                if (stuff[minindex].rt[stuff[minindex].point] == 0) {
                    if (stuff[minindex].point == 0) {
                        if (stuff[minindex].rt[1] == 0 && stuff[minindex].rt[2] == 0) {
                            complete++;
                            stuff[minindex].finish = 1;
                            stuff[minindex].tat = time - stuff[minindex].at;
                            stuff[minindex].wt = stuff[minindex].tat - stuff[minindex].bt1 - stuff[minindex].bt2;
                        }
                        stuff[minindex].check = 1;
                        stuff[minindex].point = 1;
                    }
                    if (stuff[minindex].point == 2) {
                        complete = complete + 1;
                        stuff[minindex].tat = time - stuff[minindex].at;
                        stuff[minindex].wt = stuff[minindex].tat - stuff[minindex].bt1 - stuff[minindex].bt2;
                        stuff[minindex].finish = 1;
                    }
                }
                temp = minindex;
            }
            if (min == 0 && minindex == 100) {
                var temp1 = null;
                if (temp != temp1)
                    st_time = time;
                time = time + 1;
                if (temp != temp1) {
                    sequence.push({ start: st_time, n: null });
                }
                for (i = 0; i < stuff.length; i++) {
                    if (stuff[i].check == 1) {
                        stuff[i].rt[stuff[i].point]--;
                        if (stuff[i].rt[stuff[i].point] == 0) {
                            stuff[i].check = 0;
                            stuff[i].point = 2;
                        }
                    }
                }
                temp = null;
            }
        }
        var sum_at = 0;
        for (i = 0; i < n; i++)
            sum_at += stuff[i].wt;
        average_wt_lrtf = sum_at / n;
        var pixel = 0;
    }
    function prior() {
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
        var time = 0;
        var complete = 0;
        var temp = -1000;
        var st_time;
        sequence = [];
        while (complete != n) {
            var min = 1000;
            var minindex = 100;
            for (i = 0; i < n; i++) {
                if (stuff[i].at <= time && stuff[i].finish == 0 && (stuff[i].point == 0 || stuff[i].point == 2) && stuff[i].check == 0 && stuff[i].p < min) {
                    min = stuff[i].p;
                    minindex = i;
                }
            }
            if (minindex < stuff.length) {
                if (temp != minindex) {
                    st_time = time;
                }
                stuff[minindex].rt[stuff[minindex].point] = stuff[minindex].rt[stuff[minindex].point] - 1;
                time = time + 1;
                if (temp != minindex) {
                    sequence.push({ start: st_time, n: stuff[minindex].no });
                }
                for (i = 0; i < stuff.length; i++) {
                    if (stuff[i].check == 1) {
                        stuff[i].rt[stuff[i].point]--;
                        if (stuff[i].rt[stuff[i].point] == 0) {
                            stuff[i].check = 0;
                            stuff[i].point++;
                        }
                    }
                }
                if (stuff[minindex].rt[stuff[minindex].point] == 0) {
                    if (stuff[minindex].point == 0) {
                        if (stuff[minindex].rt[1] == 0 && stuff[minindex].rt[2] == 0) {
                            complete++;
                            stuff[minindex].finish = 1;
                            stuff[minindex].tat = time - stuff[minindex].at;
                            stuff[minindex].wt = stuff[minindex].tat - stuff[minindex].bt1 - stuff[minindex].bt2;
                        }
                        stuff[minindex].check = 1;
                        stuff[minindex].point = 1;
                    }
                    if (stuff[minindex].point == 2) {
                        complete = complete + 1;
                        stuff[minindex].tat = time - stuff[minindex].at;
                        stuff[minindex].wt = stuff[minindex].tat - stuff[minindex].bt1 - stuff[minindex].bt2;
                        stuff[minindex].finish = 1;
                    }
                }
                temp = minindex;
            }
            if (min == 1000 && minindex == 100) {
                var temp1 = null;
                if (temp != temp1)
                    st_time = time;
                time = time + 1;
                if (temp != temp1) {
                    sequence.push({ start: st_time, n: null });
                }
                for (i = 0; i < stuff.length; i++) {
                    if (stuff[i].check == 1) {
                        stuff[i].rt[stuff[i].point]--;
                        if (stuff[i].rt[stuff[i].point] == 0) {
                            stuff[i].check = 0;
                            stuff[i].point = 2;
                        }
                    }
                }
                temp = null;
            }
        }
        var sum_at = 0;
        for (i = 0; i < n; i++)
            sum_at += stuff[i].wt;
        average_wt_priority = sum_at / n;

        var pixel = 0;
    }
    function priornonpre() {
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
        var time = 0;
        var complete = 0;
        var temp = -1000;
        var st_time;
        sequence = [];
        while (complete != n) {
            var min = 1000;
            var minindex = 100;
            for (i = 0; i < n; i++) {
                if (stuff[i].at <= time && stuff[i].finish == 0 && (stuff[i].point == 0 || stuff[i].point == 2) && stuff[i].check == 0 && stuff[i].p < min) {
                    min = stuff[i].p;
                    minindex = i;
                }
            }
            if (minindex < stuff.length) {
                if (temp != minindex) {
                    st_time = time;
                }
                var minus = stuff[minindex].rt[stuff[minindex].point];
                time = time + stuff[minindex].rt[stuff[minindex].point];
                stuff[minindex].rt[stuff[minindex].point] = 0;

                if (temp != minindex) {
                    sequence.push({ start: st_time, n: stuff[minindex].no });
                }
                for (i = 0; i < stuff.length; i++) {
                    if (stuff[i].check == 1) {
                        stuff[i].rt[stuff[i].point] -= minus;
                        if (stuff[i].rt[stuff[i].point] <= 0) {
                            stuff[i].check = 0;
                            stuff[i].point++;
                        }
                    }
                }
                if (stuff[minindex].rt[stuff[minindex].point] == 0) {
                    if (stuff[minindex].point == 0) {
                        if (stuff[minindex].rt[1] == 0 && stuff[minindex].rt[2] == 0) {
                            complete++;
                            stuff[minindex].finish = 1;
                            stuff[minindex].tat = time - stuff[minindex].at;
                            stuff[minindex].wt = stuff[minindex].tat - stuff[minindex].bt1 - stuff[minindex].bt2;
                        }
                        stuff[minindex].check = 1;
                        stuff[minindex].point = 1;
                    }
                    if (stuff[minindex].point == 2) {
                        complete = complete + 1;
                        stuff[minindex].tat = time - stuff[minindex].at;
                        stuff[minindex].wt = stuff[minindex].tat - stuff[minindex].bt1 - stuff[minindex].bt2;
                        stuff[minindex].finish = 1;
                    }
                }
                temp = minindex;
            }
            if (min == 1000 && minindex == 100) {
                var temp1 = null;
                if (temp != temp1)
                    st_time = time;
                time = time + 1;
                if (temp != temp1) {
                    sequence.push({ start: st_time, n: null });
                }
                for (i = 0; i < stuff.length; i++) {
                    if (stuff[i].check == 1) {
                        stuff[i].rt[stuff[i].point]--;
                        if (stuff[i].rt[stuff[i].point] == 0) {
                            stuff[i].check = 0;
                            stuff[i].point = 2;
                        }
                    }
                }
                temp = null;
            }
        }
        var sum_at = 0;
        for (i = 0; i < n; i++)
            sum_at += stuff[i].wt;
        average_wt_prnonpre = sum_at / n;

        var pixel = 0;
    }
    var Q1 = [];
    Q = [];

    function rr() {
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
        var time = 0;
        var complete = 0;
        var temp = null;
        var st_time;
        var first;
        sequence = [];
        var i;
        if (stuff[0].at > 0) {
            sequence.push({ start: time, n: null });
            time += stuff[0].at;
        }
        Enqueue(0);
        while (complete != n) {
            if (Q.length > 0)
                var index = Dequeue();
            else if (Q.length == 0) {
                index = null;
                if (temp != index)
                    sequence.push({ start: time, n: null });
                time++;
                for (j = 0; j < n; j++) {
                    if (stuff[j].at <= time && stuff[j].check == 1) {
                        stuff[j].rt[1]--;
                        if (stuff[j].rt[1] == 0) {
                            stuff[j].check = 0;
                            stuff[j].point++;
                        }
                    }
                    if (stuff[j].at <= time && stuff[j].finish == 0 && stuff[j].check == 0 && Q.indexOf(j) == -1) {
                        Enqueue(j);
                    }

                }
                temp = null;
            }
            if (index != null && stuff[index].rt[stuff[index].point] <= tq && stuff[index].finish == 0 && stuff[index].check != 1) {
                if (stuff[index].point == 0) {
                    var r = stuff[index].rt[stuff[index].point];
                    stuff[index].rt[stuff[index].point] = 0;
                    stuff[index].check = 1;
                    stuff[index].point++;
                    sequence.push({ start: time, n: proc[index] });
                    time += r;
                    if (stuff[index].rt[1] == 0 && stuff[index].rt[2] == 0) {
                        complete++;
                        stuff[index].finish = 1;
                        stuff[index].tat = time - stuff[index].at;
                        stuff[index].wt = stuff[index].tat - stuff[index].bt1 - stuff[index].bt2;
                    }
                    for (j = 0; j < n; j++) {
                        if (stuff[j].at <= time && stuff[j].check == 1) {
                            stuff[j].rt[1] -= r;
                            if (stuff[j].rt[1] <= 0) {
                                stuff[j].check = 0;
                                stuff[j].point++;
                            }
                        }
                        if (stuff[j].at <= time && stuff[j].finish == 0 && stuff[j].check == 0 && Q.indexOf(j) == -1) {
                            Enqueue(j);
                        }

                    }
                }
                else if (stuff[index].point == 2) {
                    complete++;
                    stuff[index].finish = 1;
                    sequence.push({ start: time, n: proc[index] });
                    time += stuff[index].rt[stuff[index].point];
                    stuff[index].tat = time - stuff[index].at;
                    stuff[index].wt = stuff[index].tat - stuff[index].bt1 - stuff[index].bt2;
                    for (j = 0; j < n; j++) {
                        if (stuff[j].at <= time && stuff[j].check == 1) {
                            stuff[j].rt[1] -= stuff[index].rt[stuff[index].point];
                            if (stuff[j].rt[1] <= 0) {
                                stuff[j].check = 0;
                                stuff[j].point++;
                            }
                        }
                        if (stuff[j].at <= time && stuff[j].finish == 0 && stuff[j].check == 0 && Q.indexOf(j) == -1) {
                            Enqueue(j);
                        }

                    }
                }
                temp = index;
            }
            else if (index != null && stuff[index].rt[stuff[index].point] > tq && stuff[index].finish == 0 && stuff[index].check != 1) {
                stuff[index].rt[stuff[index].point] -= tq;
                sequence.push({ start: time, n: proc[index] });
                time += tq;
                temp = index;
                for (j = 0; j < n; j++) {
                    if (stuff[j].at <= time && stuff[j].check == 1) {
                        stuff[j].rt[1] - tq;
                        if (stuff[j].rt[1] <= 0) {
                            stuff[j].check = 0;
                            stuff[j].point++;
                        }
                    }
                }
                for (j = 0; j < n; j++) {
                    if (stuff[j].at <= time && stuff[j].finish == 0 && stuff[j].check == 0 && j != index && Q.indexOf(j) == -1) {
                        Enqueue(j);
                    }
                }
                Enqueue(index);

            }
        }
        var sum_wt = 0;
        var sum_null = 0;
        for (i = 0; i < n; i++)
            sum_wt += stuff[i].wt;
        average_wt_rr = sum_wt / n;
        var pixel = 0;
        throughput = n / time;
        for (i = 0; i < sequence.length; i++) {
            if (sequence[i].n == null) {
                sum_null += sequence[i + 1].start - sequence[i].start;
            }
        }
        cpu_efficiency = ((time - sum_null) / time) * 100;
    }

    function displayBlock(i) {
        if (i == total) {
            drawTable(0);
            return;
        }

        var blockWidth = (sequence[i + 1].start - sequence[i].start) * pixel;
        var processName = sequence[i].n;
        $('#gantt-chart').append('<div class="block" id="process-' + sequence[i].start + '">P-' + sequence[i].n + '<div class="bottom">' + sequence[i + 1].start + '</div></div>');
        $('#process-' + sequence[i].start).css('width', blockWidth);
        $('#process-' + sequence[i].start).fadeIn('slow', function () {
            displayBlock(i + 1);
        });
    }
});