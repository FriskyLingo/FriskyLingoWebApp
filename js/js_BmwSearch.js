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
    // Get the quarter type data then continue processing
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////
    $.when(GetVehicles()).done(function (searchResults) {
        console.log('done getting vehicles');
        console.log(searchResults);

        var totalResults = searchResults.Total;
        console.log(totalResults);
        $('.spn-total').text(totalResults);

        var theRowTemplateScript = $('#row-template').html();
        var theRowTemplate = Handlebars.compile(theRowTemplateScript);
        $(document).find('table.search-results tbody').append(theRowTemplate(searchResults.Inventory));
    });

    $('.select2-me').select2({
        theme: 'bootstrap'
    });
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AJAX: Get quarter types data
////////////////////////////////////////////////////////////////////////////////////////////////////////////
function GetVehicles() {
    var searchCriteria = {
        "PageSize": '100',
        "Start": 0,
        "ZipCode": '72116',
        "Radius": 0,
        "SortOrder": 'Price',
        "SortDirection": 'Asc',
        "Filters": {
            "CPOType": [
              'Certified Pre-Owned Elite',
              'Certified Pre-Owned'
            ],
            "Year": [
              '2017',
              '2016'
            ],
            "Model": [
              '330e',
              '330i',
              '330i xDrive',
              '340i',
              '340i xDrive',
              '328i',
              '328i xDrive',
              '335i',
              '335i xDrive'
            ],
            "Series": [
              '3 Series'
            ],
            "Mileage": [
              '10,000 or less',
              '20,000 or less'
            ],
            "Price": [
              '$20,000 - $29,999',
              '$30,000 - $39,999'
            ],
            "ExteriorColor": [
              'Black',
              'Gray',
              'Silver',
              'White'
            ],
            "Transmission": [
              'Automatic'
            ]
        }
    };

    //console.log('getting vehicles');
    return $.ajax({
        type: 'POST',
        url: 'http://bmw-inventory-service-prod.azurewebsites.net/api/search',
        contentType: 'application/json; charset=utf-8',
        dataType: 'json',
        data: JSON.stringify(searchCriteria)
    });
}