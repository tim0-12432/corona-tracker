# COVID-19 Tracker <img align="center" alt="App logo" width="26px" src="https://github.com/tim0-12432/corona-tracker/blob/b6745f2f5b9c2f325f8fb7f0c6fc43f70506bf0c/src/images/virus.png" />

![GitHub last commit](https://img.shields.io/github/last-commit/tim0-12432/corona-tracker?logo=github&color=bright-green)
[![Code Style](https://github.com/tim0-12432/corona-tracker/actions/workflows/linting.yml/badge.svg)](https://github.com/tim0-12432/corona-tracker/actions/workflows/linting.yml)
![Website](https://img.shields.io/website?down_color=red&down_message=offline&label=webpage&up_color=bright-green&up_message=online&url=https%3A%2F%2Ftim0-12432.github.io%2Fcorona-tracker)

### Fair Use
- Data from [Robert Koch-Institut](https://www.rki.de/DE/Content/Infekt/SurvStat/survstat_node.html)
- API made by [Marlon Lueckert](https://github.com/marlon360/rki-covid-api)
- Based on a tutorial made by [JavaScript Mastery](https://www.youtube.com/watch?v=khJlrj3Y6Ls)

### Information
This is a [Website](https://tim0-12432.github.io/corona-tracker) providing information about the current Corona statistics in Germany.
The stats can be filtered by state or district and will be displayed as map, graph and numbers.

---
## Manual
### How to use
Call webpage on [https://tim0-12432.github.io/corona-tracker](https://tim0-12432.github.io/corona-tracker)

#### App layout:
|Windows|android|iOS, OSX|
|---|---|---|
|Open webpage in Edge and click on "Install as app" in the settings (Does only work with Edge) ![edge](https://github.com/tim0-12432/corona-tracker/blob/main/src/docs/edge-app.JPG)|Open webpage and click on "Add to Homescreen" in the settings (Works with nearly every browser based on Chromium) ![chromium](https://github.com/tim0-12432/corona-tracker/blob/main/src/docs/chromium-app.jpeg)|Do not use apple products!|


---

### Statistics

#### Count cards based on chosen state or district
- infection + current infection delta
- recovered cases + current recovered delta
- deaths + current death delta
- current weekly incidence
- cases per 100 thousand people
- ![cards](https://github.com/tim0-12432/corona-tracker/blob/main/src/docs/cards.JPG)

#### State selection
- all German states including the whole German country
- ![states](https://github.com/tim0-12432/corona-tracker/blob/main/src/docs/states.JPG)

#### District search
- all German districts (searchbar is not case-sensitive)
- if your need a specific "Landkreis" type "LK" before the name otherwise the appropriate city will being chosen when existing
- ![district](https://github.com/tim0-12432/corona-tracker/blob/main/src/docs/districts.JPG)

#### Line chart
- shows the historical progression of cases, recovers and deaths for the chosen state or district
- ![linechart](https://github.com/tim0-12432/corona-tracker/blob/main/src/docs/line.JPG)

#### Bar chart
- sets the values of cases, recovers and deaths for the chosen state or district in relation to each other
- ![barchart](https://github.com/tim0-12432/corona-tracker/blob/main/src/docs/bar.JPG)

#### Map
- shows the current incidence heat map for Germany
- ![incidence heatmap](https://github.com/tim0-12432/corona-tracker/blob/main/src/docs/map.JPG)

#### Future projection
- shows the historical progression of cases for Germany and a possible future progression calculated out of the R-value shown
- ![future projection](https://github.com/tim0-12432/corona-tracker/blob/main/src/docs/future.JPG)

---
### Vaccination

#### State selection
- all German states including the whole German country
- ![states](https://github.com/tim0-12432/corona-tracker/blob/main/src/docs/states2.JPG)

#### Count cards based on chosen state
- vaccination + current vaccination delta
- second vaccination + current second vaccination delta
- parts of the different companies
- proportion of the vaccinated people to the other people
- ![cards](https://github.com/tim0-12432/corona-tracker/blob/main/src/docs/cards2.JPG)

#### Line chart
- shows the historical progression of vaccinations and second vaccinations for Germany
- ![linechart](https://github.com/tim0-12432/corona-tracker/blob/main/src/docs/line2.JPG)

---

License: Changes under MIT <img align="center" alt="MIT logo" width="26px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/License_icon-mit-2.svg/256px-License_icon-mit-2.svg.png" />
