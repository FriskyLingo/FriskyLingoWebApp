/// <reference path="D:\FriskyLingoWebApp\Scripts/jquery-3.1.0.intellisense.js" />
/// <reference path="D:\FriskyLingoWebApp\Scripts/jquery-3.1.0.min.js" />
/// <reference path="D:\FriskyLingoWebApp\Scripts/handlebars.js" />
/// <reference path="D:\FriskyLingoWebApp\Scripts/sugar.js" />
/// <reference path="D:\FriskyLingoWebApp\Scripts/moment.js" />
/// <reference path="jquery.storageapi.min.js" />
/// <reference path="D:\FriskyLingoWebApp\Scripts/jquery.magnific-popup.min.js" />

//Initialize session storage
var storage = $.sessionStorage;

$(document).ready(function () {
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Setup Handlebars helper function(s)
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    Handlebars.registerHelper('if_eq', function (a, b, opts) {
        if (a == b) {
            return opts.fn(this);
        } else {
            return opts.inverse(this);
        }
    });

    //  format an ISO date using Moment.js
    //  http://momentjs.com/
    //  moment syntax example: moment(Date("2011-07-18T15:50:52")).format("MMMM YYYY")
    //  usage: {{dateFormat creation_date format="MMMM YYYY"}}
    Handlebars.registerHelper('dateFormat', function (context, block) {
        if (window.moment && context && moment(context).isValid()) {
            var f = block.hash.format || "MMM Do, YYYY";
            return moment(context).format(f);
        } else {
            return context;   //  moment plugin not available. return data as is.
        };
    });

    Handlebars.registerHelper('addCommas', function (num) {
        return num.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    });


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Get the quarter type data then continue processing
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $.when(GetQuarterTypes()).done(function (quarterTypeData) {
        //console.log('done getting quarter types');
        var quarterTypes = quarterTypeData.d;

        var theQuarterTypeTabTemplateScript = $('#tab-template').html();
        var theQuarterTypeTabTemplate = Handlebars.compile(theQuarterTypeTabTemplateScript);
        $('#divTabs').append(theQuarterTypeTabTemplate(quarterTypes));

        $('#divTabs').find('.list-group-item:eq(2)').addClass('active');

        var theQuarterTypeTemplateScript = $('#tab-content-template').html();
        var theQuarterTypeTemplate = Handlebars.compile(theQuarterTypeTemplateScript);
        $('#divTabContents').append(theQuarterTypeTemplate(quarterTypes));

        $('#divTabContents').find('.bhoechie-tab-content:eq(2)').addClass('active');


        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Get quarters data then continue processing
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        $.when(GetQuarters()).done(function (quartersData) {
            //console.log('done getting quarters data');
            var quarterStatusData = quartersData.d;

            
            /*
            var theQuarterRowTemplateScript = $('#quarter-row-template').html();
            var theQuarterRowTemplate = Handlebars.compile(theQuarterRowTemplateScript);
            $('#divTabContents').append(theQuarterRowTemplate(quartersData));
            */
            //console.log($tableRows);
            
            $(document).find('table.quarter-status').each(function() {
                var theQuarterType = $(this).data('quartertype');

                var currentQuarterTypeStatusData = quarterStatusData.filter(function(qsd) {
                    return qsd.QuarterType_Code == theQuarterType;
                });

                var theQuarterRowTemplateScript = $('#quarter-row-template').html();
                var theQuarterRowTemplate = Handlebars.compile(theQuarterRowTemplateScript);
                $(document).find('tbody.tbody-' + theQuarterType).append(theQuarterRowTemplate(currentQuarterTypeStatusData));
            });

            setQuarterCountsForButtons(quarterTypes);

            $('.img-quarter').magnificPopup(
            {
                type: 'image',
                mainClass: 'mfp-with-zoom', // this class is for CSS animation below

                zoom: {
                    enabled: true, // By default it's false, so don't forget to enable it

                    duration: 300, // duration of the effect, in milliseconds
                    easing: 'ease-in-out', // CSS transition easing function

                    // The "opener" function should return the element from which popup will be zoomed in
                    // and to which popup will be scaled down
                    // By defailt it looks for an image tag:
                    opener: function (openerElement) {
                        // openerElement is the element on which popup was initialized, in this case its <a> tag
                        // you don't need to add "opener" option if this code matches your needs, it's defailt one.
                        return openerElement.is('img') ? openerElement : openerElement.find('img');
                    }
                }
            });

            $('.div-remodal').remodal();
        });





        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // "All" button click
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        $(document).on('click', '#btnAll', function (e) {
            //Get the quarter type
            var theQuarterType = $(this).data('quartertype');

            //Get rows where all quarters have been collected
            var $trsCollected = $(document).find('tr[data-quartertype="' + theQuarterType + '"]').has('input[type="checkbox"]').not(':has(input[type="checkbox"]:not(:checked))');

            //Get rows where all quarters have NOT been collected
            var $trsMissing = $(document).find('tr[data-quartertype="' + theQuarterType + '"]').has('input[type="checkbox"]:not(:checked)');

            //Show all the rows
            $trsCollected.show();
            $trsMissing.show();
        });


        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // "Collected" button click
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        $(document).on('click', '#btnCollected', function (e) {
            //Get the quarter type
            var theQuarterType = $(this).data('quartertype');

            //Get rows where all quarters have been collected
            var $trsCollected = $(document).find('tr[data-quartertype="' + theQuarterType + '"]').has('input[type="checkbox"]').not(':has(input[type="checkbox"]:not(:checked))');

            //Get rows where all quarters have NOT been collected
            var $trsMissing = $(document).find('tr[data-quartertype="' + theQuarterType + '"]').has('input[type="checkbox"]:not(:checked)');

            //Hide rows that are missing quarters
            $trsMissing.hide();

            //Show only the rows where ALL quarters have been collected
            $trsCollected.show();
        });


        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // "Missing" button click
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        $(document).on('click', '#btnMissing', function (e) {
            //Get the quarter type
            var theQuarterType = $(this).data('quartertype');

            //Get rows where all quarters have been collected
            var $trsCollected = $(document).find('tr[data-quartertype="' + theQuarterType + '"]').has('input[type="checkbox"]').not(':has(input[type="checkbox"]:not(:checked))');

            //Get rows where all quarters have NOT been collected
            var $trsMissing = $(document).find('tr[data-quartertype="' + theQuarterType + '"]').has('input[type="checkbox"]:not(:checked)');

            //Hide rows where ALL quarters have been collected
            $trsCollected.hide();

            //Show only the rows that are missing quarters
            $trsMissing.show();
        });


        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Function to handle tabbed layout
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
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


        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Function to handle on/off switches
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
            if (loginResult.d == 'success') {
                storage.set('loggedIn', true);
                $('#divLoginModal').modal('hide');
            } else {
                animateElement('#divLoginModal', 'shake');
                msgChange($('#div-login-msg'), $('#icon-login-msg'), $('#text-login-msg'), 'error', 'glyphicon-remove', 'Login error');
            }
        });
    });

    $('#divLoginModal').on('shown.bs.modal', function() {
        $('#userId').focus();
    });

    //TestGoogleSheets();
    $('#btnMissing').trigger('click');
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AJAX: Update quarter status
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function UpdateQuarterStatus(quarterId, mint, value) {
    //console.log('updating quarter status');
    $.ajax({
        type: 'POST',
        url: 'ws_Data.asmx/UpdateQuarterStatus',
        data: '{quarterId: ' + quarterId + ', mint: "' + mint + '", value: ' + value + '}',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function(data) {
        //console.log(data);
    });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AJAX: Get quarter types data
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetQuarterTypes() {
    //console.log('getting quarter types');
    return $.ajax({
        type: 'POST',
        url: 'ws_Data.asmx/GetQuarterTypes',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AJAX: Get quarters data
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetQuarters() {
    //console.log('getting quarters');
    return $.ajax({
        type: 'POST',
        url: 'ws_Data.asmx/GetQuarters',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AJAX: Send login request to server
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Login(userId, password) {
    //console.log('logging in');
    return $.ajax({
        type: 'POST',
        data: '{userId: "' + userId + '", password: "' + password + '"}',
        url: 'ws_Data.asmx/Login',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AJAX: Update quarter status
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function TestGoogleSheets() {
    //console.log('testing google sheets');
    $.ajax({
        type: 'POST',
        url: 'ws_Data.asmx/GoogleSheetTest',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json'
    }).done(function (data) {
        //console.log(data);
    });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Check if user is logged in
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function IsLoggedIn() {
    if (storage.get('loggedIn') === true) {
        return true;
    } else {
        return false;
    }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Animate the login dialog
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function animateElement(selector, animationType) {
    var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    $(selector).addClass('animated ' + animationType).one(animationEnd, function () {
        $(this).removeClass('animated ' + animationType);
    });
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Fade message in login dialog
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function msgFade($msgId, $msgText) {
    var $msgAnimateTime = 150;

    $msgId.fadeOut($msgAnimateTime, function () {
        $(this).text($msgText).fadeIn($msgAnimateTime);
    });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Change message in login dialog
////////////////////////////////////////////////////////////////////////////////////////////////////////////
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


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Get count of quarters of a specific type (total, collected only, missing only)
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getQuarterTypeCount(quarterType, status) {
    var quarterCount = '';

    switch(status) {
        case 0:
            //All
            quarterCount = $(document).find('tr[data-quartertype="' + quarterType + '"] input[type="checkbox"]').length;

            break;
        case 1:
            //Collected
            quarterCount = $(document).find('tr[data-quartertype="' + quarterType + '"] input[type="checkbox"]:checked').length;

            break;
        case 2:
            //Missing
            quarterCount = $(document).find('tr[data-quartertype="' + quarterType + '"] input[type="checkbox"]:not(:checked)').length;

            break;
        default:
            quarterCount = '';
    }

    return quarterCount;
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Set quarter counts in filter buttons
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function setQuarterCountsForButtons(quarterTypes) {
    $.each(quarterTypes, function(i, qt) {
        var quarterType = qt.code;

        var $btnAll = $('#btnAll[data-quartertype="' + quarterType + '"]');
        var $btnCollected = $('#btnCollected[data-quartertype="' + quarterType + '"]');
        var $btnMissing = $('#btnMissing[data-quartertype="' + quarterType + '"]');

        var countAll = getQuarterTypeCount(quarterType, 0);
        var countCollected = getQuarterTypeCount(quarterType, 1);
        var countMissing = getQuarterTypeCount(quarterType, 2);

        $btnAll.text('All (' + countAll + ')');
        $btnCollected.text('Collected (' + countCollected + ')');
        $btnMissing.text('Missing (' + countMissing + ')');
    });
}