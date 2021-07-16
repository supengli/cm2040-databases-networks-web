// This function addressess R3D and R5C.
// This function is used for validate the input of form.
function validateDeviceForm() {

    let deviceSelect = document.getElementById("deviceName");
    let volumeInput = document.getElementsByName("volume").length == 0 ? undefined : document.getElementsByName("volume")[0];
    let temperatureInput = document.getElementsByName("temperature").length == 0 ? undefined : document.getElementsByName("temperature")[0];

    // If the device name is not input
    if( deviceSelect.value === "" ) {
        alert("Device must be selected");
        deviceSelect.focus();
        return false;
    }

    // If the volume is not input
    if( volumeInput !== undefined && volumeInput.value === "" ) {
        alert("Volume must be filled out");
        volumeInput.focus();
        return false;
    }

    // If the volume is not within a reasonable range
    if( volumeInput !== undefined && (Number(volumeInput.value) < 0 || Number(volumeInput.value) > 100) ) {
        alert("Volume must be between 0 and 100");
        volumeInput.focus();
        return false;
    }

    // If the temperature is not within a reasonable range
    if( temperatureInput !== undefined && temperatureInput.value === "" ) {
        alert("Temperature must be filled out");
        temperatureInput.focus();
        return false;
    }

    // If the temperature is not within a reasonable range
    if( temperatureInput !== undefined && (Number(temperatureInput.value) < 16 || Number(temperatureInput.value) > 30) ) {
        alert("Temperature must be between 16 and 30");
        temperatureInput.focus();
        return false;
    }

    // If all good, return ture and submit the form
    return( true );
}