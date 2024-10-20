// API URL pointing to the new backend server
const apiUrl = 'http://localhost:3002/roobet';


// Function to update the leaderboard table in HTML
function updateLeaderboard(leaderboardData) {
    const tbody = document.getElementById('leaderboard-body');
    tbody.innerHTML = '';  // Clear existing rows

    leaderboardData.forEach(player => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${player.rank}</td>
            <td>${player.username}</td>
            <td>${player.wagered}</td>
            <td>${player.prize}</td>
        `;
        tbody.appendChild(row);
    });
}

// Fetch affiliate stats from the new backend server
async function fetchAffiliateStats() {
    try {
        // Fetch data from the backend server
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);  // Log the response data for debugging

        // Map the API data to the leaderboard format
        const apiLeaderboardData = data.map((player, index) => ({
            rank: index + 1,
            username: player.username || 'Unknown',
            wagered: player.wagered || 0,
            prize: getPrizeByRank(index + 1)
        }));
        
        // Update the leaderboard with the API data
        updateLeaderboard(apiLeaderboardData);

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Helper function to assign prizes based on rank
function getPrizeByRank(rank) {
    switch (rank) {
        case 1: return '$25';
        case 2: return '$20';
        case 3: return '$15';
        case 4: return '$10';
        case 5: return '$5';
        default: return '$0';
    }
}

// Initial static leaderboard data
const staticLeaderboardData = [
    { rank: 1, username: 'Player1', wagered: 1200, prize: '$25' },
    { rank: 2, username: 'Player2', wagered: 1100, prize: '$20' },
    { rank: 3, username: 'Player3', wagered: 1000, prize: '$15' },
    { rank: 4, username: 'Player4', wagered: 900, prize: '$10' },
    { rank: 5, username: 'Player5', wagered: 800, prize: '$5' },
    { rank: 6, username: 'Player6', wagered: 700, prize: '$0' },
    { rank: 7, username: 'Player7', wagered: 600, prize: '$0' },
    { rank: 8, username: 'Player8', wagered: 500, prize: '$0' },
    { rank: 9, username: 'Player9', wagered: 400, prize: '$0' },
    { rank: 10, username: 'Player10', wagered: 300, prize: '$0' }
];

// Display initial static leaderboard data on page load
updateLeaderboard(staticLeaderboardData);

// Fetch and update the leaderboard with API data
fetchAffiliateStats();