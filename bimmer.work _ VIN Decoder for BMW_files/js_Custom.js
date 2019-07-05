/// <reference path="~/Scripts/jquery-3.1.0.intellisense.js" />
/// <reference path="~/Scripts/jquery-3.1.0.js" />
/// <reference path="~/Scripts/sugar.js" />
/// <reference path="~/Scripts/moment.js" />
/// <reference path="~/libs/jquery/jquery-ui.js" />
/// <reference path="../js/js_VehicleModule.js" />


$(document).ready(function () {
    var $tableGeneral = $('div.table-responsive table:eq(0)');
    var $tableEquipmentStandard = $('div.table-responsive table:eq(1)');
    var $tableEquipmentOptional = $('div.table-responsive table:eq(2)');

    $tableGeneral.addClass('table-general');
    $tableEquipmentStandard.addClass('table-standard');
    $tableEquipmentOptional.addClass('table-optional');

    $tableGeneral.find('td,th').css('background-color', 'Red');
    $tableEquipmentStandard.find('td,th').css('background-color', 'Blue');
    $tableEquipmentOptional.find('td,th').css('background-color', 'Green');

    //Handle the general vehicle info
    $tableGeneral.find('th').addClass('general-name');
    $tableGeneral.find('td:nth-child(2)').addClass('general-value');

    //Handle the standard equipment
    $tableEquipmentStandard.find('th').addClass('equipment-code');
    $tableEquipmentStandard.find('td:nth-child(2)').addClass('code-description');

    //Handle the optional equipment
    $tableEquipmentOptional.find('th').addClass('equipment-code');
    $tableEquipmentOptional.find('td:nth-child(2)').addClass('code-description');

    $('.general-name').css('background-color', 'Grey');
    $('.general-value').css('background-color', 'Grey');

    /////////////////////////////////////////////////////////////////////////////
    //Get general vehicle information
    /////////////////////////////////////////////////////////////////////////////
    vehicle._getVin($('.general-name:contains("Vehicle Identification Number")').next('.general-value'));
    vehicle._getYearModel();
    vehicle._getTypeCode($('.general-name:contains("Type")').next('.general-value'));
    vehicle._getModel($('.general-name:contains("Model")').next('.general-value'));
    vehicle._getBodyType($('.general-name:contains("Development Code")').next('.general-value'));
    vehicle._getChassis($('.general-name:contains("Chassis")').next('.general-value'));
    vehicle._getSteering($('.general-name:contains("Steering")').next('.general-value'));
    vehicle._getDoors($('.general-name:contains("Doors")').next('.general-value'));
    vehicle._getDrivetrain($('.general-name:contains("Drivetrain")').next('.general-value'));
    vehicle._getTransmission($('.general-name:contains("Transmission")').next('.general-value'));
    vehicle._getProductionPlant($('.general-name:contains("Production Plant")').next('.general-value'));
    vehicle._getProductionDate($('.general-name:contains("Production Date")').next('.general-value'));
    vehicle._getPhotoExteriorLink();
    vehicle._getPhotoInteriorLink();


    /////////////////////////////////////////////////////////////////////////////
    //Get the exterior paint info
    /////////////////////////////////////////////////////////////////////////////
    vehicle._getPaintInfo($('.general-name:contains("Color")').next('.general-value'));

    /////////////////////////////////////////////////////////////////////////////
    //Get the upholstery info
    /////////////////////////////////////////////////////////////////////////////
    vehicle._getUpholsteryInfo($('.general-name:contains("Upholstery")').next('.general-value'));

    /////////////////////////////////////////////////////////////////////////////
    //Get the vehicle's base price
    /////////////////////////////////////////////////////////////////////////////
    vehicle._getBasePrice();

    /////////////////////////////////////////////////////////////////////////////
    //Get the vehicle's code data
    /////////////////////////////////////////////////////////////////////////////
    vehicle._getCodeData().always(function () {
        /////////////////////////////////////////////////////////////////////////////
        //Get the vehicle's standard items
        /////////////////////////////////////////////////////////////////////////////
        vehicle._getEquipmentStandard(vehicle.codeData, $('.equipment-code'));

        /////////////////////////////////////////////////////////////////////////////
        //Get the vehicle's optional items
        /////////////////////////////////////////////////////////////////////////////
        vehicle._getEquipmentOptional(vehicle.codeData, $('.equipment-code'));

        /////////////////////////////////////////////////////////////////////////////
        //Get the vehicle's packages
        /////////////////////////////////////////////////////////////////////////////
        vehicle._getPackageItems(vehicle.codeData, $('.equipment-code'));
        vehicle._getPackages(vehicle.packageItems);

        /////////////////////////////////////////////////////////////////////////////
        //Get the vehicle's line
        /////////////////////////////////////////////////////////////////////////////
        vehicle._getLine(vehicle.equipmentOptional);

        $('.equipment-code').each(function () {
            var theCode = $(this).text().trim();

            var res = $.grep(vehicle.equipmentOptional, function (theItem) {
                return theItem.code === theCode;
            });

            if (res.length > 0) {
                $(this).parent().children().css('background-color', 'Green');
            } else {
                $(this).parent().children().css('background-color', 'Grey');

                //Move the "Standard" item to the "Standard Equipment" table if it's not there
                if ($(this).closest('table.table').hasClass('table-optional')) {
                    var tr = $(this).parent().remove().clone();
                    $tableEquipmentStandard.find('tbody').append(tr);
                }
            }
        });

        if (!vehicle.upholstery.standard) {
            $('.general-name:contains("Upholstery")').parent().children().css('background-color', 'Green');
        } else {
            $('.general-name:contains("Upholstery")').parent().children().css('background-color', 'Grey');
        }

        if (!vehicle.paint.standard) {
            $('.general-name:contains("Color")').parent().children().css('background-color', 'Green');
        } else {
            $('.general-name:contains("Color")').parent().children().css('background-color', 'Grey');
        }

        setTimeout(function () {
            /////////////////////////////////////////////////////////////////////////////
            //Get the total price of the vehicle
            /////////////////////////////////////////////////////////////////////////////
            vehicle._getTotalPrice();

            console.log(vehicle);

            //Get count of all options
            console.log('Options: [' + vehicle.equipmentOptional.length + ']');

            //Get count of all packages
            console.log('Packages: [' + vehicle.packages.length + ']');

            //Get count of all lines
            console.log('Lines: [' + vehicle.line.length + ']');

            //Get all the additions
            console.log(vehicle.additions.join('\n'));

            //Get base price of the vehicle
            console.log('Base Price: [$' + vehicle.priceBase + ']');

            //Get total price of all packages
            console.log('Additions Price: [$' + vehicle.priceAdditions + ']');

            //Get total price of the vehicle
            console.log('TOTAL Price: [$' + vehicle.priceTotal + ']');

            //Create and show the vehicle score on the page
            createScore(vehicle.equipmentOptional.length, vehicle.paint, vehicle.upholstery, $tableGeneral.find('tr:eq(0)'));
        }, 1000);
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////
// Add score to page
//////////////////////////////////////////////////////////////////////////////////////////////
function createScore(optionsCount, paint, upholstery, targetElement) {
    var theScore = 0;

    theScore += optionsCount;

    if (!paint.standard) {
        theScore += 1;
    }

    if (!upholstery.standard) {
        theScore += 1;
    }

    var backColor = '';
    var fontColor = '';

    switch (theScore) {
        case 0:
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
            //BAD
            backColor = '#F2DEDE';
            fontColor = '#A94442';
            break;
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
            //MEH
            backColor = '#FFBA8B';
            fontColor = '#FF7518';
            break;
        case 12:
        case 13:
        case 14:
        case 15:
        case 17:
        case 18:
            //OK
            backColor = '#FCF8E3';
            fontColor = '#8A6D3B';
            break;
        case 19:
        case 20:
        case 21:
        case 22:
        case 23:
        case 24:
            //GOOD
            backColor = '#DFF0D8';
            fontColor = '#3C763D';
            break;
        case 25:
        case 26:
        case 27:
        case 28:
        case 29:
        case 30:
            //EXCELLENT
            backColor = '#D9EDF7';
            fontColor = '#31708F';
            break;
        case 31:
        case 32:
        case 33:
        case 34:
        case 35:
        case 36:
            //FUCKING NUTS
            backColor = '#E0C1EF';
            fontColor = '#9933CC';
            break;
        default:
            backColor = '#EEEEEE';
            fontColor = '#B4B4B4';
    }

    console.log('theScore: ' + theScore);

    var $divScore = $('<div>');
    $divScore
        .attr('id','divScore')
		.css('background-color', backColor)
		.css('color', fontColor)
		.css('font-size', '450%')
		.css('text-align', 'center')
		.text(theScore);

    targetElement.append($divScore);
}

//////////////////////////////////////////////////////////////////////////////////////////////
// Get json file using AJAX
//////////////////////////////////////////////////////////////////////////////////////////////
function getJsonFile(filePath) {
    return $.ajax({
        dataType: 'json',
        url: filePath,
        crossDomain: true,
        type: 'GET'
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log('FAIL!!!');
        console.log('\t' + textStatus);
        console.log('\t' + errorThrown);
        console.log(jqXHR);
    });
}

///////////////////////////////////////////////////////////////////////////////////////////////////////
// Object representing a specific vehicle
///////////////////////////////////////////////////////////////////////////////////////////////////////
var vehicle = {
    //VIN Number (ex: [WBA3A5C59DJ462004])
    vin: null,

    //Year Model (ex: [2013])
    year: null,

    //Type Code (ex: [3A53])
    type: null,

    //Model Name (ex: [328i - USA])
    model: null,

    //Body type code (ex: [F30])
    body: null,

    //Chassis type (ex: [LIM])
    chassis: null,

    //Steering type (ex: [LL])
    steering: null,

    //Number of doors (ex: [4])
    doors: null,

    //Drivetrain (ex: [HECK])
    drivetrain: null,

    //Transmission type of vehicle (ex: [AUT])
    transmission: null,

    //Location of production plant (ex: [REGENSBURG])
    productionPlant: null,

    //Production date of vehicle (ex: [2013-03-08])
    productionDate: null,

    //Exterior Photo Link (ex: [http://bimmer.work/vin/j/462004/exterieur.jpg])
    photoExterior: null,

    //Interior Photo Link (ex: [http://bimmer.work/vin/j/462004/interieur.jpg])
    photoInterior: null,

    //Base Price (ex: [36850])
    priceBase: 0,

    //Price of all lines/packages/options/charges (ex: [10645])
    priceAdditions: 0,

    additions: [],

    //Total Price including lines/packages/options/charges (ex: [47495])
    priceTotal: 0,

    //Engine information
    engine: {
        cylinders: null,
        displacement: null,
        type: null,
        fuelSystem: null,
        horsepowerUnits: null,
        horsepowerRpms: null,
        torqueUnits: null,
        torqueRpms: null,
        turbocharged: null
    },

    //Paint information
    paint: {
        code: null,
        type: null,
        name: null,
        standard: null,
        cost: null
    },

    //Upholstery information
    upholstery: {
        code: null,
        type: null,
        name: null,
        color: null,
        standard: null,
        cost: null
    },

    //Array of all standard equipment
    equipmentStandard: [],

    //Array of all optional equipment
    equipmentOptional: [],

    //Vehicle's "Line" type
    line: {},

    //Vehicle's packages
    packages: [],

    //Vehicle's code data
    codeData: [],

    //Vehicle's package item data
    packageItems: [],


    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Gets the VIN number
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getVin: function ($selector) {
        this.vin = $selector.text().trim();
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Gets the vehicle year model
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getYearModel: function () {
        //Get the 10th character of the VIN
        var tenthChar = this.vin.charAt(9);

        //Set other properties based on the raw value
        switch (tenthChar) {
            case 'A':
                this.year = 2010;
                break;
            case 'B':
                this.year = 2011;
                break;
            case 'C':
                this.year = 2012;
                break;
            case 'D':
                this.year = 2013;
                break;
            case 'E':
                this.year = 2014;
                break;
            case 'F':
                this.year = 2015;
                break;
            case 'G':
                this.year = 2016;
                break;
            case 'H':
                this.year = 2017;
                break;
            case 'J':
                this.year = 2018;
                break;
            case 'K':
                this.year = 2019;
                break;
            default:
                //Unsupported value; set to defaults
                this.year = null;
        }
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Gets the vehicle type code
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getTypeCode: function ($selector) {
        this.type = $selector.text().trim();
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Gets the vehicle model
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getModel: function ($selector) {
        this.model = $selector.text().trim();
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Gets the vehicle body code
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getBodyType: function ($selector) {
        this.body = $selector.text().trim();
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Gets the vehicle chassis
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getChassis: function ($selector) {
        this.chassis = $selector.text().trim();
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Gets the vehicle steering code
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getSteering: function ($selector) {
        this.steering = $selector.text().trim();
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Gets the number of doors
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getDoors: function ($selector) {
        this.doors = parseInt($selector.text().trim());
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Gets the vehicle drivetrain code
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getDrivetrain: function ($selector) {
        this.drivetrain = $selector.text().trim();
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Gets the vehicle transmission type
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getTransmission: function ($selector) {
        this.transmission = $selector.text().trim();
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Gets the production plant location
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getProductionPlant: function ($selector) {
        this.productionPlant = $selector.text().trim();
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Gets the production date
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getProductionDate: function ($selector) {
        this.productionDate = moment($selector.text().trim()).format('YYYY-MM-DD');
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Gets the link to the photo of the exterior
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getPhotoExteriorLink: function () {
        //http://bimmer.work/vin/j/462004/exterieur.jpg
        var eleventhChar = this.vin.charAt(10).toLowerCase();
        var lastSixChars = this.vin.slice(11);
        this.photoExterior = 'http://bimmer.work/vin/' + eleventhChar + '/' + lastSixChars + '/exterieur.jpg';
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Gets the link to the photo of the interior
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getPhotoInteriorLink: function () {
        //http://bimmer.work/vin/j/462004/interieur.jpg
        var eleventhChar = this.vin.charAt(10).toLowerCase();
        var lastSixChars = this.vin.slice(11);
        this.photoInterior = 'http://bimmer.work/vin/' + eleventhChar + '/' + lastSixChars + '/interieur.jpg';
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Gets the base price of the vehicle
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getBasePrice: function () {
        //Get the vehicle's year model & type
        var theYearModel = this.year;
        var theType = this.type;

        var theVehicle = this;

        var theBasePriceObject;

        //Get the base price for the vehicle
        $.when(getJsonFile('https://www.friskylingo.com/data/vehicle_basePrices.json')).done(function (data) {
            //Get the base price data that matches the year model and type (AG Code)
            theBasePriceObject = $.grep(data, function (basePriceItem) {
                return basePriceItem.year === theYearModel && basePriceItem.agCode === theType;
            });

            theVehicle.priceBase = theBasePriceObject[0].price;

            this.priceBase = theVehicle.priceBase;
        });
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Gets the total price of all added lines, packages and options
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getAdditionsPrice: function () {

    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Gets the final total price of the vehicle
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getTotalPrice: function () {
        var theVehicle = this;

        theVehicle.priceTotal = theVehicle.priceBase + theVehicle.priceAdditions;
        this.priceTotal = theVehicle.priceTotal;
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Gets the engine info of the vehicle
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getEngineInfo: function () {

    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Gets the exterior paint info of the vehicle
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getPaintInfo: function ($selector) {
        //Get the vehicle's year model & type
        var theYearModel = this.year;
        var theType = this.type;

        var theVehicle = this;

        //Get the paint code from the text
        var theCode = $selector.text().trim().split(' - ')[1];

        var thePaintObject;

        //Get the paint code data for the vehicle
        $.when(getJsonFile('https://www.friskylingo.com/data/vehicle_paints.json')).done(function (data) {
            //Get the paint data that matches the code, year model and type (AG Code)
            thePaintObject = $.grep(data, function (paintItem) {
                return paintItem.code === theCode && paintItem.year === theYearModel && paintItem.agCode === theType;
            });

            theVehicle.paint.name = thePaintObject[0].name;
            theVehicle.paint.code = thePaintObject[0].code;
            theVehicle.paint.cost = thePaintObject[0].price;

            if ($.isNumeric(theVehicle.paint.cost)) {
                theVehicle.paint.standard = false;
                theVehicle.paint.type = 'Metallic';

                theVehicle.additions.push('Paint - ' + theVehicle.paint.name + ' - $' + theVehicle.paint.cost);
                theVehicle.priceAdditions = theVehicle.priceAdditions + theVehicle.paint.cost;
            } else {
                theVehicle.paint.standard = true;
                theVehicle.paint.type = 'Non-Metallic';
            }

            this.additions = theVehicle.additions;
            this.paint = theVehicle.paint;
            this.priceAdditions = theVehicle.priceAdditions;
        });
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Gets the upholstery information
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getUpholsteryInfo: function ($selector) {
        //Get the vehicle's year model & type
        var theYearModel = this.year;
        var theType = this.type;

        var theVehicle = this;

        //Get the paint code from the text
        var theCode = $selector.text().trim().split(' - ')[1];

        var theUpholsteryObject;

        //Get the upholstery code data for the vehicle
        $.when(getJsonFile('https://www.friskylingo.com/data/vehicle_upholsteries.json')).done(function (data) {
            //Get the upholstery data that matches the code, year model and type (AG Code)
            theUpholsteryObject = $.grep(data, function (upholsteryItem) {
                return upholsteryItem.code === theCode && upholsteryItem.year === theYearModel && upholsteryItem.agCode === theType;
            });

            theVehicle.upholstery.name = theUpholsteryObject[0].name;
            theVehicle.upholstery.code = theUpholsteryObject[0].code;
            theVehicle.upholstery.cost = theUpholsteryObject[0].price;

            if ($.isNumeric(theVehicle.upholstery.cost)) {
                theVehicle.upholstery.standard = false;
                theVehicle.upholstery.type = 'Leather';

                theVehicle.additions.push('Upholstery - ' + theVehicle.upholstery.name + ' - $' + theVehicle.upholstery.cost);
                theVehicle.priceAdditions = theVehicle.priceAdditions + theVehicle.upholstery.cost;
            } else {
                theVehicle.upholstery.standard = true;
                theVehicle.upholstery.type = 'Sensatec';
            }

            this.additions = theVehicle.additions;
            this.upholstery = theVehicle.upholstery;
            this.priceAdditions = theVehicle.priceAdditions;
        });
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Gets the code data for the vehicle
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getCodeData: function () {
        //Get the vehicle's year model & type
        var theYearModel = this.year;
        var theType = this.type;

        var theVehicle = this;

        return $.Deferred(function (dfd) {
            //Get the code data for the vehicle
            $.when(getJsonFile('https://www.friskylingo.com/data/vehicle_codes.json')).done(function (data) {
                //Get the code data that matches the code, year model and type (AG Code)
                var theCodeDataObject = $.grep(data, function (codeItem) {
                    return codeItem.year === theYearModel && codeItem.agCode === theType;
                });
                theVehicle.codeData = theCodeDataObject;

                this.codeData = theVehicle.codeData;

                //Resolve the deferred
                dfd.resolve();
            });
        }).promise();
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Gets the standard equipment of the vehicle
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getEquipmentStandard: function (theCodeData, $selector) {
        var theVehicle = this;

        $selector.each(function () {
            var theCode = $(this).text().trim();

            //Get the standard item that matches the specified code
            var theStandardItem = $.grep(theCodeData, function (codeItem) {
                return codeItem.standard === 'Yes' && codeItem.code === theCode;
            });

            if (theStandardItem.length > 0) {
                theVehicle.equipmentStandard.push(theStandardItem[0]);
            }
        });

        this.equipmentStandard = theVehicle.equipmentStandard;
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Gets the options of the vehicle (not otherwise included in a package or line)
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getEquipmentOptional: function (theCodeData, $selector) {
        var theVehicle = this;

        $selector.each(function () {
            var theCode = $(this).text().trim();

            //Get the optional item that matches the specified code
            var theOptionalItem = $.grep(theCodeData, function (codeItem) {
                return codeItem.standard === 'No' && codeItem.code === theCode;
            });

            if (theOptionalItem.length > 0) {
                theVehicle.equipmentOptional.push(theOptionalItem[0]);
            }
        });

        this.equipmentOptional = theVehicle.equipmentOptional;
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Gets package items of the vehicle
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getPackageItems: function (theCodeData, $selector) {
        var theVehicle = this;

        $selector.each(function () {
            var theCode = $(this).text().trim();

            //Get the package item that matches the specified code
            var thePackageItem = $.grep(theCodeData, function (codeItem) {
                return codeItem.standard === 'No' && codeItem.code === theCode && codeItem.type === 'Package Item';
            });

            if (thePackageItem.length > 0) {
                theVehicle.packageItems.push(thePackageItem[0]);
            }
        });

        this.packageItems = theVehicle.packageItems;
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Gets the "line" of the vehicle
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getLine: function (theEquipmentOptions) {
        //Get the vehicle's year model & type
        var theYearModel = this.year;
        var theType = this.type;

        var theVehicle = this;

        var theLineObject;

        //Get the line data for the vehicle
        $.when(getJsonFile('https://www.friskylingo.com/data/vehicle_lines.json')).done(function (data) {
            //Get the line data that matches the code, year model and type (AG Code)
            theLineObject = $.grep(data, function (lineItem) {
                return lineItem.year === theYearModel && lineItem.agCode === theType && $.grep(theEquipmentOptions, function (theOption) { return theOption.lines.indexOf(lineItem.code) > -1 }).length > 0;
            });

            if (theLineObject.length > 0) {
                theVehicle.line = theLineObject[0];

                this.line = theVehicle.line;
            }
        });
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Gets the installed packages of the vehicle
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getPackages: function (thePackageItems) {
        //Get the vehicle's year model & type
        var theYearModel = this.year;
        var theType = this.type;

        var theVehicle = this;

        var thePackageObject;
        var theVehiclesPackages = [];

        //Get the package data for the vehicle
        $.when(getJsonFile('https://www.friskylingo.com/data/vehicle_packages.json')).done(function (data) {
            //Get the package data that matches the code, year model and type (AG Code)
            thePackageObject = $.grep(data, function (packageItem) {
                return packageItem.year === theYearModel && packageItem.agCode === theType && $.grep(thePackageItems, function (theOption) { return theOption.packages.indexOf(packageItem.code) > -1 }).length > 0;
            });

            $.each(thePackageObject, function (i, thePackage) {
                if (theVehicle._hasAllItemsInPackage(thePackageItems, thePackage)) {
                    theVehiclesPackages.push(thePackage);

                    if ($.isNumeric(thePackage.price)) {
                        theVehicle.additions.push('Package - ' + thePackage.name + ' - $' + thePackage.price);
                        theVehicle.priceAdditions = theVehicle.priceAdditions + thePackage.price;
                    }
                }
            });

            theVehicle.packages = theVehiclesPackages;

            this.additions = theVehicle.additions;
            this.packages = theVehicle.packages;
            this.priceAdditions = theVehicle.priceAdditions;
        });
    },

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // FUNCTION: Determines if vehicle has all necessary items to complete a package
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _hasAllItemsInPackage: function (thePackageItems, thePackage) {
        var theReturnValue = false;

        //Get all the codes included in the specified package
        var thePackageItems2;

        thePackageItems2 = $.grep(thePackageItems, function (theOption) {
            return theOption.packages.indexOf(thePackage.code) > -1;
        });

        if (thePackageItems2.length >= thePackage.itemCount) {
            theReturnValue = true;
        }

        return theReturnValue;
    }
};