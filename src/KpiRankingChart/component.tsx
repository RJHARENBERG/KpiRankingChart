import * as React from "react";

/**Gegevens weergeven met React
 * U kunt gegevens weergeven met React. Het onderdeel kan gegevens weergeven op basis van de eigen status.*/
export interface State {
    RankingData: object[],
    size: number
}

export const initialState: State = {
    RankingData: [],
    size: 0
}

export interface country {
    scoop?: string,
    ISO?: string,
    status?: string[],
}

export class KpiRankingChart extends React.Component<{}> {

    constructor(props: any) {
        super(props);
        this.state = initialState;
    }

    /**Uw visual instellen om gegevens te verzenden
     * In deze sectie werkt u uw visual bij om updates te verzenden naar exemplaren in het onderdeelbestand .*/
    private static updateCallback: (data: object) => void = null;

    public static update(newState: State) {
        if (typeof KpiRankingChart.updateCallback === 'function') {
            KpiRankingChart.updateCallback(newState);
        }
    }

    public state: State = initialState;

    public componentWillMount() {
        KpiRankingChart.updateCallback = (newState: State): void => {
            this.setState(newState);
        };
    }

    public componentWillUnmount() {
        KpiRankingChart.updateCallback = null;
    }

    /** hier sorteren van de status op kleur? of aparte variabele / kolommen maken van uit de data base?*/
    /** het renderen van het react component */

    render() {
        const {RankingData, size} = this.state;
        const style: React.CSSProperties = {width: size, height: size};

        let countryList: country[] = new Array<country>();

        /** -----------------hard coded objecten------------------- */
        // const american
        //     = {
        //     scoop: "American's",
        //     ISO: "AM",
        //     status: [
        //         "red", "red", "red", "red",
        //         "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow",
        //         "yellow", "yellow",
        //         "green", "green", "green",
        //     ],
        // }
        // countryList.push(american)
        //
        // const africa
        //     = {
        //     scoop: "Africa",
        //     ISO: "AF",
        //     status: ["red", "red", "red", "red", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow", "yellow",
        //         "yellow", "yellow", "yellow", "yellow", "green", "green", "green", "green",],
        // }
        // countryList.push(africa)
        //
        // const europa = {
        //     scoop: "Europa",
        //     ISO: "EU",
        //     status: ["red", "red", "red", "red", "red", "red", "red", "yellow", "yellow", "yellow", "yellow", "yellow",
        //         "yellow", "yellow", "yellow", "yellow", "green", "green", "green",],
        // }
        // countryList.push(europa)
        //
        // const asia
        //     = {
        //     scoop: "Asia",
        //     ISO: "AS",
        //     status: ["red", "red", "red", "red", "red", "red", "red", "yellow", "yellow", "yellow", "yellow", "yellow",
        //         "yellow", "yellow", "green", "green", "green", "green", "green",],
        // }
        // countryList.push(asia)

        /** ----------------RankingData status sorteren op scoop------------------ */
        function setData(data) {
            const objectsToMake: any[] = new Array<any>()

            RankingData.map(function (data) {
                objectsToMake.push(data[3])
            })

            const uniqueObjectsToMake = [...new Set(objectsToMake)];

            uniqueObjectsToMake.map((scoop)=>{
                const country: country = {
                    scoop: "",
                    ISO: "",
                    status: [],
                };
                data.filter((obj) => {
                    if (obj[3] === scoop) {
                        country.scoop = obj[3]
                        country.ISO = obj[2]
                        country.status = [...country.status, obj[1]]
                    }
                })
                countryList.push(country)
            })
        }
        setData(RankingData)

        // console.log(RankingData)
        console.log(countryList)

        /** -----------------dynamisch maken------------------- */
        /**het dynamisch object moet er net zo uit zien als de countriesList, maar dan gevuld met de data uit RankingData
         * dit object komt namelijk via de "class visual.ts" door de state uit power bi
         */
        // const countryList2 = RankingData.reduce((groupedByScoop, country: country, n, o) => {
        //     const scoop = country[3];
        //
        //     if (groupedByScoop[scoop] == null) groupedByScoop[scoop] = []
        //     groupedByScoop[scoop].push(country)
        //
        //     return groupedByScoop;
        // }, {})

        // const countryListToArray = Object.keys(countryList2).map((key) => {
        //     return {[key]: countryList2[key as keyof typeof countryList2]};
        // });


        // for (let i = 0; i < countryListToArray.length; i++) {
        //     const oldKey = Object.keys(countryListToArray[i])[0]
        //     console.log(oldKey)
        // }


        // const countryListToArray = Object.keys(countryList2).map(function (k) {
        //     return countryList2[k]
        // });
        //
        // let countryListToArray2 = []
        // for (let o in countryList2) {
        //     countryListToArray2.push(countryList2[o])
        // }
        //
        // console.log(countryList2)
        // console.log(countryListToArray)
        // console.log(countryListToArray2)


        /** -----------------hier onder wordt door react de visual dynamisch gerenderd op het dashboard------------- */
        /** de styling vind je terus in visual.less. de className verwijst naar de css die in die div gebruikt wordt.
         * alles is met flexbox uitgelijnd*/
        return (
            <>
                <div className="container" style={style}>
                    <div className="wrapper">
                        <h1>Ranking</h1>
                        <div className="ranking-card">
                            {countryList.map((data, index, array) => {
                                return (
                                    <div className="countries-card">
                                        <div className="scope-label">
                                            {data.ISO}
                                            <div className="yellow-rank-number">
                                                {data.status.filter(x => x == 'yellow').length}
                                            </div>
                                        </div>
                                        <div className="balance-card">
                                            <h2>{data.scoop}</h2>
                                            <div className="kpi-card">
                                                {data.status.map((statusColor, index, array) => {
                                                    if (statusColor === "red" && index + 1 === array.length) {
                                                        return <div className={`
                                                        kpi-square 
                                                        theme-red-top 
                                                        kpi-square-right-radius`}/>
                                                    }
                                                    if (statusColor === "red" && index !== 0) {
                                                        return <div className={`
                                                        kpi-square 
                                                        theme-red-top`}/>
                                                    }
                                                    if (statusColor === "red" && index === 0) {
                                                        return <div className={`
                                                        kpi-square 
                                                        theme-red-top 
                                                        kpi-square-lef-radius`}/>
                                                    }
                                                    if (statusColor === "yellow" && index + 1 === array.length) {
                                                        return <div className={`
                                                        kpi-square 
                                                        theme-yellow-top 
                                                        kpi-square-right-radius`}/>
                                                    }
                                                    if (statusColor === "yellow" && index !== 0) {
                                                        return <div className={`
                                                        kpi-square 
                                                        theme-yellow-top`}/>
                                                    }
                                                    if (statusColor === "yellow" && index === 0) {
                                                        return <div className={`
                                                        kpi-square 
                                                        theme-yellow-top 
                                                        kpi-square-lef-radius`}/>
                                                    }
                                                    if (statusColor === "green" && index + 1 === array.length) {
                                                        return <div className={`
                                                        kpi-square 
                                                        theme-green-top 
                                                        kpi-square-right-radius`}/>
                                                    }
                                                    if (statusColor === "green" && index !== 0) {
                                                        return <div className={`
                                                        kpi-square 
                                                        theme-green-top`}/>
                                                    }
                                                    if (statusColor === "green" && index === 0) {
                                                        return <div className={`
                                                        kpi-square 
                                                        theme-green-top 
                                                        kpi-square-lef-radius`}/>
                                                    }
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


export default KpiRankingChart;