import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContactService from '../../services/contactService';
import Spinner from '../Spinner/Spinner';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import UpLoadService from '../../uploadService/UploadService';
function ContactList() {
    const [state, setState] = useState({
        loading: false,
        contacts: [],
        errorMessage: ''
    });
    const [keyword, setkeyword] = useState('');

    useEffect(() => {
        try {
            setState({ ...state, loading: true })
            async function getData() {
                let contactRes = await ContactService.getContacts();
                // console.log(contactRes)
                setState({
                    ...state,
                    contacts: contactRes.data,
                    loading: false
                })
            }
            getData()
            // fetch('https://6331287ecff0e7bf70e72c84.mockapi.io/contact')
            //     .then(res => res.json())
            //     .then(data =>
            //         setState({
            //             ...state,
            //             contacts: data,
            //             loading: false
            //         })
            //     )

        } catch (error) {
            setState({
                ...state,
                loading: false,
                errorMessage: error.errorMessage
            })
        }
    }, [])

    const handleRemoveContact = (contact) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => {
                        try {
                            setState({ ...state, loading: true })
                            async function removeData() {
                                let deleteResult = await ContactService.deleteContact(contact.id)
                                // let filename = contact.split('/').pop().split('.')[0];
                                let contactRes = await ContactService.getContacts();
                                let destroyResult = await UpLoadService.destroyAvatar(contact.photoUrl);
                                setState({
                                    ...state,
                                    contacts: contactRes.data
                                })
                                toast.success("Xóa thành công !!!");
                            }
                            removeData();
                        } catch (error) {
                            toast.error(error.message);
                            setState({
                                ...state,
                                loading: false,
                                errorMessage: error.errorMessage
                            })
                        }
                    }
                },
                {
                    label: 'No',

                }
            ]
        });

    }

    const handleSearch = () => {
        setState({ ...state, loading: true })
        async function getData() {
            let contactRes = await ContactService.getContacts();
            setState({
                ...state,
                contacts: contactRes.data.filter(contact => contact.name.toLowerCase().includes(keyword.toLocaleLowerCase())),
                loading: false
            })
        }
        getData();

    }
    
    const { loading, contacts, errorMessage } = state;


    return (
        <>
            <section className='container my-2'>
                <div className='d-flex align-items-center'>
                    <h3>Contact Manager</h3>
                    <Link to={'/contact/add'} className="btn btn-primary btn-md ms-2">
                        <i className="fa-solid fa-plus"></i>
                        Add
                    </Link>
                </div>

                <div>
                    <p className='fst-italic'>Ad ut qui ipsum officia do cupidatat id ad.</p>
                </div>

                <div className='d-flex w-25 input-group-text '>
                    <input type="text" className='form-control' onInput={(e) => setkeyword(e.target.value)} />
                    <button className='btn btn-outline-warning ms-2 btn-sm' onClick={handleSearch}>Search</button>
                </div>
            </section>
            <section className='contact-list'>
                <div className='container'>
                    <div className='row '>
                        {loading ? <Spinner /> :
                            contacts.map((contact) => (
                                <div className='col-6 my-2 py-2 ' key={contact.id}>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='row align-items-center'>
                                                <div className='col-3'>
                                                    <img className='rounded-circle' src={contact.photoUrl} alt="loi 404"
                                                        style={{ width: "128px", height: "128px" }} />
                                                </div>
                                                <div className='col-8'>
                                                    <ul className="list-group">
                                                        <li className="list-group-item">
                                                            Name : <span>{contact.name}</span>
                                                        </li>
                                                        <li className="list-group-item">
                                                            Age : <span>{contact.age}</span>
                                                        </li>
                                                        <li className="list-group-item">
                                                            Class : <span>{contact.class}</span>
                                                        </li>
                                                        <li className="list-group-item">
                                                            Telephone : <span>{contact.mobile}</span>
                                                        </li>
                                                    </ul>
                                                </div>
                                                <div className='col-1'>
                                                    <div className='d-flex flex-column align-items-center'>
                                                        <Link className='btn btn-warning' to={`/contact/view/${contact.id}`}><i className="fa-solid fa-eye"></i></Link>

                                                        <Link className='btn btn-secondary my-4' to={`/contact/edit/${contact.id}`} ><i className="fa-solid fa-pen-to-square"></i></Link>

                                                        <Link className='btn btn-danger' onClick={() => handleRemoveContact(contact)}><i className="fa-sharp fa-solid fa-trash"></i></Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>

                </div>
            </section>
        </>
    );
}

export default ContactList;
