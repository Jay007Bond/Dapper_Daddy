import React, { Fragment, useState } from 'react'
import "./Search.css";
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData';
import { TbSearch } from "react-icons/tb";
import { useAlert } from "react-alert";

const Search = () => {
    const history = useNavigate();
    const alert = useAlert();
    const [keyword, setKeyword] = useState("");

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        if (keyword.trim()) {
            history(`/products/${keyword}`)
            setKeyword("");
        } else {
            // Perform some action or show a message for empty search here if needed.
            // For example, you can show an alert or display a message below the search box.
            alert.info("Please enter a search keyword.");
        }

    }

    return (
        <Fragment>
            <MetaData title="Search a Products || DapperDaddy" />
            <form className="searchBox" onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    placeholder="Search a Product ..."
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <button type="submit" disabled={!keyword.trim()}>
                    <TbSearch />
                </button>

            </form>
        </Fragment>
    )
}

export default Search