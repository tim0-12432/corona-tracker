import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import { Pie } from "react-chartjs-2";
import cx from "classnames";

import Loading from "./../Loading/Loading";
import styles from "./Vaccinations.module.css";

function Cards({ data, meta }) {
	const pieChart = (vaccination) => {
		const keys = Object.keys(vaccination);
		return (
			<Pie data={{
				labels: keys,
				datasets: [{
					backgroundColor: ["#A659C5", "#5974C5","#63BB88", "#C87E56","#C05D79"],
					data: keys.map((item) => vaccination[item])
				}]
			}}
			/>
		);
	};

	if (data === undefined || !data.vaccinated) {
		return <Loading />;
	}
	return (
		<div className={ styles.cardContainer }>
			<Grid container spacing={ 3 } justify="center">
				<Grid item component={ Card } xs={ 12 } md className={ cx(styles.card, styles.vaccinated) }>
					<CardContent>
						<Typography gutterBottom>Vaccinated</Typography>
						<Typography variant="h4">
							<CountUp start={ 0 } end={ data.vaccinated } duration={ 2.5 } separator="." />
						</Typography>
						<Typography variant="h6">
							{ data.delta > 0 ? "+" : "" }
							<CountUp start={ 0 } end={ data.delta } duration={ 2.5 } separator="." />
						</Typography>
						<div className={ styles.chartContainer } >
							{ pieChart(data.vaccination) }
						</div>
						<Typography>{ new Date(meta.lastUpdate).toDateString() }</Typography>
						<Typography variant="body2">Number of first vaccinations against COVID-19</Typography>
					</CardContent>
				</Grid>
				<Grid item component={ Card } xs={ 12 } md className={ cx(styles.card, styles.second) }>
					<CardContent>
						<Typography gutterBottom>Second Vaccination</Typography>
						<Typography variant="h4">
							<CountUp start={ 0 } end={ data.secondVaccination.vaccinated } duration={ 2.5 } separator="." />
						</Typography>
						<Typography variant="h6">
							{ data.secondVaccination.delta > 0 ? "+" : "" }
							<CountUp start={ 0 } end={ data.secondVaccination.delta } duration={ 2.5 } separator="." />
						</Typography>
						<div className={ styles.chartContainer } >
							{ pieChart(data.secondVaccination.vaccination) }
						</div>
						<Typography>{ new Date(meta.lastUpdate).toDateString() }</Typography>
						<Typography variant="body2">Number of second vaccinations against COVID-19</Typography>
					</CardContent>
				</Grid>
				<Grid item component={ Card } xs={ 12 } md className={ cx(styles.card) }>
					<CardContent>
						<Typography gutterBottom>{ data.name ? data.name : "Germany" }</Typography>
						<Typography variant="h6">
                            First Quote:<br/><CountUp start={ 0 } end={ data.quote * 100 } duration={ 2.5 } separator="." /> / 100
						</Typography>
						<Typography variant="h6">
                            Second Quote:<br/><CountUp start={ 0 } end={ data.secondVaccination.quote * 100} duration={ 2.5 } separator="." /> / 100
						</Typography>
						<Typography>{ new Date(meta.lastUpdate).toDateString() }</Typography>
						<Typography variant="body2">Additional Information</Typography>
					</CardContent>
				</Grid>
			</Grid>
		</div>
	);
}

export default Cards;