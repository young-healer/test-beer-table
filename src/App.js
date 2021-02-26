import React, { useEffect, useState } from "react";
import axios from "axios";

import Table from './components/Table'
import ColumnChart from './components/ColumnChart'

import "./App.scss";

const App = () => {
  const [data, setData] = useState([]);
  const [pageBeer, setPageBeer] = useState(1)
  const [seriesData, setSeriesData] = useState([])

  useEffect(() => {
    axios.get(`https://api.punkapi.com/v2/beers?page=${pageBeer}&per_page=10`).then((res) => {
      const changedData = [];
      res.data.map((item) => {
        const { name, tagline, image_url, abv, description, first_brewed, brewers_tips } = item;
        return changedData.push({
          name,
          tagline,
          imageUrl: image_url,
          abv,
          description,
          firstBrewed: first_brewed,
          brewersTips: brewers_tips,
        });
      });

      const seriesData = changedData?.reduce((prev, curr) => {
        const obj = {
          name: curr.name,
          imageUrl: curr.imageUrl,
          value: curr.abv
        }
        return [...prev, obj]
      }, [])

      setData(changedData);
      setSeriesData(seriesData)
    });
  }, [pageBeer]);

  return (
    <div className="App">
      <ColumnChart
        seriesData={seriesData}
      />
      <Table
        data={data}
        pageBeer={pageBeer}
        setPageBeer={setPageBeer}
      />
    </div>


  );
};
export default App;