/// <reference path="~/Scripts/jquery-3.1.0.intellisense.js" />
/// <reference path="~/Scripts/jquery-3.1.0.js" />
/// <reference path="~/Scripts/sugar.js" />
/// <reference path="~/Scripts/moment.js" />
/// <reference path="~/libs/jquery/jquery-ui.js" />

var codeData = [
{ "code": "1CA", "value": "CO2 relevant vehicles", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "1CC", "value": "Automatic Start/Stop function", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "205", "value": "STEPTRONIC automatic transmission", "description": "8-speed STEPTRONIC automatic transmission with Adaptive Transmission Control (ATC) provides extremely fast synchronized shifting in either the Sport or Manual shift mode. By increasing the number of gears to eight, the transmission provides a more efficient shifting sequence and improved fuel economy.", "type": "Options", "standard": "No", "lines": "-----", "packages": "-----" },
{ "code": "216", "value": "Servotronic", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "240", "value": "Leather steering wheel", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "248", "value": "Heated Steering Wheel", "description": "-----", "type": "Package Item", "standard": "No", "lines": "-----", "packages": "ZCW" },
{ "code": "249", "value": "Multi-function steering wheel", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "255", "value": "Sports leather steering wheel", "description": "Three-spoke leather-wrapped multi-function sport steering wheel, unique to the Sport Line, features a grip-enhancing cover with red decorative stitching to match the red contrasting rings surrounding the tachometer and speedometer in the instrument cluster.", "type": "Line Item", "standard": "No", "lines": "ZLL,ZML,ZSL", "packages": "-----" },
{ "code": "258", "value": "Run-flat tires", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "2A4", "value": "19' light alloy wheels Double-spoke style 401 with mixed tires", "description": "-----", "type": "Wheels", "standard": "No", "lines": "ZLL,ZML,ZSL", "packages": "-----" },
{ "code": "2A5", "value": "18' light alloy wheels Double-spoke style 397", "description": "-----", "type": "Wheels", "standard": "No", "lines": "ZSL", "packages": "-----" },
{ "code": "2DW", "value": "17' light alloy wheels Star-spoke style 393", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "2DY", "value": "18' light alloy wheels Star-spoke style 396", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "2H2", "value": "18' light alloy wheels Multi-spoke style-416", "description": "-----", "type": "Wheels", "standard": "No", "lines": "ZLL", "packages": "-----" },
{ "code": "2P5", "value": "18' light alloy wheels turbine styling 415", "description": "-----", "type": "Wheels", "standard": "No", "lines": "ZML", "packages": "-----" },
{ "code": "2PE", "value": "18' M light alloy wheels Star-spoke style 400 M with mixed tyres", "description": "-----", "type": "Wheels", "standard": "No", "lines": "ZMM", "packages": "-----" },
{ "code": "2PF", "value": "19' M light alloy wheels Star-spoke style 403 M with mixed tyres", "description": "-----", "type": "Wheels", "standard": "No", "lines": "ZMM", "packages": "-----" },
{ "code": "2PP", "value": "18' M light alloy wheels Star-spoke style 400 M", "description": "-----", "type": "Wheels", "standard": "No", "lines": "ZMM", "packages": "-----" },
{ "code": "2TB", "value": "Sport automatic transmission with shift paddles", "description": "Provides extremely fast synchronized shifting. By increasing the number of gears to eight, the transmission provides a more effi cient shifting sequence and improved fuel economy. Includes Adaptive Transmission Control (ATC) with Sport and Manual shift modes and steering wheel-mounted paddle shifters. When in Sport mode, shifts can be generated via the console-mounted shift lever or the paddle shifters.", "type": "Options", "standard": "No", "lines": "-----", "packages": "-----" },
{ "code": "2VB", "value": "Tire pressure monitor", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "2VF", "value": "Adaptive M Suspension", "description": "Adaptive M Suspension. This technologically advanced suspension system incorporates electronically controlled dampers that adapt to the style of the driver and driving conditions. Settings can be designated via the Driving Dynamics Control button. The Adaptive M Suspension also lowers the vehicle approximately 0.4 inch without sacrificing ride comfort. Stiffer, more dynamic system settings can be selected by activating the SPORT or SPORT+ mode.", "type": "Package Item", "standard": "No", "lines": "-----", "packages": "ZDH" },
{ "code": "2VL", "value": "Variable sport steering", "description": "Variable Sport Steering. This system continuously adjusts steering force and steering ratio – depending on the steering movement – to suit changing driving situations. As a result, you enjoy increased agility on winding roads, more stability at higher speeds, and great flexibility when parking.", "type": "Package Item", "standard": "No", "lines": "-----", "packages": "ZDH" },
{ "code": "300", "value": "Alpine White", "description": "-----", "type": "Exterior Color", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "302", "value": "Anti-theft alarm system", "description": "-----", "type": "Options", "standard": "No", "lines": "-----", "packages": "-----" },
{ "code": "319", "value": "Universal garage-door opener", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "322", "value": "Comfort Access keyless entry", "description": "Comfort Access system offers convenient keyless access to your vehicle. Carrying the remote key in a pocket or purse allows you to unlock the doors by touching the door handle. The new hands-free trunk-lid opening function automatically unlocks and opens the trunk when you stand behind the vehicle and move your foot under the center of the rear bumper.", "type": "Package Item", "standard": "No", "lines": "-----", "packages": "ZPP" },
{ "code": "337", "value": "M Sport Package", "description": "-----", "type": "Line Item", "standard": "No", "lines": "ZMM", "packages": "-----" },
{ "code": "3AG", "value": "Rear-view camera", "description": "Shows on the Control Display the area behind your vehicle. Working with Park Distance Control, interactive guidelines indicate if a parking space can accommodate the vehicle, and display parking trajectories and turn angles. The Rear-view Camera is activated by engaging reverse gear.", "type": "Options", "standard": "No", "lines": "-----", "packages": "ZDA" },
{ "code": "3BE", "value": "Door mirror caps in black", "description": "-----", "type": "Line Item", "standard": "No", "lines": "ZSL", "packages": "-----" },
{ "code": "403", "value": "Moonroof", "description": "Two-way power glass moonroof with one-touch operation slides backward or tilts up to let in as much fresh air and sky as you like. Includes a sliding interior sunshade.", "type": "Options", "standard": "No", "lines": "-----", "packages": "ZPP" },
{ "code": "417", "value": "Rear manual side window shades", "description": "-----", "type": "Options", "standard": "No", "lines": "-----", "packages": "-----" },
{ "code": "423", "value": "Floor mats", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "430", "value": "Auto-dimming interior and exterior mirrors", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "431", "value": "Auto-dimming rearview mirror", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "459", "value": "Power front seats with driver seat memory", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "465", "value": "Split fold-down-rear seat", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "475", "value": "Black Sapphire Metallic", "description": "-----", "type": "Exterior Color", "standard": "No", "lines": "-----", "packages": "-----" },
{ "code": "481", "value": "Sport seats", "description": "Front sport seats offer ten-way power adjustment including two-way manual adjustment of headrests. Aluminum Hexagon interior trim with Matte Estoril Blue accent contributes to the interior’s powerful looks.", "type": "Line Item", "standard": "No", "lines": "ZMM,ZSL", "packages": "-----" },
{ "code": "488", "value": "Lumbar support", "description": "Lumbar support for front seats adds four-way adjustable comfort for the lower back. Lumbar support can be adjusted up/down and in/out. ", "type": "Package Item", "standard": "No", "lines": "-----", "packages": "ZPP" },
{ "code": "493", "value": "Storage package", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "494", "value": "Heated front seats", "description": "Heated front seats are a welcome feature in cooler weather. By pressing the icon button, the seating surfaces - seat bottom, backrest and sides - are heated to your choice of three settings.", "type": "Options", "standard": "No", "lines": "-----", "packages": "ZCW" },
{ "code": "496", "value": "Heated rear seats", "description": "Heated rear seats offer multiple settings to warm the seat bottoms and backrests of the left and right seats.", "type": "Package Item", "standard": "No", "lines": "-----", "packages": "ZCW" },
{ "code": "497", "value": "Rear center armrest", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "4AB", "value": "Dark Burl Walnut wood trim", "description": "-----", "type": "Options", "standard": "No", "lines": "ZMM", "packages": "-----" },
{ "code": "4AT", "value": "High-Gloss Black trim", "description": "-----", "type": "Line Item", "standard": "No", "lines": "ZSL", "packages": "-----" },
{ "code": "4CE", "value": "Anthracite Wood Trim", "description": "-----", "type": "Line Item", "standard": "No", "lines": "ZLL,ZML,ZSL", "packages": "-----" },
{ "code": "4CG", "value": "Silver Matte Trim", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "4DM", "value": "Highlight trim finishers pearl gloss chrome", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "ZLL,ZML,ZMM,ZSL", "packages": "-----" },
{ "code": "4DN", "value": "Highlight trim finishers Coral Red matte", "description": "-----", "type": "Line Item", "standard": "No", "lines": "ZSL", "packages": "-----" },
{ "code": "4DX", "value": "Highlight trim finishers Estoril Blue matt", "description": "-----", "type": "Line Item", "standard": "No", "lines": "ZMM", "packages": "-----" },
{ "code": "4DZ", "value": "Dark Pearl Interior Trim", "description": "-----", "type": "Line Item", "standard": "No", "lines": "ZML", "packages": "-----" },
{ "code": "4MR", "value": "Aluminum Hexagon interior trim", "description": "-----", "type": "Line Item", "standard": "No", "lines": "ZMM", "packages": "-----" },
{ "code": "502", "value": "Retractable headlight washers", "description": "-----", "type": "Package Item", "standard": "No", "lines": "-----", "packages": "ZCW" },
{ "code": "508", "value": "Park Distance Control", "description": "Uses ultrasonic sensors in the front and rear bumpers to help you judge the distance to other cars and unseen objects when parking. The beeping becomes faster as your bumper approaches the object, turning into a constant tone when the distance is less than 12 inches.", "type": "Options", "standard": "No", "lines": "-----", "packages": "ZDA" },
{ "code": "520", "value": "Foglights", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "521", "value": "Rain sensor and auto headlights", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "522", "value": "Xenon headlights", "description": "Xenon low and high-beam headlights illuminate the road ahead and to the side. An auto-leveling feature adjusts for varying passenger and cargo loads.", "type": "Package Item", "standard": "No", "lines": "-----", "packages": "ZLP" },
{ "code": "524", "value": "Adaptive light control", "description": "Xenon Adaptive Headlights optimize road illumination when entering a turn or corner, helping to enhance visibility when driving at night. Sensors continuously monitor the angle of the steering wheel to determine the direction in which your vehicle is heading. The outer headlights swivel accordingly, up to 15 degrees left or right.", "type": "Package Item", "standard": "No", "lines": "-----", "packages": "ZLP" },
{ "code": "534", "value": "Automatic climate control", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "544", "value": "Dynamic Cruise Control", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "563", "value": "Ambiance lighting", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "575", "value": "Additional 12-V power sockets", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "5AC", "value": "Automatic high beams", "description": "Automatic high beams switch automatically between high and low beams according to oncoming traffic, traffic ahead, and the level of street lighting.", "type": "Options", "standard": "No", "lines": "-----", "packages": "-----" },
{ "code": "5AD", "value": "Lane Departure Warning", "description": "Lane Departure Warning uses a camera to recognize when your vehicle is crossing over roadway lane markings or is changing lanes without signaling, and warns you by sending a mild vibration through the steering wheel. The system can be turned on and off via a button by the steering wheel.", "type": "Package Item", "standard": "No", "lines": "-----", "packages": "ZDB" },
{ "code": "5AG", "value": "Active Blind Spot Detection", "description": "Active Blind Spot Detection warns if a vehicle is in your blind spot, or if a vehicle is approaching at high speed in the passing lane, by displaying a visual signal in the exterior mirror casing. The system also warns you by making the steering wheel vibrate should you then use the turn-signal indicator before executing a lane change.", "type": "Package Item", "standard": "No", "lines": "-----", "packages": "ZDA" },
{ "code": "5DF", "value": "Active Cruise Control", "description": "Active Cruise Control (ACC) with Stop & Go, including collision warning with brake activation. This system lets you preset both desired speed and following distance. When ACC recognizes slower vehicles ahead, it reduces your speed to maintain the preset distance. Stop & Go can bring you to a complete stop if traffic calls for it. When you press the accelerator, ACC resumes your speed according to your presets. In critical situations, if necessary, the collision warning with brake activation intervenes.", "type": "Options", "standard": "No", "lines": "-----", "packages": "-----" },
{ "code": "5DL", "value": "Side and Top View Cameras", "description": "Surround View displays video images of approaching traffic on the Control Display. Side-view Cameras positioned in the front bumpers show traffic approaching the front of the vehicle from the sides, such as when exiting a garage. The Top-view Camera provides video images of the road alongside the doors, taken by cameras positioned in the exterior mirrors.", "type": "Package Item", "standard": "No", "lines": "-----", "packages": "ZDA" },
{ "code": "5DP", "value": "Parking Assistant", "description": "Park Distance Control (PDC) uses ultrasonic sensors in the front and rear bumpers to help you judge the distance to other cars and unseen objects when parking. The beeping becomes faster as your bumper approaches the object, turning into a constant tone when the distance is less than 12 inches", "type": "Options", "standard": "No", "lines": "-----", "packages": "-----" },
{ "code": "609", "value": "Navigation system", "description": "Navigation system offers a high-resolution, glare-free monitor. Using GPS satellites in conjunction with data stored on an internal hard drive, a choice of detailed maps show - and tell - the directions to your desired destination. Features include 3-D daytime and nighttime maps, zoom, travel planner, and an Assistance Window. Additionally the hard drive offers 12 GB of space that can hold up to 2,000 songs. It also provides Real Time Traffic Information on potential traffic problems and solutions.", "type": "Options", "standard": "No", "lines": "-----", "packages": "ZTP" },
{ "code": "610", "value": "Head-up Display", "description": "Head-up Display projects important travel information, such as vehicle speed and Check Control warnings, onto the windshield directly in your field of vision. Data is shown in full color, making information even more precise and easier to process. Additional information, including Lane Departure Warning messages and Navigation directional arrows and instructions, can also be displayed.", "type": "Package Item", "standard": "No", "lines": "-----", "packages": "ZTP" },
{ "code": "615", "value": "Online Information Services", "description": "BMW Online allows online access to up-to-date fuel prices and gas station locations; the latest weather forecasts, advisories and warnings; Dow Jones, S&P 500 and NASDAQ indices; and the powerful reach of the Google Maps database – all delivered on the Control Display inside your vehicle. Access news headlines and have them read aloud via Text-to-speech technology. “Send to Mail” pinpoints your current location and planned destination, and allows you to send the information to any smartphone or email account. Then it’s just a quick hyperlink to Google Maps for your friends and family to see where you are and where you’re going.", "type": "Package Item", "standard": "No", "lines": "-----", "packages": "ZTP" },
{ "code": "645", "value": "Radio control US", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "653", "value": "HD Radio", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "655", "value": "Satellite radio with 1 year subscription", "description": "SiriusXM Satellite Radio lets you enjoy more than 130 channels of the most innovative satellite radio music, news, sports, talk, comedy and entertainment. All 69 music channels are commercial-free – and it’s delivered coast-to-coast in crystal-clear digital sound, 24 hours a day. “The Best of XM” offers additional premium programs, like Oprah Radio, 10 channels of XM Play-by-Play sports and more. You can also select Sirius channels through the iDrive system or Voice command, and enter them into the programmable memory buttons.", "type": "Package Item", "standard": "No", "lines": "-----", "packages": "ZPP" },
{ "code": "668", "value": "Jet Black", "description": "-----", "type": "Exterior Color", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "676", "value": "Hi-fi sound system", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "688", "value": "Harman Kardon surround sound system", "description": "16-speaker, multi-channel system that outputs reproduction of the surround information contained in the stereo signal in a nine-channel format as well as 5.1 surround sound from a DVD source. Includes a powerful 600-watt digital amplifier with nine channels. The system compensates for driving noise in smooth steps with speed-dependent equalizing. ", "type": "Options", "standard": "No", "lines": "-----", "packages": "-----" },
{ "code": "693", "value": "Satellite radio preparation", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "697", "value": "DVD Area coding (North America)", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "6NF", "value": "Smartphone Integration", "description": "-----", "type": "Package Item", "standard": "No", "lines": "-----", "packages": "ZTP" },
{ "code": "6NH", "value": "Hands-free Bluetooth and USB audio connection", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "6NL", "value": "BMW Assist with enhanced Bluetooth and USB", "description": "BMW Assist gives you peace of mind knowing that a friendly response specialist is there to help you 24/7, at the touch of a button. The Safety Plan includes Automatic Collision Notification, Emergency Request (SOS), TeleService, Enhanced Roadside Assistance, Door Unlock, Stolen Vehicle Recovery, Customer Relations and MyInfo. The Convenience Plan adds personalized Directions, Traffic and Weather reports, BMW Online and Concierge services for restaurant and hotel recommendations, with the destination address and phone number sent to your BMW. Make up to four operator-assisted calls per year with Critical Calling if your mobile phone is not available or its battery is discharged.", "type": "Options", "standard": "No", "lines": "-----", "packages": "ZTP" },
{ "code": "6NR", "value": "BMW Apps", "description": "'BMW Apps lets you access Social Networks, music PlugIn and Video Playback through your iPhone, and see them on the Display screen. Tune in to Web radio and search for stations from around the globe by name, location or genre.You can also store your favorite stations, find similar stations, display station information, and change the quality of the audio. Your favorite entries are stored on your iPhone, so you can take them with you from one vehicle to another.<br><br>Please note:<br>• A broadband data link is required. The costs for this (e.g., data roaming) are regulated by the customer agreement with the mobile phone service provider.<br>• Not all features available while vehicle is in motion; see dealer for details.<br>• Web radio audio quality depends on the bit rate of the station, and data reception  depends on your cell service. Data transfer comes over the iPhone.'", "type": "Options", "standard": "No", "lines": "-----", "packages": "ZTP" },
{ "code": "6UH", "value": "Real Time Traffic Information", "description": "Real Time Traffic Information is a valuable feature, included with the Navigation system, that makes you aware of traffic congestion in most large cities before you encounter it. This feature displays and describes current local traffic information on your Control Display; in case of delays greater than five minutes, it suggests alternate routes.", "type": "Package Item", "standard": "No", "lines": "-----", "packages": "ZTP" },
{ "code": "6WA", "value": "Instrument cluster with extended contents", "description": "Extended instrument cluster, included with the Navigation system, has a high-resolution Info Display showing functions for the Check Control as well as Navigation system prompts and operational feedback. With the ECO PRO mode activated, EfficientDynamics data are displayed in the rev counter.", "type": "Package Item", "standard": "No", "lines": "-----", "packages": "ZTP" },
{ "code": "704", "value": "Sport suspension", "description": "-----", "type": "Line Item", "standard": "No", "lines": "ZMM,ZSL", "packages": "-----" },
{ "code": "710", "value": "M steering wheel", "description": "-----", "type": "Line Item", "standard": "No", "lines": "ZMM", "packages": "-----" },
{ "code": "715", "value": "Aerodynamic kit", "description": "-----", "type": "Line Item", "standard": "No", "lines": "ZMM", "packages": "-----" },
{ "code": "760", "value": "Shadowline exterior trim", "description": "-----", "type": "Line Item", "standard": "No", "lines": "ZMM", "packages": "-----" },
{ "code": "775", "value": "Anthracite headliner", "description": "-----", "type": "Line Item", "standard": "No", "lines": "ZMM,ZSL", "packages": "-----" },
{ "code": "7AC", "value": "Sport Line", "description": "-----", "type": "Line Item", "standard": "No", "lines": "ZSL", "packages": "-----" },
{ "code": "7S1", "value": "Modern Line", "description": "-----", "type": "Line Item", "standard": "No", "lines": "ZML", "packages": "-----" },
{ "code": "7S2", "value": "Luxury Line", "description": "-----", "type": "Line Item", "standard": "No", "lines": "ZLL", "packages": "-----" },
{ "code": "818", "value": "Battery switch", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "840", "value": "Increased top speed limiter", "description": "-----", "type": "Line Item", "standard": "No", "lines": "ZMM,ZSL", "packages": "-----" },
{ "code": "8SC", "value": "TeleService Activation", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "-----", "packages": "-----" },
{ "code": "8TH", "value": "Speed Limit Info", "description": "Speed Limit Info detects local speed limit signs and shows them in the Info Display and Head-up Display.", "type": "Package Item", "standard": "No", "lines": "-----", "packages": "ZDB" },
{ "code": "A17", "value": "Mojave Metallic", "description": "-----", "type": "Exterior Color", "standard": "No", "lines": "-----", "packages": "-----" },
{ "code": "A75", "value": "Melbourne Red Metallic", "description": "-----", "type": "Exterior Color", "standard": "No", "lines": "-----", "packages": "-----" },
{ "code": "A83", "value": "Glacier Silver Metallic", "description": "-----", "type": "Exterior Color", "standard": "No", "lines": "-----", "packages": "-----" },
{ "code": "A89", "value": "Imperial Blue Metallic", "description": "-----", "type": "Exterior Color", "standard": "No", "lines": "-----", "packages": "-----" },
{ "code": "A92", "value": "Orion Silver Metallic", "description": "-----", "type": "Exterior Color", "standard": "No", "lines": "-----", "packages": "-----" },
{ "code": "A96", "value": "Mineral White Metallic", "description": "-----", "type": "Exterior Color", "standard": "No", "lines": "-----", "packages": "-----" },
{ "code": "B06", "value": "Sparkling Bronze Metallic", "description": "-----", "type": "Exterior Color", "standard": "No", "lines": "-----", "packages": "-----" },
{ "code": "B39", "value": "Mineral Grey Metallic", "description": "-----", "type": "Exterior Color", "standard": "No", "lines": "-----", "packages": "-----" },
{ "code": "B40", "value": "Liquid Blue Metallic", "description": "-----", "type": "Exterior Color", "standard": "No", "lines": "-----", "packages": "-----" },
{ "code": "B45", "value": "Estoril Blue", "description": "-----", "type": "Exterior Color", "standard": "No", "lines": "ZMM", "packages": "-----" },
{ "code": "KC", "value": "Leatherette", "description": "-----", "type": "Upholstery Type", "standard": "Yes", "lines": "ZMM,ZSL", "packages": "-----" },
{ "code": "KCDF", "value": "Venetian Beige Leatherette", "description": "-----", "type": "Upholstery", "standard": "Yes", "lines": "ZMM", "packages": "-----" },
{ "code": "KCL3", "value": "Black Leatherette/Red Highlight", "description": "-----", "type": "Upholstery", "standard": "Yes", "lines": "ZSL", "packages": "-----" },
{ "code": "KCSW", "value": "Black Leatherette", "description": "-----", "type": "Upholstery", "standard": "Yes", "lines": "ZMM", "packages": "-----" },
{ "code": "LC", "value": "Leather Dakota", "description": "-----", "type": "Upholstery Type", "standard": "No", "lines": "ZLL,ZML,ZMM,ZSL", "packages": "ZPP" },
{ "code": "LCDF", "value": "Venetian Beige Dakota Leather", "description": "-----", "type": "Upholstery", "standard": "No", "lines": "ZMM", "packages": "-----" },
{ "code": "LCL3", "value": "Leather Dakota Black/Red highlight", "description": "-----", "type": "Upholstery", "standard": "No", "lines": "ZSL", "packages": "-----" },
{ "code": "LCL4", "value": "Leather Dakota Everest Grey/Black highlight", "description": "-----", "type": "Upholstery", "standard": "No", "lines": "ZSL", "packages": "-----" },
{ "code": "LCL5", "value": "Leather Dakota Coral Red/Black highlight", "description": "-----", "type": "Upholstery", "standard": "No", "lines": "ZMM,ZSL", "packages": "-----" },
{ "code": "LCL8", "value": "Black with Dark Oyster", "description": "-----", "type": "Upholstery", "standard": "No", "lines": "ZML", "packages": "-----" },
{ "code": "LCL9", "value": "Leather Dakota Oyster/accent Oyster dark", "description": "-----", "type": "Upholstery", "standard": "No", "lines": "ZML", "packages": "-----" },
{ "code": "LCLX", "value": "Leather Dakota Saddle Brown exclusive stitching", "description": "-----", "type": "Upholstery", "standard": "No", "lines": "ZLL", "packages": "-----" },
{ "code": "LCLY", "value": "Leather Dakota Veneto Beige exclusive stitching", "description": "-----", "type": "Upholstery", "standard": "No", "lines": "ZLL", "packages": "-----" },
{ "code": "LCLZ", "value": "Leather Dakota Black exclusive stitching", "description": "-----", "type": "Upholstery", "standard": "No", "lines": "ZLL", "packages": "-----" },
{ "code": "LCSW", "value": "Black Dakota Leather", "description": "-----", "type": "Upholstery", "standard": "No", "lines": "ZMM", "packages": "-----" },
{ "code": "ZAS", "value": "All Season Tires", "description": "-----", "type": "Standard", "standard": "Yes", "lines": "ZLL,ZML,ZMM,ZSL", "packages": "-----" },
{ "code": "ZCW", "value": "Cold Weather Package", "description": "-----", "type": "Package", "standard": "No", "lines": "-----", "packages": "ZCW " },
{ "code": "ZDA", "value": "Driver Assistance Package", "description": "-----", "type": "Package", "standard": "No", "lines": "-----", "packages": "ZDA " },
{ "code": "ZDB", "value": "Driver Assistance Plus", "description": "-----", "type": "Package", "standard": "No", "lines": "-----", "packages": "ZDB " },
{ "code": "ZDH", "value": "Dynamic Handling Package", "description": "-----", "type": "Package", "standard": "No", "lines": "-----", "packages": "ZDH " },
{ "code": "ZLL", "value": "Luxury Line", "description": "'Interior equipment features:<br> - Door-sill finishers in aluminum with “BMW Luxury” lettering<br> - Leather-wrapped sport steering wheel<br> - Dakota Leather upholstery with exclusive stitching<br> - Lower dashboard in brown color in combination with Saddle Brown Dakota Leather upholstery with exclusive stitching<br> - Interior trim in Fineline Anthracite Wood or Burl Walnut Wood with wood inlay and contrasting Pearl Gloss Chrome highlight<br> - Chrome trim rings for air conditioning and radio controls<br> - Center console with Luxury Line exclusive Chrome surround<br> - Interior illumination with variable color effects in Orange-Red or White, selected via the iDrive Controller<br> - Signature key fob with Pearl Gloss Chrome trim<br><br>Exterior equipment features:<br> - Multi Spoke (Style 416) 18 x 8.0 light alloy wheels and 225/45 run-flat all-season tires<br> - Optional Double Spoke (Style 401) 19 x 8.0 front, 19 x 8.5 rear light alloy wheels with 225/40 front and 255/35 rear run-flat performance tires.<br> - Front and rear bumpers and air intakes with Chrome accent<br> - Chrome kidney grille slats<br> - Chrome exhaust pipe tips<br> - Chrome window surround'", "type": "Line", "standard": "No", "lines": "ZLL ", "packages": "-----" },
{ "code": "ZLP", "value": "Lighting Package", "description": "-----", "type": "Package", "standard": "No", "lines": "-----", "packages": "ZLP " },
{ "code": "ZML", "value": "Modern Line", "description": "'Interior equipment features:<br> - Door-sill finishers in aluminum with “BMW Modern” lettering<br> - Oyster Dakota Leather upholstery with Dark Oyster highlight piping; Oyster dashboard and leather-wrapped sport steering wheel<br> - Black Dakota Leather upholstery with Dark Oyster highlight piping; Black upper dashboard and leather-wrapped sport steering wheel<br> - Interior trim in Dark Pearl Metallic, Aluminum, Fineline Pure Wood or Fineline Anthracite Wood with Pearl Gloss Chrome highlight<br> - Pearl Gloss Chrome trim for air conditioning and radio controls<br> - Interior illumination with variable color effects in Orange-Red or White, selected via the iDrive Controller<br> - Signature key fob in Oyster with Pearl Gloss Chrome trim<br><br>Exterior equipment features:<br> - Turbine (Style 415) 18 x 8.0 light alloy wheels and 225/45 run-flat all-season tires<br> - Optional Double Spoke (Style 401) 19 x 8.0 front, 19 x 8.5 rear light alloy wheels with 225/40 front and 255/35 rear run-flat performance tires<br> - Front and rear bumpers and air intakes, kidney grille slats and exhaust pipe tips in exclusive satin aluminum design'", "type": "Line", "standard": "No", "lines": "ZML ", "packages": "-----" },
{ "code": "ZMM", "value": "M Sport Line", "description": "'Interior equipment features:<br> - Door-sill nishers in aluminum with “BMW M” lettering<br> - Leather-wrapped multi-function M sport steering wheel<br> - Power sport seats for driver and front passenger<br> - Aluminum Hexagon interior trim with accent trim in either Matte Estoril Blue or High Gloss Black, or Dark Burl Walnut Wood trim with Pearl Gloss Chrome highlight<br> - Shortened gear shift lever (with manual transmission) with M logo<br> - Speedometer and tachometer with red readouts<br> - Interior illumination with variable color effects in Orange-Red or White, selected via the radio or iDrive Controller<br> - Anthracite headliner<br> - M footrest<br> - Signature M Sport Line key fob with blue trim<br> <br>Exterior equipment features:<br> - Star Spoke (Style 400M) light alloy wheels, 18 x 8.0 front, 18 x 8.5 rear; 225/45 front and 255/40 rear run-flat performance tires or 18 x 8.0 light alloy wheels, with 225/45 run-flat all-season tires<br> - Optional Star Spoke (Style 403M) light alloy wheels, 19 x 8.0 front, 19 x 8.5 rear; 225/40 front and 255/35 rear run-flat performance tires<br> - M Aerodynamic package including front and rear bumpers<br> - Front air dam, rear apron, rear spoiler and side skirts'", "type": "Line", "standard": "No", "lines": "ZMM ", "packages": "-----" },
{ "code": "ZMT", "value": "Manual Transmission", "description": "-----", "type": "Options", "standard": "No", "lines": "-----", "packages": "-----" },
{ "code": "ZPP", "value": "Premium Package", "description": "-----", "type": "Package", "standard": "No", "lines": "-----", "packages": "ZPP " },
{ "code": "ZPT", "value": "Performance Summer Tires", "description": "-----", "type": "Line Item", "standard": "No", "lines": "ZLL,ZML,ZMM,ZSL", "packages": "-----" },
{ "code": "ZSL", "value": "Sport Line", "description": "'Interior equipment features:<br> - Door-sill finishers in aluminum with ''BMW Sport'' lettering<br> - Leather-wrapped sport steering wheel with red contrast stitching<br> - Sport seats in Black Leatherette and contrasting Red highlight piping<br> - Dakota Leather Upholstery with contrast stitching and piping<br> - Interior trim in Black High Gloss, Fineline Anthracite Wood with Pearl Gloss Chrome highlight, or Aluminum with Red or Black highlight<br> - Chrome trim for air conditioning and radio controls<br> - Instrument cluster with red highlight and red contrasting rings<br> - Interior illumination with variable color effects in Orange-Red or White, selected via the iDrive Controller<br> - Available 8-speed Sport Automatic transmission<br> - Anthracite headliner<br> - Signature key fob with red trim<br><br>Exterior equipment features:<br> - Double Spoke (Style 397) 18 x 8.0 light alloy wheels and 225/45 run-flat performance or all-season tires<br> - Optional Double Spoke (Style 401) 19 x 8.0 front, 19 x 8.5 rear light alloy wheels with 225/40 front and 255/35 rear run-flat performance tires<br> - Kidney grille slats, B-pillar, front and rear bumpers and air intakes specially designed in high-gloss black<br> - Black exterior mirror caps and chrome black exhaust pipe tips<br> - Sport suspension (328i and 335i)'", "type": "Line", "standard": "No", "lines": "ZSL ", "packages": "-----" },
{ "code": "ZTP", "value": "Technology Package", "description": "-----", "type": "Package", "standard": "No", "lines": "-----", "packages": "ZTP " }
];

var colorData = [
{ 'code': '475', 'name': 'Black Sapphire Metallic', 'price': '$550.00' },
{ 'code': 'A17', 'name': 'Mojave Metallic', 'price': '$550.00' },
{ 'code': 'A75', 'name': 'Melbourne Red Metallic', 'price': '$550.00' },
{ 'code': 'A83', 'name': 'Glacier Silver Metallic', 'price': '$550.00' },
{ 'code': 'A89', 'name': 'Imperial Blue Metallic', 'price': '$550.00' },
{ 'code': 'A92', 'name': 'Orion Silver Metallic', 'price': '$550.00' },
{ 'code': 'A96', 'name': 'Mineral White Metallic', 'price': '$550.00' },
{ 'code': 'B06', 'name': 'Sparkling Bronze Metallic', 'price': '$550.00' },
{ 'code': 'B39', 'name': 'Mineral Grey Metallic', 'price': '$550.00' },
{ 'code': 'B40', 'name': 'Liquid Blue Metallic', 'price': '$550.00' },
{ 'code': 'B45', 'name': 'Estoril Blue', 'price': '$550.00' }
];

var lineData = [
{ 'code': 'ZLL', 'name': 'Luxury Line', 'price': '$2,100.00' },
{ 'code': 'ZML', 'name': 'Modern Line', 'price': '$2,100.00' },
{ 'code': 'ZMM', 'name': 'M Sport Line', 'price': '$3,850.00' },
{ 'code': 'ZSL', 'name': 'Sport Line', 'price': '$2,500.00' }
];

var packageData = [
{ 'code': 'ZCW', 'name': 'Cold Weather Package', 'price': '$950.00' },
{ 'code': 'ZDA', 'name': 'Driver Assistance Package', 'price': '$1,900.00' },
{ 'code': 'ZDB', 'name': 'Driver Assistance Plus', 'price': '$700.00' },
{ 'code': 'ZDH', 'name': 'Dynamic Handling Package', 'price': '$1,000.00' },
{ 'code': 'ZLP', 'name': 'Lighting Package', 'price': '$900.00' },
{ 'code': 'ZPP', 'name': 'Premium Package', 'price': '$3,100.00' },
{ 'code': 'ZTP', 'name': 'Technology Package', 'price': '$3,100.00' }
];

var wheelData = [
{ 'code': '2A4', 'style': '401', 'description': '19" light alloy wheels Double-spoke style 401 with mixed tires', 'diameter': '19', 'front': '19x8.0, 225/40 R19', 'rear': '19x8.5, 255/35 R19', 'tireCode': 'ZPT' },
{ 'code': '2A5', 'style': '397', 'description': '18" light alloy wheels Double-spoke style 397', 'diameter': '18', 'front': '18x8.0, 225/45 R18', 'rear': '18x8.0, 225/45 R18', 'tireCode': 'ZAS,ZPT' },
{ 'code': '2DW', 'style': '393', 'description': '17" light alloy wheels Star-spoke style 393', 'diameter': '17', 'front': '17x7.5, 225/50 R17', 'rear': '17x7.5, 225/50 R17', 'tireCode': 'ZAS' },
{ 'code': '2DY', 'style': '396', 'description': '18" light alloy wheels Star-spoke style 396', 'diameter': '18', 'front': '18x8.0, 225/45 R18', 'rear': '18x8.0, 225/45 R18', 'tireCode': 'ZAS' },
{ 'code': '2H2', 'style': '416', 'description': '18" light alloy wheels Multi-spoke style-416', 'diameter': '18', 'front': '18x8.0, 225/45 R18', 'rear': '18x8.0, 225/45 R18', 'tireCode': 'ZAS' },
{ 'code': '2P5', 'style': '415', 'description': '18" light alloy wheels turbine styling 415', 'diameter': '18', 'front': '18x8.0, 225/45 R18', 'rear': '18x8.0, 225/45 R18', 'tireCode': 'ZAS' },
{ 'code': '2PE', 'style': '400M', 'description': '18" M light alloy wheels Star-spoke style 400 M with mixed tyres', 'diameter': '18', 'front': '18x8.0, 225/45 R18', 'rear': '18x8.5, 255/40 R18', 'tireCode': 'ZPT' },
{ 'code': '2PF', 'style': '403M', 'description': '19" M light alloy wheels Star-spoke style 403 M with mixed tyres', 'diameter': '19', 'front': '19x8.0, 225/40 R19', 'rear': '19x8.5, 255/35 R19', 'tireCode': 'ZPT' },
{ 'code': '2PP', 'style': '400', 'description': '18" M light alloy wheels Star-spoke style 400 M', 'diameter': '18', 'front': '18x8.0, 225/45 R18', 'rear': '18x8.0, 225/45 R18', 'tireCode': 'ZAS' }
];


/////////////////////////////////////////////////////////////////////////////
// Stuff to do when DOM is ready
/////////////////////////////////////////////////////////////////////////////
$(document).ready(function () {
    //Remove unnecessary stuff from page
    $('#sub_navigation,#header,#main_navigation,div.community,#footer,div.right_column,#translate_button,#forum_button,#banner5_container,div.vincode-right-div,#banner8_container').remove();
    
    //Make the VIN code input max length 7 characters
    $('input[name="vincode"]').attr('maxlength', '7');

    displayResults();
});


/////////////////////////////////////////////////////////////////////////////
// Search button click event
/////////////////////////////////////////////////////////////////////////////
$(document).on('click', '#vincode_submit', function (e) {
    e.preventDefault();
    console.log('Submit button clicked');

    var theVin7 = $('input[name="vincode"]').val().trim();

    //GM_getValue(theVin7)
    if (theVin7.length < 7) {
        alert('VIN is < 7 characters!');
    } else if (theVin7.length > 7) {
        alert('VIN is > 7 characters!');
    } else if (GM_getValue(theVin7)) {
        console.log(GM_getValue(theVin7 + 'BMW'));
        console.log(GM_getValue(theVin7 + 'Cars'));

        //declare a variable to hold the message
        var dynamicDialog = $('<div id="MyDialog">\
            <P>You have already looked up this VIN; do yo want to look it up again?</P>\
            <P>Current Vehicle Status (BMW): ' + GM_getValue(theVin7 + 'BMW') + '</P>\
            <P>Current Vehicle Status (Cars.com): ' + GM_getValue(theVin7 + 'Cars') + '</P>\
            </div>');

        dynamicDialog.dialog(
            {
                modal: true,
                dialogClass: 'no-close',
                buttons: [
                    {
                        text: 'Yes', click: function () {
                            $(this).dialog('close');
                            getVinInfo('vincode_check_form', 'error_block', 'vincode_loader', 'vincode_res_container', 'vincode_res_block', 'vincode_submit', 'eng');
                        }
                    },
                    {
                        text: 'No', click: function () {
                            $(this).dialog('close');
                        }
                    }
                ]
            });
    } else {
        GM_setValue(theVin7, 'searched');
        getVinInfo('vincode_check_form', 'error_block', 'vincode_loader', 'vincode_res_container', 'vincode_res_block', 'vincode_submit', 'eng');
    }
});


/////////////////////////////////////////////////////////////////////////////
// Display the results
/////////////////////////////////////////////////////////////////////////////
function displayResults() {
    var $vehicleInfoCells = $('td.header1').parent('tr').closest('table').find('td.a8b:nth-child(2)');
	var $codeCells = $('#vincode_res_block table:eq(1), #vincode_res_block table:eq(2)').find('td.a8b:first-child');

	$('.left_column, #wrapper').css('width', '100%');
	$('#vincode_res_block table').attr('width', '95%');

	$('#vincode_res_block table:eq(1)').find('td.a8g').last().after('<td>Value</td><td>Description</td><td>Type</td><td>Standard?</td><td>Line(s)</td><td>Package(s)</td>');
	$('#vincode_res_block table:eq(2)').find('td.a8g').last().after('<td>Value</td><td>Description</td><td>Type</td><td>Standard?</td><td>Line(s)</td><td>Package(s)</td>');

    $vehicleInfoCells.each(function() {
        var theText = $(this).text().trim();
        var $theParentRow1 = $(this).parent('tr');
        
        var result1 = $.grep(colorData, function(e) {
            if (theText.indexOf(e.code) > -1 || theText.indexOf('LC') > -1) {
                return true;
            } else {
                return false;
            }
		});
        
        if (result1.length > 0) {
			$theParentRow1.find('td').css('background-color', 'LightGreen');
		}
    });
    
	$codeCells.each(function() {
		var theCode = $(this).text().trim();

		var $theParentRow = $(this).parent('tr');

		var $tdValue = $('<td>');
		var $tdDescription = $('<td>');
		var $tdType = $('<td>');
		var $tdStandard = $('<td>');
		var $tdLines = $('<td>');
		var $tdPackages = $('<td>');

		var result = $.grep(codeData, function(e) {
			return e.code === theCode;
		});

		if (result.length === 0) {
			// not found
			console.log('NOT FOUND');
		} else if (result.length === 1) {
			// access the foo property using result[0].foo
			$tdValue.text(result[0].value);
			$tdDescription.html(result[0].description);
			$tdType.text(result[0].type);
			$tdStandard.text(result[0].standard);
			$tdLines.text(result[0].lines);
			$tdPackages.text(result[0].packages);
		} else {
			// multiple items found
			console.log('MULTIPLE ITEMS FOUND');
		}

		$theParentRow.append([$tdValue, $tdDescription, $tdType, $tdStandard, $tdLines, $tdPackages]);

		if (result.length === 1 && result[0].standard === 'No') {
			$theParentRow.find('td').css('background-color', 'LightGreen');
		} else if (result.length === 0) {
		    $theParentRow.find('td')
                .css('background-color', 'Red')
                .css('color', 'White');
		}
	});
}


/////////////////////////////////////////////////////////////////////////////
// Get JSON file using AJAX
/////////////////////////////////////////////////////////////////////////////
function getVinInfo(form, error_block, loader_block, vincode_res_container, result_block, button, user_lang){
	var myform = $('#' + form);
	
	var req = new JsHttpRequest();
    
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
			//document.getElementById(button).disabled=false;
            $('#' + button).prop('disabled', false);
            
			//document.getElementById(loader_block).style.display='none';
            $('#' + loader_block).css('display','none');
            
			if (req.responseJS.error_text !== '') {
				//document.getElementById(error_block).style.display='block';
                $('#' + error_block).css('display','block');
                
				//document.getElementById(error_block).innerHTML='<br />'+req.responseJS.error_text+'<br />';
                $('#' + error_block).html('<br />'+req.responseJS.error_text+'<br />');
			} else {
				//document.getElementById(error_block).style.display='none';
                $('#' + error_block).css('display','none');
                
				//document.getElementById(vincode_res_container).style.display='block';
                $('#' + vincode_res_container).css('display','block');
                
				//document.getElementById('vincode_attempts_num').innerHTML=req.responseJS.vincode_attempts_num;
                $('#vincode_attempts_num').html(req.responseJS.vincode_attempts_num);
                
				//document.getElementById(result_block).innerHTML=req.responseText;
                $('#' + result_block).html(req.responseText);
                
				//myform.elements['mvalue'].value="";
                $('input.mcaptcha').val('');
                
                displayResults();
                
				//reloadCaptcha();
			};
        }
    }
    
	//document.getElementById(button).disabled=true;
    $('#' + button).prop('disabled', true);
    
	//document.getElementById(loader_block).style.display='block';
    $('#' + loader_block).css('display','block');
    
    // Prepare request object (automatically choose GET or POST).
    req.open(null, '/lib/vincode/get_info.php', true);
    
    // Send whole form data to backend.
    req.send( { 'vc_lang':user_lang, 'mvalue':$('input.mcaptcha').val(), 'vincode':$('input[name=vincode]').val()} ); 
    
    //console.log($('input.mcaptcha').val());
    //console.log($('input[name=vincode]').val());
}


/////////////////////////////////////////////////////////////////////////////
// Get JSON file using AJAX
/////////////////////////////////////////////////////////////////////////////
function getJsonFile(filePath) {
    return $.ajax({
        url: 'http://www.friskylingo.com/' + filePath,
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    });
}