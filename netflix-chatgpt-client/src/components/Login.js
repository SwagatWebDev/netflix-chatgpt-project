import React, {useRef, useState} from 'react';
import Header from "./Header";
import {LOGIN_LOGO_URL, USER_LOGO_URL} from "../utils/constants";
import {checkValidLoginData} from "../utils/validate";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import {useNavigate} from "react-router-dom";
import { updateProfile } from "firebase/auth";
import {addUser} from "../utils/userSlice";
import {useDispatch} from "react-redux";

export const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const email = useRef(null);
    const password = useRef(null);
    const fullName = useRef(null);

    const dispatch = useDispatch();

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    const handleButtonClick = () => {
        let validationMessage;
        if (!fullName.current) {
            validationMessage = checkValidLoginData(email.current.value, password.current.value, null);
        } else {
            validationMessage = checkValidLoginData(email.current.value, password.current.value, fullName.current.value);
        }
        setErrorMessage(validationMessage);

        if (validationMessage) return;

        if (!isSignInForm) {
            // sign up logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: fullName.current.value, photoURL: USER_LOGO_URL
                    }).then(() => {
                        // Profile updated!
                        const {uid, email, displayName, photoURL} = auth.currentUser;
                        dispatch(addUser({
                            uid: uid,
                            email: email,
                            displayName: displayName,
                            photoURL: photoURL
                        }));
                    }).catch((error) => {
                        // An error occurred
                        setErrorMessage(error.message);
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        } else {
            // sign in logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    const user = userCredential.user;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage);
                });
        }

    };

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
