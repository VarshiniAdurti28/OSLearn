export function getReferenceString(head, max, min) {
    var in_arr = [];
    var refString = document.getElementById("reference-string").value;
    if (!refString.match('[0-9 ]+')) {
        alert("Enter a valid Reference String");
        return [];
    }
    refString = refString.trim()
    refString.split(" ").forEach((inp) => {
        if (isNaN(inp)){
            alert("Enter a valid Reference String");
            return [];
        }
        let num = Number(inp);
        if(num > max)
        {
            alert("input "+num+" is greater than the last cylinder");
            return [];
        }

        if(num < min)
        {
            alert("input "+num+" is smaller than the first cylinder");
            return [];
        }
        in_arr.push(num);
    })
    return in_arr;
}