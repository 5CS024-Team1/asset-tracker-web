import { BASE_API_PATH } from './consts';

/*
Helper File for easily changing URL address'

Assets:
    Allocate asset      -   `${BASE_API_PATH}/assets/allocate`
    All assets          -   `${BASE_API_PATH}/assets/all/`
    Register Asset      -   `${BASE_API_PATH}/assets/register/`
    Get new asset ID    -   `${BASE_API_PATH}/assets/get/new-id`
    Deallocate asset    -   !BLANK FOR NOW!
    Assigned Assets     -   `${BASE_API_PATH}/assets/assigned-assets/` 

Users:
    Add User            -   `${BASE_API_PATH}/user/add/`
    All Users           -   `${BASE_API_PATH}/user/all/`
    Get New User ID     -   `${BASE_API_PATH}/user/get/new-id`
    Get admin users     -   `${BASE_API_PATH}/user/admin-users/`
*/

//Allocate asset
export function allocateAsset() {
    return `${BASE_API_PATH}/assets/allocate`
}
//All assets
export function allAssets() {
    return `${BASE_API_PATH}/assets/all/`
}
//Register Asset
export function registerAsset() {
    return `${BASE_API_PATH}/assets/register/`
}
//Get new asset ID
export function assetNewId() {
    return `${BASE_API_PATH}/assets/get/new-id`
}
/*
//Deallocate asset
export function deallocateAsset() {
    return `BLANK`
}
*/
//Assigned Assets
export function assignedAssets() {
    return `${BASE_API_PATH}/assets/assigned-assets/`
}
export function getAsset() {
    return `${BASE_API_PATH}/assets/get?id=${this.state.id}`
}
export function searchAsset() {
    return `${BASE_API_PATH}/assets/search?q=${this.state.query}`
}

//Add User
export function addUser() {
    return `${BASE_API_PATH}/user/add/`
}
//All Users
export function allUsers() {
    return `${BASE_API_PATH}/user/all/`
}
//Get New User ID
export function userNewId() {
    return `${BASE_API_PATH}/user/get/new-id`
}
//Get admin users
export function adminUsers() {
    return `${BASE_API_PATH}/user/admin-users/`
}
export function getUser() {
    return `${BASE_API_PATH}/user/get?id=${this.state.id}`
}

// Export list (names are variable names from config file NOT the names from the DB)
var id = "eqid";
var display_name = "eqname";
var category = "category";
var last_ping_time = "last_ping_time";
var date_loaned = "loaned";
var date_return = "owner_date_return";

var stfid = "idsstaff";
export { id, display_name, category, last_ping_time, date_loaned, date_return, stfid };