import { getData, organizeData } from './get_data.js';
import { createChart, editChart } from './chsrt_it.js';
import {
  filterWorld,
  filterContinent,
  filterCountry,
} from './data_filtering.js';

const app = {
  dataBaseline: {},
  chartContext: document.querySelector('#my-chart').getContext('2d'),
  chart: undefined,

  reset: async function () {
    try {
      const rawData = await getData();
      this.dataBaseline = await organizeData(
        rawData.covidData.data,
        rawData.regionsData
      );
      const newChart = await this.genetateInitialChart();
      this.chart = newChart; // - Make sure the promise is resolved
    } catch (err) {
      errorMessage(err);
    }
  },

  genetateInitialChart: async function () {
    const initialChartData = filterWorld(this.dataBaseline, 'confirmed');
    return createChart(this.chartContext, initialChartData);
  },
};

//todo - create and impiort from new JS file
const errorMessage = (err) => {
  console.log(err);
};

app.reset();

setTimeout(() => {
  editChart(app.chart, filterCountry(app.dataBaseline, 'Israel'));
}, 1000);
//
// const proccecDataToChart = (data, label, key) => {
//   return {
//     chartLabel: label,
//     valuesX: data.map((cuntry) => cuntry.name),
//     valuesY: data.map((cuntry) => cuntry[key]),
//   };
// };
