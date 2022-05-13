import { getData, organizeData } from './get_data.js';
import { createChart, editChart } from './chsrt_it.js';
import {
  filterWorld,
  filterContinent,
  filterCountry,
} from './data_filtering.js';
import { setCountriesToSelect, setEventsListeners } from './user_interface.js';

const app = {
  dataBaseline: {},
  chartContext: document.querySelector('#my-chart').getContext('2d'),
  chart: undefined,
  spinner: document.querySelector('.spinner'),
  currentContinent: 'world',
  currentDatum: 'confirmed',

  reset: async function () {
    this.spinner.classList.toggle('hidden');
    try {
      const rawData = await getData();
      this.dataBaseline = await organizeData(
        rawData.covidData.data,
        rawData.regionsData
      );
      const newChart = await this.genetateInitialChart();
      this.chart = newChart; // - Make sure the promise is resolved
      this.spinner.classList.toggle('hidden');
    } catch (err) {
      errorMessage(err);
    }
  },

  genetateInitialChart: async function () {
    const initialChartData = filterWorld(this.dataBaseline, 'confirmed');
    return createChart(this.chartContext, initialChartData);
  },

  continentClick(continent) {
    this.currentContinent = continent;
    const newChartData =
      continent === 'world'
        ? filterWorld(this.dataBaseline, this.currentDatum)
        : filterContinent(
            this.dataBaseline,
            this.currentDatum,
            this.currentContinent
          );
    editChart(this.chart, newChartData);
  },

  datumClick(datum) {
    this.currentDatum = datum;
    const newChartData =
      this.currentContinent === 'world'
        ? filterWorld(this.dataBaseline, this.currentDatum)
        : filterContinent(
            this.dataBaseline,
            this.currentDatum,
            this.currentContinent
          );
    editChart(this.chart, newChartData);
  },
};

//todo - create and impiort from new JS file
const errorMessage = (err) => {
  console.log(err);
};

setEventsListeners(app);
app.reset();

// setTimeout(() => {
//   setCountriesToSelect(
//     app.dataBaseline,
//     'world',
//     document.querySelector('select')
//   );
//   setEventsListeners();
// }, 1000);
