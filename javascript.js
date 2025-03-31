        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = document.getElementById('themeIcon');
        const body = document.body;

        function addCardAnimations() {
            const cards = document.querySelectorAll('.dashboard-card');
            cards.forEach((card, index) => {
                card.style.animationDelay = `${index * 0.2}s`;
                
                card.addEventListener('mouseenter', () => {
                    card.style.transform = 'scale(1.02)';
                });
                
                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'scale(1)';
                });
            });
        }
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            body.classList.toggle('light-mode');

            if (body.classList.contains('dark-mode')) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
            const currentMode = body.classList.contains('dark-mode') ? 'dark' : 'light';
            localStorage.setItem('theme', currentMode);
        });
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            body.classList.remove('dark-mode');
            body.classList.add('light-mode');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        function addButtonAnimations() {
            const buttons = document.querySelectorAll('button');
            buttons.forEach(button => {
                button.classList.add('animated-button');
                
                button.addEventListener('mouseenter', () => {
                    button.style.transform = 'scale(1.05)';
                });
                
                button.addEventListener('mouseleave', () => {
                    button.style.transform = 'scale(1)';
                });
            });
        }

        function addChartHoverEffect() {
            const attendanceBar = document.getElementById('attendanceBar');
            attendanceBar.addEventListener('mouseenter', () => {
                attendanceBar.style.transform = 'scaleX(1.1)';
            });
            attendanceBar.addEventListener('mouseleave', () => {
                attendanceBar.style.transform = 'scaleX(1)';
            });
        }

        document.addEventListener('DOMContentLoaded', () => {
            addCardAnimations();
            addButtonAnimations();
            addChartHoverEffect();
        });

        document.querySelectorAll('.col-span-4, .col-span-8').forEach(el => {
            el.classList.add('dashboard-card', 'interactive-element');
        });

        document.getElementById('filterLogsBtn').addEventListener('click', function () {
        let selectedDate = document.getElementById('logDateFilter').value;
        let tableRows = document.querySelectorAll('#attendanceLogBody tr');

        tableRows.forEach(row => {
            let dateCell = row.querySelector('td:first-child').textContent.trim();
            if (selectedDate === "" || dateCell === selectedDate) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }
        });
    });
          // Attendance Log Data
          const attendanceData = [
            { date: '2025-03-25', checkIn: '09:00 AM', checkOut: '05:30 PM', status: 'Present' },
            { date: '2025-03-24', checkIn: '09:15 AM', checkOut: '05:45 PM', status: 'Late' },
            { date: '2025-03-23', checkIn: '09:00 AM', checkOut: '05:30 PM', status: 'Present' },
            { date: '2025-03-22', checkIn: '09:05 AM', checkOut: '05:35 PM', status: 'Late' },
            { date: '2025-03-21', checkIn: '08:55 AM', checkOut: '05:25 PM', status: 'Present' }
        ];

        // DOM Elements
        const attendanceLogBody = document.getElementById('attendanceLogBody');
        const logDateFilter = document.getElementById('logDateFilter');
        const filterLogsBtn = document.getElementById('filterLogsBtn');
        const downloadLogsBtn = document.getElementById('downloadLogsBtn');
        const editProfileBtn = document.getElementById('editProfileBtn');
        const profileUpload = document.getElementById('profileUpload');
        const profileImage = document.getElementById('profileImage');
        const navButtons = document.querySelectorAll('.nav-btn');

        // Render Attendance Log
        function renderAttendanceLogs(logs) {
            attendanceLogBody.innerHTML = '';
            logs.forEach(log => {
                const row = document.createElement('tr');
                row.classList.add('border-b', 'border-gray-700');
                row.innerHTML = `
                    <td class="p-3">${log.date}</td>
                    <td class="p-3">${log.checkIn}</td>
                    <td class="p-3">${log.checkOut}</td>
                    <td class="p-3">
                        <span class="${
                            log.status === 'Present' ? 'text-green-500' : 
                            log.status === 'Late' ? 'text-yellow-500' : 
                            'text-red-500'
                        }">${log.status}</span>
                    </td>
                `;
                attendanceLogBody.appendChild(row);
            });
        }

        // Filter Logs
        filterLogsBtn.addEventListener('click', () => {
            const filterDate = logDateFilter.value;
            if (filterDate) {
                const filteredLogs = attendanceData.filter(log => log.date === filterDate);
                renderAttendanceLogs(filteredLogs);
            } else {
                renderAttendanceLogs(attendanceData);
            }
        });

        // Download Logs
        downloadLogsBtn.addEventListener('click', () => {
            const csvContent = "data:text/csv;charset=utf-8," 
                + attendanceData.map(e => Object.values(e).join(",")).join("\n");
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "attendance_log.csv");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });

        // Profile Image Upload
        editProfileBtn.addEventListener('click', () => {
            profileUpload.click();
        });

        profileUpload.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profileImage.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        // Navigation Handling
        navButtons.forEach(button => {
            button.addEventListener('click', () => {
                navButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // In a real app, you'd handle tab switching here
                console.log(`Navigated to ${button.dataset.tab}`);
            });
        });

        // Initial render
        renderAttendanceLogs(attendanceData);

        // Optional: Add current date to date filter
        const today = new Date().toISOString().split('T')[0];
        logDateFilter.value = today;
        logDateFilter.max = today;
