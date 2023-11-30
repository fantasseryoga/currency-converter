import { React, useState } from "react"
import { Navbar } from "../components/Navbar"
import "../styles/home.scss"
import { useSelector } from "react-redux"


export const HomePage = () => {
    const currencies = useSelector(state => state.currencies)
    const [form, setForm] = useState({
        firstCurrency: null,
        secondCurrency: null,
        firstCurrencyValue: null,
        secondCurrencyValue: null
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    console.log(form)
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