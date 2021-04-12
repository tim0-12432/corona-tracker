import React, { useState } from "react";
import { Line, Bar } from "react-chartjs-2";
import { FormControl, Button } from "@material-ui/core";

import Loading from "./../Loading/Loading";
import styles from "./Chart.module.css";

const Chart = ({ data, dailyData, country, district }) => {
	const [chartType, setChartType] = useState("line");

	const lineChart = (
		((dailyData && dailyData.length !== 0) || country === "germany")
			? (<Line
				data={{ labels: dailyData.map(({ date }) => new Date(date).toDateString()),
					datasets: [{
						data: dailyData.map(({ cases }) => cases),
						label: "Infected",
						borderColor: "#bc4b51",
						fill: true
					}, {
						data: dailyData.map(({ recovered }) => recovered),
						label: "Recovered",
						borderColor: "#8cb369",
						fill: true
					}, {
						data: dailyData.map(({ deaths }) => deaths),
						label: "Deaths",
						borderColor: "#333533",
						fill: true
					}] }}
			/>)
			: <Loading />
	);

	const barChart = (
		(data?.cases || country === "germany")
			? (
				<Bar
					data={{
						labels: ["Infected","Recovered", "Deaths"],
						datasets: [{
							label: "People",
							backgroundColor: [
								"#bc4b51",
								"#8cb369",
								"#333533"
							],
							data: [
								data.cases,
								data.recovered,
								data.deaths
							]
						}]
					}}
					options={{
						legend: { display: false },
						title: { display: true, text: `Current state in ${ district === "" ? country : data.name }` }
					}}
				/>
			)
			: <Loading />
	);

	return (
		<>
			<div className={ styles.container }>
				{ chartType === "line" ? lineChart : barChart }
			</div>
			<FormControl className={ styles.formControl }>
				<Button variant="outlined" classes={{ root: styles.btn }} onClick={ (e) => {
					chartType === "line" ? setChartType("bar") : setChartType("line");
				} }>{ chartType === "line" ? "Bar Chart" : "Line Chart" }</Button>
			</FormControl>
		</>
	);
};

export default Chart;