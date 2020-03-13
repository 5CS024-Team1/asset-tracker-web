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