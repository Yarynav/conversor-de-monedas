const clp = document.querySelector("#clp");
const currencychange = document.querySelector("#currencychange");
const btn = document.querySelector("#btn");
const result = document.querySelector("#result");
const graphic = document.querySelector("#graphic");
let myChart;

async function getRandomUser() {
  try {
    const res = await fetch(
      `https://mindicador.cl/api/${currencychange.value}`
    );
    const data = await res.json();
    getChange(data);
    getChart(data);
  } catch {
    alert(
      "Hemos tenido un problema al conectar con el servidor. Intente más tarde."
    );
  }
}

btn.addEventListener("click", getRandomUser);

const getChange = (data) => {
  const conversion = clp.value / data.serie[0].valor;
  result.innerHTML = conversion.toFixed(3);
};

const getChart = (data) => {
  const labels = data.serie.slice(0, 9).map((obj) => {
    return new Date(obj.fecha).toLocaleDateString();
  });
  const valors = data.serie.slice(0, 9).map((val) => {
    return val.valor;
  });

  const data2 = {
    labels: labels,
    datasets: [
      {
        label: "Historial de los ultimos 10 dias",
        backgroundColor: "#c2acd6",
        borderColor: "#b095c9",
        data: valors,
      },
    ],
  };

  const config = {
    type: "line",
    data: data2,
    options: {},
  };
  if (myChart) {
    myChart.destroy();
  }
  myChart = new Chart(document.getElementById("myChart"), config);
};
