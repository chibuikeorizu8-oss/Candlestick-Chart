// Fetch OHLC data from Binance for candlestick charts
async function fetchCandlestick(symbol, chartId) {
  try {
    const response = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=1h&limit=50`);
    const data = await response.json();

    const ohlc = data.map(d => ({
      t: new Date(d[0]),
      o: parseFloat(d[1]),
      h: parseFloat(d[2]),
      l: parseFloat(d[3]),
      c: parseFloat(d[4])
    }));

    const ctx = document.getElementById(chartId).getContext("2d");
    new Chart(ctx, {
      type: 'candlestick',
      data: {
        datasets: [{
          label: symbol,
          data: ohlc,
          borderColor: '#00ffcc',
          color: {
            up: '#00ff00',
            down: '#ff0000',
            unchanged: '#999'
          }
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { labels: { color: '#fff' } }
        },
        scales: {
          x: { ticks: { color: '#fff' } },
          y: { ticks: { color: '#fff' } }
        }
      }
    });
  } catch (error) {
    console.error("Error fetching candlestick data:", error);
  }
}

// Load charts
window.onload = () => {
  fetchCandlestick("BTCUSDT", "btcChart");
  fetchCandlestick("ETHUSDT", "ethChart");
  fetchCandlestick("XRPUSDT", "xrpChart");
};
