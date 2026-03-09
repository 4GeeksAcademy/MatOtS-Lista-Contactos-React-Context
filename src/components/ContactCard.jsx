import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";
import { use } from "react";

const ContactCard = (props) => {

    const { store, dispatch } = useGlobalReducer();

    const [isOpen, setModalOpen] = useState(false);

    async function deleteContact() {
        isOpen ? setModalOpen(false) : ""
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
        <div className="position-relative">
            <div className="card  flex-row mb-3">
                <div className="col-md-3">
                    <img src={props.img} className="rounded-circle overflow-hidden w-100 p-3" alt="profile_image" />
                </div>
                <div className="col-md-7">
                    <div className="card-body">
                        <h5 className="card-title">{props.name}</h5>
                        <div className="d-flex flex-column mt-3">
                            <div className="d-flex gap-3 text-body-secondary">
                                <i className="fa-solid fa-location-dot"></i>
                                <small className="card-text">{props.address}</small>
                            </div>
                            <div className="d-flex gap-3 text-body-secondary">
                                <i className="fa-solid fa-phone-flip"></i>
                                <small className="card-text">{props.phone}</small>
                            </div>
                            <div className="d-flex gap-3 text-body-secondary">
                                <i className="fa-solid fa-envelope"></i>
                                <small className="card-text">{props.email}</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-2 gap-5 mt-5 d-flex">
                    <Link to="/contactForm" state={{ name: props.name, id: props.id, address: props.address, email: props.email, phone: props.phone }} style={{ color: "black" }}>
                        <i className="fa-solid fa-pencil" style={{ cursor: "pointer" }}></i>
                    </Link>
                    <i className="fa-solid fa-trash-can" style={{ cursor: "pointer" }} onClick={() => setModalOpen(true)}></i>
                </div>
            </div>
            {isOpen ?
                <div className="modalContent">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal title</h5>
                        <button type="button" className="btn-close" onClick={() => setModalOpen(false)} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Modal body text goes here.</p>
                    </div>
                    <div className="modal-footer gap-4">
                        <button type="button" className="btn btn-secondary" onClick={() => setModalOpen(false)} >Close</button>
                        <button type="button" className="btn btn-danger" onClick={deleteContact}>Delete</button>
                    </div>
                </div>
                :
                <>
                </>
            }
        </div>
    )
}

export default ContactCard;