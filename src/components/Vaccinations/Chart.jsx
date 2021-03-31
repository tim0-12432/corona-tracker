import { Line } from "react-chartjs-2";

import Loading from "./../Loading/Loading";
import styles from "./Vaccinations.module.css";

function Chart({ dailyData, country }) {
    const lineChart = (
        ((dailyData && dailyData.length !== 0) || country === "germany")
        ? (<Line
            data={{ labels: dailyData.map(({ date }) => new Date(date).toDateString()),
            datasets: [{
                data: dailyData.map(({ firstVaccination }) => firstVaccination),
                label: "Vaccinated once",
                borderColor: "#D2AC4B",
                fill: true
            }, {
                data: dailyData.map(({ secondVaccination }) => secondVaccination),
                label: "Vaccinated twice",
                borderColor: "#8cb369",
                fill: true
            }] }}
        />)
        : <Loading />
    );

    return (
        <div className={ styles.chartBigContainer }>
            { lineChart }
        </div>
    );
}

export default Chart;