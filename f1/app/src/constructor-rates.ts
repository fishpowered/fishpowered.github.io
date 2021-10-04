export const constructorRates = [
    [
        "Mercedes",
        "$37.3m",
        '818.5'
    ],
    [
        "Red Bull",
        "$26.3m",
        '753.5'
    ],
    [
        "Ferrari",
        "$18.8m",
        '523.5'
    ],
    [
        "Mclaren",
        "$18.8m",
        '569'
    ],
    [
        "Aston Martin",
        "$16.4m",
        '233.5'
    ],
    [
        "Alpine",
        "$15.2m",
        '316'
    ],
    [
        "Alpha Tauri",
        "$12.6m",
        '260'
    ],
    [
        "Alfa Romeo",
        "$9.1m",
        '178'
    ],
    [
        "Williams",
        "$6.3m",
        '171'
    ],
    [
        "Haas",
        "$6.1m",
        '131'
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