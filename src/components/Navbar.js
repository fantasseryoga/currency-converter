import React from "react";


export const Navbar = ({relations = [{}]}) => {
    const eur = Math.round(relations.find(el => el.currency === "UAH").relation * 100)/100
    const usd = Math.round(relations.find(el => el.currency === "UAH").relation / relations.find(el => el.currency === "USD").relation*100)/100
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                <a class="navbar-brand" href="#">CONVERTER</a>
                <div id="navbarNav" className="align-items-center d-flex">
                    <ul class="curse-nav">
                        <li class="mx-3 nav-item text-light">
                            EUR: {eur}
                        </li>
                        <li class="nav-item text-light">
                            USD: {usd}
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}