export const constructorRates = [
    [
        "Mercedes",
        "$37.1m",
        '956.5'
    ],
    [
        "Red Bull",
        "$26.5m",
        '888.5'
    ],
    [
        "Ferrari",
        "$18.8m",
        '594.5'
    ],
    [
        "Mclaren",
        "$18.8m",
        '623'
    ],
    [
        "Aston Martin",
        "$16.4m",
        '250.5'
    ],
    [
        "Alpine",
        "$15.1m",
        '327'
    ],
    [
        "Alpha Tauri",
        "$12.6m",
        '283'
    ],
    [
        "Alfa Romeo",
        "$9.1m",
        '213'
    ],
    [
        "Williams",
        "$6.3m",
        '186'
    ],
    [
        "Haas",
        "$6.1m",
        '133'
    ]
];
/* Pulls prices but not points: https://www.f1fantasytracker.com/prices.html

const ret = [];
document.querySelector('table#constructorTable').querySelectorAll('tbody tr').forEach(row => {
    let [team, currentPrice, seasonStartPrice, pointsPM] = row.querySelectorAll('td')
    ret.push([
        team.innerText,
        currentPrice.innerText,
        'TOTALPOINTS'

    ]);
});
console.log(JSON.stringify(ret, null, "\t"));

*/