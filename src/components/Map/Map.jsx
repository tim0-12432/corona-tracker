import React from "react";
import { Typography } from "@material-ui/core";

import styles from "./Map.module.css";

const Map = ({ district }) => {
	function getSource() {
		if (district !== "") {
			return "https://rki.marlon-lueckert.de/api/districts-map?transparent";
		} else {
			return "https://api.corona-zahlen.org/map/states";
		}
	}

	return (
		<>
			<Typography variant="h4">Heatmap of incidences</Typography>
			<div className={ styles.container }>
				<img src={ getSource() } alt="Heatmap of Corona incidences" className={ styles.image } />
			</div>
		</>
	);
};

export default Map;