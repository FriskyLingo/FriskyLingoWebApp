/// <reference path="D:\FriskyLingoWebApp\Scripts/jquery-2.2.3.intellisense.js" />
/// <reference path="D:\FriskyLingoWebApp\Scripts/jquery-2.2.3.js" />
/// <reference path="D:\FriskyLingoWebApp\Scripts/handlebars.js" />
/// <reference path="D:\FriskyLingoWebApp\Scripts/sugar.js" />
/// <reference path="D:\FriskyLingoWebApp\Scripts/moment.js" />
/// <reference path="jquery.storageapi.min.js" />

//Initialize session storage
var storage = $.sessionStorage;

$(document).ready(function () {
    console.log('testsetsetsetset');

    Handlebars.registerHelper('if_eq', function (a, b, opts) {
        if (a == b) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
    });

    $.when(GetQuarterTypes()).done(function (quarterTypeData) {
        console.log('done getting quarter types');
        var quarterTypes = quarterTypeData.d;

        var theQuarterTypeTabTemplateScript = $('#tab-template').html();
        var theQuarterTypeTabTemplate = Handlebars.compile(theQuarterTypeTabTemplateScript);
        $('#divTabs').append(theQuarterTypeTabTemplate(quarterTypes));

        $('#divTabs').find('.list-group-item:first').addClass('active');

        var theQuarterTypeTemplateScript = $('#tab-content-template').html();
        var theQuarterTypeTemplate = Handlebars.compile(theQuarterTypeTemplateScript);
        $('#divTabContents').append(theQuarterTypeTemplate(quarterTypes));

        $('#divTabContents').find('.bhoechie-tab-content:first').addClass('active');

        $.when(GetQuarters()).done(function (quartersData) {
            console.log('done getting quarters data');
            var quarterStatusData = quartersData.d;

            
            /*
            var theQuarterRowTemplateScript = $('#quarter-row-template').html();
            var theQuarterRowTemplate = Handlebars.compile(theQuarterRowTemplateScript);
            $('#divTabContents').append(theQuarterRowTemplate(quartersData));
            */
            //console.log($tableRows);
            
            $(document).find('table.quarter-status').each(function() {
                var theQuarterType = $(this).data('quartertype');
                console.log(theQuarterType);
                var currentQuarterTypeStatusData = quarterStatusData.filter(function(qsd) {
                    return qsd.QuarterType_Code == theQuarterType;
                });
                console.log(currentQuarterTypeStatusData.length);

                var theQuarterRowTemplateScript = $('#quarter-row-template').html();
                var theQuarterRowTemplate = Handlebars.compile(theQuarterRowTemplateScript);
                $(document).find('tbody.tbody-' + theQuarterType).append(theQuarterRowTemplate(currentQuarterTypeStatusData));
            });
        });





        $(document).on('click', 'a.vertical-tab', function (e) {
            e.preventDefault();

            var theTabId = $(this).attr('id');

            //Find any currently "active" tabs and make them "inactive"
            $(document).find('a.vertical-tab.active').removeClass('active');

            //Make the clicked tab "active"
            $(this).addClass('active');

            $(document).find('div.bhoechie-tab>div.bhoechie-tab-content').removeClass('active');
            $(document).find('div.bhoechie-tab>div.bhoechie-tab-content[data-tabid="' + theTabId + '"]').addClass('active');
        });


        $(document).on('click', '.filterable .btn-filter', function () {
            var $panel = $(this).parents('.filterable'),
            $filters = $panel.find('.filters input'),
            $tbody = $panel.find('.table tbody');
            if ($filters.prop('disabled') == true) {
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

        $(document).on('click', 'div.material-switch input[type=checkbox]', function (e) {
            if (IsLoggedIn()) {
                var hasQuarter = 1;

                if ($(this).prop('checked') == false) {
                    hasQuarter = 0;
                }

                var quarterId = $(this).attr('id').split('_')[1];
                var mint = $(this).attr('id').split('_')[2];

                UpdateQuarterStatus(quarterId, mint, hasQuarter);
            } else {
                //Prevent non-signed-in user from editing
                e.preventDefault();

                //Display the login window
                $('#divLoginModal').modal();
            }
        });
    });

    /////////////////////////////////////////////////////////////////////////////////////
    // Login button click
    /////////////////////////////////////////////////////////////////////////////////////
    $(document).on('click', '#btnLogin', function () {
        var userId = $('input#userId').val();
        var password = $('input#password').val();

        $.when(Login(userId, password)).done(function (loginResult) {
            console.log(loginResult.d);

            if (loginResult.d == 'success') {
                storage.set('loggedIn', true);
                $('#divLoginModal').modal('hide');
            } else {
                animateElement('#divLoginModal', 'shake');
                msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), "error", "glyphicon-remove", "Login error");
            }
        });
    });

    $('#divLoginModal').on('shown.bs.modal', function() {
        $('#userId').focus();
    });
});

function UpdateQuarterStatus(quarterId, mint, value) {
    console.log('updating quarter status');
    $.ajax({
        type: 'POST',
        url: 'ws_Data.asmx/UpdateQuarterStatus',
        data: '{quarterId: ' + quarterId + ', mint: "' + mint + '", value: ' + value + '}',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function(data) {
        console.log(data);
    });
}

function GetQuarterTypes() {
    console.log('getting quarter types');
    return $.ajax({
        type: 'POST',
        url: 'ws_Data.asmx/GetQuarterTypes',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    });
}

function GetQuarters() {
    console.log('getting quarters');
    return $.ajax({
        type: 'POST',
        url: 'ws_Data.asmx/GetQuarters',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    });
}

function Login(userId, password) {
    console.log('logging in');
    return $.ajax({
        type: 'POST',
        data: '{userId: "' + userId + '", password: "' + password + '"}',
        url: 'ws_Data.asmx/Login',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    });
}

function IsLoggedIn() {
    if (storage.get('loggedIn') === true) {
        return true;
    } else {
        return false;
    }
}

function animateElement(selector, animationType) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $(selector).addClass('animated ' + animationType).one(animationEnd, function () {
        $(this).removeClass('animated ' + animationType);
    });
};

function msgFade($msgId, $msgText) {
    var $msgAnimateTime = 150;

    $msgId.fadeOut($msgAnimateTime, function () {
        $(this).text($msgText).fadeIn($msgAnimateTime);
    });
}

function msgChange($divTag, $iconTag, $textTag, $divClass, $iconClass, $msgText) {
    var $msgShowTime = 2000;
    var $msgOld = $divTag.text();

    msgFade($textTag, $msgText);
    $divTag.addClass($divClass);
    $iconTag.removeClass("glyphicon-chevron-right");
    $iconTag.addClass($iconClass + " " + $divClass);

    setTimeout(function () {
        msgFade($textTag, $msgOld);
        $divTag.removeClass($divClass);
        $iconTag.addClass("glyphicon-chevron-right");
        $iconTag.removeClass($iconClass + " " + $divClass);
    }, $msgShowTime);
}


$(function() {
    $('.button-checkbox').each(function() {

        // Settings
        var $widget = $(this),
            $button = $widget.find('button'),
            $checkbox = $widget.find('input:checkbox'),
            color = $button.data('color'),
            settings = {
                on: {
                    icon: 'glyphicon'
                },
                off: {
                    icon: 'glyphicon'
                }
            };

        // Event Handlers
        $button.on('click', function() {
            $checkbox.prop('checked', !$checkbox.is(':checked'));
            $checkbox.triggerHandler('change');
            updateDisplay();
        });
        $checkbox.on('change', function() {
            updateDisplay();
        });

        // Actions
        function updateDisplay() {
            var isChecked = $checkbox.is(':checked');

            // Set the button's state
            $button.data('state', (isChecked) ? "on" : "off");

            // Set the button's icon
            $button.find('.state-icon')
                .removeClass()
                .addClass('state-icon ' + settings[$button.data('state')].icon);

            // Update the button's color
            if (isChecked) {
                $button
                    .removeClass('btn-default')
                    .addClass('btn-' + color + ' active');
            } else {
                $button
                    .removeClass('btn-' + color + ' active')
                    .addClass('btn-default');
            }
        }

        // Initialization
        function init() {

            updateDisplay();

            // Inject the icon if applicable
            if ($button.find('.state-icon').length == 0) {
                $button.prepend('<i class="state-icon ' + settings[$button.data('state')].icon + '"></i> ');
            }
        }

        init();
    });
});