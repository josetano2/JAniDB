import "./NavBar.css"
import { Link, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import searchIcon from "../search-icon.svg"

export default function NavBar(){

    const navigate = useNavigate()

    function handleKeyDown(event) {
        if (event.key === 'Enter') {
            const query = event.target.value;
            navigate(`/search?query=${query}`);
        }
    }

    return (
        <div className="box">
            <Link to={'/'}><label className="logo">JAniDB😭</label></Link>
            <div className="right-align-button">
                <div className="search-container">
                <img src={searchIcon} alt="search-icon" className="search-icon" />
                <input
                    type="text"
                    placeholder="Search"
                    className="search-bar"
                    onKeyDown={handleKeyDown}
                    />
                </div>
                <Link to={'/favorites'}><p className="top-button">❤</p></Link>
            </div>
        </div>
    )

}