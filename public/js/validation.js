const first_name = document.getElementById("first_name");
const last_name = document.getElementById("last_name");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
let errorCount = 0;
const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
    errorDisplay.innerText = message;
    inputControl.classList.add("error");
    inputControl.classList.remove("success");
};

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
    errorDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
    const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validateInputs = (type) => {
    const firstNameValue = first_name.value.trim();
    const lastNameValue = last_name.value.trim();
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();
    errorCount = 0;

    if (type === "all" || type === "first_name") {
        if (firstNameValue === "") {
            setError(first_name, "First name is required");
            errorCount++;
        } else {
            setSuccess(first_name);
        }
    }

    if (type === "all" || type === "last_name") {
        if (lastNameValue === "") {
            setError(last_name, "Last name is required");
            errorCount++;
        } else {
            setSuccess(last_name);
        }
    }
    if (type === "all" || type === "username") {
        if (usernameValue === "") {
            setError(username, "Username is required");
            errorCount++;
        } else {
            setSuccess(username);
        }
    }

    if (type === "all" || type === "email") {
        if (emailValue === "") {
            setError(email, "Email is required");
            errorCount++;
        } else if (!isValidEmail(emailValue)) {
            setError(email, "Provide a valid email address");
            errorCount++;
        } else {
            setSuccess(email);
        }
    }

    if (type === "all" || type === "password") {
        if (passwordValue === "") {
            setError(password, "Password is required");
            errorCount++;
        } else if (passwordValue.length < 8) {
            setError(password, "Password must be at least 8 character.");
            errorCount++;
        } else {
            setSuccess(password);
        }
    }

    if (type === "all" || type === "confirm_password") {
        if (password2Value === "") {
            setError(password2, "Please confirm your password");
            errorCount++;
        } else if (password2Value !== passwordValue) {
            setError(password2, "Passwords doesn't match");
            errorCount++;
        } else {
            setSuccess(password2);
        }
    }
};

const validateLogin = (type) => {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    errorCount = 0;

    if (type === "all" || type === "email") {
        if (emailValue === "") {
            setError(email, "Email is required");
            errorCount++;
        } else if (!isValidEmail(emailValue)) {
            setError(email, "Provide a valid email address");
            errorCount++;
        } else {
            setSuccess(email);
        }
    }

    if (type === "all" || type === "password") {
        if (passwordValue === "") {
            setError(password, "Password is required");
            errorCount++;
        } else if (passwordValue.length < 8) {
            setError(password, "Password must be at least 8 character.");
            errorCount++;
        } else {
            setSuccess(password);
        }
    }
};

const onSubmit = () => {
    validateInputs();
    const body = {
        first_name: first_name.value.trim(),
        last_name: last_name.value.trim(),
        username: username.value.trim(),
        email: email.value.trim(),
        password: password.value.trim(),
        password2: password2.value.trim(),
    };
    if (errorCount === 0) {
        $.ajax({
            url: "/signup",
            method: "POST",
            data: body,
            Cache: "default",
            success: function (response) {
                Toast.fire({
                    icon: "success",
                    text: response.message,
                });

                setTimeout(() => {
                    location.href = "http://localhost/myproject/major-project/signin.php";
                }, 5000);
            },
            error: function (err) {
                Toast.fire({
                    icon: "error",
                    text: err.responseJSON.message,
                });
            },
        });
    }
};

const signin = () => {
    validateLogin();
    const body = {
        email: email.value.trim(),
        password: password.value.trim(),
    };
    if (errorCount === 0) {
        $.ajax({
            url: "/myproject/major-project/login.php",
            method: "POST",
            data: JSON.stringify(body),
            Cache: "default",
            success: function (response) {
                Toast.fire({
                    icon: "success",
                    text: response.message,
                });

                setTimeout(() => {
                    location.href = "http://localhost/myproject/major-project";
                }, 5000);
            },
            error: function (err) {
                Toast.fire({
                    icon: "error",
                    text: err.responseJSON.message,
                });
            },
        });
    }
};

const logout = () => {
    $.ajax({
        url: "/myproject/major-project/logout.php",
        method: "get",
        Cache: "default",
        success: function (response) {
            Toast.fire({
                icon: "success",
                text: "logout successfull",
            });
        },
        error: function (err) {
            Toast.fire({
                icon: "error",
                text: err.responseJSON.message,
            });
        },
    });
};
