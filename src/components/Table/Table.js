import React, { useState, useMemo } from "react";
import { useTable, usePagination, useSortBy } from "react-table";

import Modal from '../Modal'

import upArrow from '../../assets/up-arrow.svg'
import downArrow from '../../assets/down-arrow.svg'
import bottleError from '../../assets/bottle-error.svg'

import './Table.scss'

const Table = ({ data, pageBeer, setPageBeer }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [beerData, setBeerData] = useState()

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

    return (
        <>
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
                <span>Page <strong> {pageBeer} of 33 </strong></span>
            </div>

            <Modal visible={isOpen} setIsOpen={setIsOpen} data={beerData} />
        </>
    )
}

export default Table