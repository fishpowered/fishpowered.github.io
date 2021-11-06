import React, {useEffect, useState} from 'react';
import './App.css';
import {driverRates} from "./driver-rates";
import {constructorRates} from "./constructor-rates";

const COL_CONSTRUCTOR_NAME = 0;
const COL_CONSTRUCTOR_PRICE = 1;
const COL_CONSTRUCTOR_POINTS = 2;
const COL_DRIVER_PRICE = 2;
const COL_DRIVER_NAME = 0;
const COL_DRIVER_TEAM = 1;
const COL_DRIVER_POINTS = 4;
const COL_SQUAD_SCORE = 0;
const COL_SQUAD_CONSTRUCTOR = 1;
const COL_SQUAD_DRIVER1 = 2;
const COL_SQUAD_DRIVER2 = 3;
const COL_SQUAD_DRIVER3 = 4;
const COL_SQUAD_DRIVER4 = 5;
const COL_SQUAD_DRIVER5 = 6;
const COL_SQUAD_BUDGET_REMAINING = 7;

function App() {
    const [budget, setBudget] = useState('107.80');
    const [bestTeams, setBestTeams] = useState<(string|number)[][]>([]);
    const [isCalculating, setIsCalculating] = useState(false);

    useEffect(()=>{
        console.log('Budget changed and calculating: '+budget);
        setIsCalculating(true);
        calculateBestTeams(budget, driverRates, constructorRates).then(
            (bestSquads: (string | number)[][]) => {
                console.log('Calculations finished, found: '+bestSquads.length);
                setBestTeams(bestSquads);
                setIsCalculating(false);
            },
            (error) => console.error(error)
        );

    }, [budget]);

console.log(bestTeams);
    return (
        <div className="App">
            <label>Enter budget: $<input id={'budget'} value={budget} type={'number'} step={'0.01'}
                    onChange={(e)=>setBudget(e.target.value)} /></label>
            <h2>Best squads</h2>
            <table>
                <thead>
                <tr>
                    <th>Score</th>
                    <th>Team</th>
                    <th>Driver 1</th>
                    <th>Driver 2</th>
                    <th>Driver 3</th>
                    <th>Driver 4</th>
                    <th>Driver 5</th>
                    <th>Remaining budget</th>
                </tr>
                </thead>
                <tbody>
                {isCalculating
                    ? <tr><td colSpan={8}>Calculating teams...</td></tr>
                    : bestTeams.map(row => <tr>
                        {row.map(data => <td>{data}</td>)}
                    </tr>)}
                </tbody>
            </table>
            <h2>Drivers</h2>
            <table>
                <thead>
                    <tr>
                        <th>Driver</th>
                        <th>Team</th>
                        <th>Current price</th>
                        <th>Season start price</th>
                        <th>Total points</th>
                    </tr>
                </thead>
                <tbody>
                {driverRates.map(row => <tr>
                    {row.map(data => <td>{data}</td>)}
                </tr>)}

                </tbody>
            </table>
            <h2>Constructors</h2>
            <table>
                <thead>
                <tr>
                    <th>Team</th>
                    <th>Current price</th>
                    <th>Season start price</th>
                    <th>Total points</th>
                </tr>
                </thead>
                <tbody>
                {constructorRates.map(row => <tr>
                    {row.map(data => <td>{data}</td>)}
                </tr>)}
                </tbody>
            </table>
        </div>
    );
}

async function calculateBestTeams(budget:(string|number), driverRates: string[][], constructorRates: string[][]){
    budget = parsePrice(budget+'');
    const squads:(string|number)[][] = [];
    //let remainingDrivers = [...driverRates];
    for(let constructor of constructorRates) {
        let driverCount = driverRates.length;
        let d1, d2, d3, d4, d5;

        for (d1 = 0; d1 < driverCount; d1++) {
            for (d2 = d1 + 1; d2 < driverCount; d2++) {
                for (d3 = d2 + 1; d3 < driverCount; d3++) {
                    for (d4 = d3 + 1; d4 < driverCount; d4++) {
                        for (d5 = d4 + 1; d5 < driverCount; d5++) {
                            let cost = parsePrice(driverRates[d1][COL_DRIVER_PRICE])
                                + parsePrice(driverRates[d2][COL_DRIVER_PRICE])
                                + parsePrice(driverRates[d3][COL_DRIVER_PRICE])
                                + parsePrice(driverRates[d4][COL_DRIVER_PRICE])
                                + parsePrice(driverRates[d5][COL_DRIVER_PRICE])
                                + parsePrice(constructor[COL_CONSTRUCTOR_PRICE]);
                            if (cost <= budget) {
                                let score = parseFloat(driverRates[d1][COL_DRIVER_POINTS])
                                    + parseFloat(driverRates[d2][COL_DRIVER_POINTS])
                                    + parseFloat(driverRates[d3][COL_DRIVER_POINTS])
                                    + parseFloat(driverRates[d4][COL_DRIVER_POINTS])
                                    + parseFloat(driverRates[d5][COL_DRIVER_POINTS])
                                    + parseFloat(constructor[COL_CONSTRUCTOR_POINTS])
                                ;
                                squads.push([
                                    round(score),
                                    constructor[COL_CONSTRUCTOR_NAME],
                                    driverRates[d1][COL_DRIVER_NAME],
                                    driverRates[d2][COL_DRIVER_NAME],
                                    driverRates[d3][COL_DRIVER_NAME],
                                    driverRates[d4][COL_DRIVER_NAME],
                                    driverRates[d5][COL_DRIVER_NAME],
                                    round(budget - cost)
                                ]);
                            }
                        }
                    }
                }
            }
        }
    }
    return squads.sort((a:(string|number)[], b:(string|number)[]):number => {
        // @ts-ignore
        if(Math.fround(a[0])==Math.fround(b[0])){
            return 0;
        }
        // @ts-ignore
        return Math.fround(a[0]) < Math.fround(b[0]) ? 1 : -1;
    }).slice(0, 50);
}

function parsePrice(price: string){
    if(price.startsWith('$')){
        price = price.substr(1);
    }
    if(price.endsWith('m')){
        price = price.substr(0, price.length-1);
    }
    return parseFloat(price);
}

function round(num:number):number{
    return Math.round((num + Number.EPSILON) * 100) / 100;
}

export default App;
