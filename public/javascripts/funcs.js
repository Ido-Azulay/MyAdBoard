'use strict';

const Funcs = (function() {

    const URL = './api/ad';  // Assuming your API endpoint is /api/ad
const ERR_GENERAL = "Some error occurred, please try again later.";

    /**
     * Fetches and displays approved ads from the server.
     * Populates a table with the details of approved ads.
     */
    async function fetchAndDisplayApprovedAds() {
        const tableBody = document.getElementById("table1").getElementsByTagName('tbody')[0];

        try {
            // Fetch all ads
            const response = await fetch(URL);
            if (response.status !== 200)
                throw new Error(response.statusText);

            const allAds = await response.json();

            // Filter approved ads
            const approvedAds = allAds.filter((item) => item.isApproved)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            // Clear existing rows
            tableBody.innerHTML = '';

            // Populate the table
            approvedAds.forEach((item) => {
                // Log the item data to the console
                console.log('Approved Ad Data:', item);

                // Create a new row
                const row = tableBody.insertRow();

                // Add cells with data
                const titleCell = row.insertCell(0);
                const descriptionCell = row.insertCell(1);
                const priceCell = row.insertCell(2);
                const phoneCell = row.insertCell(3);
                const emailCell = row.insertCell(4);

                titleCell.textContent = item.title;
                descriptionCell.textContent = item.description;
                priceCell.textContent = item.price;
                phoneCell.textContent = item.phone;
                emailCell.textContent = item.email;
            });
        } catch (err) {
            // Handle error
            console.error(`Something went wrong.. please try again later: ${err.message}`);
        }

        console.log("Connected and finished fetch for approved ads");
    }


//================================================================================================

// -- Helper validations  functions for the main validation of post new ad form -- //

//Validate title - check title is not empty string "".
const validateTitle = (title) => {
    return (title !== "" && title.length <= 20);
}
//------------------------------------------------------------------------------------------------
//Validate length of description is less or equal to 200
const validateDescription = (description) => {
    return (description.length <= 200);
}
//------------------------------------------------------------------------------------------------
//Validate the price is a non-empty string and that price is >= 0, and check for comma or full stop.
const validatePrice = (price) => {
    // Check if price is a number (allowing: (,) and (.)).
    const isValidNumber = /^[0-9]+([.,][0-9]+)?$/.test(price);

    // Check if the valid number is greater than 0
    const isGreaterThanZero = parseFloat(price) > 0;

    // Check that the price is not empty
    let priceIsNull = false;
    if(price === ""){
        priceIsNull = true;
    }

    return isValidNumber && isGreaterThanZero && !priceIsNull;
}
//------------------------------------------------------------------------------------------------
//Validation for phone number, check that the phone number is in for of [05x / 0x] [ xxxxxxx ].
const validatePhoneNumber = (phoneNumber) => {
    if(phoneNumber !== "")
    {
        const phoneRegex = /^(02|03|04|05|07|08|054|052|055|053|051|050|058|059)\d{7}$/;
        return phoneRegex.test(phoneNumber);
    }
    else {return true;}
}
//------------------------------------------------------------------------------------------------
//Validate that email is in format of something@something.validEmailEnd
 const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);

 }
//------------------------------------------------------------------------------------------------
    /**
     * Function to validate and submit the advertisement form, using helper methods (from above).
     * @param {Event} event - The form submission event.
     */
const validateAd = (event) => {
    event.preventDefault();


    const title = document.getElementById("title").value;
    const titleError = document.getElementById("titleError");

    const description = document.getElementById("description").value;
    const descriptionError = document.getElementById("descriptionError");

    const price = document.getElementById("price").value;
    const priceError = document.getElementById("priceError");

    const phone = document.getElementById("phone").value;
    const phoneError = document.getElementById("phoneError");

    const email = document.getElementById("email").value;
    const emailError = document.getElementById("emailError");

    if(!validateTitle(title))
    {
        titleError.innerHTML =
            '<span class="text-danger">Mandatory field: Please enter a valid title</span>';
    }
    else {
        titleError.innerHTML = "";
    }

    if(!validateDescription(description))
    {
        descriptionError.innerHTML =
            '<span class="text-danger">Description is limited to 200 characters</span>';
    }

    else {
        descriptionError.innerHTML = "";
    }

    if(!validatePrice(price))
    {
        priceError.innerHTML =
            '<span class="text-danger">Mandatory field: Please enter a valid price,greater than or equal to 0, containing only numbers</span>';
    }

    else {
        priceError.innerHTML = "";
    }

    if(!validatePhoneNumber(phone))
    {
        phoneError.innerHTML =
            '<span class="text-danger">Please enter a valid phone number with no special characters</span>';
    }

    else {
        phoneError.innerHTML = "";
    }

    if(!validateEmail(email))
    {
        emailError.innerHTML =
            '<span class="text-danger">Mandatory field: Please enter a valid email address</span>';
    }

    else
    {
        emailError.innerHTML = "";
    }

    if(validateTitle(title) && validateDescription(description) && validatePrice(price) && validatePhoneNumber(phone) && validateEmail(email))
        document.getElementById('form1').submit();
}



return {validateAd, fetchAndDisplayApprovedAds}
})()