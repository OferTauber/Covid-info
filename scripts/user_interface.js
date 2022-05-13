import {
  filterWorld,
  filterContinent,
  filterCountry,
} from './data_filtering.js';

export const setCountriesToSelect = function (data, continent, selectEl) {
  selectEl.innerHTML = '';
  const lablels = [];
  if ((continent = 'world')) {
    for (const [kye, continent] of Object.entries(data)) {
      for (const contry of continent) {
        lablels.push(contry.name);
      }
    }
  } else {
    for (const contry of data[continent]) {
      lablels.push(contry.name);
    }
  }

  lablels.sort();

  lablels.forEach((lable) => {
    const option = document.createElement('option');
    option.textContent = lable;
    option.value = lable;
    selectEl.appendChild(option);
  });
};

export const setEventsListeners = function (appObj) {
  const continents = [
    ...document.querySelector('.buttons-continents').children,
  ];
  const datum = [...document.querySelector('.buttons-datum').children];
  // const [world] = continents.splice(0, 1);

  for (const continent of continents) {
    continent.addEventListener('click', (e) => {
      appObj.continentClick(e.target.dataset.data);

      // console.dir(e.target.dataset.data);
    });
  }
};
