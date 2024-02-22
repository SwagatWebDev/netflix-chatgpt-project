import Select from "react-select";
import React, {useRef, useState} from "react";
import {API_OPTION, LOGIN_LOGO_URL} from "../utils/constants";
import axios from "axios";

const ManageProfile = () => {

    const [username, setUsername] = useState('');
    const [gender, setGender] = useState('');
    const [primaryUser, setPrimaryUser] = useState([]);
    const [secondaryUser, setSecondaryUser] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [address, setAddress] = useState('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const fileInputRef = useRef(null);
    const managedUserURL = 'https://netflix-chatgpt-api.vercel.app/netflix-user';


    const option1 = [
        {value: 'Swagat', label: 'Swagat'},
        {value: 'Ram', label: 'Ram'},
        {value: 'Hari', label: 'Hari'}
    ];

    const option2 = [
        {value: 'Swagat', label: 'Swagat'},
        {value: 'Ram', label: 'Ram'},
        {value: 'Hari', label: 'Hari'}
    ];

    const countries = [
        {value: 'india', label: 'IND'},
        {value: 'usa', label: 'USA'},
        {value: 'uk', label: 'UK'}
    ];

    const citiesByCountry = {
        india: [
            {value: 'ban', label: 'Bangalore'},
            {value: 'mum', label: 'Mumbai'},
            {value: 'del', label: 'Delhi'},
        ],
        usa: [
            {value: 'nyc', label: 'New York City'},
            {value: 'la', label: 'Los Angeles'},
            {value: 'was', label: 'Washington'},
        ],
        uk: [
            {value: 'london', label: 'London'},
            {value: 'manchester', label: 'Manchester'},
        ]
    };

    const customStyles = {
        control: (styles) => ({
            ...styles,
            borderColor: errors.countries || errors.city ? '#e53e3e' : styles.borderColor,
        }),
        menu: (styles) => ({
            ...styles,
            backgroundColor: 'white',
        }),
        option: (styles, {isSelected}) => ({
            ...styles,
            cursor: 'pointer',
            backgroundColor: isSelected ? 'blue' : 'initial',
            color: isSelected ? 'white' : 'black',
            '&:hover': {
                backgroundColor: 'blue',
                color: 'white',
            },
        }),
        dropdownIndicator: (provided, state) => ({
            ...provided,
            cursor: 'pointer',
        }),
    };

    const validateForm = () => {
        const errors = {};

        if (username.trim().length < 4) {
            errors.username = 'Username must be at least 4 characters long';
        }

        if (!gender) {
            errors.gender = 'Please select gender';
        }

        if (primaryUser.length === 0) {
            errors.option1 = 'Please select at least one option';
        }

        if (secondaryUser.length === 0) {
            errors.option2 = 'Please select at least one option';
        }

        if (!selectedCountry) {
            errors.countries = 'Please select a country';
        }

        if (!selectedCity) {
            errors.city = 'Please select a city';
        }

        if (!image) {
            errors.image = 'Please select an Image';
        }

        if (address.trim().length < 6) {
            errors.address = 'Address must be at least 6 characters long';
        }

        setErrors(errors);

        return Object.keys(errors).length === 0;
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const createNetflixUser = async (userData) => {
        console.log(userData); // Check userData

        const requestBody = {
            username: userData.username,
            gender: userData.gender,
            address: userData.address,
            image: userData.image.name,
            selectedCity: userData.selectedCity.value,
            selectedCountry: userData.selectedCountry.value,
            primaryUser: userData.primaryUser.map(user => user.value).join(','),
            secondaryUser: userData.secondaryUser.map(user => user.value).join(','),
        };

        console.log(requestBody); // Check formData

        try {
            const response = await axios.post(managedUserURL, requestBody);
            handleSuccess(response);
            resetForm();
            console.log(response.data);
        } catch (error) {
            console.error("Error occurred:", error);
        }
    }



    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            const userData = {
                    username,
                    gender,
                    primaryUser,
                    secondaryUser,
                    selectedCountry,
                    selectedCity,
                    address,
                    image,
            }
            createNetflixUser(userData);

        } else {
            console.log("Form has some errors. please check and fix");
        }
    };

    const handleSuccess = (response) => {
        setSuccessMessage("Successfully created/updated the user information");
        setTimeout(() => {
            setSuccessMessage(""); // Hide success message after 5 seconds
        }, 5000);
        console.log(response.data);
    };

    const resetForm = () => {
        setUsername("");
        setGender("");
        setPrimaryUser([]);
        setSecondaryUser([]);
        setSelectedCountry(null);
        setSelectedCity(null);
        setAddress("");
        setImage(null);
        fileInputRef.current.value = "";
    };

    const closeBanner = () => {
        setSuccessMessage(""); // Clear the success message to hide the banner
    };

    const handleCountryChange = (selectedCountry) => {
        setSelectedCountry(selectedCountry);
        setSelectedCity(null);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-cover"
             style={{backgroundImage: `url(${LOGIN_LOGO_URL})`}}>
            <div className="max-w-md mx-auto p-6 shadow-lg rounded-lg bg-black bg-opacity-50 text-white">
                <h2 className="text-2xl font-bold mb-4">Manage Profile</h2>
                {successMessage && (
                    <div className="mb-4 p-3 bg-green-500 text-white text-center rounded-md relative">
                        {successMessage}
                        <button className="absolute top-0 right-0 m-1 p-1 text-white -mt-2" onClick={closeBanner}>
                            &times;
                        </button>
                    </div>
                )}
                {/*Username Textbox */}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-bold mb-2">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            className={`w-full border rounded-md px-3 py-2 text-black ${errors.username ? 'border-red-500' : ''}`}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                    </div>

                    {/*Gender Radio Buttons */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">
                            Gender:
                        </label>
                        <div className="flex">
                            <label className="mr-4">
                                <input
                                    type="radio"
                                    value="male"
                                    checked={gender === 'male'}
                                    onChange={() => setGender('male')}
                                    className="mr-1"
                                />
                                Male
                            </label>
                            <label className="mr-4">
                                <input
                                    type="radio"
                                    value="female"
                                    checked={gender === 'female'}
                                    onChange={() => setGender('female')}
                                    className="mr-1"
                                />
                                Female
                            </label>
                        </div>
                        {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                    </div>

                    {/*Multiselect Dropdown 1*/}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">
                            Netflix Primary User:
                        </label>
                        <Select
                            id="primaryUser"
                            isMulti
                            options={option1}
                            value={primaryUser}
                            onChange={(user) => setPrimaryUser(user)}
                            styles={customStyles}
                        />
                        {errors.option1 && <p className="text-red-500 text-sm mt-1">{errors.option1}</p>}
                    </div>

                    {/*Multiselect Dropdown 2*/}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">
                            Netflix Secondary User:
                        </label>
                        <Select
                            id="secondaryUser"
                            isMulti
                            options={option2}
                            value={secondaryUser}
                            onChange={(user) => setSecondaryUser(user)}
                            styles={customStyles}
                        />
                        {errors.option2 && <p className="text-red-500 text-sm mt-1">{errors.option2}</p>}
                    </div>

                    {/*Country Dropdown*/}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">
                            Select Country:
                        </label>
                        <Select
                            id="country"
                            options={countries}
                            value={selectedCountry}
                            onChange={handleCountryChange}
                            styles={customStyles}
                        />
                        {errors.countries && <p className="text-red-500 text-sm mt-1">{errors.countries}</p>}
                    </div>

                    {/*City Dropdown(Depends on Country)*/}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">
                            Select City:
                        </label>
                        <Select
                            id="city"
                            options={selectedCountry ? citiesByCountry[selectedCountry.value] : []}
                            value={selectedCity}
                            onChange={(selected) => setSelectedCity(selected)}
                            styles={customStyles}
                        />
                        {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>

                    {/* Image Upload Button */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">
                            Upload Image:
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageChange}
                            className={`w-full border rounded-md px-3 py-2 ${errors.image ? 'border-red-500' : ''}`}
                        />
                        {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                    </div>

                    {/*Address Textbox */}
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2">
                            Address:
                        </label>
                        <textarea
                            id="username"
                            className={`w-full border rounded-md px-3 py-2 text-black${errors.address ? 'border-red-500' : ''}`}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                        {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                    </div>

                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    )
};

export default ManageProfile;
