import React, { useState, useEffect } from "react";
import { NativeSelect, FormControl, TextField, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

import styles from "./CountryPicker.module.css";

import { fetchStates, fetchDistricts } from "./../../api";

const CountryPicker = ({ handleCountryChange, country, handleDistrictChange, district, setDistrict }) => {
    const [countries, setCountries] = useState([]);
    const [textField, setTextField] = useState(district);

    useEffect(() => {
        const fetchApi = async () => {
            setCountries(await fetchStates());
        }
        fetchApi();
    }, [setCountries]);

    function getDefaultPick() {
        return country;
    }

    async function handleTextFieldSubmit() {
        if (district !== "") {
            setDistrict("");
            setTextField("");
        } else {
            const result = await fetchDistricts(textField)
            if (result !== "NaN") {
                handleDistrictChange(result);
            } else {
                setDistrict("");
                setTextField(district);
            }
        }
    }
    
    if (!countries) {
        return "Loading..."
    }
    return (
        <div className={ styles.forms }>
            <FormControl className={ styles.formControl }>
                <NativeSelect value={ getDefaultPick() } onChange={ (e) => handleCountryChange(e.target.value) }>
                    <option value="DE" key="DE">Germany</option>
                    {
                        countries.map((item) => {
                            return (<option value={ item.short } key={ item.short }>{ item.long }</option>);
                        })
                    }
                </NativeSelect>
            </FormControl>
            <FormControl className={ styles.formControl }>
                <div className={ styles.searchBar }>
                    <TextField id="outlined-search" label="Search for district" type="search" variant="outlined" value={ textField } onChange={ (e) => setTextField(e.target.value) } />
                    <IconButton aria-label="search" onClick={ handleTextFieldSubmit }>
                        { district === "" ? <SearchIcon /> : <ClearIcon /> }
                    </IconButton>
                </div>
            </FormControl>
        </div>
    );
}

export default CountryPicker;