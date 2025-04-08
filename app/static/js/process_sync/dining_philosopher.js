var phils = [0, 0, 0, 0, 0], forks = [0, 0, 0, 0, 0];

const YES = 'Yes';
const BLANK = '-';

$(document).ready(function () {
    $('#next').click(function initiate() {
        const n = Math.floor(Math.random() * 5);
        const change = document.getElementById("num");
        change.innerHTML = `Philosopher: ${n}`;
        if (phils[n] == 0) {
            phils[n] = 1;
            for(let i = 0; i < 5; i++) {
                if (n == i) {
                    const change2 = document.getElementById(`t${i + 1}2`);
                    change2.innerHTML = YES;
                    const change1 = document.getElementById(`t${i + 1}1`);
                    change1.innerHTML = BLANK;
                    const change3 = document.getElementById(`t${i + 1}3`);
                    change3.innerHTML = BLANK;
                }
            }
        }
        else if (phils[n] == 1) {
            if (forks[n] == 0 && forks[(n + 1) % 5] == 0) {
                phils[n] = 2;
                forks[n] = 1;
                forks[(n + 1) % 5] = 1;
                for(let i = 0; i < 5; i++) {
                    if (n == i) {
                        document.getElementById(`bowl${i + 1}`).style.visibility = 'visible';
                        const change2 = document.getElementById(`t${i + 1}2`);
                        change2.innerHTML = BLANK;
                        const change1 = document.getElementById(`t${i + 1}1`);
                        change1.innerHTML = BLANK;
                        const change3 = document.getElementById(`t${i + 1}3`);
                        change3.innerHTML = YES;
                    }
                }
            }
        }
        else if (phils[n] == 2) {
            phils[n] = 0;
            forks[n] = 0;
            forks[(n + 1) % 5] = 0;
            for(let i = 0; i < 5; i++) {
                if (n == i) {
                    document.getElementById(`bowl${i + 1}`).style.visibility = 'hidden';
                    const change2 = document.getElementById(`t${i + 1}2`);
                    change2.innerHTML = BLANK;
                    const change1 = document.getElementById(`t${i + 1}1`);
                    change1.innerHTML = YES;
                    const change3 = document.getElementById(`t${i + 1}3`);
                    change3.innerHTML = BLANK;
                }
            }
        }

        const numToText = {
            0: 'one',
            1: 'two',
            2: 'three',
            3: 'four',
            4: 'five'
        };

        for(let p = 0; p < 5; p++) {
            if(phils[p] == 0) {
                document.getElementById(numToText[p]).style.backgroundColor = '#DCDCDC';
            }
            else if(phils[p] == 1) {
                document.getElementById(numToText[p]).style.backgroundColor = '#FFFF00';
            }
            else if(phils[p] == 2) {
                document.getElementById(numToText[p]).style.backgroundColor = '#FF0000';
            }
        }

        const numToPos = {
            0: 'first',
            1: 'second',
            2: 'third',
            3: 'fourth',
            4: 'fifth'
        }

        for(let f = 0; f < 5; f++) {
            if(forks[f] == 0) {
                document.getElementById(numToPos[f]).style.backgroundColor = '#DCDCDC';
            }
            else if(forks[f] == 1) {
                document.getElementById(numToPos[f]).style.backgroundColor = '#FF0000';
            }
        }
    });
});