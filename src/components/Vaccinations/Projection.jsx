import { Line } from "react-chartjs-2";

import Loading from "./../Loading/Loading";
import styles from "./Vaccinations.module.css";

const POPULATION = 83.02;
const IMMUNITY = 0.6;

function Projection({ dailyData }) {
    const getEndDate = (factor, data) => {
        const lastData = data[data.length - 1];
        const lastDate = lastData.date;
        const lastVacc = lastData.vaccination2;

        const immunes = POPULATION * 1000000000 * IMMUNITY;
        let current = lastVacc;
        let day = new Date(lastDate);
        while (current < immunes) {
            day = new Date(day.setDate(day.getDate() + 1));
            current = current * factor;
        }
        return day;
    }

    const lineChart = () => {
        if (dailyData && dailyData.length !== 0) {
            const data = [];
            let factor = 0;
            for (let index = 0; index < dailyData.length; index++) {
                if (index === 0) {
                    data.push({ date: dailyData[index].date, vaccination1: 0, vaccination2: 0 });
                } else {
                    if (index === 1) {
                        factor = dailyData[index].secondVaccination / dailyData[index-1].secondVaccination;
                    } else {
                        factor = dailyData[index].secondVaccination / dailyData[index-1].secondVaccination;
                    }
                    data.push({ date: dailyData[index].date, vaccination1: data[index-1].vaccination1 + dailyData[index].firstVaccination, vaccination2: data[index-1].vaccination2 + dailyData[index].secondVaccination });
                }
            }
            const endDate = "";
            return (data && data.length === dailyData.length)
                ? (<Line
                    data={{ labels: data.map(({ date }) => new Date(date).toDateString()),
                    datasets: [{
                        data: data.map(({ vaccination1 }) => vaccination1),
                        label: "Vaccinated once",
                        borderColor: "#D2AC4B",
                        fill: true
                    }, {
                        data: data.map(({ vaccination2 }) => vaccination2),
                        label: "Vaccinated twice",
                        borderColor: "#8cb369",
                        fill: true
                    }] }}
                    options={{
                        legend: { display: true },
                        title: { display: true, text: `Current factor (2nd vacc.): ${Number(Math.round(factor * 100) / 100).toFixed(3)}
                            ${endDate === "" ? "" : `\nEstimated pandemic ending in ${Math.ceil(Math.abs(endDate - new Date(Date.now()))/(1000*60*60*24))} days: ${endDate.toDateString()} (60% Immunity)`}` }
                    }}
                />)
                : <Loading />;
        } else {
            return <Loading />;
        }
    };

    return (
        <div className={ styles.chartBigContainer }>
            { lineChart() }
        </div>
    );
}

export default Projection;