document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
    const proxiedUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(apiUrl)}`;

    // Fetch data using .then
    fetch(proxiedUrl)
        .then(response => response.json())
        .then(data => {
            if (data.contents) {
                const parsedData = JSON.parse(data.contents);
                renderTable(parsedData);
            } else {
                console.error('Error: Data contents not found in response');
            }
        })
        .catch(error => console.error('Error fetching data:', error));

    // Fetch data using async/await
    async function fetchDataAsync() {
        try {
            const response = await fetch(proxiedUrl);
            const data = await response.json();
            if (data.contents) {
                const parsedData = JSON.parse(data.contents);
                renderTable(parsedData);
            } else {
                console.error('Error: Data contents not found in response');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
    fetchDataAsync();

    function renderTable(data) {
        // Check if data is an array
        if (Array.isArray(data)) {
            const tableBody = document.getElementById('cryptoTableBody');
            tableBody.innerHTML = '';

            data.forEach(item => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${item.name}</td>
                    <td>${item.symbol}</td>
                    <td>${item.current_price}</td>
                    <td>${item.total_volume}</td>
                `;
                tableBody.appendChild(row);
            });
        } else {
            console.error('Error: Data is not in expected format');
        }
    }

    document.getElementById('searchButton').addEventListener('click', searchCrypto);

    function searchCrypto() {
        const input = document.getElementById('searchInput').value.toLowerCase();
        const tableRows = document.querySelectorAll('#cryptoTableBody tr');

        tableRows.forEach(row => {
            const name = row.getElementsByTagName('td')[0].textContent.toLowerCase();
            const symbol = row.getElementsByTagName('td')[1].textContent.toLowerCase();
            if (name.includes(input) || symbol.includes(input)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    document.getElementById('sortMarketCapButton').addEventListener('click', sortMarketCap);

    function sortMarketCap() {
        const tableBody = document.getElementById('cryptoTableBody');
        const rows = Array.from(tableBody.getElementsByTagName('tr'));

        rows.sort((a, b) => {
            const capA = parseFloat(a.getElementsByTagName('td')[2].textContent);
            const capB = parseFloat(b.getElementsByTagName('td')[2].textContent);
            return capA - capB;
        });

        rows.forEach(row => tableBody.appendChild(row));
    }

    document.getElementById('sortPercentageChangeButton').addEventListener('click', sortPercentageChange);

    function sortPercentageChange() {
        const tableBody = document.getElementById('cryptoTableBody');
        const rows = Array.from(tableBody.getElementsByTagName('tr'));

        rows.sort((a, b) => {
            const changeA = parseFloat(a.getElementsByTagName('td')[3].textContent);
            const changeB = parseFloat(b.getElementsByTagName('td')[3].textContent);
            return changeA - changeB;
        });

        rows.forEach(row => tableBody.appendChild(row));
    }
});



