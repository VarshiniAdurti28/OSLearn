function BuildFormFields(n) {
    const container = document.getElementById("FormFields");
    container.innerHTML = "";
    for (let i = 0; i < n; i++) {
        container.innerHTML += `<label>Resource ${i}</label><input type="number" class="form-control" id="res${i}" /><br/>`;
    }
}

function BuildFormFields2(p) {
    const r = document.querySelectorAll("#FormFields input").length;
    const needContainer = document.getElementById("FormFields1");
    const allocContainer = document.getElementById("FormFields2");
    needContainer.innerHTML = "";
    allocContainer.innerHTML = "";

    for (let i = 0; i < p; i++) {
        needContainer.innerHTML += `<strong>Process ${i}</strong><br/>`;
        allocContainer.innerHTML += `<strong>Process ${i}</strong><br/>`;

        for (let j = 0; j < r; j++) {
            needContainer.innerHTML += `Resource ${j}: <input type="number" id="need_${i}_${j}" /><br/>`;
            allocContainer.innerHTML += `Resource ${j}: <input type="number" id="alloc_${i}_${j}" /><br/>`;
        }
    }
}

function banker() {
    const r = document.querySelectorAll("#FormFields input").length;
    const p = document.querySelectorAll("#FormFields1 input").length / r;

    const available = [];
    for (let i = 0; i < r; i++) {
        available.push(parseInt(document.getElementById(`res${i}`).value, 10));
    }

    const need = Array.from({ length: p }, () => Array(r).fill(0));
    const alloc = Array.from({ length: p }, () => Array(r).fill(0));
    const max = Array.from({ length: p }, () => Array(r).fill(0));

    for (let i = 0; i < p; i++) {
        for (let j = 0; j < r; j++) {
            const needVal = parseInt(document.getElementById(`need_${i}_${j}`).value, 10);
            const allocVal = parseInt(document.getElementById(`alloc_${i}_${j}`).value, 10);
            need[i][j] = needVal;
            alloc[i][j] = allocVal;
            max[i][j] = needVal + allocVal;
        }
    }

    // Update Need Matrix Table
    let needHTML = "<tr><th>Process</th>";
    for (let j = 0; j < r; j++) {
        needHTML += `<th>R${j}</th>`;
    }
    needHTML += "</tr>";
    for (let i = 0; i < p; i++) {
        needHTML += `<tr><td>P${i}</td>`;
        for (let j = 0; j < r; j++) {
            needHTML += `<td>${need[i][j]}</td>`;
        }
        needHTML += "</tr>";
    }
    document.getElementById("tab_need").innerHTML = needHTML;

    // Update Allocation Matrix Table
    let allocHTML = "<tr><th>Process</th>";
    for (let j = 0; j < r; j++) {
        allocHTML += `<th>R${j}</th>`;
    }
    allocHTML += "</tr>";
    for (let i = 0; i < p; i++) {
        allocHTML += `<tr><td>P${i}</td>`;
        for (let j = 0; j < r; j++) {
            allocHTML += `<td>${alloc[i][j]}</td>`;
        }
        allocHTML += "</tr>";
    }
    document.getElementById("tab_alloc").innerHTML = allocHTML;

    // Safety Algorithm
    const finish = Array(p).fill(false);
    const work = [...available];
    const safeSequence = [];

    let madeProgress;
    do {
        madeProgress = false;
        for (let i = 0; i < p; i++) {
            if (!finish[i]) {
                let canProceed = true;
                for (let j = 0; j < r; j++) {
                    if (need[i][j] > work[j]) {
                        canProceed = false;
                        break;
                    }
                }
                if (canProceed) {
                    for (let j = 0; j < r; j++) {
                        work[j] += alloc[i][j];
                    }
                    finish[i] = true;
                    safeSequence.push(`P${i}`);
                    madeProgress = true;
                }
            }
        }
    } while (madeProgress);

    const isSafe = finish.every(f => f === true);
    let resultText = isSafe
        ? `<p>System is in a <strong>SAFE</strong> state.</p><p>Safe sequence: ${safeSequence.join(" → ")}</p>`
        : `<p style="color: red;">System is <strong>NOT SAFE</strong>. Deadlock may occur.</p>`;

    showResults(resultText, isSafe);
}
