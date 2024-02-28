import React, {useRef, useState} from 'react';
import Header from "./Header";
import {LOGIN_LOGO_URL} from "../utils/constants";
import {checkValidLoginData} from "../utils/validate";
import {useNavigate} from "react-router-dom";
import {addUser} from "../utils/userSlice";
import {useDispatch} from "react-redux";
import Cookies from 'js-cookie';
import axios from 'axios';

export const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();

    const email = useRef(null);
    const password = useRef(null);
    const fullName = useRef(null);

    const dispatch = useDispatch();
    const loginURL = "https://netflix-chatgpt-api.vercel.app/user/login";
    const registerURL = "https://netflix-chatgpt-api.vercel.app/user/register"

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    const handleSignUp = async () => {
        let validationMessage = checkValidLoginData(email.current.value, password.current.value, fullName.current ? fullName.current.value : null);
        setErrorMessage(validationMessage);

        if (validationMessage) return;

        try {
            const response = await axios.post(registerURL, {
                fullName: fullName.current ? fullName.current.value : "",
                email: email.current.value,
                password: password.current.value
            });
            const { data } = response.data;
            dispatch(addUser(data));
            setSuccessMessage("Sign up successful!"); // Set success message
            setTimeout(() => setSuccessMessage(null), 3000); // Clear message after 3 seconds
            toggleSignInForm();
            navigate("/");
        } catch (error) {
            setErrorMessage(error.message);
        }
    };



    const handleSignIn = async () => {
        let validationMessage = checkValidLoginData(email.current.value, password.current.value, null);
        setErrorMessage(validationMessage);

        if (validationMessage) return;

        try {
            const response = await axios.post(loginURL, {
                email: email.current.value,
                password: password.current.value
            });
            const { data } = response.data;
            dispatch(addUser(data));
            Cookies.set('token', data.jwtToken);
            navigate("/browse");
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleButtonClick = async () => {
        if (!isSignInForm) {
            await handleSignUp();
        } else {
            await handleSignIn();
        }
    };

    const closeBanner = () => {
        setSuccessMessage(""); // Clear the success message to hide the banner
    }

    return (
        <div className="relative h-screen">
            <Header/>
            <div className="absolute">
                <img
                    src={LOGIN_LOGO_URL}
                    alt="logo"
                    className="object-cover h-screen md:w-screen"
                />
            </div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="w-full md:w-3/12 absolute p-12 bg-black my-40 md:my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
            >
                {successMessage && (
                    <div className="mb-4 p-3 bg-green-500 text-white text-center rounded-md relative">
                        {successMessage}
                        <button className="absolute top-0 right-0 m-1 p-1 text-white -mt-2" onClick={closeBanner}>
                            &times;
                        </button>
                    </div>
                )}
                <h1 className="font-bold text-3xl py-4">{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && <input
                    ref={fullName}
                    type="text"
                    placeholder="Full Name"
                    className="p-4 my-4 w-full bg-gray-700"
                />}
                <input
                    ref={email}
                    type="text"
                    placeholder="Email Address"
                    className="p-4 my-4 w-full bg-gray-700"
                />
                <input
                    ref={password}
                    type="password"
                    placeholder="Password"
                    className="p-4 my-4 w-full bg-gray-700"
                />
                <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
                <button
                    className="p-4 my-6 bg-red-700 w-full rounded-lg"
                    onClick={handleButtonClick}
                >
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p className="py-4 text-center cursor-pointer" onClick={toggleSignInForm}>
                    {isSignInForm ? " New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}
                </p>
            </form>
        </div>
    );
};

export default Login;
