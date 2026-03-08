import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const ContactForm = (props) => {
    const { store, dispatch } = useGlobalReducer();

    const [inputName, setInputName] = useState("");
    const [inputEmail, setInputEmail] = useState("");
    const [inputPhone, setInputPhone] = useState("");
    const [inputAddress, setInputAddress] = useState("");

    const location = useLocation();
    const data = location.state;

    useEffect(() => {
        if (data != null) {
            setInputName(data.name)
            setInputEmail(data.email)
            setInputPhone(data.phone)
            setInputAddress(data.address)
        }
    }, [])

    const handleInput = e => {
        e.preventDefault();
        switch (e.target.id) {
            case 'fullName':
                setInputName(e.target.value)
                break;
            case 'email':
                setInputEmail(e.target.value)
                break;
            case 'phone':
                setInputPhone(e.target.value)
                break;
            case 'address':
                setInputAddress(e.target.value)
                break;
            default:
                break;
        }
    }

    async function addNewContact() {
        try {
            const response = await fetch(`${store.urlAPI}${store.user}/contacts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "name": inputName,
                    "email": inputEmail,
                    "phone": inputPhone,
                    "address": inputAddress
                })
            })
            console.log(response)
            if (!response.ok) {
                throw new Error("Error on post fetch, status: ", response.status)
            }
        }
        catch (error) {
            console.log("Error on fetch: ", error.message)
        }
    }

    async function editContact() {
        console.log(inputName)
        try {
            const response = await fetch(`${store.urlAPI}${store.user}/contacts/${data.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "name": inputName,
                    "email": inputEmail,
                    "phone": inputPhone,
                    "address": inputAddress
                })
            })
            console.log(response)
            dispatch({ type: "DELETE_CONTACT", payload: props.id })
            if (!response.ok) {
                throw new Error("Error on delete fetch, status: ", response.status)
            }
        }
        catch (error) {
            console.log("Error on fetch: ", error.message)
        }
    }

    return (
        <div className="container">
            <form action="/">
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input onChange={handleInput} type="text" className="form-control" id="fullName" aria-describedby="fullName" value={inputName} />
                </div>
                <div className="mb-3">
                    <label htmlFor="Email" className="form-label">Email </label>
                    <input onChange={handleInput} type="email" className="form-control" id="email" aria-describedby="Email" value={inputEmail} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input onChange={handleInput} type="text" className="form-control" id="phone" aria-describedby="phone" value={inputPhone} />
                </div>
                <div className="mb-3">
                    <label htmlFor="adress" className="form-label">Address</label>
                    <input onChange={handleInput} type="text" className="form-control" id="address" aria-describedby="address" value={inputAddress} />
                </div>
                {data === null ?
                    <div className="d-grid gap-2 col-6 mx-auto">
                        <button type="submit" className="btn btn-primary" onClick={addNewContact}>Submit</button>
                    </div>
                    :
                    <div className="d-grid gap-2 col-6 mx-auto">
                        <button type="submit" className="btn btn-primary" onClick={editContact}>Submit Edit</button>
                    </div>
                }
                <Link to="/" style={{ textDecoration: "none", display: "block", width: "max-content" }}>
                    <p>or get back to contacts</p>
                </Link>
                </form>
        </div>
    )
}