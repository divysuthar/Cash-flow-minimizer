class Pair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}

// creditor
class AscCmp {
    compare(p1, p2) {
        return p1.value - p2.value;
    }
}

// debitor
class DscCmp {
    compare(p1, p2) {
        return p2.value - p1.value;
    }
}

class Solution {
    constructor() {
        this.minQ = [];
        this.maxQ = [];
    }

    constructMinMaxQ(amount) {
        for (let i = 0; i < amount.length; ++i) {
            if (amount[i] === 0) continue;
            if (amount[i] > 0) {
                this.maxQ.push(new Pair(i, amount[i]));
            } else {
                this.minQ.push(new Pair(i, amount[i]));
            }
        }
        this.minQ.sort(new DscCmp().compare);
        this.maxQ.sort(new AscCmp().compare);
    }

    solveTransaction(result) {
        while (this.minQ.length > 0 && this.maxQ.length > 0) {
            const maxCreditEntry = this.maxQ.pop();
            const maxDebitEntry = this.minQ.pop();

            const transaction_val = maxCreditEntry.value + maxDebitEntry.value;

            let debtor = maxDebitEntry.key;
            let creditor = maxCreditEntry.key;
            let owed_amount;

            if (transaction_val === 0) {
                owed_amount = maxCreditEntry.value;
            } else if (transaction_val < 0) {
                owed_amount = maxCreditEntry.value;
                maxDebitEntry.value = transaction_val;
                this.minQ.push(maxDebitEntry);
                this.minQ.sort(new DscCmp().compare);
            } else {
                owed_amount = -maxDebitEntry.value;
                maxCreditEntry.value = transaction_val;
                this.maxQ.push(maxCreditEntry);
                this.maxQ.sort(new AscCmp().compare);
            }

            console.log(`Person ${debtor} pays ${owed_amount} to Person ${creditor}`);
            result.push([debtor, creditor, owed_amount])
        }
    }

    minCashFlow(amount, result) {
        // const n = graph.length;

        // Calculate the cash to be credited/debited to/from each person and store in array amount
        // const amount = new Array(n).fill(0);
        // for (let i = 0; i < n; ++i) {
        //     for (let j = 0; j < n; ++j) {
        //         const diff = graph[j][i] - graph[i][j];
        //         amount[i] += diff;
        //     }
        // }

        this.constructMinMaxQ(amount);

        this.solveTransaction(result);
    }
}

export const calculateMinCashFlow = (people, transactions) => {
    const n = people.length;
    // const graph = Array(n).fill(0).map(() => Array(n).fill(0)); // Initialize an n x n matrix with zeros
    const amount = new Array(n).fill(0);

    transactions.forEach(([payer, payee, amountValue]) => {
        const payerIndex = people.indexOf(payer);
        const payeeIndex = people.indexOf(payee);

        // graph[payerIndex][payeeIndex] += amountValue;
        amount[payerIndex] += amountValue;
        amount[payeeIndex] -= amountValue;
    });

    {
        for(let i = 0; i < n; i++){
            console.log(amount[i]);
        }
    }

    let result = []
    const solution = new Solution();
    solution.minCashFlow(amount, result);
    return result
};