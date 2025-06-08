import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

function Dashboard() {
  const [campaignCharts, setCampaignCharts] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5000/api/impression").then(res => res.json()),
      fetch("http://localhost:5000/api/cart").then(res => res.json()),
      fetch("http://localhost:5000/api/buy").then(res => res.json()),
      fetch("http://localhost:5000/api/products").then(res => res.json())
    ])
      .then(([impressions, carts, buys, products]) => {

        const productIdToData = {};
        products.forEach(p => {
          productIdToData[p._id] = {
            name: p.name || p.title || p._id,
            campaign: p.campaign || "Uncategorized"
          };
        });

        const countByProduct = (data) => {
          const counts = {};
          data.forEach(item => {
            const id = item.productId;
            if (id) counts[id] = (counts[id] || 0) + 1;
          });
          return counts;
        };

        const impressionCounts = countByProduct(impressions);
        const cartCounts = countByProduct(carts);
        const buyCounts = countByProduct(buys);

        const campaignGroups = {};
        Object.keys(productIdToData).forEach(productId => {
          const campaign = productIdToData[productId].campaign;
          if (!campaignGroups[campaign]) campaignGroups[campaign] = [];
          campaignGroups[campaign].push(productId);
        });

        const chartsData = Object.entries(campaignGroups).map(([campaign, productIds]) => {
          const filteredIds = productIds.filter(id => productIdToData[id]);

          const labels = filteredIds.map(id => productIdToData[id].name);
          const impressionsData = filteredIds.map(id => impressionCounts[id] || 0);
          const cartsData = filteredIds.map(id => cartCounts[id] || 0);
          const buysData = filteredIds.map(id => buyCounts[id] || 0);

          return {
            campaign,
            data: {
              labels,
              datasets: [
                {
                  label: "Impressions",
                  data: impressionsData,
                  backgroundColor: "rgba(50, 128, 115, 0.92)",
                },
                {
                  label: "Cart Adds",
                  data: cartsData,
                  backgroundColor: "rgba(255, 99, 132, 0.6)",
                },
                {
                  label: "Purchases",
                  data: buysData,
                  backgroundColor: "rgba(54, 162, 235, 0.6)",
                },
              ],
            }
          };
        });

        setCampaignCharts(chartsData);

      })
      .catch(err => console.error("Error loading chart data:", err));
  }, []);

  if (campaignCharts.length === 0) return <div>Loading chart data...</div>;

  return (
    <div className="dashboard-container">
      
      {campaignCharts.map(({ campaign, data }) => (
        <section
          key={campaign}
          style={{
            marginTop: "2rem",
            marginBottom: "2rem",
            borderBottom: "1px solid #eee",
            paddingBottom: "1.5rem"
          }}
        >
         
          <div className="chart-wrapper" style={{ maxWidth: 900, margin: "0 auto" }}>
            <Bar
              data={data}
              options={{
                responsive: true,
                plugins: {
                  legend: { position: "top" },
                  title: { display: true,font: {
                    size: 24,   
                    weight: "bold" 
                    
                  },   color:"black",text: ` ${campaign} - Analysis` },
                },
                scales: {
                  x: { title: { display: true, text: "Product Name" } },
                  y: { title: { display: true, text: "Count" }, beginAtZero: true },
                },
              }}
            />
          </div>
        </section>
      ))}
    </div>
  );
}

export default Dashboard;
