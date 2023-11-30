import { React, useEffect, useState } from "react"
import { Navbar } from "../components/Navbar"
import "../styles/home.scss"
import { useSelector } from "react-redux"
import { useHttp } from "../hooks/http.hook"


export const HomePage = () => {
    const {request} = useHttp()
    const currencies = useSelector(state => state.currencies)
    const [relationships, setRelationships] = useState({
        eur: 1,
        usd: 0,
        uah: 0
    })
    const [form, setForm] = useState({
        firstCurrency: "eur",
        secondCurrency: "eur",
        firstCurrencyValue: 0,
        secondCurrencyValue: 0
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const calculateForm = (name) => {
        if(name === "firstCurrency" || name === "secondCurrency"){

        }
    }

    useEffect(() => {
        console.log("re")
        request("http://data.fixer.io/api/latest?access_key=324781ab05a87e630e8d1b233c6c684e", "GET").then(data => data.json()).then(data => {
            setRelationships({...relationships, usd: data.rates["USD"], uah: data.rates["UAH"]})
        })

    }, [])

    return (
        <>
            <Navbar />
            <div class="card">
                <h5 class="card-header">CURRENCY</h5>
                <div class="card-body">
                    <div className="d-flex">
                        <div class="input-group mb-3">
                            <select class="form-select" aria-label="Default select example" name="firstCurrency" onChange={changeHandler}>
                                {
                                    currencies.map(el => {
                                        return (
                                            <option value={el}>{el.toUpperCase()}</option>
                                        )
                                    })
                                }
                            </select>
                            <input type="number" class="form-control" aria-label="Text input with dropdown button" name="firstCurrencyValue" onChange={changeHandler} />
                        </div>
                        <span className="mx-5">
                            to
                        </span>
                        <div class="input-group mb-3">
                            <select class="form-select" aria-label="Default select example" name="secondCurrency" onChange={changeHandler} >
                                {
                                    currencies.map(el => {
                                        return (
                                            <option value={el}>{el.toUpperCase()}</option>
                                        )
                                    })
                                }
                            </select>
                            <input type="number" class="form-control" aria-label="Text input with dropdown button" name="secondCurrencyValue" onChange={changeHandler} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}