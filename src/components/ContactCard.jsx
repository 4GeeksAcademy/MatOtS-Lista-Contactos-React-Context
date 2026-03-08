import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

const ContactCard = (props) => {

    const { store, dispatch } = useGlobalReducer();

    async function deleteContact() {
        try {
            const response = await fetch(`${store.urlAPI}${store.user}/contacts/${props.id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            })
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
        <div className="card  flex-row mb-3">
            <div className="col-md-4">
                <img src={props.img} className="rounded-circle overflow-hidden w-75 p-3" alt="profile_image" />
            </div>
            <div className="col-md-5">
                <div className="card-body">
                    <h5 className="card-title">{props.name}</h5>
                    <p className="card-text">{props.email}</p>
                </div>
            </div>
            <div className="col-md-3 gap-5 mt-5 d-flex">
                <Link to="/contactForm" state= {{ name: props.name, id: props.id, address: props.address, email: props.email, phone: props.phone }} style={{color: "black"}}>
                    <i className="fa-solid fa-pencil" style={{ cursor: "pointer" }}></i>
                </Link>
                <i className="fa-solid fa-trash-can" style={{ cursor: "pointer" }} onClick={deleteContact} ></i>
            </div>

        </div>
    )
}

export default ContactCard;