/**
 * Celebrates when it's Fallentines and gives information about it
 *
 * Written By: Paras DPain
 * Date Written: 7/11/2016
 */

"use strict";

const aboutFallentines = "On the 6th of November, 2016 Fallentines was declared when the bros in Seiba chat" +
    " opened up about their love life and added a whole new aspect to the group chat. It's a day about love and feelings!";
const todayFallentines = "Wooooo! Today is Fallentines Day :D The day we share love and feelings with everyone." +
    " Let's feels train begin /˳˳_˳˳\!˳˳X˳˳!(˳˳_˳˳)[˳˳_˳˳]";

var dayCheck = false;
var calledToday = false;

exports.findDays = (dateToday, dateFallentines) => {
    // ref: http://stackoverflow.com/a/2627482/4111842

    // The number of milliseconds in one day
    var ONE_DAY = 1000 * 60 * 60 * 24;

    var difference_days = Math.round((dateFallentines.getTime() - dateToday.getTime()) / ONE_DAY);

    // Return as appropriate
    if (difference_days === 0) {
        // Indicates Fallentines is today
        return 0;
    } else if (difference_days > 0) {
        // Indicates Fallentines is in the current year
        return Math.round(difference_days);
    } else {
        // Indicates Fallentines is next year
        return Math.round(365 + difference_days);
    }
}

exports.match = (event, commandPrefix) => {
    // Update state and call run
    if (event.arguments[0] === commandPrefix + "fallen") {
        dayCheck = false;
    } else {
        dayCheck = true;
    }
    return true;

}

exports.run = (api, event) => {
    var daysLeft = findDays(new Date(), new Date(new Date().getFullYear(), 10, 6)); // Fallentines is on 6th Nov
    if (!calledToday) {
        // If it's today and hasn't been announced yet
        if (daysLeft === 0) {
            api.sendMessage(todayFallentines, event.thread_id);
        } else if (dayCheck) {
            // start a timer
            var dateObj = new Date();
            setTimeout(function () {
                api.sendMessage(todayFallentines, event.thread_id);
            }, daysLeft * 24 * 60 * 60 * 1000); // Convert daysLeft to milliseconds of all those days
        }
    } else if (!dayCheck) { // Branched out as it'll be called in both dayCheck and !dayCheck cases
        // User has used the command, must send a message
        api.sendMessage(aboutFallentines + "It's in " + daysLeft + " days.", event.thread_id);
    }
        calledToday = true; // 

}