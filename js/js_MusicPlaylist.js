$(function () {
    var a;
    var audio;

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Get the quarter type data then continue processing
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $.when(GetSongs()).done(function (theData) {
        var songs = theData.d;

        var theSongRowTemplateScript = $('#song-row-template').html();
        var theSongRowTemplate = Handlebars.compile(theSongRowTemplateScript);
        $(document).find('#tbodySongs').append(theSongRowTemplate(songs));

        // Setup the player to autoplay the next track
        a = audiojs.createAll({
            trackEnded: function () {
                var next = $('.playing').next();
                if (!next.length) next = $('#tbodySongs tr').first();
                next.addClass('playing').siblings().removeClass('playing');
                audio.load($('tr', next).attr('data-src'));
                audio.play();
            }
        });

        // Load in the first track
        audio = a[0];
        var first = $('#tbodySongs tr').attr('data-src');
        $('#tbodySongs tr').first().addClass('playing');
        audio.load(first);
    });

    // Load in a track on click
    $(document).on('click', 'ol li, tr.song', function (e) {
        console.log('loading in a track on click');
        e.preventDefault();
        $(this).addClass('playing').siblings().removeClass('playing');
        //audio.load($('a', this).attr('data-src'));
        audio.load($(this).attr('data-src'));
        audio.play();
    });

    // Keyboard shortcuts
    $(document).keydown(function(e) {
        var unicode = e.charCode ? e.charCode : e.keyCode;
        // right arrow
        if (unicode == 39) {
            var next = $('.playing').next();
            if (!next.length) next = $('#tbodySongs tr').first();
            next.click();
            // back arrow
        } else if (unicode == 37) {
            var prev = $('.playing').prev();
            if (!prev.length) prev = $('#tbodySongs tr').last();
            prev.click();
            // spacebar
        } else if (unicode == 32) {
            audio.playPause();
        }
    });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AJAX: Get song data
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetSongs() {
    console.log('getting song data');
    return $.ajax({
        type: 'POST',
        url: 'ws_Data.asmx/GetSongs',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions to handle table filtering
////////////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).on('click', '.filterable .btn-filter', function () {
    var $panel = $(this).parents('.filterable'),
    $filters = $panel.find('.filters input'),
    $tbody = $panel.find('.table tbody');

    if ($filters.prop('disabled') === true) {
        $filters.prop('disabled', false);
        $filters.first().focus();
    } else {
        $filters.val('').prop('disabled', true);
        $tbody.find('.no-result').remove();
        $tbody.find('tr').show();
    }
});

$(document).on('keyup', '.filterable .filters input', function (e) {
    /* Ignore tab key */
    var code = e.keyCode || e.which;

    if (code == '9') return;

    /* Useful DOM data and selectors */
    var $input = $(this),
    inputContent = $input.val().toLowerCase(),
    $panel = $input.parents('.filterable'),
    column = $panel.find('.filters th').index($input.parents('th')),
    $table = $panel.find('.table'),
    $rows = $table.find('tbody tr');

    /* Dirtiest filter function ever ;) */
    var $filteredRows = $rows.filter(function () {
        var value = $(this).find('td').eq(column).text().toLowerCase();
        return value.indexOf(inputContent) === -1;
    });

    /* Clean previous no-result if exist */
    $table.find('tbody .no-result').remove();

    /* Show all rows, hide filtered ones (never do that outside of a demo ! xD) */
    $rows.show();
    $filteredRows.hide();

    /* Prepend no-result row if all rows are filtered */
    if ($filteredRows.length === $rows.length) {
        $table.find('tbody').prepend($('<tr class="no-result text-center"><td colspan="' + $table.find('.filters th').length + '">No result found</td></tr>'));
    }
});
