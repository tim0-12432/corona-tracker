import React, { useState } from "react";
import { FormControl, TextField, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ClearIcon from "@material-ui/icons/Clear";

import styles from "./CountryPicker.module.css";
import Selector from "./Selector";

import { fetchDistricts } from "./../../api";

const CountryPicker = ({ handleCountryChange, country, handleDistrictChange, district, setDistrict }) => {
    const [textField, setTextField] = useState(district);

    async function handleTextFieldSubmit() {
        if (textField !== "") {
            const result = await fetchDistricts(textField)
            if (result !== "NaN") {
                handleDistrictChange(result);
            } else {
                setDistrict("");
                setTextField(district);
            }
        }
    }
    
    return (
        <div className={ styles.forms }>
            <Selector handleCountryChange={ handleCountryChange } country={ country } />
            <FormControl className={ styles.formControl }>
                <div className={ styles.searchBar }>
                    <TextField classes={{ root: styles.inpt }} id="outlined-search" label="Search for district" type="search" variant="outlined" value={ textField } onChange={ (e) => setTextField(e.target.value) } />
                    <IconButton classes={{ label: styles.lbl }} aria-label="search" onClick={ handleTextFieldSubmit }>
                        <SearchIcon />
                    </IconButton>
                </div>
            </FormControl>
        </div>
    );
}

export default CountryPicker;