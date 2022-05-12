const PROXI = 'https://api.codetabs.com/v1/proxy/?quest=';
const COVID_URL = 'https://corona-api.com/countries';
const COUNTRIES_URL = 'https://restcountries.herokuapp.com/api/v1/region/';

const ASIA = 'https://restcountries.herokuapp.com/api/v1/region/asia';

export const getData = async function () {
  try {
    const covidData = await fetchData(COVID_URL, '');
    const regionsData = await fetchRegions();
    return {
      covidData,
      regionsData,
    };
  } catch (e) {
    console.error(e);
  }
};

export const organizeData = async function (cuvidData, regionsData) {
  // console.log(regionsData.asia[0]);
  const covidInfo = {};
  for (const key in regionsData) {
    covidInfo[key] = [];
    regionsData[key].forEach((country) => {
      const countryCode = country.altSpellings[0];
      const countryCovudData = cuvidData.find(
        (country) => country.code === countryCode
      );

      if (countryCovudData) {
        covidInfo[key].push(extractCountryInfo(countryCovudData));
      }
    });
  }

  return covidInfo;
};

const extractCountryInfo = (countryCovudData) => {
  const country = {
    name: countryCovudData.name,
    confirmed: countryCovudData.latest_data.confirmed,
    deaths: countryCovudData.latest_data.deaths,
    critical: countryCovudData.latest_data.critical,
    recovered: countryCovudData.latest_data.recovered,
    todayDeaths: countryCovudData.today.deaths,
    todayConfirmed: countryCovudData.today.confirmed,
    InfectedPerNillion:
      countryCovudData.latest_data.calculated.cases_per_million_population,
  };

  return country;
};

const fetchData = async (url, proxy) => {
  try {
    const JSON = await fetch(proxy + url);
    const data = await JSON.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

const fetchRegions = async () => {
  const regions = ['asia', 'europe', 'africa', 'oceania', 'americas'];
  const promises = [];
  const DataToReturn = {};
  try {
    for (const region of regions) {
      promises.push(fetchData(COUNTRIES_URL + region, PROXI));
    }
    const resalts = await Promise.all(promises);
    for (const [index, resalt] of promises.entries()) {
      resalt.then((res) => (DataToReturn[regions[index]] = res));
    }

    return DataToReturn;
  } catch (err) {
    console.error(err);
  }
};
