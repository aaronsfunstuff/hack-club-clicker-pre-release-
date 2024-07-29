let tickets = 0;
let ticketValue = 1;
let passiveGenerators = 0;
let totalClicks = 0;
let purchasesMade = 0;
let upgradesPurchased = 0;

const ticketButton = document.getElementById('ticket-button');
const ticketCountDiv = document.getElementById('ticket-count');
const totalClicksDiv = document.getElementById('total-clicks');
const clickRateDiv = document.getElementById('click-rate');
const achievementsDiv = document.getElementById('achievements');
const upgradesDiv = document.querySelector('.scroll-content');
const storeDiv = document.getElementById('store');

ticketButton.addEventListener('click', () => {
    tickets += ticketValue;
    totalClicks++;
    updateTicketCount();
    updateStats();
    checkAchievements();
});

// Update ticket count display
function updateTicketCount() {
    ticketCountDiv.textContent = `Tickets: ${tickets}`;
}

// Update stats display
function updateStats() {
    totalClicksDiv.textContent = `Total Clicks: ${totalClicks}`;
    clickRateDiv.textContent = `Click Rate: ${ticketValue}`;
}

// Add upgrade
function addUpgrade(name, cost, effect, icon, description) {
    const upgradeDiv = document.createElement('div');
    upgradeDiv.className = 'upgrade-item';
    upgradeDiv.innerHTML = `
        <img src="${icon}" alt="${name}">
        <div class="upgrade-tooltip">
            <strong>${name}</strong><br>
            Cost: ${cost} Tickets<br>
            Effect: ${effect === 'double' ? 'Doubles ticket value' : effect === 'auto' ? 'Generates tickets automatically' : effect === 'multiplier' ? 'Triples ticket value' : 'Bonus'}<br>
            ${description}
        </div>
    `;
    upgradeDiv.addEventListener('click', () => {
        purchaseUpgrade(effect, cost);
        upgradesPurchased++;
        checkAchievements();
    });
    upgradesDiv.appendChild(upgradeDiv);
}

// Add purchase
function addPurchase(name, cost) {
    const purchaseDiv = document.createElement('div');
    purchaseDiv.className = 'purchase';
    purchaseDiv.innerHTML = `
        <h3>${name}</h3>
        <p>Cost: ${cost} Tickets</p>
        <button onclick="purchaseItem(${cost})">Buy</button>
    `;
    storeDiv.appendChild(purchaseDiv);
}

// Purchase upgrade
function purchaseUpgrade(effect, cost) {
    if (tickets >= cost) {
        tickets -= cost;
        updateTicketCount();
        if (effect === 'double') {
            ticketValue *= 2;
        } else if (effect === 'auto') {
            setInterval(() => {
                tickets += passiveGenerators;
                updateTicketCount();
            }, 1000);
        } else if (effect === 'multiplier') {
            ticketValue *= 3;
        } else if (effect === 'boost') {
            ticketValue *= 1.5; // Adjust multiplier as needed
        } else if (effect === 'bonus') {
            tickets += 500; // Adjust bonus value as needed
        } else if (effect === 'lucky') {
            // Implement lucky charm effect as needed
        }
        updateStats();
    }
}

// Purchase item
function purchaseItem(cost) {
    if (tickets >= cost) {
        tickets -= cost;
        passiveGenerators++;
        purchasesMade++;
        updateTicketCount();
        updateStats();
        checkAchievements();
    }
}

// Check achievements
function checkAchievements() {
    // Click achievements
    if (totalClicks === 500) {
        const achDiv = document.createElement('div');
        achDiv.textContent = 'Achievement Unlocked: 500 Clicks!';
        achievementsDiv.appendChild(achDiv);
    } else if (totalClicks === 1000) {
        const achDiv = document.createElement('div');
        achDiv.textContent = 'Achievement Unlocked: 1000 Clicks!';
        achievementsDiv.appendChild(achDiv);
    }

    // Ticket count achievements
    if (tickets >= 1000) {
        const achDiv = document.createElement('div');
        achDiv.textContent = 'Achievement Unlocked: 1000 Tickets!';
        achievementsDiv.appendChild(achDiv);
    } else if (tickets >= 5000) {
        const achDiv = document.createElement('div');
        achDiv.textContent = 'Achievement Unlocked: 5000 Tickets!';
        achievementsDiv.appendChild(achDiv);
    }

    // Purchase achievements
    if (purchasesMade === 10) {
        const achDiv = document.createElement('div');
        achDiv.textContent = 'Achievement Unlocked: 10 Purchases!';
        achievementsDiv.appendChild(achDiv);
    } else if (purchasesMade === 25) {
        const achDiv = document.createElement('div');
        achDiv.textContent = 'Achievement Unlocked: 25 Purchases!';
        achievementsDiv.appendChild(achDiv);
    }

    // Upgrade achievements
    if (upgradesPurchased === 5) {
        const achDiv = document.createElement('div');
        achDiv.textContent = 'Achievement Unlocked: 5 Upgrades!';
        achievementsDiv.appendChild(achDiv);
    } else if (upgradesPurchased === 10) {
        const achDiv = document.createElement('div');
        achDiv.textContent = 'Achievement Unlocked: 10 Upgrades!';
        achievementsDiv.appendChild(achDiv);
    }
}

// Initialize upgrades and purchases
addUpgrade('Double Ticket Value', 100, 'double', 'https://images.emojiterra.com/google/android-oreo/512px/1f39f.png', 'Doubles the value of each click.');
addUpgrade('Auto Clicker', 500, 'auto', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXxTTKQEmqM2zhzO5UORaCooWXgLy11gQwWw&s', 'Generates tickets automatically every second.');
addUpgrade('Triple Ticket Value', 1000, 'multiplier', 'https://static-00.iconduck.com/assets.00/admission-tickets-emoji-2048x2048-nc3fqb62.png', 'Triples the value of each click.');

// Additional upgrades
addUpgrade('Mega Ticket Multiplier', 2000, 'multiplier', 'https://cdn.iconscout.com/icon/free/png-256/multiply-12-1142781.png', 'Increases ticket value by 10x.');
addUpgrade('Golden Ticket', 1500, 'bonus', 'https://cdn.iconscout.com/icon/free/png-256/ticket-86-458114.png', 'Grants a one-time bonus of 500 tickets.');
addUpgrade('Super Auto Clicker', 2500, 'auto', 'https://cdn.iconscout.com/icon/free/png-256/auto-clicker-1406155.png', 'Automatically clicks for you at a faster rate.');
addUpgrade('Double Click Rate', 3000, 'double', 'https://cdn.iconscout.com/icon/free/png-256/double-click-14-473161.png', 'Doubles the rate at which clicks are registered.');
addUpgrade('Lucky Charm', 4000, 'lucky', 'https://cdn.iconscout.com/icon/free/png-256/lucky-charm-1-458087.png', 'Increases the chance of finding special upgrades.');
addUpgrade('Multiplier Boost', 5000, 'boost', 'https://cdn.iconscout.com/icon/free/png-256/boost-14-473178.png', 'Boosts the effect of all multipliers by 50%.');

// Initialize shop items
addPurchase('Special Ticket Design', 200);
addPurchase('Ticket Boost', 1000);

// Additional shop items
addPurchase('Extra Life', 500);
addPurchase('Speed Boost', 800);
addPurchase('Power Up', 1200);
addPurchase('Shop Discount', 1500);
addPurchase('Ad Removal', 2000);
addPurchase('Bonus Tickets', 2500);

// Initial stats
updateTicketCount();
updateStats();

