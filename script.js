let tickets = 0;
let ticketValue = 1;
let passiveGenerators = 0;
let totalClicks = 0;

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
            Effect: ${effect === 'double' ? 'Doubles ticket value' : effect === 'auto' ? 'Generates tickets automatically' : 'Triples ticket value'}<br>
            ${description}
        </div>
    `;
    upgradeDiv.addEventListener('click', () => purchaseUpgrade(effect, cost));
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
        }
        updateStats();
    }
}

// Purchase item
function purchaseItem(cost) {
    if (tickets >= cost) {
        tickets -= cost;
        passiveGenerators++;
        updateTicketCount();
        updateStats();
    }
}

// Check achievements
function checkAchievements() {
    if (totalClicks === 500) {
        const achDiv = document.createElement('div');
        achDiv.textContent = 'Achievement Unlocked: 500 Clicks!';
        achievementsDiv.appendChild(achDiv);
    }
}

// Initialize upgrades and purchases
addUpgrade('Double Ticket Value', 100, 'double', 'https://images.emojiterra.com/google/android-oreo/512px/1f39f.png', 'Doubles the value of each click.');
addUpgrade('Auto Clicker', 500, 'auto', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXxTTKQEmqM2zhzO5UORaCooWXgLy11gQwWw&s', 'Generates tickets automatically every second.');
addUpgrade('Triple Ticket Value', 1000, 'multiplier', 'https://static-00.iconduck.com/assets.00/admission-tickets-emoji-2048x2048-nc3fqb62.png', 'Triples the value of each click.');
addPurchase('Special Ticket Design', 200);
addPurchase('Ticket Boost', 1000);

// Initial stats
updateTicketCount();
updateStats();
