document.addEventListener("DOMContentLoaded", function() {
    const courseTitlesElement = document.getElementById('courseTitles');
    const studentCountsElement = document.getElementById('studentCounts');

    if (courseTitlesElement && studentCountsElement) {
        const courseTitles = JSON.parse(courseTitlesElement.textContent);
        const studentCounts = JSON.parse(studentCountsElement.textContent);

        const ctx = document.getElementById('enrollmentChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: courseTitles,
                datasets: [{
                    label: 'Number of Students Enrolled',
                    data: studentCounts,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
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
    }
});
