
// Calculator State
let currentCalculatorType = 'basic';
let calculatorValues = {
    number1: '',
    number2: '',
    percentage: ''
};

// DOM Elements
const calculatorCards = document.querySelectorAll('.calculator-card');
const calculatorTitle = document.getElementById('calculator-title');
const calculatorDescription = document.getElementById('calculator-description');
const inputsContainer = document.getElementById('inputsContainer');
const formulaDisplay = document.getElementById('formulaDisplay');
const formulaText = document.getElementById('formulaText');
const resultDisplay = document.getElementById('resultDisplay');
const resultValue = document.getElementById('resultValue');
const copyButton = document.getElementById('copyButton');
const copyMessage = document.getElementById('copyMessage');
const resetButton = document.getElementById('resetButton');

// Calculator Configurations
const calculatorConfigs = {
    basic: {
        title: 'Basic Percentage Calculator',
        description: 'Calculate what X% of a number is',
        inputs: [
            { field: 'percentage', label: 'Percentage (%)', placeholder: 'Enter percentage', type: 'number' },
            { field: 'number1', label: 'Of Number', placeholder: 'Enter number', type: 'number' }
        ],
        resultLabel: 'Result:',
        calculate: (values) => {
            const num = parseFloat(values.number1);
            const percent = parseFloat(values.percentage);
            if (!isNaN(num) && !isNaN(percent)) {
                return (num * percent) / 100;
            }
            return null;
        },
        getFormula: (values) => `${values.percentage}% of ${values.number1}`,
        resultSuffix: ''
    },
    increase: {
        title: 'Percentage Increase Calculator',
        description: 'Calculate the percentage increase between two numbers',
        inputs: [
            { field: 'number1', label: 'Original Number', placeholder: 'Enter original number', type: 'number' },
            { field: 'number2', label: 'New Number', placeholder: 'Enter new number', type: 'number' }
        ],
        resultLabel: 'Percentage Increase:',
        calculate: (values) => {
            const num1 = parseFloat(values.number1);
            const num2 = parseFloat(values.number2);
            if (!isNaN(num1) && !isNaN(num2) && num1 !== 0) {
                return ((num2 - num1) / num1) * 100;
            }
            return null;
        },
        getFormula: (values) => `From ${values.number1} to ${values.number2}`,
        resultSuffix: '%'
    },
    decrease: {
        title: 'Percentage Decrease Calculator',
        description: 'Calculate the percentage decrease between two numbers',
        inputs: [
            { field: 'number1', label: 'Original Number', placeholder: 'Enter original number', type: 'number' },
            { field: 'number2', label: 'New Number', placeholder: 'Enter new number', type: 'number' }
        ],
        resultLabel: 'Percentage Decrease:',
        calculate: (values) => {
            const num1 = parseFloat(values.number1);
            const num2 = parseFloat(values.number2);
            if (!isNaN(num1) && !isNaN(num2) && num1 !== 0) {
                return ((num1 - num2) / num1) * 100;
            }
            return null;
        },
        getFormula: (values) => `From ${values.number1} to ${values.number2}`,
        resultSuffix: '%'
    },
    whatPercent: {
        title: 'What Percentage Calculator',
        description: 'Find what percentage one number is of another',
        inputs: [
            { field: 'number1', label: 'First Number', placeholder: 'Enter first number', type: 'number' },
            { field: 'number2', label: 'Second Number', placeholder: 'Enter second number', type: 'number' }
        ],
        resultLabel: 'Percentage:',
        calculate: (values) => {
            const num1 = parseFloat(values.number1);
            const num2 = parseFloat(values.number2);
            if (!isNaN(num1) && !isNaN(num2) && num2 !== 0) {
                return (num1 / num2) * 100;
            }
            return null;
        },
        getFormula: (values) => `${values.number1} is what % of ${values.number2}`,
        resultSuffix: '%'
    }
};

// Initialize Calculator
function initializeCalculator() {
    // Set up calculator type selection
    calculatorCards.forEach(card => {
        card.addEventListener('click', () => {
            const type = card.dataset.type;
            switchCalculatorType(type);
        });
    document.querySelector('.calculator-interface').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    // Set up reset button
    resetButton.addEventListener('click', resetCalculator);

    // Set up copy button
    copyButton.addEventListener('click', copyResult);

    // Initialize with basic calculator
    switchCalculatorType('basic');
}

// Switch Calculator Type
function switchCalculatorType(type) {
    if (calculatorConfigs[type]) {
        currentCalculatorType = type;
        
        // Update active state
        calculatorCards.forEach(card => {
            card.classList.toggle('active', card.dataset.type === type);
        });

        // Update calculator interface
        updateCalculatorInterface();
        
        // Reset values
        resetCalculator();
    }
}

// Update Calculator Interface
function updateCalculatorInterface() {
    const config = calculatorConfigs[currentCalculatorType];
    
    // Update title and description
    calculatorTitle.textContent = config.title;
    calculatorDescription.textContent = config.description;

    // Clear and rebuild inputs
    inputsContainer.innerHTML = '';
    
    config.inputs.forEach(input => {
        const inputGroup = document.createElement('div');
        inputGroup.className = 'input-group';
        
        const label = document.createElement('label');
        label.textContent = input.label;
        label.setAttribute('for', input.field);
        
        const inputElement = document.createElement('input');
        inputElement.type = input.type;
        inputElement.id = input.field;
        inputElement.name = input.field;
        inputElement.placeholder = input.placeholder;
        inputElement.value = calculatorValues[input.field] || '';
        
        // Add event listener for real-time calculation
        inputElement.addEventListener('input', (e) => {
            calculatorValues[input.field] = e.target.value;
            updateCalculation();
        });
        
        inputGroup.appendChild(label);
        inputGroup.appendChild(inputElement);
        inputsContainer.appendChild(inputGroup);
    });
}

// Update Calculation
function updateCalculation() {
    const config = calculatorConfigs[currentCalculatorType];
    
    // Update formula display
    const hasValues = Object.values(calculatorValues).some(value => value !== '');
    if (hasValues) {
        const formula = config.getFormula(calculatorValues);
        formulaText.textContent = formula;
        formulaDisplay.classList.remove('hidden');
    } else {
        formulaDisplay.classList.add('hidden');
    }
    
    // Calculate result
    const result = config.calculate(calculatorValues);
    
    if (result !== null && !isNaN(result)) {
        const formattedResult = result.toFixed(2);
        resultValue.textContent = formattedResult + config.resultSuffix;
        resultDisplay.classList.remove('hidden');
    } else {
        resultDisplay.classList.add('hidden');
    }
}

// Reset Calculator
function resetCalculator() {
    calculatorValues = {
        number1: '',
        number2: '',
        percentage: ''
    };
    
    // Clear all inputs
    const inputs = inputsContainer.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
    });
    
    // Hide displays
    formulaDisplay.classList.add('hidden');
    resultDisplay.classList.add('hidden');
    copyMessage.classList.add('hidden');
}

// Copy Result to Clipboard
async function copyResult() {
    const result = resultValue.textContent;
    
    try {
        await navigator.clipboard.writeText(result);
        showCopyMessage();
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = result;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showCopyMessage();
    }
}

// Show Copy Message
function showCopyMessage() {
    copyMessage.classList.remove('hidden');
    setTimeout(() => {
        copyMessage.classList.add('hidden');
    }, 2000);
}

// SEO and Analytics Functions
function trackCalculatorUsage(type) {
    // Google Analytics event tracking (if GA is set up)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'calculator_use', {
            'calculator_type': type,
            'event_category': 'engagement'
        });
    }
}

// Accessibility Features
function setupAccessibility() {
    // Add keyboard navigation for calculator cards
    calculatorCards.forEach(card => {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    // Add ARIA live region for result announcements
    resultDisplay.setAttribute('aria-live', 'polite');
    resultDisplay.setAttribute('aria-atomic', 'true');
}

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeCalculator();
    setupAccessibility();
    
    // Track initial page load
    trackCalculatorUsage('page_load');
});

// Service Worker Registration for PWA capabilities
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}
