document.addEventListener("DOMContentLoaded", function () {
    const courseTitles = JSON.parse(document.getElementById('courseTitles').textContent);
    const revenueData = JSON.parse(document.getElementById('revenueData').textContent);

    const ctx = document.getElementById('revenueChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: courseTitles,
            datasets: [{
                label: 'Revenue',
                data: revenueData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
