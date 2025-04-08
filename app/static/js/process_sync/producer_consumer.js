var queue = [0, 0, 0, 0, 0]; var flag = 0;
var rear = -1; var front = -1;

function counter() {
    var counter = rear - front + 1;
    if (rear == -1) {
        var change = document.getElementById("count");
        change.innerHTML = "Counter = 0"
    }
    else if (counter == 1) {
        var change = document.getElementById("count");
        change.innerHTML = "Counter = 1"
    }
    if (counter == 2) {
        var change = document.getElementById("count");
        change.innerHTML = "Counter = 2"
    }
    if (counter == 3) {
        var change = document.getElementById("count");
        change.innerHTML = "Counter = 3"
    }
    if (counter == 4) {
        var change = document.getElementById("count");
        change.innerHTML = "Counter = 4"
    }
    if (counter == 5) {
        var change = document.getElementById("count");
        change.innerHTML = "Counter = 5"
    }
}

function check() {
    if (flag > 0) {
        document.getElementById("con").disabled = false;
    }
    if (flag < 4) {
        document.getElementById("prod1").disabled = false;
    }
}

function color() {
    if (queue[0] == 1) {
        document.getElementById("one").style.backgroundColor = '#00BFFF';
    }
    if (queue[1] == 1) {
        document.getElementById("two").style.backgroundColor = '#00BFFF';
    }
    if (queue[2] == 1) {
        document.getElementById("three").style.backgroundColor = '#00BFFF';
    }
    if (queue[3] == 1) {
        document.getElementById("four").style.backgroundColor = '#00BFFF';
    }
    if (queue[4] == 1) {
        document.getElementById("five").style.backgroundColor = '#00BFFF';
    }

    if (queue[0] == 0) {
        document.getElementById("one").style.backgroundColor = '#FFFFFF';
    }
    if (queue[1] == 0) {
        document.getElementById("two").style.backgroundColor = '#FFFFFF';
    }
    if (queue[2] == 0) {
        document.getElementById("three").style.backgroundColor = '#FFFFFF';
    }
    if (queue[3] == 0) {
        document.getElementById("four").style.backgroundColor = '#FFFFFF';
    }
    if (queue[4] == 0) {
        document.getElementById("five").style.backgroundColor = '#FFFFFF';
    }
    check();
}


function produce() {
    flag++;
    if (flag == 5) {
        document.getElementById("prod1").disabled = true;
    }
    if (front == -1 && rear == -1) {
        front = 0;
        rear = 0;
        queue[rear] = 1;
    }
    else {
        rear = (rear + 1) % 5;
        queue[rear] = 1;
    }
    color();
    counter();
}


function consume() {
    flag--;
    if (flag == 0) {
        document.getElementById("con").disabled = true;
    }
    if (front == rear) {
        queue[front] = 0;
        front = -1;
        rear = -1;
    }
    else {
        queue[front] = 0;
        front = (front + 1) % 5;
    }
    color();
    counter();
}

$(document).ready(function () {
    $('#prod').click(function barrieradd() {
      var n = Math.random();
      num = Math.floor(n * 2);
      if (flag == 0 && num == 1) {
          document.getElementById("num").innerHTML = "No item to consume";
      }
      else if (flag == 5 && num == 0) {
          document.getElementById("num").innerHTML = "Buffer is full";
      }
      else if (num == 0) {
          document.getElementById("prod1").style.backgroundColor = 'green';
          document.getElementById("con").style.backgroundColor = 'red';
          document.getElementById("num").innerHTML = "Producer";
          produce();
      }
      else {
          document.getElementById("con").style.backgroundColor = 'green';
          document.getElementById("prod1").style.backgroundColor = 'red';
          document.getElementById("num").innerHTML = "Consumer";
          consume();
      }
    });
});