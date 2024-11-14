/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'

const MinimalTransactionprint = ({ transactions, people }) => {
    return (
        <ul className="list-disc list-inside text-gray-800 space-y-2 text-lg">

            {
                transactions.length > 0 &&
                transactions.map(([payer, payee, amount], index) => {
                    const first = people[payer];
                    const second = people[payee];
                    return (
                        <li key={index} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md hover:bg-purple-50 transition duration-300">{`${first} -> ${second} : ₹${amount.toFixed(2)}`}</li>
                    );
                })
            }
        </ul>   
    )
}

export default MinimalTransactionprint