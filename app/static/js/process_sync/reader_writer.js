var flag = 0, count = 99; k = 0;

$(document).ready(function () {
    $('#stop').hide();
    
    $('#reader1').hide();
    $('#reader2').hide();
    $('#reader3').hide();
    $('#reader4').hide();
    
    $('#writer').click(function writer() {
        flag = 0;
        count = 0;

        $('#reader1').hide();
        $('#reader2').hide();
        $('#reader3').hide();
        $('#reader4').hide();

        $('#stop').show();

        document.getElementById("textarea").disabled = false;
    });

    const reader = function reader() {
        document.getElementById("textarea").disabled = true;

        flag++;
        var n = flag % 5;

        if (count == 1) {
            document.getElementById('textarea').style.background = "#E0E0E0 ";
            if (n > 0) {
                $('#reader1').show();
            }
            if (n > 1) {
                $('#reader2').show();
            }
            if (n > 2) {
                $('#reader3').show();
            }
            if (n > 3) {
                $('#reader4').show();
            }
        }
        else if (count == 99)
            alert("Nothing to read! Click on writer to start writing");
        else {
            alert("Writer is still writing! Click on stop to stop writing");
            alert("Reader waiting for writer to finish!!");
        }
    }

    $('#reader').click(function() {
      reader();
    });

    $('#stop').click(function stop() {
        count = 1;
        $('#stop').hide();
        document.getElementById("textarea").disabled = true;
    });
});
