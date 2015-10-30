// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
/*(function () {
	"use strict";

	var app = WinJS.Application;
	var activation = Windows.ApplicationModel.Activation;

	app.onactivated = function (args) {
		if (args.detail.kind === activation.ActivationKind.launch) {
			if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
				// TODO: This application has been newly launched. Initialize your application here.
			} else {
				// TODO: This application was suspended and then terminated.
				// To create a smooth user experience, restore application state here so that it looks like the app never stopped running.
			}
			args.setPromise(WinJS.UI.processAll());
		}
	};

	app.oncheckpoint = function (args) {
		// TODO: This application is about to be suspended. Save any state that needs to persist across suspensions here.
		// You might use the WinJS.Application.sessionState object, which is automatically saved and restored across suspension.
		// If you need to complete an asynchronous operation before your application is suspended, call args.setPromise().
	};

	app.start();
})();*/

//////////////////////////////////////////////////
// Clamp
//
function clamp(val, min, max) {
    return (val > max) ? max : (val < min) ? min : val;
}

//////////////////////////////////////////////////
// Returns a formatted string
//
function printPretty(tDays, tHours, tMins) {
    var retString = "You will amass the required amount of Aetherium in ";

    // Format Raw values
    var f_tDays = Math.floor(tDays);
    var f_tHours = Math.floor(tHours) % 24;
    var f_tMins = Math.floor(tMins) % 60;

    // Do we need to print days?
    if (f_tDays >= 1) {
        retString += f_tDays;

        // Format Text
        if (f_tDays > 1) retString += " days";
        else retString += " day";

        if (f_tHours > 0 || f_tMins > 0) retString += ", ";
    }

    if (f_tHours >= 1) {
        retString += f_tHours;

        // Format Text
        if (f_tHours > 1) retString += " hours";
        else retString += " hour";

        if (f_tMins > 0) retString += " and ";
    }

    if (f_tMins >= 1) {
        retString += f_tMins;

        // Format Text
        if (f_tMins > 1)
            retString += " minutes\n";
        else
            retString += " minute\n";
    }

    // Calculate when this is going to be done
    var tEst = new Date();
    tEst.setDate(tEst.getDate + f_tDays);
    tEst.setHours(tEst.getHours() + f_tHours);
    tEst.setMinutes(tEst.getMinutes() + f_tMins);

    //retString += "        This will occur on " + tEst.getDate() + " " + tEst.getHours() + " " + tEst.getMinutes();
    
    return retString;
}

function calcAether() {
    var mineRateDelay = [60,50,0,0,0,0,0];
    var oField = document.getElementById("oField");
    var oFieldForBoost = document.getElementById("oFieldForBoost");
    var aetherNeeded = document.getElementById("AetherNeeded").value;
    var aetherOnHand = document.getElementById("AetherOnHand").value;
    var mineRate = document.getElementById("MineLevel").value;


    var deltaAether = aetherNeeded - aetherOnHand;
    if (deltaAether <= 0) {
        alert("Please enter a valid input");
        return;
    }

    // We have a valid input
    document.getElementById("boost").innerHTML = "";

    var timeMinutes = deltaAether / (60 / mineRateDelay[mineRate]);
    var timeHours = timeMinutes / 60;
    var timeDays = timeMinutes / 1440;

    // Create our output string
    var messageOut = printPretty(timeDays, timeHours, timeMinutes);
    oField.innerHTML = "<p>" + messageOut + "</p>";

    // Create our output string
    //var messageOut = printPretty(timeDays / 1.25, timeHours / 1.25, timeMinutes / 1.25);
    //oFieldForBoost.innerHTML = "";

};
