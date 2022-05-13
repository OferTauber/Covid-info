const COLOR_1 = '#191A19';
const COLOR_2 = '#1E5128';
const COLOR_3 = '#4E9F3D';
const COLOR_4 = '#D8E9A8';

export const createChart = async function (context, data) {
  return new Chart(context, {
    type: 'bar',
    data: {
      labels: data.valuesX,
      datasets: [
        {
          label: data.chartLabel,
          data: data.valuesY,
          backgroundColor: [COLOR_1, COLOR_3],
          borderColor: [COLOR_1, COLOR_3],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

export const editChart = function (chart, data) {
  chart.data.datasets[0].label = data.chartLabel;
  chart.data.datasets[0].data = data.valuesY;
  chart.data.labels = data.valuesX;

  chart.update();
};
