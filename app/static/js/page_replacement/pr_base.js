export function getReferenceString() {
    var in_arr = [];
    var refString = document.getElementById("rs").value;
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
        in_arr.push(num);
    })
    return in_arr;
}