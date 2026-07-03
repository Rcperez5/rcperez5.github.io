/*
    Program name: scripts.js
    Author: Ryan Perez
    Date created: 06/20/2026
    Date last edited: 07/02/2026
    Version: 3.0
    Description: External JS file for the HW3 patient registration form.
                 Handles: live field validation, password match check,
                 username rules, the password-vs-username/name and
                 no-quote rule, date range validation (using the dob
                 field's min/max date attributes plus a JS backup
                 check), the symptoms quote warning, the Review
                 panel, and the slider display.
*/


/* ============================================================
   SLIDER - updates the number next to the health rating bar
   as the user drags it. Called via oninput on the range input.
   Reference: w3schools.com/jsref/event_oninput.asp
   ============================================================ */
function updateSlider(val) {
    document.getElementById("rating-display").textContent = val;
}


/* ============================================================
   FIRST NAME CHECK - runs as the user types in the first name
   box. Only letters, apostrophes, and dashes are allowed.
   ============================================================ */
function checkFname() {
    var val = document.getElementById("fname").value;
    var msg = document.getElementById("fname-msg");

    msg.style.color = "red";
    msg.textContent = "";

    if (val.length === 0) return; // don't nag them before they start typing

    if (val.length > 30) {
        msg.textContent = "First name cannot be more than 30 characters.";
        return;
    }
    if (/[^A-Za-z'\-]/.test(val)) {
        msg.textContent = "Only letters, apostrophes, and dashes are allowed.";
        return;
    }

    msg.style.color = "green";
    msg.textContent = "Looks good!";
}


/* ============================================================
   LAST NAME CHECK - same idea as first name, but also allows
   the numbers 2-5 and spaces (for suffixes like "Smith 3rd").
   ============================================================ */
function checkLname() {
    var val = document.getElementById("lname").value;
    var msg = document.getElementById("lname-msg");

    msg.style.color = "red";
    msg.textContent = "";

    if (val.length === 0) return;

    if (val.length > 30) {
        msg.textContent = "Last name cannot be more than 30 characters.";
        return;
    }
    if (/[^A-Za-z'\-2-5\s]/.test(val)) {
        msg.textContent = "Only letters, apostrophes, dashes, and the numbers 2-5 are allowed.";
        return;
    }

    msg.style.color = "green";
    msg.textContent = "Looks good!";
}


/* ============================================================
   SSN CHECK - runs on blur (when they tab out of the field).
   Looks for the XXX-XX-XXXX format (dashes are optional).
   ============================================================ */
function checkSSN() {
    var val = document.getElementById("ssn").value;
    var msg = document.getElementById("ssn-msg");

    msg.style.color = "red";
    msg.textContent = "";

    if (val.length === 0) return;

    if (!/^\d{3}-?\d{2}-?\d{4}$/.test(val)) {
        msg.textContent = "Please enter a valid SSN (example: 123-45-6789).";
        return;
    }

    msg.style.color = "green";
    msg.textContent = "Looks good!";
}


/* ============================================================
   EMAIL CHECK - runs on blur. Looks for the basic
   something@something.something pattern.
   ============================================================ */
function checkEmail() {
    var val = document.getElementById("email").value;
    var msg = document.getElementById("email-msg");

    msg.style.color = "red";
    msg.textContent = "";

    if (val.length === 0) return;

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        msg.textContent = "Please enter a valid email address (example: name@domain.com).";
        return;
    }

    msg.style.color = "green";
    msg.textContent = "Looks good!";
}


/* ============================================================
   PHONE CHECK - runs on blur. Requires the exact
   000-000-0000 format.
   ============================================================ */
function checkPhone() {
    var val = document.getElementById("phone").value;
    var msg = document.getElementById("phone-msg");

    msg.style.color = "red";
    msg.textContent = "";

    if (val.length === 0) return;

    if (!/^\d{3}-\d{3}-\d{4}$/.test(val)) {
        msg.textContent = "Please use 000-000-0000 format.";
        return;
    }

    msg.style.color = "green";
    msg.textContent = "Looks good!";
}


/* ============================================================
   ADDRESS LINE 1 CHECK - required, 2-30 characters.
   ============================================================ */
function checkAddr1() {
    var val = document.getElementById("addr1").value;
    var msg = document.getElementById("addr1-msg");

    msg.style.color = "red";
    msg.textContent = "";

    if (val.length === 0) return;

    if (val.length < 2 || val.length > 30) {
        msg.textContent = "Address must be between 2 and 30 characters.";
        return;
    }

    msg.style.color = "green";
    msg.textContent = "Looks good!";
}


/* ============================================================
   ADDRESS LINE 2 CHECK - optional. If they type something in,
   it still has to be 2-30 characters.
   ============================================================ */

function checkAddr2() {
    var val = document.getElementById("addr2").value;
    var msg = document.getElementById("addr2-msg");

    msg.style.color = "red";
    msg.textContent = "";

    if (val.length === 0) {
        // this field is optional, so a blank value is perfectly fine
        return;
    }

    if (val.length < 2 || val.length > 30) {
        msg.textContent = "If entered, this must be between 2 and 30 characters.";
        return;
    }

    msg.style.color = "green";
    msg.textContent = "Looks good!";
}


/* ============================================================
   CITY CHECK - required, 2-30 characters.
   ============================================================ */
function checkCity() {
    var val = document.getElementById("city").value;
    var msg = document.getElementById("city-msg");

    msg.style.color = "red";
    msg.textContent = "";

    if (val.length === 0) return;

    if (val.length < 2 || val.length > 30) {
        msg.textContent = "City must be between 2 and 30 characters.";
        return;
    }

    msg.style.color = "green";
    msg.textContent = "Looks good!";
}


/* ============================================================
   ZIP CODE CHECK - runs on blur. Accepts a plain 5-digit ZIP
   or a ZIP+4 (77002-1234). If they enter the longer version,
   we just keep the first 5 digits and put that back in the box.
   ============================================================ */

function checkZip() {
    var field = document.getElementById("zip");
    var val   = field.value;
    var msg   = document.getElementById("zip-msg");

    msg.style.color = "red";
    msg.textContent = "";

    if (val.length === 0) return;

    if (!/^\d{5}(-\d{4})?$/.test(val)) {
        msg.textContent = "Please enter a 5-digit ZIP code (ZIP+4 is okay too).";
        return;
    }

    if (val.length > 5) {
        // they typed the longer ZIP+4 version - just keep the first 5 digits
        field.value = val.substring(0, 5);
    }

    msg.style.color = "green";
    msg.textContent = "Looks good!";
}


/* ============================================================
   PASSWORD SAFETY HELPER
     1. The password cannot contain a double-quote character.
     2. The password cannot contain the username, first name,
        or last name (so it can't just be your own name/ID).
   Returns an error message (text) if a rule is broken, or an
   Used by checkPassword(), validateForm(), and showReview() so
   the rule only has to be written once.
   ============================================================ */

function getPasswordSafetyError(pw) {
    if (pw.indexOf('"') !== -1) {
        return "Password cannot contain a double-quote character.";
    }

    var pwLower = pw.toLowerCase();
    var username = document.getElementById("username").value.trim().toLowerCase();
    var fname    = document.getElementById("fname").value.trim().toLowerCase();
    var lname    = document.getElementById("lname").value.trim().toLowerCase();

    if (username.length >= 2 && pwLower.indexOf(username) !== -1) {
        return "Password cannot contain your username.";
    }
    if (fname.length >= 2 && pwLower.indexOf(fname) !== -1) {
        return "Password cannot contain your first name.";
    }
    if (lname.length >= 2 && pwLower.indexOf(lname) !== -1) {
        return "Password cannot contain your last name.";
    }

    return ""; // no problems found
}


/* ============================================================
   PASSWORD VALIDATION - runs as the user types in the password
   box. Checks for length, uppercase, number, and special char.
   Displays a small message right below the field.
   ============================================================ */

function checkPassword() {
    var pw  = document.getElementById("password").value;
    var msg = document.getElementById("pw-msg");

    // reset
    msg.style.color = "red";
    msg.textContent = "";

    if (pw.length === 0) return; // don't nag them before they start typing

    if (pw.length < 8) {
        msg.textContent = "Password must be at least 8 characters.";
        return;
    }
    if (pw.length > 30) {
        msg.textContent = "Password cannot be more than 30 characters.";
        return;
    }
    if (!/[A-Z]/.test(pw)) {
        msg.textContent = "Password needs at least one uppercase letter.";
        return;
    }
    if (!/[a-z]/.test(pw)) {
        msg.textContent = "Password needs at least one lowercase letter.";
        return;
    }
    if (!/[0-9]/.test(pw)) {
        msg.textContent = "Password needs at least one number.";
        return;
    }
    // special chars allowed: !@#%^&*()-_+=\/><.,`~  but NO double-quotes
    // Source for this character class check: w3schools.com/jsref/jsref_regexp_test.asp
    
    if (!/[!@#%^&*()\-_+=\/><.,`~]/.test(pw)) {
        msg.textContent = "Password needs at least one special character (e.g. !@#$).";
        return;
    }

    // extra rules: no quote character, and can't contain the username or name
    var safetyError = getPasswordSafetyError(pw);
    if (safetyError !== "") {
        msg.textContent = safetyError;
        return;
    }

    // if we make it here, password looks good
    msg.style.color = "green";
    msg.textContent = "Password looks good!";
}


/* ============================================================
   PASSWORD MATCH CHECK - runs as they type in the confirm box.
   Just a simple comparison between the two fields.
   ============================================================ */
function checkPasswordMatch() {
    var pw1 = document.getElementById("password").value;
    var pw2 = document.getElementById("password2").value;
    var msg = document.getElementById("pw2-msg");

    if (pw2.length === 0) {
        msg.textContent = "";
        return;
    }

    if (pw1 !== pw2) {
        msg.style.color = "red";
        msg.textContent = "Passwords do not match.";
    } else {
        msg.style.color = "green";
        msg.textContent = "Passwords match!";
    }
}


/* ============================================================
   USERNAME CHECK - runs on blur (when they tab out of the field)
   Rules: 5-20 chars, first char must be a letter, only letters/
   numbers/underscore/dash, no spaces. Converts to lowercase.
   ============================================================ */
function checkUsername() {
    var field = document.getElementById("username");
    var msg   = document.getElementById("username-msg");
    var val   = field.value;

    msg.style.color = "red";
    msg.textContent = "";

    if (val.length === 0) return;

    if (val.length < 5 || val.length > 20) {
        msg.textContent = "Username must be between 5 and 20 characters.";
        return;
    }
    if (/^\d/.test(val)) {
        msg.textContent = "Username cannot start with a number.";
        return;
    }
    if (/[^a-zA-Z0-9_\-]/.test(val)) {
        msg.textContent = "Only letters, numbers, underscores, and dashes allowed. No spaces.";
        return;
    }

    // convert to lowercase and show the updated value back in the field
    field.value = val.toLowerCase();
    msg.style.color = "green";
    msg.textContent = "Username looks good!";

    // the username changed, so re-check the password too in case it
    // now contains (or no longer contains) the username
    if (document.getElementById("password").value.length > 0) {
        checkPassword();
    }
}


/* ============================================================
   SYMPTOMS CHECK - this field is optional, so we never block
   the user, we just warn them if they type a double-quote
   character
   (Textareas don't support the HTML pattern attribute, so this
   rule is handled in JavaScript instead.)
   ============================================================ */
function checkSymptoms() {
    var val = document.getElementById("symptoms").value;
    var msg = document.getElementById("symptoms-msg");

    msg.style.color = "red";
    msg.textContent = "";

    if (val.indexOf('"') !== -1) {
        msg.textContent = "Please remove double-quote characters (\") from this box.";
    }
}


/* ============================================================
   DOB DATE RANGE CHECK - makes sure the birthday is not in the
   future and not more than 120 years ago. The dob field is a
   plain text input in MM/DD/YYYY format
   Called oninput and onblur from the dob field.
   ============================================================ */
function isValidDOB(val) {
    if (val.length === 0) return false;

    var parts = val.split("/"); // MM/DD/YYYY
    if (parts.length !== 3) return false;

    var month = parseInt(parts[0], 10);
    var day   = parseInt(parts[1], 10);
    var year  = parseInt(parts[2], 10);

    // new Date(year, monthIndex, day) - month is 0-based
    var entered = new Date(year, month - 1, day);
    var today   = new Date();
    var oldest  = new Date();
    oldest.setFullYear(today.getFullYear() - 120);

    if (isNaN(entered.getTime())) return false;
    if (entered > today) return false;
    if (entered < oldest) return false;

    return true;
}

function checkDOB() {
    var val = document.getElementById("dob").value;
    var msg = document.getElementById("dob-msg");

    msg.style.color = "red";
    msg.textContent = "";

    if (val.length === 0) return;

    var parts = val.split("/");
    if (parts.length !== 3 || val.length !== 10) {
        msg.textContent = "Please use MM/DD/YYYY format (example: 06/15/1990).";
        return;
    }

    if (!isValidDOB(val)) {
        var month   = parseInt(parts[0], 10);
        var day     = parseInt(parts[1], 10);
        var year    = parseInt(parts[2], 10);
        var entered = new Date(year, month - 1, day);
        var today   = new Date();
        var oldest  = new Date();
        oldest.setFullYear(today.getFullYear() - 120);

        if (isNaN(entered.getTime())) {
            msg.textContent = "That doesn't look like a real date.";
        } else if (entered > today) {
            msg.textContent = "Date of birth cannot be in the future.";
        } else if (entered < oldest) {
            msg.textContent = "Date of birth cannot be more than 120 years ago.";
        } else {
            msg.textContent = "Please enter a valid date of birth.";
        }
        return;
    }

    msg.style.color = "green";
    msg.textContent = "Date looks good!";
}


/* ============================================================
   REVIEW PANEL - gathers everything from the form and displays
   it in a table below the form when the Review button is clicked.
   ============================================================ */
function showReview() {

    // grab all the values
    var fname      = document.getElementById("fname").value.trim();
    var mi         = document.getElementById("mi").value.trim();
    var lname      = document.getElementById("lname").value.trim();
    var dob        = document.getElementById("dob").value.trim();
    var ssn        = document.getElementById("ssn").value.trim();
    var genderEls  = document.querySelectorAll("input[name='gender']:checked");

    var gender = "";
    if (genderEls.length > 0) {
        gender = genderEls[0].value;
    }

    var addr1      = document.getElementById("addr1").value.trim();
    var addr2      = document.getElementById("addr2").value.trim();
    var city       = document.getElementById("city").value.trim();
    var state      = document.getElementById("state").value;
    var zip        = document.getElementById("zip").value.trim();
    var email      = document.getElementById("email").value.trim();
    var phone      = document.getElementById("phone").value.trim();

    var symptoms   = document.getElementById("symptoms").value.trim();

    // (querySelectorAll gives us a NodeList, so we step through it by hand
    //  instead of using .forEach - this way it works in every browser)
    var condBoxes  = document.querySelectorAll("input[name='conditions']:checked");
    var conditions = [];
    for (var i = 0; i < condBoxes.length; i++) {
        conditions.push(condBoxes[i].value);
    }

    var vaccEl = document.querySelector("input[name='vaccinated']:checked");
    var vaccinated = "";
    if (vaccEl) {
        vaccinated = vaccEl.value;
    }

    var insEl = document.querySelector("input[name='insurance']:checked");
    var insurance = "";
    if (insEl) {
        insurance = insEl.value;
    }

    var smokeEl = document.querySelector("input[name='smoker']:checked");
    var smoker = "";
    if (smokeEl) {
        smoker = smokeEl.value;
    }

    var health = document.getElementById("health-rating").value;

    var username = document.getElementById("username").value.trim();

    // we show the password exists but don't display the actual value
    var pwEntered = "Not entered";
    if (document.getElementById("password").value.length > 0) {
        pwEntered = "Entered (hidden)";
    }

    var pw2Entered = "Not entered";
    if (document.getElementById("password2").value.length > 0) {
        pw2Entered = "Entered (hidden)";
    }

    // helper to show pass or error
    function status(condition, errMsg) {
        if (condition) {
            return '<span style="color:green;">&#10003; pass</span>';
        } else {
            return '<span style="color:red;">&#10007; ERROR: ' + errMsg + '</span>';
        }
    }

    // password match - must match AND pass the safety rules (no quote, no username/name inside it)
    var pw1 = document.getElementById("password").value;
    var pw2 = document.getElementById("password2").value;
    var pwSafetyError = getPasswordSafetyError(pw1);
    var pwMatch = (pw1 === pw2 && pw1.length >= 8 && pwSafetyError === "");

    // build the review HTML table
    var html = '<h3 style="border-bottom:2px solid #1a7dbf; padding-bottom:5px;">Please Review This Information</h3>';
    html += '<table class="form-table" style="margin-top:10px;">';

    html += '<tr><td class="label-cell">Full Name</td><td class="input-cell">';
    html += (fname + " " + mi + " " + lname).trim() || "<em>blank</em>";
    html += " &nbsp; " + status(fname.length >= 1 && lname.length >= 1, "First and Last name required");
    html += "</td></tr>";

    html += '<tr><td class="label-cell">Date of Birth</td><td class="input-cell">';
    html += dob || "<em>blank</em>";
    html += " &nbsp; " + status(isValidDOB(dob), "Must be a real date, not in the future, and not more than 120 years ago");
    html += "</td></tr>";

    html += '<tr><td class="label-cell">SSN</td><td class="input-cell">';
    html += ssn.length > 0 ? "***-**-****" : "<em>blank</em>";
    html += " &nbsp; " + status(ssn.length >= 9, "Required");
    html += "</td></tr>";

    html += '<tr><td class="label-cell">Gender</td><td class="input-cell">';
    html += gender || "<em>not selected</em>";
    html += " &nbsp; " + status(gender !== "", "Please select a gender");
    html += "</td></tr>";

    html += '<tr><td class="label-cell">Address</td><td class="input-cell">';
    html += (addr1 + (addr2 ? ", " + addr2 : "") + " | " + city + ", " + state + " " + zip) || "<em>blank</em>";
    html += " &nbsp; " + status(addr1.length >= 2 && city.length >= 2 && state !== "" && /^\d{5}(-\d{4})?$/.test(zip), "Check address fields");
    html += "</td></tr>";

    html += '<tr><td class="label-cell">Email</td><td class="input-cell">';
    html += email || "<em>blank</em>";
    html += " &nbsp; " + status(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), "Invalid email format");
    html += "</td></tr>";

    html += '<tr><td class="label-cell">Phone</td><td class="input-cell">';
    html += phone || "<em>blank</em>";
    html += " &nbsp; " + status(/^\d{3}-\d{3}-\d{4}$/.test(phone), "Use 000-000-0000 format");
    html += "</td></tr>";

    html += '<tr><td class="label-cell">Conditions</td><td class="input-cell">';
    html += conditions.length > 0 ? conditions.join(", ") : "None selected";
    html += "</td></tr>";

    html += '<tr><td class="label-cell">Vaccinated?</td><td class="input-cell">';
    html += vaccinated || "<em>not selected</em>";
    html += " &nbsp; " + status(vaccinated !== "", "Required");
    html += "</td></tr>";

    html += '<tr><td class="label-cell">Insurance?</td><td class="input-cell">';
    html += insurance || "<em>not selected</em>";
    html += " &nbsp; " + status(insurance !== "", "Required");
    html += "</td></tr>";

    html += '<tr><td class="label-cell">Smoker?</td><td class="input-cell">';
    html += smoker || "<em>not selected</em>";
    html += " &nbsp; " + status(smoker !== "", "Required");
    html += "</td></tr>";

    html += '<tr><td class="label-cell">Health Rating</td><td class="input-cell">' + health + " / 10</td></tr>";

    html += '<tr><td class="label-cell">Symptoms</td><td class="input-cell">';
    html += symptoms.length > 0 ? symptoms : "<em>none entered</em>";
    if (symptoms.indexOf('"') !== -1) {
        html += " &nbsp; " + status(false, "Remove double-quote characters");
    }
    html += "</td></tr>";

    html += '<tr><td class="label-cell">Username</td><td class="input-cell">';
    html += username || "<em>blank</em>";
    html += " &nbsp; " + status(username.length >= 5 && username.length <= 20, "5-20 chars, no spaces, starts with a letter");
    html += "</td></tr>";

    var pwErrorText = "Passwords must match and meet requirements";
    if (pwSafetyError !== "") {
        pwErrorText = pwSafetyError;
    }
    html += '<tr><td class="label-cell">Password</td><td class="input-cell">';
    html += pwEntered;
    html += " &nbsp; " + status(pwMatch, pwErrorText);
    html += "</td></tr>";

    html += '<tr><td class="label-cell">Re-enter Password</td><td class="input-cell">';
    html += pw2Entered;
    html += " &nbsp; " + status(pwMatch, "Must match password above");
    html += "</td></tr>";

    html += "</table>";

    // show the review div and fill it in
    var reviewDiv = document.getElementById("review-panel");
    reviewDiv.innerHTML = html;
    reviewDiv.style.display = "block";

}


/* ============================================================
   FORM SUBMIT - final check before we let them go to thankyou.html.
   Makes sure passwords match, the username is still legal, the
   password doesn't contain the username/name/a quote, and the
   date of birth is still in range. Returning false here is what
   stops the form from submitting.
   ============================================================ */
function validateForm() {

    // make sure the username is lowercase one more time, in case
    // the user never tabbed out of that field before submitting
    var usernameField = document.getElementById("username");
    usernameField.value = usernameField.value.toLowerCase();

    var pw1 = document.getElementById("password").value;
    var pw2 = document.getElementById("password2").value;

    if (pw1 !== pw2) {
        alert("Your passwords don't match. Please fix that before submitting.");
        document.getElementById("password2").focus();
        return false; // false = stop the form from submitting
    }

    var username = usernameField.value;
    if (/^\d/.test(username) || /[^a-zA-Z0-9_\-]/.test(username)) {
        alert("Please fix your username before submitting.");
        return false;
    }

    var safetyError = getPasswordSafetyError(pw1);
    if (safetyError !== "") {
        alert(safetyError);
        document.getElementById("password").focus();
        return false;
    }

    var dobValue = document.getElementById("dob").value;
    if (!isValidDOB(dobValue)) {
        alert("Please enter a valid date of birth before submitting.");
        document.getElementById("dob").focus();
        return false;
    }
    return true; // true = the form is allowed to submit
}

/* ============================================================
   SSN AUTO-FORMAT - runs oninput as the user types into the SSN
   field. Strips out anything that isn't a digit, then inserts
   dashes automatically after the 3rd and 5th digit so the user
   sees XXX-XX-XXXX taking shape without having to type the dashes
   themselves.
   ============================================================ */
function formatSSN() {
    var field = document.getElementById("ssn");
    var raw   = field.value;

    // pull out only the digits - ignore whatever else is in there
    var digits = "";
    for (var i = 0; i < raw.length; i++) {
        if (raw[i] >= "0" && raw[i] <= "9") {
            digits += raw[i];
        }
    }

    // rebuild with dashes in the right places
    var formatted = "";
    if (digits.length <= 3) {
        formatted = digits;
    } else if (digits.length <= 5) {
        formatted = digits.substring(0, 3) + "-" + digits.substring(3);
    } else {
        formatted = digits.substring(0, 3) + "-" + digits.substring(3, 5) + "-" + digits.substring(5, 9);
    }

    field.value = formatted;
}


/* ============================================================
   CLEAR ALL MESSAGES - called when the CLEAR AND START OVER
   button is clicked.
   ============================================================ */
function clearAllMessages() {
    var messageIds = [
        "fname-msg", "lname-msg", "dob-msg", "ssn-msg",
        "email-msg", "phone-msg",
        "addr1-msg", "addr2-msg", "city-msg", "zip-msg",
        "symptoms-msg", "username-msg", "pw-msg", "pw2-msg",
        "validate-msg"
    ];

    for (var i = 0; i < messageIds.length; i++) {
        var el = document.getElementById(messageIds[i]);
        if (el) {
            el.textContent = "";
        }
    }

    // hide the submit button again after a reset
    document.getElementById("btn-submit").style.display = "none";
}


/* ============================================================
   VALIDATE ALL FIELDS - called when the VALIDATE button is
   clicked. Runs every individual field check, then counts how
   many error messages are currently showing on the page.

   If the count is zero, the Submit button is revealed.
   If any errors remain, they stay visible so the user can fix
   them, and the Submit button stays hidden.
   ============================================================ */
function validateAllFields() {

    /* clear the validate message area first, before we count errors.
    if we don't do this, the red message from a PREVIOUS failed run
    gets picked up by the error-counting loop below and counts as 1
    error all by itself, which prevents the Submit button from ever
    appearing even after the user fixes everything. */
    
    var validateMsg = document.getElementById("validate-msg");
    validateMsg.textContent = "";
    validateMsg.style.color = "";

    // force the username to lowercase one more time
    var usernameField = document.getElementById("username");
    usernameField.value = usernameField.value.toLowerCase();

    // force the email to lowercase too
    var emailField = document.getElementById("email");
    emailField.value = emailField.value.toLowerCase();

    // run every single field checker
    checkFname();
    checkLname();
    checkDOB();
    checkSSN();
    checkEmail();
    checkPhone();
    checkAddr1();
    checkAddr2();
    checkCity();
    checkZip();
    checkSymptoms();
    checkUsername();
    checkPassword();
    checkPasswordMatch();

    // now count how many red error messages are showing on the page.
    // we find every element with class "field-note" and check its color.
    var errorCount = 0;
    var allMessages = document.querySelectorAll(".field-note");
    for (var i = 0; i < allMessages.length; i++) {
        // a message is an error if it has red text AND is not empty
        if (allMessages[i].style.color === "red" && allMessages[i].textContent.length > 0) {
            errorCount = errorCount + 1;
        }
    }

    // also check that the required radio buttons have something selected
    // (these don't have inline error spans, so we check them here)
    var genderSelected  = document.querySelectorAll("input[name='gender']:checked").length > 0;
    var vaccSelected    = document.querySelectorAll("input[name='vaccinated']:checked").length > 0;
    var insSelected     = document.querySelectorAll("input[name='insurance']:checked").length > 0;
    var smokerSelected  = document.querySelectorAll("input[name='smoker']:checked").length > 0;
    var stateSelected   = document.getElementById("state").value !== "";

    if (!genderSelected || !vaccSelected || !insSelected || !smokerSelected || !stateSelected) {
        errorCount = errorCount + 1;
        validateMsg.style.color = "red";
        validateMsg.textContent = "Please make a selection for all required dropdowns and radio buttons above.";
    } else if (errorCount === 0) {
        validateMsg.textContent = "";
    }

    if (errorCount === 0) {
        // everything passed - show the submit button
        document.getElementById("btn-submit").style.display = "inline-block";
        validateMsg.style.color = "green";
        validateMsg.textContent = "All fields look good! You may now click Submit.";
    } else {
        // still errors - keep submit hidden
        document.getElementById("btn-submit").style.display = "none";
        if (validateMsg.textContent === "") {
            validateMsg.style.color = "red";
            validateMsg.textContent = "Please fix the errors shown above before submitting.";
        }
    }
}

/* END OF FILE: scripts.js */
