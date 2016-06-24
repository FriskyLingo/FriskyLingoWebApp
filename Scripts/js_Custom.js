$(document).ready(function() {
    console.log('ready!');

    var players = ['Justin', 'Kevin'];

    //$('#divContainerGame').hide();

    //createGame(players);



    //////////////////////////////////////////////////////////////////////////
    //Fancy Sidebar Navigation
    //////////////////////////////////////////////////////////////////////////
    var trigger = $('.hamburger'),
                overlay = $('.overlay'),
                isClosed = false;

    trigger.click(function () {
        hamburger_cross();
    });

    function hamburger_cross() {

        if (isClosed === true) {
            overlay.hide();
            trigger.removeClass('is-open');
            trigger.addClass('is-closed');
            isClosed = false;
        }
        else {
            overlay.show();
            trigger.removeClass('is-closed');
            trigger.addClass('is-open');
            isClosed = true;
        }
    }

    $('[data-toggle="offcanvas"]').click(function () {
        $('#wrapper').toggleClass('toggled');
    });

    var players = document.getElementById("divPlayers");
    Sortable.create(players, {
        animation: 150
    });
});

function createGame(players) {
    createGameHeader();

    $.each(players, function(index, player) {
        addPlayer(player);
    });
}

function createGameHeader() {
    var $gameHeader = $('<div>');
    $gameHeader
        .addClass('row')
        .css('border-bottom', '1px solid');

    var $gameTitle = $('<div>');
    var $gameHeaderDateAndTime = $('<div>');
    var $gameHeaderLocation = $('<div>');
    var $gameHeaderRound = $('<div>');
    var $gameHeaderFirstShooter = $('<div>');

    $gameTitle
        .addClass('col-md-4')
        .append('<h2>Game #1</h2>');

    $gameHeaderDateAndTime
        .addClass('col-md-2')
        .append('<h3>Date and Time</h3>');

    $gameHeaderLocation
        .addClass('col-md-2')
        .text('Location');

    $gameHeaderRound
        .addClass('col-md-2')
        .text('Round');

    $gameHeaderFirstShooter
        .addClass('col-md-2')
        .text('First Shooter');

    $gameHeader.append([$gameTitle, $gameHeaderDateAndTime, $gameHeaderLocation, $gameHeaderRound, $gameHeaderFirstShooter]);

    $('#divGame').append($gameHeader);
}

function addPlayer(playerName) {
    var $divRow = $('<div>');
    $divRow.addClass('row');

    for (i = 1; i < 11; i++) {
        var $button = $('<button>');
        var $span = $('<span>');

        $button
            .attr('type', 'button')
            .addClass('btn btn-default btn-lg btn3d');
        $span
            .addClass('glyphicon')
            .text(i);

        $button.append($span);

        $divRow.append($button);
    }

    $divRow.prepend(playerName);

    $('#divGame').append($divRow);
}

function removePlayer() {
    
}

function addRound() {
    
}

function determineWinner() {
    
}

function setDateAndTime() {
    
}

function madeShot() {
    
}

function missedShot() {
    
}


$(document).on('click', '.btn3d.btn-default', function () {
    $(this).toggleClass('active').toggleClass('btn-success');
});


///////////////////////////////////////////////////////////////////////////////////////
//Checked List Group
///////////////////////////////////////////////////////////////////////////////////////
$(function () {
    $('.list-group.checked-list-box .list-group-item').each(function () {

        // Settings
        var $widget = $(this),
            $checkbox = $('<input type="checkbox" class="hidden" />'),
            color = ($widget.data('color') ? $widget.data('color') : "primary"),
            style = ($widget.data('style') == "button" ? "btn-" : "list-group-item-"),
            settings = {
                on: {
                    icon: 'glyphicon glyphicon-check'
                },
                off: {
                    icon: 'glyphicon glyphicon-unchecked'
                }
            };

        $widget.css('cursor', 'pointer')
        $widget.append($checkbox);

        // Event Handlers
        $widget.on('click', function () {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function () {
            updateDisplay();
        });


        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $widget.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $widget.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$widget.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $widget.addClass(style + color + ' active');
            } else {
                $widget.removeClass(style + color + ' active');
            }
        }

        // Initialization
        function init() {

            if ($widget.data('checked') == true) {
                $checkbox.prop('checked', !$checkbox.is(':checked'));
            }

            updateDisplay();

            // Inject the icon if applicable
            if ($widget.find('.state-icon').length == 0) {
                $widget.prepend('<span class="state-icon ' + settings[$widget.data('state')].icon + '"></span>');
            }
        }
        init();
    });

    $('#get-checked-data').on('click', function (event) {
        event.preventDefault();
        var checkedItems = {}, counter = 0;
        $("#check-list-box li.active").each(function (idx, li) {
            checkedItems[counter] = $(li).text();
            counter++;
        });
        $('#display-json').html(JSON.stringify(checkedItems, null, '\t'));
    });
});