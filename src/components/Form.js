import { useEffect, useState } from "react"

// Importing CSS
import "./Form.css"

const Form = () => {

    const [formData, setFormData] = useState({
        firstName: {
            value: "",
            errorMsg: "",
            defaultErrorMsg: "* FirstName should be atleast 3 and atmost 16 characters long and should contain only letters",
        },
        lastName: {
            value: "",
            errorMsg: "",
            defaultErrorMsg: "* Lastname should be atleast 3 and atmost 16 characters long and should contain only letters",
        },
        password: {
            value: "",
            errorMsg: "",
            defaultErrorMsg: "* Password should be 8 to 20 characters long and contain atleast one Capital letter, one Small letter, one Number and one Special Symbol.",
        },
        confirmPassword: {
            value: "",
            errorMsg: "",
            defaultErrorMsg: "* NOT matching with Password Field",
        },
        dob: new Date(),
        gender: "",
        interests: [],
    })

    const [showPassword, setShowPassword] = useState({
        showPasswordBtn: false,
        showConfirmPasswordBtn: false,
    })

    useEffect(() => {
        // This is to check the content of "formData" eachtime we make some changes to our form
        console.dir(formData)
    })

    function togglePasswordVisibility(e) {
        const {name} = e.currentTarget
        setShowPassword(prev => {
            return {
                ...prev,
                [name]: !prev[name],
            }
        })
    }

    function handleInputData(e) {
        const {name, value} = e.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: {
                    ...prevFormData[name],
                    value,
                },
            }
        })

        if(value !== "") {
            e.target.classList.add("focus-input")
        }
        else {
            e.target.classList.remove("focus-input")
        }
    }

    function handleCheckboxInput(e) {
        if(e.target.checked === true) {
            if(!(formData?.interests.includes(e.target.name))) {
                formData.interests.push(e.target.name)
            }
        }
        else {
            if(formData.interests.includes(e.target.name)) {
                setFormData(prevFormData => {
                    prevFormData.interests.splice(prevFormData.interests.findIndex(interest => interest === e.target.name), 1)
                    return prevFormData
                })
            }
        }
    }

    function handleRadioButtonInput(e) {
        if(e.target.checked === true) {
            setFormData(prevFormData => {
                return {
                    ...prevFormData,
                    [e.target.name]: e.target.value,
                }
            })
        }
    }

    function validateInput(e) {
        const {name, value} = e.target
        // Here we are accessing the data-attributes
        const {inputPattern, required} = e.target.dataset
        // If the "inputPattern" / "required" - pattern doesn't exist, then because of the above
        // Object Destructuring, they will contain "undefined" as their values respectively.
        // The above Object Destructuring will not throw any error in cae the property doesn't exist.

        // If the field is required and doesn't contain anything, then make the filed as "invalid"
        if(!value && required === "true") {
            e.target.dataset.invalid = "true"
            setFormData(prevFormData => {
                return {
                    ...prevFormData,
                    [name]: {
                        ...prevFormData[name],
                        errorMsg: `* ${name.toUpperCase()} field is required`
                    }
                }
            })
            return
        }

        // Next let's check whether the Regex pattern for the input data is matching or not
        // Step1: Create the Regexp object using the "inputPattern" - data attribute
        const inputPatternRegex = new RegExp(inputPattern)
        if(!inputPatternRegex.test(value)) {
            e.target.dataset.invalid = "true"
            setFormData(prevFormData => {
                return {
                    ...prevFormData,
                    [name]: {
                        ...prevFormData[name],
                        errorMsg: prevFormData[name].defaultErrorMsg,
                    }
                }
            })
            return
        }

        e.target.dataset.invalid = "false"
    }

    return (
        <div className="form-wrapper">
            <form>
                <div className="form-group">
                    <div className="input-wrapper text-type-input">
                        <input 
                            type="text" 
                            id="first-name"
                            name="firstName"
                            value={formData.firstName.value}
                            onChange={handleInputData}
                            data-input-pattern="^[A-Za-z]{3,16}$"
                            data-required="true"
                            data-invalid="false"
                            onBlur={validateInput}
                        />
                        <label for="first-name">Firstname</label>
                    </div>
                    <p className="error-msg">{formData.firstName.errorMsg}</p>
                </div>
                <div className="form-group">
                    <div className="input-wrapper text-type-input">
                        <input 
                            type="text" 
                            id="last-name"
                            name="lastName"
                            value={formData.lastName.value}
                            onChange={handleInputData}
                            data-input-pattern="^[A-Za-z]{2,16}$"
                            data-required="true"
                            data-invalid="false"
                            onBlur={validateInput}
                        />
                        <label for="last-name">Lastname</label>
                    </div>
                    <p className="error-msg">{formData.lastName.errorMsg}</p>
                </div>
                <div className="form-group">
                    <div className="input-wrapper text-type-input">
                        <input 
                            type={(showPassword?.showPasswordBtn) ? "text" : "password"} 
                            id="passwd"
                            name="password"
                            value={formData.password.value}
                            onChange={handleInputData}
                            data-input-pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*+])[A-Za-z0-1!@#$%^&*+]{8,20}"
                            data-required="true"
                            data-invalid="false"
                            onBlur={validateInput}
                        />
                        <label for="passwd">Password</label>
                        <button 
                            className="toggle-password-visibility" 
                            onClick={ togglePasswordVisibility }
                            type="button"
                            name="showPasswordBtn"
                        >
                            {/* By default the type of buttons inside a form is: "submit". But since here we are not submitting the form data using the above button, hence we need to change its type to "button" */}
                            {
                                (showPassword?.showPasswordBtn) ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" className="w-6 h-6">
                                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                        <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" className="w-6 h-6">
                                        <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                                        <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                                        <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                    <p className="error-msg">{formData.password.errorMsg}</p>
                </div>
                <div className="form-group">
                    <div className="input-wrapper text-type-input">
                        <input 
                            type={(showPassword?.showConfirmPasswordBtn) ? "text" : "password"} 
                            id="confirm-passwd"
                            name="confirmPassword"
                            value={formData.confirmPassword.value}
                            onChange={handleInputData}
                            data-input-pattern={`^${formData.password.value}$`}
                            data-required="true"
                            data-invalid="false"
                            onBlur={validateInput}
                        />
                        <label for="confirm-passwd">Confirm Password</label>
                        <button 
                            className="toggle-password-visibility" 
                            onClick={ togglePasswordVisibility }
                            name="showConfirmPasswordBtn"
                            type="button">
                            {/* By default the type of buttons inside a form is: "submit". But since here we are not submitting the form data using the above button, hence we need to change its type to "button" */}
                            {
                                (showPassword?.showConfirmPasswordBtn) ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" className="w-6 h-6">
                                        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                        <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" className="w-6 h-6">
                                        <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                                        <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                                        <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                                    </svg>
                                )
                            }
                        </button>
                    </div>
                    <p className="error-msg">{formData.confirmPassword.errorMsg}</p>
                </div>
                <div className="input-wrapper date-type-input">
                    <label for="dob">DOB</label>
                    <input 
                        type="date" 
                        id="dob"
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputData}
                    />
                </div>
                <div className="input-wrapper">
                    <label for="">Interests</label>
                    <div className="checkbox-wrapper">
                        <input 
                            type="checkbox" 
                            id="reading"
                            name="reading"
                            onChange={handleCheckboxInput}
                        />
                        <label for="reading">Reading</label>
                    </div>
                    <div className="checkbox-wrapper">
                        <input 
                            type="checkbox" 
                            id="coding"
                            name="coding"
                            onChange={handleCheckboxInput}
                        />
                        <label for="coding">Coding</label>
                    </div>
                    <div className="checkbox-wrapper">
                        <input 
                            type="checkbox" 
                            id="travelling"
                            name="travelling"
                            onChange={handleCheckboxInput}
                        />
                        <label for="travelling">Travelling</label>
                    </div>
                </div>
                <div className="input-wrapper">
                    <label for="">Gender</label>
                    <div className="radio-button-wrapper">
                        <input 
                            type="radio" 
                            id="male"
                            name="gender"
                            value="male"
                            onChange={handleRadioButtonInput}
                        />
                        <label for="male">Male</label>
                    </div>
                    <div className="radio-button-wrapper">
                        <input 
                            type="radio" 
                            id="female"
                            name="gender"
                            value="female"
                            onChange={handleRadioButtonInput}
                        />
                        <label for="female">Female</label>
                    </div>
                    <div className="radio-button-wrapper">
                        <input 
                            type="radio" 
                            id="others"
                            name="gender"
                            value="others"
                            onChange={handleRadioButtonInput}
                        />
                        <label for="others">Others</label>
                    </div>
                </div>
                <button type="submit" className="register-btn">Register</button>
            </form>
        </div>
    )
}

export default Form