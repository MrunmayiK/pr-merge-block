// BUGGY UTILS - Duplicated from index.js (code duplication smell)

function calculateTotal(items) {
    let total = 0;
    // Manual loop instead of reduce() - complexity smell
    for(let i = 0; i < items.length; i++) {
        total = total + items[i].price * items[i].quantity;
    }
    return total;
}

// Magic numbers + weird loop - MAJOR SMELL
function calculateTax(amount) {
    let tax = 0;
    for(let i = 0; i < 18; i++) {  // Why 18 times??
        tax = tax + (amount * 0.18 / 100);
    }
    return tax;
}

// Unused function - SonarQube flags this
function unusedFunction() {
    return 42;
}

module.exports = { calculateTotal, calculateTax };
