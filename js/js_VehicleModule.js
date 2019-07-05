/// <reference path="~/Scripts/jquery-3.1.0.intellisense.js" />
/// <reference path="~/Scripts/jquery-3.1.0.js" />
/// <reference path="~/Scripts/sugar.js" />
/// <reference path="~/Scripts/moment.js" />


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
    priceBase: null,

    //Price of all lines/packages/options/charges (ex: [10645])
    priceAdditions: null,

    //Total Price including lines/packages/options/charges (ex: [47495])
    priceTotal: null,

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
        $.when(getJsonFile('data/vehicle_paints.json')).done(function (data) {
            //Get the paint data that matches the code, year model and type (AG Code)
            thePaintObject = $.grep(data, function (paintItem) {
                return paintItem.code === theCode && paintItem.year === theYearModel && paintItem.agCode === theType;
            });

            theVehicle.paint.name = thePaintObject[0].name;
            theVehicle.paint.code = thePaintObject[0].code;
            theVehicle.paint.cost = thePaintObject[0].price;

            if (theVehicle.paint.cost.indexOf('$') > -1) {
                theVehicle.paint.standard = false;
                theVehicle.paint.type = 'Metallic';
            } else {
                theVehicle.paint.standard = true;
                theVehicle.paint.type = 'Non-Metallic';
            }

            this.paint = theVehicle.paint;
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
        $.when(getJsonFile('data/vehicle_upholsteries.json')).done(function (data) {
            //Get the upholstery data that matches the code, year model and type (AG Code)
            theUpholsteryObject = $.grep(data, function (upholsteryItem) {
                return upholsteryItem.code === theCode && upholsteryItem.year === theYearModel && upholsteryItem.agCode === theType;
            });

            theVehicle.upholstery.name = theUpholsteryObject[0].name;
            theVehicle.upholstery.code = theUpholsteryObject[0].code;
            theVehicle.upholstery.cost = theUpholsteryObject[0].price;

            if (theVehicle.upholstery.cost.indexOf('$') > -1) {
                theVehicle.upholstery.standard = false;
                theVehicle.upholstery.type = 'Leather';
            } else {
                theVehicle.upholstery.standard = true;
                theVehicle.upholstery.type = 'Sensatec';
            }

            this.upholstery = theVehicle.upholstery;
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

        return $.Deferred(function(dfd) {
            //Get the code data for the vehicle
            $.when(getJsonFile('data/vehicle_codes.json')).done(function(data) {
                //Get the code data that matches the code, year model and type (AG Code)
                var theCodeDataObject = $.grep(data, function(codeItem) {
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

        $selector.each(function() {
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
    // FUNCTION: Gets the "line" of the vehicle
    ///////////////////////////////////////////////////////////////////////////////////////////////////
    _getLine: function (theEquipmentOptions) {
        //Get the vehicle's year model & type
        var theYearModel = this.year;
        var theType = this.type;

        var theVehicle = this;

        var theLineObject;

        //Get the line data for the vehicle
        $.when(getJsonFile('data/vehicle_lines.json')).done(function (data) {
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
    _getPackages: function (theEquipmentOptions) {
        //Get the vehicle's year model & type
        var theYearModel = this.year;
        var theType = this.type;

        var theVehicle = this;

        var thePackageObject;

        //Get the package data for the vehicle
        $.when(getJsonFile('data/vehicle_packages.json')).done(function (data) {
            //Get the package data that matches the code, year model and type (AG Code)
            thePackageObject = $.grep(data, function (packageItem) {
                return packageItem.year === theYearModel && packageItem.agCode === theType && $.grep(theEquipmentOptions, function (theOption) {return theOption.packages.indexOf(packageItem.code) > -1}).length > 0;
            });

            theVehicle.packages = thePackageObject;

            this.packages = theVehicle.packages;
        });
    }
};