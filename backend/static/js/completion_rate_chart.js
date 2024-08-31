document.addEventListener("DOMContentLoaded", function() {
    const courseTitlesElement = document.getElementById('courseTitles');
    const completionRatesElement = document.getElementById('completionRates');

    if (courseTitlesElement && completionRatesElement) {
        const courseTitles = JSON.parse(courseTitlesElement.textContent);
        const completionRates = JSON.parse(completionRatesElement.textContent);

        const ctx = document.getElementById('completionRateChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: courseTitles,
                datasets: [{
                    label: 'Course Completion Rate (%)',
                    data: completionRates,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100  // Since completion rate is a percentage
                    }
                }
            }
        });
    }
});
