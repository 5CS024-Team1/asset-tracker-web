/* Utility for storing functions to use around the app */

/// Converts the dateTime stores in the database to a date object
export const convertDateFromDb = (dbDateTime) => {
    if(!dbDateTime)
        return new Date();

    // Split original string by space
    var split = dbDateTime.split(' ');
    // then split date by '-' separator
    var dateSplit = split[0].split('-');
    // Funnily enough, Date object stores month/day from 0-11. God knows why!
    return new Date(dateSplit[0], parseInt(dateSplit[1]) - 1, parseInt(dateSplit[2]) - 1);
}