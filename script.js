var fortune = new Fortune();
$(function() {
    var files = $.parseJSON(localStorage.getItem('fortunes')) || ['fortunes/linux'];
    setTimeout(function() {
        $('#files select').val(files);
        setTimeout(refresh_fortunes, 100);
    }, 100);
    refresh_lights();
    fill_files();

    $('#fortune').text(fortune.next());

    $('#toggle-lights').click(function() {
        var backgroundColor = (localStorage.getItem('backgroundColor') || 'white') == 'white' ? 'black' : 'white';
        var color = (localStorage.getItem('color') || 'black') == 'black' ? 'lightgreen' : 'black';
        localStorage.setItem('backgroundColor', backgroundColor);
        localStorage.setItem('color', color);
        refresh_lights();
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
        $('#fortune').text(fortune.next());
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
    $('body, button').css({
        backgroundColor: localStorage.getItem('backgroundColor') || 'white',
        color: localStorage.getItem('color') || 'black'
    });
}

function refresh_fortunes() {
    fortune.empty().append_files($('#files select').val());

    setTimeout(function() {
        $('#fortune').text(fortune.next());
    }, 100);
}
