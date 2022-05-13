export const filterWorld = function (data, datumType) {
  const toReturn = {
    chartLabel: `Total ${extractLable(datumType)} by continent`,
    valuesX: [],
    valuesY: [],
  };

  for (const [key, value] of Object.entries(data)) {
    toReturn.valuesX.push(key);
    toReturn.valuesY.push(value.reduce((acc, cur) => acc + cur[datumType], 0));
  }
  return toReturn;
};

export const filterContinent = function (data, datumType, continent) {
  return {
    chartLabel: `Total ${extractLable(datumType)} in ${firstCharToUppperCase(
      continent
    )}`,
    valuesX: data[continent].map((country) => country.name),
    valuesY: data[continent].map((country) => country[datumType]),
  };
};

export const filterCountry = function (data, countryName) {
  const country = getCountryFromData(countryName, data);

  const dataToReturn = {
    chartLabel: countryName,
    valuesX: Object.keys(country),
    valuesY: Object.values(country),
  };

  const nameIndex = dataToReturn.valuesX.findIndex((lable) => lable === 'name');

  dataToReturn.valuesX.splice(nameIndex, 1);
  dataToReturn.valuesY.splice(nameIndex, 1);

  dataToReturn.valuesX.forEach(function (lable, index) {
    this[index] = extractLable(lable);
  }, dataToReturn.valuesX);

  return dataToReturn;
};

const extractLable = (datumType) => {
  switch (datumType) {
    case 'confirmed':
      return 'confirmed cases';
    case 'deaths':
      return 'deaths';
    case 'critical':
      return 'cases of critical condition';
    case 'recovered':
      return 'num of recoveris';
    case 'todayDeaths':
      return 'deaths today';
    case 'todayConfirmed':
      return 'new confirmed today';
    case 'InfectedPerNillion':
      return 'infection per million';
    case 'todayDeaths':
      return 'Death cases today';
    case 'todayConfirmed':
      return 'New confirmd cases today';
    case 'InfectedPerNillion':
      return 'Number of infections per million inhabitants';
    default:
      return datumType;
  }
};

const firstCharToUppperCase = (str) => {
  const arr = str.split('');
  arr[0] = arr[0].toUpperCase();
  return arr.join('');
};

const getCountryFromData = (contryName, data) => {
  for (const [key, value] of Object.entries(data)) {
    const contry = value.find((contry) => contry.name === contryName);
    if (contry) return contry;
  }
};
