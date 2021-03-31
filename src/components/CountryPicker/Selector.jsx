import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl } from "@material-ui/core";

import Loading from "./../Loading/Loading";
import styles from "./CountryPicker.module.css";

import { fetchStates } from "./../../api";

const Selector = ({ handleCountryChange, country }) => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchApi = async () => {
            setCountries(await fetchStates());
        }
        fetchApi();
    }, [setCountries]);

    function getDefaultPick() {
        return country;
    }

    if (!countries) {
        return <Loading />
    }
    return (
        <FormControl className={ styles.formControl }>
            <NativeSelect value={ getDefaultPick() } classes={{ root: styles.sclt, icon: styles.icn }} onChange={ (e) => handleCountryChange(e.target.value) }>
                <option value="DE" key="DE">Germany</option>
                {
                    countries.map((item) => {
                        return (<option value={ item.short } key={ item.short }>{ item.long }</option>);
                    })
                }
            </NativeSelect>
        </FormControl>
    );
}

export default Selector;