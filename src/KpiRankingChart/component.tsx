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
    status?: Array<string>,
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

        //check of scope al in listOfSortOutRankingData zit
        //als scope nog niet aanwezig is pus nieuw country object
        //als scoop al wel bestaat pus allen de status waarden in de status array van die scoop

        // const listOfSortOutRankingData = RankingData.reduce((obj,cur)=>({...obj,[cur[0]]: cur}),{})
        //
        // console.log(listOfSortOutRankingData)
        //
        // const countries: country[] = []

        let countryList: {
            scoop: string ,
            ISO: string,
            status:string[]
        }[];

        const country = {
            scoop: "Africa",
            ISO: "AF",
            status: [..."red", "yellow", "green"],
        }

        // countryList.push(country);


        function setData(data) {
            const test = {
                scoop: "",
                ISO: "",
                status: [],
            };
            data.filter((obj) => {
                if (obj[3] === "Africa") {
                    test.scoop = obj[3]
                    test.ISO = obj[2]
                    test.status = [...test.status, obj[1]]
                }
            })
            // countryList.push(test)
            console.log(countryList)
        }

        setData(RankingData)
        console.log(countryList)


        return (
            <>
                <div className="container" style={style}>
                    <div className="wrapper">
                        <h1>Ranking</h1>
                        <div className="ranking-card">
                            {RankingData.map((ranking) => {
                                return (
                                    <div className="countries-card">
                                        <div className="scope-label">
                                            {ranking[0]}
                                            <div className="yellow-rank-number">

                                            </div>
                                        </div>
                                        <div className="balance-card">
                                            <h2></h2>
                                            <div className="kpi-card">
                                                {RankingData.map((kpi) => {
                                                    return (
                                                        <div className={`kpi-square theme-red-top`}/>
                                                    )
                                                })}
                                                {RankingData.map((kpi) => {
                                                    return (
                                                        <div className={`kpi-square theme-yellow-top`}/>
                                                    )
                                                })}
                                                {RankingData.map((kpi) => {
                                                    return (
                                                        <div className={`kpi-square theme-green-top`}/>
                                                    )
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