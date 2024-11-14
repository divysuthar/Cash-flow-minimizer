/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { calculateMinCashFlow } from '../calculation/calculate';
import MinimalTransactionprint from '../components/MinimalTransactionprint';
import Button from '../components/Button';
import TransactionList from '../components/Transactionlist';
import PeopleInput from '../components/PeopleInput';
import TransactionForm from '../components/TransactionForm';

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
                <PeopleInput
                    numPeople={numPeople}
                    people={people}
                    handleNumPeopleChange={handleNumPeopleChange}
                    handleNameChange={handleNameChange}
                />

                <TransactionForm
                    people={people}
                    person1={person1}
                    person2={person2}
                    amount={amount}
                    setPerson1={setPerson1}
                    setPerson2={setPerson2}
                    setAmount={setAmount}
                    handleAddTransaction={handleAddTransaction}
                />
            </div>

            {!showornot && (
                <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md mb-6">
                    <h3 className="text-xl font-semibold mb-4 text-gray-800">Transactions</h3>
                    <TransactionList transactions={transactions} />
                </div>
            )}

            {!showornot && (
                <Button functionname={handleCalculateCashFlow} buttonname={"Calculate Cash Flows"} />
            )}

            {showornot && (
                <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md">
                    <h3 className="text-2xl font-semibold mb-4 text-gray-800">Minimal Cash Flow Transactions</h3>
                    <MinimalTransactionprint transactions={transactions} people={people} />
                </div>
            )}
        </div>
    );
}

export default Home;