import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

import Loading from "./../Loading/Loading";
import Selector from "./../CountryPicker/Selector";
import Cards from "./Cards";
import Chart from "./Chart";
import styles from "./Vaccinations.module.css";

import { fetchVaccData, fetchDailyVaccData } from "./../../api";

export default class Vaccinations extends Component {
    state = {
        data: {},
        daily: [],
        country: "germany"
    }

    async componentDidMount() {
        this.setState({ country: "DE" });
        const fetchedData = await fetchVaccData();
        const fetchedDailyData = await fetchDailyVaccData();
        this.setState({ data: fetchedData, daily: fetchedDailyData });
    }

    handleCountryChange = async (country) => {
        this.setState({ country: country });
        console.log(country);
    };

    render() {
        const { data, daily, country } = this.state;

        if (data.data === undefined || !data.data.vaccinated || country === "germany" || data.data.states === undefined) {
            return (<div className={ styles.container }>
                <Loading />
            </div>)
        }
        return (
            <div className={ styles.container }>
                <Link to="/corona-tracker/" className={ styles.link }>Corona Tracker</Link>
                <Typography variant="h1" className={ styles.headline }>Vaccinations</Typography>
                <Selector country={ country } handleCountryChange={ this.handleCountryChange } />
                <Cards data={ country === "DE" ? data.data : data.data.states[country] } meta={ data.meta } />
                <Chart />
                <footer>
                    <Typography variant="body2" className={ styles.footer }>All values are provided by the Robert Koch-Institut</Typography>
                    <Typography variant="body2" className={ styles.footer }>API for better usage by Marlon Lueckert (m.lueckert@me.com)</Typography>
                </footer>
            </div>
        );
    };
}