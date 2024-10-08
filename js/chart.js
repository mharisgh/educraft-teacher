// Sample JSON data
const studentInsightData = [
  { course: 'Course 1', notStarted: 15, started: 30, completed: 17, status: 'active' },
  { course: 'Course 2', notStarted: 10, started: 38, completed: 25, status: 'active' },
  { course: 'Course 3', notStarted: 28, started: 18, completed: 10, status: 'active' },
  { course: 'Course 4', notStarted: 10, started: 18, completed: 32, status: 'active' },
  { course: 'Course 5', notStarted: 18, started: 21, completed: 19, status: 'active' },
  { course: 'Course 6', notStarted: 10, started: 20, completed: 15, status: 'active' },
  { course: 'Course 7', notStarted: 0, started: 0, completed: 0, status: 'notActive' },  // Bar won't show
  { course: 'Course 8', notStarted: 0, started: 0, completed: 0, status: 'active' }  // Active, but no data
];

// Extracting series data from the JSON
const seriesData = {
  notStarted: studentInsightData.map(item => item.notStarted),
  started: studentInsightData.map(item => item.started),
  completed: studentInsightData.map(item => item.completed)
};

// ApexCharts configuration
var options = {
  series: [{
    name: 'Not Started',
    data: seriesData.notStarted
  }, {
    name: 'Started',
    data: seriesData.started
  }, {
    name: 'Completed',
    data: seriesData.completed
  }],
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: false  // Remove toolbar (hamburger menu)
    }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '80%',
      endingShape: 'rounded',
    },
  },
  colors: ['#b7a597', '#9d683e', '#784d2b'],  // Default colors for the series
  fill: {
    type: 'gradient',  // Enable gradient fill
    gradient: {
      shade: 'dark',  // Dark gradient
      type: 'vertical',  // Apply gradient from bottom to top
      shadeIntensity: 0.5,  // Intensity of the shading
      gradientToColors: ['#ba8f70'],  // End color of the gradient
      inverseColors: false,  // Do not inverse the colors
      opacityFrom: 1,  // Starting opacity
      opacityTo: 1,  // Ending opacity
      stops: [0, 100]  // Position of the gradient (0% to 100%)
    }
  },
  dataLabels: {
    enabled: false  // Disable data labels for clarity
  },
  stroke: {
    show: true,
    width: 4,
    colors: ['transparent']  // Transparent stroke around bars
  },
  xaxis: {
    categories: studentInsightData.map(item => item.course),  // Course names
  },
  yaxis: {
    title: {
      text: 'Students Count',
      style: {
        fontWeight: '600'
      }
    }
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val + " students";  // Tooltip format showing student count
      }
    }
  }
};

// Render the chart
var chart = new ApexCharts(document.querySelector("#courseInsightChart"), options);
chart.render();



// ===============================================================

// JSON data for student performance
const studentPerformanceData = {
  highFlyers: 12,
  mediumFlyers: 14,
  lowFlyers: 30
};

// Total students (sum of all categories)
const totalStudents = studentPerformanceData.highFlyers + studentPerformanceData.mediumFlyers + studentPerformanceData.lowFlyers;

// Calculate percentages
const highFlyersPercentage = (studentPerformanceData.highFlyers / totalStudents) * 100;
const mediumFlyersPercentage = (studentPerformanceData.mediumFlyers / totalStudents) * 100;
const lowFlyersPercentage = (studentPerformanceData.lowFlyers / totalStudents) * 100;

// Set the pie chart options
var options = {
  series: [studentPerformanceData.highFlyers, studentPerformanceData.mediumFlyers, studentPerformanceData.lowFlyers],
  chart: {
    width: 220,
    type: 'pie',
  },
  labels: ['High Flyers', 'Medium Flyers', 'Low Flyers'],
  colors: ['#ffc66e', '#ec6409', '#bf4b00'], // Set custom colors
  legend: {
    show: false // Hide the legend
  },

  dataLabels: {
    style: {
      fontSize: '12px',    // Set font size
      fontWeight: '500',   // Set font weight to medium (500)
    },
    dropShadow: {
      enabled: true       // Disable shadow on the text for cleaner look
    }
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom',
        show: false // Hide the legend in responsive view as well
      }
    }
  }]
};

// Render the pie chart
var chart = new ApexCharts(document.querySelector("#studentPerformanceChart"), options);
chart.render();

// Dynamically update the percentage bars and counts
document.getElementById("highFlyersPercentage").style.width = highFlyersPercentage + '%';
document.getElementById("mediumFlyersPercentage").style.width = mediumFlyersPercentage + '%';
document.getElementById("lowFlyersPercentage").style.width = lowFlyersPercentage + '%';


document.getElementById("stdPrfmHighFlyersCount").innerText =`${studentPerformanceData.highFlyers} students`
document.getElementById("stdPrfmMediumFlyersCount").innerText =`${studentPerformanceData.mediumFlyers} students`
document.getElementById("stdPrfmlowFlyersCount").innerText =`${studentPerformanceData.lowFlyers} students`


