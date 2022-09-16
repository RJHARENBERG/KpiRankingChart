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

        // const europa = {
        //     scoop: "Europa",
        //     ISO: "EU",
        //     status: ["red", "yellow", "green"],
        // }
        // countryList.push(europa)

        function setData(data) {
            const country: country = {
                scoop: "",
                ISO: "",
                status: [],
            };
            data.filter((obj) => {
                if (obj[3] === "American's") {
                    country.scoop = obj[3]
                    country.ISO = obj[2]
                    country.status = [...country.status, obj[1]]
                }
            })
            countryList.push(country)
        }
        setData(RankingData)


        console.log(countryList)
        console.log(RankingData)

        return (
            <>
                <div className="container" style={style}>
                    <div className="wrapper">
                        <h1>Ranking</h1>
                        <div className="ranking-card">
                            {countryList.map((ranking) => {
                                return (
                                    <div className="countries-card">
                                        <div className="scope-label">
                                            {ranking.ISO}
                                            <div className="yellow-rank-number">
                                                {ranking.status.length}
                                            </div>
                                        </div>
                                        <div className="balance-card">
                                            <h2>{ranking.scoop}</h2>

                                            <div className="kpi-card">
                                                {ranking.status.map((color) => {
                                                    if (color === "red") {
                                                        return <div className={`kpi-square theme-red-top`}/>
                                                    }
                                                    if (color === "yellow") {
                                                        return <div className={`kpi-square theme-yellow-top`}/>
                                                    }
                                                    if (color === "green") {
                                                        return <div className={`kpi-square theme-green-top`}/>
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