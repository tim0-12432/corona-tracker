import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";

import Cards from "./components/Cards/Cards";
import Chart from "./components/Chart/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import Map from "./components/Map/Map";
import Projection from "./components/Chart/Projection";
import Loading from "./components/Loading/Loading";
import styles from "./App.module.css";

import { fetchData, fetchDailyData } from "./api";

export default class App extends Component {
    state = {
        data: {},
        daily: [],
        country: "germany",
        district: ""
    }

    async componentDidMount() {
        if ( this.getCountry() === null ) {
            this.setState({ country: "DE" });
            this.saveCountry();
        } else {
            this.setState({ country: this.getCountry() });
        }
        this.setState({ country: "DE" });
        const fetchedData = await fetchData();
        const fetchedDailyData = await fetchDailyData();
        this.setState({ data: fetchedData, daily: fetchedDailyData });
    }

    saveCountry = () => {
        //localStorage.setItem("covid19.country", this.state.country);
        console.log("Cool!");
    };
    getCountry = () => {
        return localStorage.getItem("covid19.country");
    }

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        const fetchedDailyData = await fetchDailyData(country);
        this.setState({ data: fetchedData, daily: fetchedDailyData, country: country });
        this.saveCountry();
    };
    handleDistrictChange = async (district) => {
        const fetchedData = await fetchData(district);
        const fetchedDailyData = await fetchDailyData(district);
        this.setState({ data: fetchedData, daily: fetchedDailyData, district: district });
    };
    setDistrict = (district) => {
        this.setState({ district: district });
    };

    render() {
        const { data, daily, country, district } = this.state;

        if (data === undefined || !data.cases || country === "germany") {
            return (<div className={ styles.container }>
                <Loading />
            </div>)
        }
        return (
            <div className={ styles.container }>
                <Link to="/corona-tracker/vaccinations" className={ styles.link1 }>Vaccinations</Link>
                <Link to="/corona-tracker/manual" className={ styles.link2 }>Manual</Link>
                <Typography variant="h1" className={ styles.headline }>Corona Tracker</Typography>
                <Cards data={ data } />
                <CountryPicker handleCountryChange={ this.handleCountryChange } country={ country }
                    handleDistrictChange={ this.handleDistrictChange } district={ district } setDistrict={ this.setDistrict }
                />
                <Chart data={ data } dailyData={ daily } country={ country } district={ district } />
                <Map district={ district } />
                <Projection />
                <footer>
                    <Typography variant="body2" className={ styles.footer }>All values are provided by the Robert Koch-Institut</Typography>
                    <Typography variant="body2" className={ styles.footer }>API for better usage by Marlon Lueckert (m.lueckert@me.com)</Typography>
                </footer>
            </div>
        );
    };
}
