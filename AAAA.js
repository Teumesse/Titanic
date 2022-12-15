const graph = document.getElementById("graph").getContext("2d");

Chart.defaults.global.defaultFontSize = 18;

let massPopChart = new Chart(graph, {
    type: "pie", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
        labels: [
            "Abidjan",
            "Alger",
            "Bamako",
            "Casablanca",
            "Dakar",
            "Kinshasa",
            "Montreal",
            "Paris",
        ],
        datasets: [
            {
                label: "Population en M ",
                data: [6, 8, 3, 4, 4, 17, 4, 12],
                // backgroundColor: "blue",
                backgroundColor: [
                    "red",
                    "orange",
                    "salmon",
                    "blue",
                    "yellow",
                    "purple",
                    "green",
                    "tomato",
                ],
                hoverBorderWidth: 3,
            },
        ],
    },
    options: {
        title: {
            display: true,
            text: "Populations Francophones",
            fontSize: 24,
        },
        legend: {
            display: true,
        },
        // start at 0
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
        layout: {
            padding: {
                left: 100,
                right: 100,
                top: 50,
            },
        },
    },
});