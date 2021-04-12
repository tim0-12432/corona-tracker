import React from "react";
import { Card, CardContent, Typography, Grid } from "@material-ui/core";
import CountUp from "react-countup";
import cx from "classnames";

import Loading from "./../Loading/Loading";
import styles from "./Cards.module.css";

const Cards = ({ data }) => {
	if (!data.cases) {
		return <Loading />;
	}
	return (
		<div className={ styles.container }>
			<Grid container spacing={ 3 } justify="center">
				<Grid item component={ Card } xs={ 12 } md className={ cx(styles.card, styles.infected) }>
					<CardContent>
						<Typography gutterBottom>Infected</Typography>
						<Typography variant="h4">
							<CountUp start={ 0 } end={ data.cases } duration={ 2.5 } separator="." />
						</Typography>
						<Typography variant="h6">
							{ data.delta.cases > 0 ? "+" : "" }
							<CountUp start={ 0 } end={ data.delta.cases } duration={ 2.5 } separator="." />
						</Typography>
						<Typography>{ new Date(data.meta.lastUpdate).toDateString() }</Typography>
						<Typography variant="body2">Number of active cases of COVID-19</Typography>
					</CardContent>
				</Grid>
				<Grid item component={ Card } xs={ 12 } md className={ cx(styles.card, styles.recovered) }>
					<CardContent>
						<Typography gutterBottom>Recovered</Typography>
						<Typography variant="h4">
							<CountUp start={ 0 } end={ data.recovered } duration={ 2.5 } separator="." />
						</Typography>
						<Typography variant="h6">
							{ data.delta.recovered > 0 ? "+" : "" }
							<CountUp start={ 0 } end={ data.delta.recovered } duration={ 2.5 } separator="." />
						</Typography>
						<Typography>{ new Date(data.meta.lastUpdate).toDateString() }</Typography>
						<Typography variant="body2">Number of recovered cases of COVID-19</Typography>
					</CardContent>
				</Grid>
				<Grid item component={ Card } xs={ 12 } md className={ cx(styles.card, styles.deaths) }>
					<CardContent>
						<Typography gutterBottom>Deaths</Typography>
						<Typography variant="h4">
							<CountUp start={ 0 } end={ data.deaths } duration={ 2.5 } separator="." />
						</Typography>
						<Typography variant="h6">
							{ data.delta.deaths > 0 ? "+" : "" }
							<CountUp start={ 0 } end={ data.delta.deaths } duration={ 2.5 } separator="." />
						</Typography>
						<Typography>{ new Date(data.meta.lastUpdate).toDateString() }</Typography>
						<Typography variant="body2">Number of deaths caused by COVID-19</Typography>
					</CardContent>
				</Grid>
				<Grid item component={ Card } xs={ 12 } md className={ cx(styles.card) }>
					<CardContent>
						<Typography gutterBottom>{ data.name ? data.name : "Germany" }</Typography>
						<Typography variant="h6">
                            Weekly Incidence:<br/><CountUp start={ 0 } end={ data.weekIncidence } duration={ 2.5 } separator="." decimals={ 2 } decimal="," />
						</Typography>
						<Typography variant="h6">
                            Cases / 100k:<br/><CountUp start={ 0 } end={ data.casesPer100k } duration={ 2.5 } separator="." decimals={ 2 } decimal="," />
						</Typography>
						<Typography>{ new Date(data.meta.lastUpdate).toDateString() }</Typography>
						<Typography variant="body2">Additional Information</Typography>
					</CardContent>
				</Grid>
			</Grid>
		</div>
	);
};

export default Cards;