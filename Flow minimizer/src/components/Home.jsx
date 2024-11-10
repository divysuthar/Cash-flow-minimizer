/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { calculateMinCashFlow } from './calculate';

function Home() {
    const [numPeople, setNumPeople] = useState(0);
    const [people, setPeople] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [person1, setPerson1] = useState('');
    const [person2, setPerson2] = useState('');
    const [amount, setAmount] = useState('');

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
            // Store transaction as [payer, payee, amount]
            setTransactions([...transactions, [person1, person2, transactionAmount]]);
            setPerson1('');
            setPerson2('');
            setAmount('');
        } else {
            alert("Please select valid payer and payee and enter a valid amount.");
        }
    };

    const handleCalculateCashFlow = () => {
        // Call the function to calculate minimal cash flow and set the result
        const result = calculateMinCashFlow(people, transactions);
        setTransactions(result);  // Now transactions contains [payer, payee, amount]
    };

    return (
        <div>
            <h2>Enter People Information</h2>

            <div>
                <label>Number of People: </label>
                <input
                    type="number"
                    value={numPeople}
                    onChange={handleNumPeopleChange}
                    min="1"
                />
            </div>

            {/* Input fields for each person's name */}
            {people.map((name, index) => (
                <div key={index}>
                    <input
                        type="text"
                        placeholder={`Person ${index + 1} Name`}
                        value={name}
                        onChange={(e) => handleNameChange(index, e.target.value)}
                    />
                </div>
            ))}

            {/* <h3>People List</h3>
            <ul>
                {people.map((name, index) => (
                    <li key={index}>{name || `Person ${index + 1}: No name entered`}</li>
                ))}
            </ul> */}

            <h3>Add Individual Transactions</h3>
            <div>
                <label>Payer:</label>
                <select value={person1} onChange={(e) => setPerson1(e.target.value)}>
                    <option value="">Select Payer</option>
                    {people.map((name, index) => (
                        <option key={index} value={name}>
                            {name}
                        </option>
                    ))}
                </select>

                <label>Payee:</label>
                <select value={person2} onChange={(e) => setPerson2(e.target.value)}>
                    <option value="">Select Payee</option>
                    {people.map((name, index) => (
                        <option key={index} value={name}>
                            {name}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                />
                <button onClick={handleAddTransaction}>Add Transaction</button>
            </div>

            <h3>Transactions</h3>
            <ul>
                {transactions.map(([payer, payee, transactionAmount], index) => (
                    <li key={index}>{`${payer} pays ${payee} $${transactionAmount.toFixed(2)}`}</li>
                ))}
            </ul>

            {/* Button to calculate and display minimal cash flow transactions */}
            <button onClick={handleCalculateCashFlow}>Calculate Cash Flows</button>

            <h3>Minimal Cash Flow Transactions</h3>
            <ul>
                {transactions.length > 0 && transactions.map(([payer, payee, amount], index) => {
                    const first = people[payer];
                    const second = people[payee];
                    return (
                        <li key={index}>{`${first} pays ${second} $${amount.toFixed(2)}`}</li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Home;
