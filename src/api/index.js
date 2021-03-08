import axios from "axios";

const url = "https://api.corona-zahlen.org/";

export const fetchData = async (country) => {
    let changeableUrl = `${url}germany`;

    if (country && country !== "DE") {
        if (!isNaN(country)) {
            changeableUrl = `${url}districts/${country}`;
        } else {
            changeableUrl = `${url}states/${country}`;
        }

        try {
            const response = await axios.get(changeableUrl);
            if (response.status === 200) {
                return {
                        cases: response.data.data[country].cases,
                        deaths: response.data.data[country].deaths,
                        recovered: response.data.data[country].recovered,
                        name: response.data.data[country].name,
                        weekIncidence: response.data.data[country].weekIncidence,
                        casesPer100k: response.data.data[country].casesPer100k,
                        delta: {
                            cases: response.data.data[country].delta.cases,
                            deaths: response.data.data[country].delta.deaths,
                            recovered: response.data.data[country].delta.recovered,
                        },
                        meta: {
                            lastUpdate: response.data.meta.lastUpdate
                        }
                }
            } else {
                throw {name: "ResponseError", message: "GET Request returned not okay", toString: function() {return this.name + ": " + this.message;}};
            }
        } catch (error) {
            console.error(error);
        }
    }
    else {
        try {
            const response = await axios.get(changeableUrl);
            if (response.status === 200) {
                return response.data;
            } else {
                throw {name: "ResponseError", message: "GET Request returned not okay", toString: function() {return this.name + ": " + this.message;}};
            }
        } catch (error) {
            console.error(error);
        }
    }
};

export const fetchDailyData = async (country) => {
    if (country && country !== "DE") {
        try {
            let caseUrl = "";
            let recoverUrl = "";
            let deathUrl = "";

            if (!isNaN(country)) {
                caseUrl = `${url}districts/${country}/history/cases`;
                recoverUrl = `${url}districts/${country}/history/recovered`;
                deathUrl = `${url}districts/${country}/history/deaths`;
            } else {
                caseUrl = `${url}states/${country}/history/cases`;
                recoverUrl = `${url}states/${country}/history/recovered`;
                deathUrl = `${url}states/${country}/history/deaths`;
            }
            
            const cases = await axios.get(caseUrl);
            const recovered = await axios.get(recoverUrl);
            const deaths = await axios.get(deathUrl);
            const response = [];
            if (cases.status === 200 ){//&& recovered.status === 200 && deaths.status === 200) {
                for (let index = 0; index < cases.data.data[country].history.length; index++) {
                    const caseX = cases.data.data[country].history[index].cases;
                    const recover = recovered.data.data[country].history[index].recovered;
                    const death = deaths.data.data[country].history[index].deaths;
                    const date = cases.data.data[country].history[index].date;
                    const today = {cases: caseX, recovered: recover, deaths: death, date: date};
                    response.push(today);
                }
                return response;
            } else {
                throw {name: "ResponseError", message: "GET Request returned not okay", toString: function() {return this.name + ": " + this.message;}};
            }
        } catch (error) {
            console.error(error);
        }
    } else {
        try {
            const cases = await axios.get(`${url}germany/history/cases`);
            const recovered = await axios.get(`${url}germany/history/recovered`);
            const deaths = await axios.get(`${url}germany/history/deaths`);
            const response = [];
            if (cases.status === 200 && recovered.status === 200 && deaths.status === 200) {
                for (let index = 0; index < cases.data.data.length; index++) {
                    const caseX = cases.data.data[index].cases;
                    const recover = recovered.data.data[index].recovered;
                    const death = deaths.data.data[index].deaths;
                    const date = cases.data.data[index].date;
                    const today = {cases: caseX, recovered: recover, deaths: death, date: date};
                    response.push(today);
                }
                return response;
            } else {
                throw {name: "ResponseError", message: "GET Request returned not okay", toString: function() {return this.name + ": " + this.message;}};
            }
        } catch (error) {
            console.error(error);
        }
    }
};

export const fetchStates = async () => {
    try {
        const response = await axios.get(`${url}states`);
        if (response.status === 200) {
            const result = response.data.data;
            const countries = []
            Object.keys(result).forEach(element => {
                countries.push({ short: element, long: result[element].name });
            });
            return countries;
        } else {
            throw {name: "ResponseError", message: "GET Request returned not okay", toString: function() {return this.name + ": " + this.message;}};
        }
    } catch (error) {
        console.error(error);
    }
};

export const fetchDistricts = async (text) => {
    try {
        const response = await axios.get(`${url}districts`);
        if (response.status === 200) {
            const result = response.data.data;
            const districts = []
            Object.keys(result).forEach(element => {
                districts.push({ ags: result[element].ags, name: result[element].name, county: result[element].county });
            });
            for (const element of districts) {
                if (element.ags.indexOf(text) !== -1
                    || element.county.toLowerCase().indexOf(text.toLowerCase()) !== -1) {
                    return element.ags;
                }
            }
            return NaN;
        } else {
            throw {name: "ResponseError", message: "GET Request returned not okay", toString: function() {return this.name + ": " + this.message;}};
        }
    } catch (error) {
        console.error(error);
    }
};