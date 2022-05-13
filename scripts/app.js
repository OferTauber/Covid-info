import { getData, organizeData } from './get_data.js';
import { chsrtIt } from './chsrt_it.js';

const reset = async function () {
  try {
    const rawData = await getData();
    const dataBaseline = await organizeData(
      rawData.covidData.data,
      rawData.regionsData
    );
    const initialChartData = proccecDataToChart(
      dataBaseline.asia,
      'Confirmed cases in Asia',
      'confirmed'
    );
    const myChart = await chsrtIt(chartContext, initialChartData);
  } catch (err) {
    errorMessage(err);
  }
};

//todo - create and impiort from new JS file
const errorMessage = (err) => {
  console.log(err);
};

const chartContext = document.querySelector('#my-chart').getContext('2d');

reset();
const proccecDataToChart = (data, label, key) => {
  console.log(data);
  return {
    chartLabel: label,
    valuesX: data.map((cuntry) => cuntry.name),
    valuesY: data.map((cuntry) => cuntry[key]),
  };
};
