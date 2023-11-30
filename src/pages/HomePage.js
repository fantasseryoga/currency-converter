import { React, useEffect, useState } from "react"
import { Navbar } from "../components/Navbar"
import "../styles/home.scss"
import { useSelector } from "react-redux"
import { useHttp } from "../hooks/http.hook"


export const HomePage = () => {
    const { request } = useHttp()
    const currencies = useSelector(state => state.currencies)
    const [relations, setRelations] = useState(currencies.map(el => {
        return (
            {
                currency: el,
                relation: 0
            }
        )
    }))
    const [form, setForm] = useState({
        firstCurrency: "EUR",
        secondCurrency: "EUR",
        firstCurrencyValue: null,
        secondCurrencyValue: null
    })
    console.log(form)
    console.log(relations)
    const changeHandler = event => {
        const value = event.target.value
        const name = event.target.name
        let newCurrencyValue

        switch (name) {
            case "firstCurrencyValue":
                newCurrencyValue = value * relations.find(el => el.currency === form.secondCurrency).relation / relations.find(el => el.currency === form.firstCurrency).relation
                setForm({ ...form, secondCurrencyValue: newCurrencyValue, [event.target.name]: event.target.value })
                break
            case "secondCurrencyValue":
                newCurrencyValue = value * relations.find(el => el.currency === form.firstCurrency).relation / relations.find(el => el.currency === form.secondCurrency).relation
                setForm({ ...form, firstCurrencyValue: newCurrencyValue, [event.target.name]: event.target.value })
                break
            case "firstCurrency":
                newCurrencyValue = form.firstCurrencyValue / relations.find(el => el.currency === value).relation * relations.find(el => el.currency === form.secondCurrency).relation
                setForm({ ...form, secondCurrencyValue: newCurrencyValue, [event.target.name]: event.target.value })
                break
            case "secondCurrency":
                newCurrencyValue = form.firstCurrencyValue * relations.find(el => el.currency === value).relation / relations.find(el => el.currency === form.firstCurrency).relation
                setForm({ ...form, secondCurrencyValue: newCurrencyValue, [event.target.name]: event.target.value })
                break
        }
    }

    const calculateForm = (name, value) => {

    }

    useEffect(() => {
        request("http://data.fixer.io/api/latest?access_key=324781ab05a87e630e8d1b233c6c684e", "GET").then(data => data.json()).then(data => {
            const newRelations = currencies.map(el => {
                return (
                    {
                        currency: el,
                        relation: data.rates[el.toUpperCase()]
                    }
                )
            })

            setRelations(newRelations)
        })

    }, [])

    return (
        <>
            <Navbar relations={relations}/>
            <div class="card">
                <h5 class="card-header">CURRENCY</h5>
                <div class="card-body">
                    <div className="d-flex">
                        <div class="input-group mb-3">
                            <select class="form-select" aria-label="Default select example" name="firstCurrency" value={form.firstCurrency} onChange={changeHandler}>
                                {
                                    currencies.map(el => {
                                        return (
                                            <option key={el} value={el.toUpperCase()}>{el.toUpperCase()}</option>
                                        )
                                    })
                                }
                            </select>
                            <input type="number" class="form-control" aria-label="Text input with dropdown button" value={form.firstCurrencyValue} name="firstCurrencyValue" onChange={changeHandler} />
                        </div>
                        <span className="mx-5 to">
                            to
                        </span>
                        <div class="input-group mb-3">
                            <select class="form-select" aria-label="Default select example" name="secondCurrency" value={form.secondCurrency} onChange={changeHandler} >
                                {
                                    currencies.map(el => {
                                        return (
                                            <option key={el} value={el.toUpperCase()}>{el.toUpperCase()}</option>
                                        )
                                    })
                                }
                            </select>
                            <input type="number" class="form-control" aria-label="Text input with dropdown button" value={form.secondCurrencyValue} name="secondCurrencyValue" onChange={changeHandler} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}