/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const TransactionList = ({ transactions }) => {
    return (
        <ul className="list-disc list-inside text-gray-800 space-y-2">
            {transactions.map(([payer, payee, transactionAmount], index) => (
                <li
                    key={index}
                    className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md hover:bg-purple-50 transition duration-300"
                >
                    {`${payer} pays ${payee} ₹${transactionAmount.toFixed(2)}`}
                </li>
            ))}
        </ul>
    );
};

export default TransactionList;
