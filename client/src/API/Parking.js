import { APIURL } from './APIUrl';
/* Credentials required  */
/**
 *
 * @param parking is a parking lot descripted in ./Utils/Parking.js
 */
async function addParking(parking) {
    const url = APIURL + '/api/parking';
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(parking),
        });
        if(response.ok) {
            return true;
        } else {
            const errDetails = await response.text();
            throw errDetails;
        }
    } catch(err) {
        console.log(err);
        throw err;
    }
}

/**
 * 
 * @param {*} lat 
 * @param {*} lon 
 * @param {*} radius (max distance in meters)
 * @returns an array of Parking objects
 */
async function getParkingsByRadius(lat, lon, radius) {
    return [{id:"parking1", title:"Parking of fun"},{id:"parking2", title:"Parking of yolo"}];
}

async function deleteParking(parkingAddress) {
    const url = APIURL + '/api/parking/address/' + parkingAddress;
    try {
        const response = await fetch(url, {
            method: 'DELETE',
            credentials: 'include',
        });
        if (response.ok) {
            return true;
        } else {
            /* Application error (404, 500, 503 ...) */
            const errDetails = await response.text();
            throw errDetails;
        }
    } catch (err) {
        /* Network error */
        console.log(err);
        throw err;
    }
}

export {addParking, getParkingsByRadius, deleteParking}