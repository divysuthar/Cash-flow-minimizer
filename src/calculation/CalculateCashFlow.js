// // cashFlowCalculator.js
// export const calculateMinCashFlow = (people, transactions) => {
//     // First, calculate the balance for each person based on transactions
//     const balances = new Array(people.length).fill(0);  // To hold the balance of each person

//     // Calculate the balances from the transactions
//     transactions.forEach(([payer, payee, amount]) => {
//         const payerIndex = people.indexOf(payer);
//         const payeeIndex = people.indexOf(payee);

//         // Update the balance: payer pays, payee receives
//         balances[payerIndex] -= amount;
//         balances[payeeIndex] += amount;
//     });

//     // Now we have the balances, we can calculate the minimal cash flow
//     const result = [];
//     let i = 0;
//     let j = balances.length - 1;

//     // Greedy approach: match debtors and creditors
//     while (i < j) {
//         // If the debtor has no debt, move to the next debtor
//         if (balances[i] === 0) {
//             i++;
//         }
//         // If the creditor is already fully paid, move to the next creditor
//         else if (balances[j] === 0) {
//             j--;
//         }
//         // If both debtor and creditor are still active, make the transaction
//         else {
//             const amount = Math.min(-balances[i], balances[j]);  // Min of debtor's debt and creditor's credit
//             result.push([people[i], people[j], amount]);  // Return transaction as [payer, payee, amount]

//             // Update the balances
//             balances[i] += amount;
//             balances[j] -= amount;
//         }
//     }

//     return result;
// };


class Solution {
    constructor() {
        this.minQ = [];  // Min heap (debtors)
        this.maxQ = [];  // Max heap (creditors)
    }

    // Comparator functions to simulate priority queue (min-heap and max-heap)
    compareMax(a, b) {
        return b[1] - a[1];  // Max-heap: larger credit/debt first
    }

    compareMin(a, b) {
        return a[1] - b[1];  // Min-heap: smaller debt first
    }

    // Construct both maxQ and minQ from the balances
    constructMinMaxQ(amount) {
        for (let i = 0; i < amount.length; i++) {
            if (amount[i] === 0) continue;
            if (amount[i] > 0) {
                this.maxQ.push([i, amount[i]]);  // Add creditors
            } else {
                this.minQ.push([i, amount[i]]);  // Add debtors
            }
        }

        // Sort the arrays to simulate priority queues
        this.maxQ.sort(this.compareMax);
        this.minQ.sort(this.compareMin);
    }

    // Process the transactions and print the results
    solveTransaction() {
        while (this.minQ.length > 0 && this.maxQ.length > 0) {
            const maxCreditEntry = this.maxQ.shift();  // Get the largest creditor
            const maxDebitEntry = this.minQ.shift();   // Get the largest debtor

            const transactionVal = maxCreditEntry[1] + maxDebitEntry[1];
            const debtor = maxDebitEntry[0];
            const creditor = maxCreditEntry[0];
            let owedAmount = 0;

            if (transactionVal === 0) {
                owedAmount = maxCreditEntry[1];  // Transaction fully settled
            } else if (transactionVal < 0) {
                owedAmount = maxCreditEntry[1];  // Remaining credit, push debtor back
                this.minQ.push([maxDebitEntry[0], transactionVal]);
                this.minQ.sort(this.compareMin);
            } else {
                owedAmount = -maxDebitEntry[1];  // Remaining debt, push creditor back
                this.maxQ.push([maxCreditEntry[0], transactionVal]);
                this.maxQ.sort(this.compareMax);
            }

            console.log(`Person ${debtor} pays ${owedAmount} to Person ${creditor}`);
        }
    }

    // Calculate the net credit/debt for each person
    minCashFlow(graph) {
        const n = graph.length;
        const amount = Array(n).fill(0);

        // Calculate net credit/debt for each person
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                amount[i] += graph[j][i] - graph[i][j];
            }
        }

        // Construct the minQ and maxQ based on calculated amounts
        this.constructMinMaxQ(amount);

        // Solve the transactions
        this.solveTransaction();
    }
}

export const calculateMinCashFlow = (people, transactions) => {
    const n = people.length;
    const graph = Array(n).fill(0).map(() => Array(n).fill(0)); // Initialize an n x n matrix with zeros

    // Iterate through the transactions
    transactions.forEach(([payer, payee, amountValue]) => {
        // Get indices of payer and payee in the people array
        const payerIndex = people.indexOf(payer);
        const payeeIndex = people.indexOf(payee);

        // Update the matrix: payer owes amountValue to payee
        graph[payerIndex][payeeIndex] += amountValue;
    });

    const solution = new Solution();
    solution.minCashFlow(graph);
};