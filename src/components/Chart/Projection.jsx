import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Typography } from "@material-ui/core";

import Loading from "./../Loading/Loading";
import styles from "./Chart.module.css";

import { fetchData, fetchDailyCases } from "./../../api";

const Projection = () => {
    const [data, setData] = useState({});
    const [daily, setDaily] = useState([]);
    const [projection, setProjection] = useState([]);
    const [endDate, setEndDate] = useState("");

    useEffect(() => {
        const fetchApi = async () => {
            setData(await fetchData());
            setDaily(await fetchDailyCases());
        }
        fetchApi();
    }, []);
    useEffect(() => {
        if (data && daily && data.r !== undefined && daily.length !== 0) {
            const copy = daily;
            const r = data.r.value;
            const date = new Date(copy[copy.length - 1].date);
            for (let i = 0; i < (r > 1 ? 50 : 100); i++) {
                if (copy[copy.length - 1].cases !== 0) {
                    const projCases = parseInt(copy[copy.length - 1].cases * r);
                    const projDate = new Date(date.setDate(date.getDate() + 1));
                    if (endDate === "" && projCases === 0) {
                        setEndDate(projDate);
                    }
                    const object = {
                        cases: projCases,
                        date: projDate.toISOString()
                    };
                    copy.push(object);
                }
            }
            setProjection(copy);
        }
    }, [daily]);


    const lineChart = (
        (projection && projection.length !== 0)
        ? (<Line
            data={{ labels: projection.map(({ date }) => new Date(date).toDateString()),
            datasets: [{
                data: projection.map(({ cases }) => cases),
                label: "Infected",
                borderColor: "#bc4b51",
                fill: true
            }] }}
            options={{
                legend: { display: false },
                title: { display: true, text: `Current reproduction rate (R-value): ${data.r.value}
                    ${endDate === "" ? "" : `\nEstimated pandemic ending in ${Math.ceil(Math.abs(endDate - new Date(Date.now()))/(1000*60*60*24))} days: ${endDate.toDateString()} (Zero cases)`}` }
            }}
        />)
        : <Loading />
    );

    return (
        <>
            <Typography variant="h4">Future projection for Germany</Typography>
            <div className={ styles.container }>
                { lineChart }
            </div>
        </>
    );
}

export default Projection;