/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const Button = ({ functionname, buttonname }) => {
    return (
        <button
            onClick={functionname}
            className="bg-blue-500 text-white rounded-lg px-6 py-3 font-semibold mb-6 hover:bg-green-600 transition duration-300"
        >
            {buttonname}
        </button>
    );
};

export default Button;
