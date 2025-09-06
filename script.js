
    // Initialize AOS animations
    AOS.init();

    // Salary Breakdown Doughnut Chart
    const doughnutCtx = document.getElementById('salaryDoughnutChart').getContext('2d');
    const salaryDoughnutChart = new Chart(doughnutCtx, {
      type: 'doughnut',
      data: {
        labels: [
          'Basic Pay',
          'HRA',
          'Allowances',
          'Provident Fund (PF)',
          'Tax'
        ],
        datasets: [{
          label: 'Salary Components',
          data: [50, 20, 15, 10, 5],
          backgroundColor: [
            '#2b6cb0',
            '#63b3ed',
            '#90cdf4',
            '#3182ce',
            '#4299e1'
          ],
          borderWidth: 2,
          borderColor: '#fff',
          hoverOffset: 25,
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              font: {
                size: 14,
                weight: '600'
              },
              color: '#2d3748',
              padding: 15
            }
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(43,108,176,0.85)',
            titleFont: {
              weight: 'bold'
            }
          }
        },
        cutout: '70%',
        animation: {
          animateRotate: true,
          duration: 1400,
          easing: 'easeInOutQuart',
        }
      }
    });

    // Salary Calculator Elements
    const inputSalary = document.getElementById('monthly-salary');
    const calculateBtn = document.getElementById('calculate-btn');
    const resultDiv = document.getElementById('calc-result');

    // Bar chart setup for Salary Calculator
    const barCtx = document.getElementById('salaryBarChart').getContext('2d');
    let salaryBarChart = new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['Gross Salary', 'HRA', 'PF', 'Tax', 'Net Salary'],
        datasets: [{
          label: 'Amount (₹)',
          data: [0, 0, 0, 0, 0],
          backgroundColor: [
            '#2b6cb0',
            '#63b3ed',
            '#3182ce',
            '#4299e1',
            '#1e40af'
          ],
          borderRadius: 8,
          borderSkipped: false
        }]
      },
      options: {
        responsive: true,
        animation: {
          duration: 1200,
          easing: 'easeInOutQuart',
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(43,108,176,0.85)',
            callbacks: {
              label: context => `₹${context.parsed.y.toLocaleString()}`
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: val => `₹${val.toLocaleString()}`,
              font: {
                size: 12
              }
            },
            grid: {
              color: '#e2e8f0',
              borderColor: '#cbd5e0'
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 13,
                weight: '600'
              },
              color: '#2d3748'
            }
          }
        }
      }
    });

    // Salary calculation and UI update
    function calculateSalary() {
      const salaryValue = parseFloat(inputSalary.value);
      if (isNaN(salaryValue) || salaryValue < 0) {
        resultDiv.innerHTML = `<p style="color:#e53e3e; font-weight:700;">Please enter a valid positive salary amount.</p>`;
        updateBarChart([0, 0, 0, 0, 0]);
        return;
      }

      // Calculations as per requirements
      const HRA = salaryValue * 0.20;
      const PF = salaryValue * 0.12;
      const Tax = salaryValue * 0.10;
      const NetSalary = salaryValue - PF - Tax;

      // Show results dynamically
      resultDiv.innerHTML = `
        <p><i class="fa-solid fa-house"></i> <strong>HRA:</strong> ₹${HRA.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
        <p><i class="fa-solid fa-warehouse"></i> <strong>PF:</strong> ₹${PF.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
        <p><i class="fa-solid fa-file-invoice-dollar"></i> <strong>Tax:</strong> ₹${Tax.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
        <p><i class="fa-solid fa-money-bill-wave"></i> <strong>Net Salary:</strong> ₹${NetSalary.toLocaleString(undefined, {maximumFractionDigits: 2})}</p>
      `;

      // Update chart data
      updateBarChart([salaryValue, HRA, PF, Tax, NetSalary]);
    }

    function updateBarChart(dataArray) {
      salaryBarChart.data.datasets[0].data = dataArray.map(val => parseFloat(val.toFixed(2)));
      salaryBarChart.update();
    }

    calculateBtn.addEventListener('click', () => {
      calculateSalary();
    });

    // Allow Enter key to trigger calculation when input is focused
    inputSalary.addEventListener('keyup', function (event) {
      if (event.key === 'Enter') {
        calculateSalary();
      }
    });

    // Accessibility focus styles for keyboard users only
    document.body.addEventListener('keydown', function (e) {
      if (e.key === 'Tab') {
        document.body.classList.add('user-is-tabbing');
      }
    });
    document.body.addEventListener('mousedown', function () {
      document.body.classList.remove('user-is-tabbing');
    });
  
  