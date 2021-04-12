import { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { FormControl, Button } from "@material-ui/core";

import Loading from "./../Loading/Loading";
import styles from "./Vaccinations.module.css";

const POPULATION = 83.02;
const IMMUNITY = 0.6;

function Projection({ dailyData }) {
	const immunes = POPULATION * 1000000 * IMMUNITY;
	const [chartType, setChartType] = useState("line");

	const getEndDate = (factor, data) => {
		const lastData = data[data.length - 1];
		const lastDate = new Date(lastData.date);
		const lastVacc = lastData.vaccination2;

		const days = Math.round((immunes - lastVacc) / factor);
		const day = new Date(lastDate.setDate(lastDate.getDate() + days));
		return day;
	};

	const chart = () => {
		if (dailyData && dailyData.length !== 0) {
			const data = [];
			let factor = 0;
			for (let index = 0; index < dailyData.length; index++) {
				if (index === 0) {
					data.push({ date: dailyData[index].date, vaccination1: 0, vaccination2: 0 });
				} else {
					data.push({ date: dailyData[index].date, vaccination1: data[index-1].vaccination1 + dailyData[index].firstVaccination, vaccination2: data[index-1].vaccination2 + dailyData[index].secondVaccination });
					if (index === 1) {
						factor = 1;
					} else {
						if (data[index-1].vaccination2 !== 0) {
							const newFactor = data[index].vaccination2 / data[index-1].vaccination2;
							const difference = newFactor - factor;
							factor = factor + difference / 2;
						} else {
							factor = 1;
						}
					}
				}
			}
			const endDate = "";
			return (data && data.length === dailyData.length)
				? (chartType === "line" ? <Line
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
                            ${endDate === "" ? "" : `\nEstimated vaccination success in ${Math.ceil(Math.abs(endDate - new Date(Date.now()))/(1000*60*60*24))} days: ${endDate.toDateString()} (60% Immunity)`}` }
					}}
				/> : <Bar
					data={{
						labels: ["Vaccinated once","Vaccinated twice", "60% of population"],
						datasets: [{
							label: "People",
							backgroundColor: [
								"#D2AC4B",
								"#8cb369",
								"#bc4b51"
							],
							data: [
								data[data.length - 1].vaccination1,
								data[data.length - 1].vaccination2,
								immunes
							]
						}]
					}}
					options={{
						legend: { display: false },
						title: { display: true, text: `Current factor (2nd vacc.): ${Number(Math.round(factor * 100) / 100).toFixed(3)}
                            ${endDate === "" ? "" : `\nEstimated vaccination success in ${Math.ceil(Math.abs(endDate - new Date(Date.now()))/(1000*60*60*24))} days: ${endDate.toDateString()} (60% Immunity)`}` }
					}}
				/>)
				: <Loading />;
		} else {
			return <Loading />;
		}
	};

	return (
		<>
			<div className={ styles.chartBigContainer }>
				{ chart() }
			</div>
			<FormControl className={ styles.formControl }>
				<Button variant="outlined" classes={{ root: styles.btn }} onClick={ (e) => {
					chartType === "line" ? setChartType("bar") : setChartType("line");
				} }>{ chartType === "line" ? "Bar Chart" : "Line Chart" }</Button>
			</FormControl>
		</>
	);
}

export default Projection;