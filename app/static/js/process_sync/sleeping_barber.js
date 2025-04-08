var queue = [0, 0, 0, 0, 0]; var num = 0;
var rear = -1;
var hc = 0;

$(document).ready(function () {
  function counter() {
      var counter = rear + 1;
      console.log(rear)
      if (rear == -1) {
          var change = document.getElementById("count");
          change.innerHTML = "Waiting = 0"
      }
      else if (counter == 1) {
          var change = document.getElementById("count");
          change.innerHTML = "Waiting = 1"
      }
      if (counter == 2) {
          var change = document.getElementById("count");
          change.innerHTML = "Waiting = 2"
      }
      if (counter == 3) {
          var change = document.getElementById("count");
          change.innerHTML = "Waiting = 3"
      }
      if (counter == 4) {
          var change = document.getElementById("count");
          change.innerHTML = "Waiting = 4"
      }
      if (counter == 5) {
          var change = document.getElementById("count");
          change.innerHTML = "Waiting = 5"
      }
  }
  
  function check() {
      if (hc == 1) {
          document.getElementById("con").disabled = false;
      }
      if (num < 4) {
          document.getElementById("prod").disabled = false;
      }
  }
  
  function color() {
      if (hc == 1) {
          document.getElementById("cust").style.visibility = 'visible';
          document.getElementById("barber").style.visibility = 'visible';
          document.getElementById("bed").style.visibility = 'hidden';
          document.getElementById("Sleep").style.visibility = 'hidden';
      }
      if (hc == 0) {
          document.getElementById("cust").style.visibility = 'hidden';
          document.getElementById("barber").style.visibility = 'hidden';
          document.getElementById("bed").style.visibility = 'visible';
          document.getElementById("Sleep").style.visibility = 'visible';
      }
    
      if (queue[0] == 1) {
          console.log("hurray")
          document.getElementById("one").style.visibility = 'visible';
      }
      if (queue[1] == 1) {
          document.getElementById("two").style.visibility = 'visible';
      }
      if (queue[2] == 1) {
          document.getElementById("three").style.visibility = 'visible';
      }
      if (queue[3] == 1) {
          document.getElementById("four").style.visibility = 'visible';
      }
      if (queue[4] == 1) {
          document.getElementById("five").style.visibility = 'visible';
      }
  
      if (queue[0] == 0) {
          document.getElementById("one").style.visibility = 'hidden';
      }
      if (queue[1] == 0) {
          document.getElementById("two").style.visibility = 'hidden';
      }
      if (queue[2] == 0) {
          document.getElementById("three").style.visibility = 'hidden';
      }
      if (queue[3] == 0) {
          document.getElementById("four").style.visibility = 'hidden';
      }
      if (queue[4] == 0) {
          document.getElementById("five").style.visibility = 'hidden';
      }
      check();
  }
  
  $('#prod').click(function produce() {
      num++;
      if (num == 5) {
          document.getElementById("prod").disabled = true;
      }
      if (rear == -1) {
  
          rear = 0;
          queue[rear] = 1;
      }
      else {
          rear = (rear + 1) % 5;
          queue[rear] = 1;
      }
  
      if (hc == 0) {
          hc = 1;
          consume();
      }
      color();
      counter();
  });
  
  function consume() {
      num--;
      if (num == 0 && hc == 0) {
          document.getElementById("con").disabled = true;
      }
      if (rear == 0) {
          queue[rear] = 0;
          rear = -1;
      }
      else {
          queue[rear] = 0;
          rear--;
      }
      color();
      counter();
  }
  
  $('#con').click(function exit() {
      if (hc == 1) {
          if (rear != -1) {
              consume();
          }
          else {
              hc = 0;
              color();
          }
          if (hc == 0) {
              document.getElementById("con").disabled = true;
          }
      }
  });
});