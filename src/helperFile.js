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
export function getAsset(id) {
    return `${BASE_API_PATH}/assets/get?id=${id}`
}
export function searchAsset(query) {
    return `${BASE_API_PATH}/assets/search?q=${query}`
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
// Get user info from id
export function getUser(id) {
    return `${BASE_API_PATH}/user/get?id=${id}`
}
// Get user info from id
export function removeUser() {
    return `${BASE_API_PATH}/user/remove/`
}
/// Login API path
export function login() {
    return `${BASE_API_PATH}/user/login/`;
}

// Export list (names are variable names from config file NOT the names from the DB)
var id = "id";
var display_name = "display_name";
var category = "category";
var last_ping_time = "last_ping_time";
var date_loaned = "date_loaned";
var date_return = "date_return";
var zone = "zone";

var stfid = "idsstaff";
var deleteId = "deleteId";
export { id, display_name, category, last_ping_time, date_loaned, date_return, zone, stfid, deleteId };