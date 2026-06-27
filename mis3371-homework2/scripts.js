/*
    Program name: scripts.js
    Author: Ryan Perez
    Date created: 06/20/2026
    Date last edited: 06/24/2026
    Version: 1.0
    Description: External JS file for the HW2 patient registration form.
                 Handles: live password validation, password match check,
                 username rules, date range validation, the Review panel,
                 and the slider display.
                 The professor asked that JS be in an external file this time,
                 so everything that was inline before got moved here.
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
    // special chars allowed: !@#%^&*()-_+=\/><.,`~  but NOT double-quote
    // Source for this kind of character class check: w3schools.com/jsref/jsref_regexp_test.asp
    if (!/[!@#%^&*()\-_+=\/><.,`~]/.test(pw)) {
        msg.textContent = "Password needs at least one special character (e.g. !@#$).";
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
   Rules: 5-30 chars, first char must be a letter, only letters/
   numbers/underscore/dash, no spaces. Converts to lowercase.
   ============================================================ */
function checkUsername() {
    var field = document.getElementById("username");
    var msg   = document.getElementById("username-msg");
    var val   = field.value;

    msg.style.color = "red";
    msg.textContent = "";

    if (val.length === 0) return;

    if (val.length < 5 || val.length > 30) {
        msg.textContent = "Username must be between 5 and 30 characters.";
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
}


/* ============================================================
   DOB DATE RANGE CHECK - makes sure the birthday is not in the
   future and not more than 120 years ago.
   Called on blur from the dob field.
   ============================================================ */
function checkDOB() {
    var val = document.getElementById("dob").value;
    var msg = document.getElementById("dob-msg");

    msg.style.color = "red";
    msg.textContent = "";

    if (val.length === 0) return;

    // need MM/DD/YYYY format
    var parts = val.split("/");
    if (parts.length !== 3) {
        msg.textContent = "Please use MM/DD/YYYY format.";
        return;
    }

    var entered = new Date(parts[2], parts[0] - 1, parts[1]);
    var today   = new Date();
    var oldest  = new Date();
    oldest.setFullYear(today.getFullYear() - 120);

    if (isNaN(entered.getTime())) {
        msg.textContent = "That doesn't look like a real date.";
        return;
    }
    if (entered > today) {
        msg.textContent = "Date of birth cannot be in the future.";
        return;
    }
    if (entered < oldest) {
        msg.textContent = "Date of birth cannot be more than 120 years ago.";
        return;
    }

    msg.style.color = "green";
    msg.textContent = "Date looks good!";
}


/* ============================================================
   REVIEW PANEL - gathers everything from the form and displays
   it in a table below the form when the Review button is clicked.
   The professor's example showed a "Please Review This Info" area
   with pass/error next to each field. This does the same thing.
   ============================================================ */
function showReview() {

    // grab all the values
    var fname      = document.getElementById("fname").value.trim();
    var mi         = document.getElementById("mi").value.trim();
    var lname      = document.getElementById("lname").value.trim();
    var dob        = document.getElementById("dob").value.trim();
    var ssn        = document.getElementById("ssn").value.trim();
    var genderEls  = document.querySelectorAll("input[name='gender']:checked");
    var gender     = genderEls.length > 0 ? genderEls[0].value : "";

    var addr1      = document.getElementById("addr1").value.trim();
    var addr2      = document.getElementById("addr2").value.trim();
    var city       = document.getElementById("city").value.trim();
    var state      = document.getElementById("state").value;
    var zip        = document.getElementById("zip").value.trim();
    var email      = document.getElementById("email").value.trim();
    var phone      = document.getElementById("phone").value.trim();

    var symptoms   = document.getElementById("symptoms").value.trim();

    // collect checked conditions
    var condBoxes  = document.querySelectorAll("input[name='conditions']:checked");
    var conditions = [];
    condBoxes.forEach(function(box) { conditions.push(box.value); });

    var vaccEl    = document.querySelector("input[name='vaccinated']:checked");
    var vaccinated = vaccEl ? vaccEl.value : "";
    var insEl     = document.querySelector("input[name='insurance']:checked");
    var insurance  = insEl ? insEl.value : "";
    var smokeEl   = document.querySelector("input[name='smoker']:checked");
    var smoker     = smokeEl ? smokeEl.value : "";
    var health     = document.getElementById("health-rating").value;

    var username   = document.getElementById("username").value.trim();
    // we show the password exists but don't display the actual value - that's just good practice
    var pwEntered  = document.getElementById("password").value.length > 0 ? "Entered (hidden)" : "Not entered";
    var pw2Entered = document.getElementById("password2").value.length > 0 ? "Entered (hidden)" : "Not entered";

    // helper to show pass or error
    function status(condition, errMsg) {
        if (condition) {
            return '<span style="color:green;">&#10003; pass</span>';
        } else {
            return '<span style="color:red;">&#10007; ERROR: ' + errMsg + '</span>';
        }
    }

    // password match
    var pw1 = document.getElementById("password").value;
    var pw2 = document.getElementById("password2").value;
    var pwMatch = (pw1 === pw2 && pw1.length >= 8);

    // build the review HTML table
    var html = '<h3 style="border-bottom:2px solid #1a7dbf; padding-bottom:5px;">Please Review This Information</h3>';
    html += '<table class="form-table" style="margin-top:10px;">';

    html += '<tr><td class="label-cell">Full Name</td><td class="input-cell">';
    html += (fname + " " + mi + " " + lname).trim() || "<em>blank</em>";
    html += " &nbsp; " + status(fname.length >= 1 && lname.length >= 1, "First and Last name required");
    html += "</td></tr>";

    html += '<tr><td class="label-cell">Date of Birth</td><td class="input-cell">';
    html += dob || "<em>blank</em>";
    html += " &nbsp; " + status(/^\d{2}\/\d{2}\/\d{4}$/.test(dob), "Use MM/DD/YYYY format");
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
    html += "</td></tr>";

    html += '<tr><td class="label-cell">Username</td><td class="input-cell">';
    html += username || "<em>blank</em>";
    html += " &nbsp; " + status(username.length >= 5, "5-30 chars, no spaces, starts with a letter");
    html += "</td></tr>";

    html += '<tr><td class="label-cell">Password</td><td class="input-cell">';
    html += pwEntered;
    html += " &nbsp; " + status(pwMatch, "Passwords must match and meet requirements");
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

    // scroll down so they can see it
    reviewDiv.scrollIntoView({ behavior: "smooth" });
}


/* ============================================================
   FORM SUBMIT - final check before we let them go to thankyou.html.
   Just makes sure passwords match since HTML5 can't check that.
   ============================================================ */
function validateForm(e) {
    var pw1 = document.getElementById("password").value;
    var pw2 = document.getElementById("password2").value;

    if (pw1 !== pw2) {
        e.preventDefault(); // stop the form from submitting
        alert("Your passwords don't match. Please fix that before submitting.");
        document.getElementById("password2").focus();
        return false;
    }

    var username = document.getElementById("username").value;
    if (/^\d/.test(username) || /[^a-zA-Z0-9_\-]/.test(username)) {
        e.preventDefault();
        alert("Please fix your username before submitting.");
        return false;
    }

    return true;
}

/* END OF FILE: scripts.js */
