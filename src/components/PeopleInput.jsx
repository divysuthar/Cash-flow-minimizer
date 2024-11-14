/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const PeopleInput = ({ numPeople, people, handleNumPeopleChange, handleNameChange }) => (
    <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mb-6">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">Enter People Information</h3>
        <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Number of People:</label>
            <input
                type="number"
                value={numPeople}
                onChange={handleNumPeopleChange}
                min="1"
                className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
        </div>
        {people.map((name, index) => (
            <div key={index} className="mb-2">
                <input
                    type="text"
                    placeholder={`Person ${index + 1} Name`}
                    value={name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
            </div>
        ))}
    </div>
);

export default PeopleInput;
