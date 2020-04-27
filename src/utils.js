/* Utility for storing functions to use around the app */

/// Converts a dateTime string stored in the database to a JS date object
/// Expected string format "YYYY-MM-DD HH:MM"
export const convertDateFromDb = (dbDateTime) => {
    if(!dbDateTime)
        return new Date();

    // Split original string by space
    var split = dbDateTime.split(' ');
    if (split.length <= 0) {
        return new Date();
    }

    // Split date by '-' and time by ':' separators
    var dateSplit = split[0].split('-');
    var timeSplit = split[1].split(":");

    // Funnily enough, Date object stores month from 0-11. God knows why!
    var date = new Date(dateSplit[0],
        parseInt(dateSplit[1]) - 1, 
        parseInt(dateSplit[2]), 
        parseInt(timeSplit[0]), 
        parseInt(timeSplit[1]), 
        parseInt(timeSplit[2]));
    return date;
}
