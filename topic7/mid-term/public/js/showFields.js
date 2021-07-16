function showFields(deviceName){
    // Hide all fields
    const allInputs = document.getElementsByClassName("fields");
    for (let e of allInputs) {
        e.setAttribute("hidden", true);
        e.removeAttribute("name");
    }

    // Only show relevant fields
    const selectedDeviceInputs = document.getElementsByClassName("fields " + deviceName);
    for (let e of selectedDeviceInputs) {
        e.removeAttribute("hidden");
        e.setAttribute("name", e.getAttribute("data-field-name"));
    }
}