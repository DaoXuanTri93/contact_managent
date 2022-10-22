import { Link, useParams } from "react-router-dom";
import React,  { useState, useEffect } from "react";
import ContactService from "../../services/contactService";
import GroupService from "../../services/groupService";
import Spinner from "../Spinner/Spinner"


function ViewContact() {
    const { contactId } = useParams();

    const [state, setState] = useState({
        loading: false,
        contact: {},
        groups: {},
        errorMessage: ''
    });

    useEffect(() => {
        try {
            setState({ ...state, loading: true })
            async function getData() {
                let contactRes = await ContactService.getContactById(contactId);
                let groupRes = await GroupService.getGroupById(contactRes.data.groupId);
                setState({
                    ...state,
                    contact: contactRes.data,
                    groups: groupRes.data,
                    loading: false
                })

            }
            getData();
        } catch (error) {
            setState({ ...state, loading: false, errorMessage: error.message })
        }
    },[]);
    

    const { loading, contact, groups } = state;
    
    return (
        <>
            <section className="view-contact container">
                <div>
                    <h1>view contact</h1>
                    <p>Qui consequat nisi deserunt veniam sunt aliqua.</p>
                </div>
            </section>
            <section className="view-contact">
                {
                    loading ? <Spinner /> : (
                        <div className="container">
                            <div className="row">
                                <div className="col-3">
                                    <img style={{width : '100%'}} className='img-thumbnail' src={contact.photoUrl} />
                                </div>
                                <div className="col-9">
                                    <div className="list-group form-group input-group-lg">

                                        <div className="form-control list-group-item list-group-item-action list-group-item-primary">
                                            Name : <span>{contact.name}</span>
                                        </div>
                                        <div className="form-control list-group-item list-group-item-action list-group-item-success mt-2">
                                            mobile : <span>{contact.mobile}</span>
                                        </div>
                                        <div className="form-control list-group-item list-group-item-action list-group-item-danger  my-2">
                                            age : <span>{contact.age}</span>
                                        </div>
                                        <div className="form-control ertb4y5fu7gih90jk9]o7eiw6y5dl78\\;plist-group-item list-group-item-action list-group-item-warning">
                                            email : <span>{contact.email}</span>
                                        </div>
                                        <div className="form-control list-group-item list-group-item-action list-group-item-info  my-2">
                                            company : <span>{groups.name}</span>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </section>
            <div className="view-button container d-flex justify-content-end">
                <Link className="btn btn-warning" to={'/'}>Go Back</Link>
            </div>
        </>
    );
}

export default ViewContact;
