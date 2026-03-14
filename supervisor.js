document.addEventListener('DOMContentLoaded', function() {
    const sites = [
        { url: 'https://yel0w.fr/', statusId: 'status-yel0w', timeId: 'time-yel0w', lastId: 'last-yel0w' },
        { url: 'https://tealib.yel0w.fr/', statusId: 'status-tealib', timeId: 'time-tealib', lastId: 'last-tealib' }
    ];

    function checkSite(site) {
        const start = Date.now();
        fetch(site.url, { mode: 'no-cors' }) // no-cors to avoid CORS issues, but won't get status
            .then(response => {
                const end = Date.now();
                const time = end - start;
                document.getElementById(site.statusId).textContent = 'Up';
                document.getElementById(site.statusId).style.color = 'green';
                document.getElementById(site.timeId).textContent = time + ' ms';
                document.getElementById(site.lastId).textContent = new Date().toLocaleString();
            })
            .catch(error => {
                document.getElementById(site.statusId).textContent = 'Down';
                document.getElementById(site.statusId).style.color = 'red';
                document.getElementById(site.timeId).textContent = '-';
                document.getElementById(site.lastId).textContent = new Date().toLocaleString();
            });
    }

    function checkAllSites() {
        sites.forEach(site => checkSite(site));
    }

    // Initial check
    checkAllSites();

    // Check every 30 seconds
    setInterval(checkAllSites, 30000);
});