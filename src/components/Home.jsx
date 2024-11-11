/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { calculateMinCashFlow } from '../calculation/calculate';

function Home() {
    const [numPeople, setNumPeople] = useState(0);
    const [people, setPeople] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [person1, setPerson1] = useState('');
    const [person2, setPerson2] = useState('');
    const [amount, setAmount] = useState('');
    const [showornot, setShowornot] = useState(false);

    const handleNumPeopleChange = (e) => {
        const num = parseInt(e.target.value, 10) || 0;
        setNumPeople(num);
        setPeople(Array(num).fill(''));
    };

    const handleNameChange = (index, value) => {
        const newPeople = [...people];
        newPeople[index] = value;
        setPeople(newPeople);
    };

    const handleAddTransaction = () => {
        const transactionAmount = parseFloat(amount);
        if (person1 && person2 && person1 !== person2 && !isNaN(transactionAmount)) {
            setTransactions([...transactions, [person1, person2, transactionAmount]]);
            setPerson1('');
            setPerson2('');
            setAmount('');
        } else {
            alert("Please select valid payer and payee and enter a valid amount.");
        }
    };

    const handleCalculateCashFlow = () => {
        const result = calculateMinCashFlow(people, transactions);
        setShowornot(true);
        setTransactions(result);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center p-6">
            <h2 className="text-3xl font-extrabold text-white mb-6">Cash Flow Minimizer</h2>

            <div className='flex gap-6'>
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

                <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md mb-6">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Add Individual Transactions</h3>
                    <div className="flex flex-col gap-4">
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
                        <button
                            onClick={handleAddTransaction}
                            className="bg-blue-600 text-white rounded-lg px-6 py-3 font-semibold mt-4 hover:bg-blue-700 transition duration-300"
                        >
                            Add Transaction
                        </button>
                    </div>
                </div>
            </div>

            {!showornot && (
                <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mb-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Transactions</h3>
                    <ul className="list-disc list-inside text-gray-800 space-y-2">
                        {transactions.map(([payer, payee, transactionAmount], index) => (
                            <li key={index} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md hover:bg-purple-50 transition duration-300">{`${payer} pays ${payee} ₹${transactionAmount.toFixed(2)}`}</li>
                        ))}
                    </ul>
                </div>
            )}

            {!showornot && (
                <button
                    onClick={handleCalculateCashFlow}
                    className="bg-green-500 text-white rounded-lg px-6 py-3 font-semibold mb-6 hover:bg-green-600 transition duration-300"
                >
                    Calculate Cash Flows
                </button>
            )}

            {showornot && (
                <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Minimal Cash Flow Transactions</h3>
                    <ul className="list-disc list-inside text-gray-800 space-y-2 text-lg">
                        {transactions.length > 0 &&
                            transactions.map(([payer, payee, amount], index) => {
                                const first = people[payer];
                                const second = people[payee];
                                return (
                                    <li key={index} className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-md hover:bg-purple-50 transition duration-300">{`${first} -> ${second} : ₹${amount.toFixed(2)}`}</li>
                                );
                            })}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Home;