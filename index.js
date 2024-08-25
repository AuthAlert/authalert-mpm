const { default: axios } = require("axios");

function AuthAlertAPI(projectId, data) {
    // read device_id from local storage
    var device_id = localStorage.getItem(projectId+'_device_id');
    // generate device id if not exists
    if (device_id === null) {
        device_id = Math.random().toString(36).substring(2);
        localStorage.setItem(projectId+'_device_id', device_id);
    }
    // add device id to data
    data.device_id = device_id;
    return axios.post(`https://api.authalert.io/api/${projectId}`, data);
}

module.exports = AuthAlertAPI;