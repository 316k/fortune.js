var fortune = new Fortune();
$(function() {
    var files = $.parseJSON(localStorage.getItem('fortunes')) || ['fortunes/linux'];
    setTimeout(function() {
        $('#files select').val(files);
        setTimeout(refresh_fortunes, 100);
    }, 100);
    refresh_lights();
    refresh_wrap();
    fill_files();

    $('#toggle-lights').click(function() {
        var backgroundColor = (localStorage.getItem('backgroundColor') || 'white') == 'white' ? 'black' : 'white';
        var color = (localStorage.getItem('color') || 'black') == 'black' ? 'lightgreen' : 'black';
        localStorage.setItem('backgroundColor', backgroundColor);
        localStorage.setItem('color', color);
        refresh_lights();
    });

    $('#toggle-wrap').click(function() {
        var wrap = (localStorage.getItem('wrap') || 'pre') == 'pre' ? 'pre-wrap' : 'pre';
        localStorage.setItem('wrap', wrap);
        refresh_wrap();
    });

    $('#files').hide();
    $('#files button').click(function() {
        $('#files').slideUp();
    });
    $('#files #confirm-files').click(function() {
        localStorage.setItem('fortunes', JSON.stringify($('#files select').val()));
        refresh_fortunes();
    });

    $('#choose').click(function() {
        $('#files').slideToggle();
        $('#files select').focus();
    });

    $('#more').click(function() {
        // Reset scroll on fortune change
        $('#fortune').get(0).scrollTop = 0;
        $('#fortune').get(0).scrollLeft = 0;
        $('#fortune').text(fortune.next() + "\n\n");
    })
});

function fill_files() {
    var files = ["art", "ascii-art", "bofh-excuses",
        "computers", "cookie", "definitions", "drugs",
        "education", "ethnic", "food", "fortunes",
        "goedel", "hitchhiker", "humorists",
        "humorix-misc", "humorix-stories", "kernelnewbies",
        "kids", "knghtbrd", "law", "linux", "linuxcookie",
        "literature", "love", "magic", "medicine", "miscellaneous",
        "news", "osfortune", "paradoxum", "people", "perl",
        "pets", "platitudes", "politics", "riddles", "science",
        "songs-poems", "sports", "startrek", "tao", "translate-me",
        "wisdom", "work", "zippy"];
    for(var i in files) {
        $('#files select').append('<option value="fortunes/' + files[i] + '">' + files[i] + '</option>');
    }
}

function refresh_lights() {
    $('body, button, select').css({
        backgroundColor: localStorage.getItem('backgroundColor') || 'white',
        color: localStorage.getItem('color') || 'black'
    });
}

function refresh_wrap() {
    $('#fortune').css({
        "white-space": localStorage.getItem('wrap') || 'pre'
    });
}

function refresh_fortunes() {
    fortune.empty().append_files($('#files select').val());

    setTimeout(function() {
        $('#fortune').text(fortune.next() + "\n\n");
    }, 100);
}
