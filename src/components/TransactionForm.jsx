/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import Button from './Button';

const TransactionForm = ({ people, person1, person2, amount, setPerson1, setPerson2, setAmount, handleAddTransaction }) => {

    return (
        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mb-6">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Add Individual Transactions</h3>
            <div className="flex flex-col gap-4">
                
                {/* Payer Select Field */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Payer:</label>
                    <select
                        value={person1}
                        onChange={(e) => setPerson1(e.target.value)}
                        className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="">Select Payer</option>
                        {people.map((name, index) => (
                            <option key={index} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Payee Select Field */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Payee:</label>
                    <select
                        value={person2}
                        onChange={(e) => setPerson2(e.target.value)}
                        className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="">Select Payee</option>
                        {people.map((name, index) => (
                            <option key={index} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Amount Input Field */}
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Amount in INR:</label>
                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>

                {/* Add Transaction Button */}
                <Button functionname={handleAddTransaction} buttonname={"Add Transaction"} />
            </div>
        </div>
    );
};

export default TransactionForm;
