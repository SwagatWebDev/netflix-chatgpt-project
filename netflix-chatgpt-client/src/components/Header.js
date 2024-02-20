import React, {useEffect, useState} from 'react';
import {HEADER_LOGO_URL, IMG_CDN_URL, SUPPORTED_LANGUAGES} from "../utils/constants";
import {onAuthStateChanged, signOut} from "firebase/auth";
import {auth} from "../utils/firebase";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCog, faQuestionCircle, faSignInAlt, faUser} from "@fortawesome/free-solid-svg-icons";
import {addUser, removeUser} from "../utils/userSlice";
import {clearMovies, toggleGptSearchView} from "../utils/gptSlice";
import {changeLanguage} from "../utils/configSlice";

export const Header = () => {

    const user = useSelector(store => store.user);

    const navigate = useNavigate();

    const [showDropdown, setShowDropDown] = useState(false);

    const dispatch = useDispatch();

    const showGptSearch = useSelector(store => store.gpt.showGptSearch);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                const {uid, email, displayName, photoURL} = user;
                dispatch(addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL
                }));
                navigate("/browse");
            } else {
                dispatch(removeUser());
                navigate("/");
            }
        });
        return () => unsubscribe();
    }, []);

    const handleSignOut = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigate("/");
        }).catch((error) => {
            // An error happened.
            // navigate("/error")
        });
    }

    const handleDropdownClick = () => {
        setShowDropDown(!showDropdown);
    }

    const handleDropdownEnter = () => {
        setShowDropDown(true);
    }

    const handleDropdownLeave = () => {
        setShowDropDown(false);
    }

    const handleGptSearchClick = () => {
        if(!showGptSearch){
            dispatch(clearMovies());
        }
        dispatch(toggleGptSearchView());
    }

    const handleLanguageChange = (e) => {
        dispatch(changeLanguage(e.target.value))
    }

    return (
        <div
            className="absolute w-screen md:px-8 md:py-2 md:mx-2 -my-[3.5%] md:my-6 -bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
            <img
                className="w-44 mx-auto md:mx-0 cursor-pointer"
                src={HEADER_LOGO_URL}
                alt="logo"
                onClick={handleGptSearchClick}
            />
            { user && <div className="flex p-2 justify-between">
                {showGptSearch && <select className="p-2 m-2 bg-gray-900 text-white rounded-lg"
                                          onChange={handleLanguageChange}>
                    {SUPPORTED_LANGUAGES.map((lang) => (
                        <option key={lang.identifier} value={lang.identifier}>
                            {lang.name}
                        </option>
                    ))}
                </select>}
                <button className="py-2 px-4 mx-4 my-2 bg-purple-800 text-white rounded-lg"
                        onClick={handleGptSearchClick}>
                    {showGptSearch ? "Home Page" : "ChatGPT Search"}
                </button>
                <img
                    className="mx-2 w-12 h-12 rounded-lg cursor-pointer"
                    alt="userIcon"
                    src={user ? user.photoURL : IMG_CDN_URL}
                    onClick={handleDropdownClick}
                />
                <div
                    className="flex p-2 justify-between mx-auto md:mx-0"
                    onMouseEnter={handleDropdownEnter}
                    onMouseLeave={handleDropdownLeave}
                >
                    {showDropdown ? (
                        <span className="cursor-pointer mt-2 text-white"  onMouseEnter={handleDropdownClick}>
                        &#9650;
                    </span>
                    ) : (
                        <span className="cursor-pointer mt-2 text-white" onMouseLeave={handleDropdownClick}>
                        &#9660;
                    </span>
                    )}
                    {showDropdown && (
                        <div className="absolute right-0 mt-14 bg-black rounded shadow-lg p-6">
                            <ul>
                                <li
                                    className="cursor-pointer text-white flex items-center whitespace-nowrap hover:underline"
                                    onClick={() => navigate("/manage-profile")}
                                >
                                    <FontAwesomeIcon icon={faUser} className="mr-2"/>
                                    Manage Profiles
                                </li>
                                <li className="cursor-pointer text-white flex items-center whitespace-nowrap hover:underline"
                                    onClick={() => console.log("Account called")}
                                >
                                    <FontAwesomeIcon icon={faCog} className="mr-2"/>
                                    Account
                                </li>
                                <li className="cursor-pointer text-white flex items-center whitespace-nowrap hover:underline"
                                    onClick={() => console.log("Help Center")}
                                >
                                    <FontAwesomeIcon icon={faQuestionCircle} className="mr-2"/>
                                    Help Center
                                </li>
                                <li className="cursor-pointer text-white flex items-center mt-2 border-t py-2 whitespace-nowrap hover:underline"
                                    onClick={handleSignOut}
                                >
                                    <FontAwesomeIcon icon={faSignInAlt} className="mr-2"/>
                                    Sign out with Netflix
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>}
        </div>
    );
};

export default Header;
