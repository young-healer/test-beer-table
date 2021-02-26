import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useTable, usePagination, useSortBy } from "react-table";

import {
  Chart,
  ChartSeries,
  ChartSeriesItem,
  ChartCategoryAxis,
  ChartCategoryAxisItem,
  ChartSeriesItemTooltip,
  ChartTooltip
} from '@progress/kendo-react-charts';
import '@progress/kendo-theme-default/dist/all.css';

import Modal from './components/Modal/Modal'
import upArrow from './assets/up-arrow.svg'
import downArrow from './assets/down-arrow.svg'
import bottleError from './assets/bottleError.svg'
import "./App.scss";

const App = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [beerData, setBeerData] = useState()
  const [pageBeer, setPageBeer] = useState(1)
  const [seriesData, setSeriesData] = useState([])

  const openModal = (row) => {
    setBeerData(row.cell.row.original)
    setIsOpen(true)
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name"
      },
      {
        Header: "Tagline",
        accessor: "tagline"
      },
      {
        Header: "Photo",
        accessor: "imageUrl",
        Cell: (row) => (
          row.value
            ? <img alt='error' onClick={() => openModal(row)} height={34} src={row.value} />
            : <img alt='error' onClick={() => openModal(row)} height={34} src={bottleError} />
        )
      },
      {
        Header: "ABV",
        accessor: "abv",
      }
    ],
    []
  );

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
      setData(changedData);

      const seriesData = changedData?.reduce((prev, curr) => {
        const obj = {
          name: curr.name,
          imageUrl: curr.imageUrl,
          value: curr.abv
        }
        return [...prev, obj]
      }, [])

      setSeriesData(seriesData)
    });
  }, [pageBeer]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
  } = useTable({
    columns,
    data,
  }, useSortBy, usePagination);

  const defaultTooltipRender = ({ point }) => {
    return (
      <div>
        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '70px' }}>
          {point.dataItem.imageUrl
            ? <img alt='error' style={{ width: "20px" }} src={point.dataItem.imageUrl} />
            : <img alt='error' style={{ width: "20px" }} src={bottleError} />
          }
          <b>{point.dataItem.name}</b>
        </span>
      </div>
    )
  };


  return (
    <div className="App">
      <Chart style={{ width: "100%", height: "250px" }}>
        <ChartTooltip render={defaultTooltipRender} />

        <ChartCategoryAxis>
          <ChartCategoryAxisItem categories={seriesData.map(v => v.value).sort((a, b) => a - b)} />
        </ChartCategoryAxis>
        <ChartSeries>
          <ChartSeriesItem data={seriesData.sort((a, b) => a.value - b.value)} color="green" />
          <ChartSeriesItemTooltip />
        </ChartSeries>
      </Chart>
        <table className="table" {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? <img alt='error' className='arrow-sort' src={upArrow} />
                          : <img alt='error' className='arrow-sort' src={downArrow} />
                        : ''}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: "5px",
                          border: "solid 1px black",
                          background: "lightgrey"
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="pagination">
          <button disabled={pageBeer === 1 ? 'disabled' : ''} onClick={() => setPageBeer(pageBeer - 1)}>{"<"}</button>
          <button disabled={pageBeer === 33 ? 'disabled' : ''} onClick={() => setPageBeer(pageBeer + 1)}>{">"}</button>
          <span>
            {" "}
          Page{" "}
            <strong>
              {pageBeer} of 33
          </strong>{" "}
          </span>
        </div>

      <Modal visible={isOpen} setIsOpen={setIsOpen} data={beerData} />
    </div>


  );
};
export default App;