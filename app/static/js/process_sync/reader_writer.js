var count = 99;
var num_readers = 0;
var readerQueue = [];
var serving = false;

$(document).ready(function () {
    count = 99;
    num_readers = 0;
    readerQueue = [];
    serving = false;
    $('#textarea').val('');
    $('#textarea').prop('disabled', true);
    $('#stop').hide();
    $('#reader1, #reader2, #reader3, #reader4').hide();

    const serve_readers = function () {
        if (serving || count !== 1 || readerQueue.length === 0) return;
        serving = true;

        const readerId = readerQueue.shift();
        $(`#reader${readerId}`).show();

        setTimeout(function () {
            $(`#reader${readerId}`).hide();
            num_readers--;

            serving = false;
            serve_readers();
        }, 3000);
    };

    const reader = function () {
        if (count === 1 && $('#textarea').val().trim() !== '') {
            if (num_readers >= 4) {
                alert("Max 4 readers allowed at a time. Please wait.");
                return;
            }

            num_readers++;
            readerQueue.push(num_readers);
            $(`#reader${num_readers}`).show();
            $('#textarea').prop('disabled', true);

            serve_readers(); 
        } else if (count === 0) {
            alert("Writer is still writing! Please wait.");
        } else {
            alert("Nothing to read! Click on writer to start writing.");
        }
    };

    $('#writer').click(function () {
        count = 0;
        $('#textarea').prop('disabled', false);
        $('#stop').show();

        serving = false;

        $('#reader1, #reader2, #reader3, #reader4').hide();
    });

    $('#stop').click(function () {
        count = 1;
        $('#stop').hide();
        $('#textarea').prop('disabled', true);

        serve_readers();
    });

    $('#reader').click(reader);
});
