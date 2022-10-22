import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ContactService from '../../services/contactService';
import GroupService from '../../services/groupService';
import UpLoadService from '../../uploadService/UploadService';
import Spinner from '../Spinner/Spinner'



function AddContact() {

    const [oldAvatar, setoldAvatar] = useState({
        avatar_old: ''
    });

    const [upload, setupload] = useState({
        uploadLoading: false,
        file: ''
    });

    const [state, setstate] = useState({
        loading: false, //true
        groups: [],
        errorMessage: ''
    });

    const [contact, setcontact] = useState({
        name: '',
        age: '',
        class: '',
        photoUrl: 'https://png.pngtree.com/element_our/20200610/ourlarge/pngtree-default-avatar-image_2237213.jpg',
        mobile: '',
        gender: '',
        groupId: 0,

    });

    const navigate = useNavigate();

    useEffect(() => {
        try {
            setstate({ ...state, loading: true }); // ko set lai
            async function getData() {
                let groupRes = await GroupService.getGroups();
                setstate({
                    ...state,
                    groups: groupRes.data
                })
            
            }
            getData();
        } catch (error) {
            setstate({
                ...state,
                errorMessage: error.errorMessage
            })
        }
        
    }, [])

    const handleInputValue = (e) => {
        setcontact({
            ...contact,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            setstate({ ...state, loading: true });
            async function postData() {
                let avatarResulf = await UpLoadService.uploadAvatar(upload.file)
                setupload({
                    ...upload,
                    uploadLoading: false,
                    file: avatarResulf
                })
                contact.photoUrl = avatarResulf.data.url;
                toast.info("upload hơi lâu, đợi xíu nghen !!!")
                let result = await ContactService.createContact(contact)
                navigate("/contact/list")
                toast.success("Thêm thành công !!!");
            }
            postData();


        } catch (error) {

        }
    }
    const changeAvatar = (e) => {
        setupload({ ...upload, uploadLoading: true })
        let file = e.target.files[0];
        let urlAvatar = URL.createObjectURL(file)
        contact.photoUrl = urlAvatar;
        setupload({
            ...upload,
            uploadLoading: false,
            file: file
        })

    }

    // const handleUpload = () => {
    //     if (upload.file) {
    //         setupload({ ...upload, uploadLoading: true })
    //         async function upAvatar() {
    //             let avatarResulf = await UpLoadService.uploadAvatar(upload.file)
    //             setupload({
    //                 ...upload,
    //                 uploadLoading: false,
    //                 file: avatarResulf
    //             })
    //             contact.photoUrl = avatarResulf.data.url;
    //             toast.success("upload success")
    //         }
    //         upAvatar();
            
    //     }
    //     else {
    //         toast.info('select choose avatar')
    //     }
    // }
    const { loading, groups, errorMessage } = state;
    const { uploadLoading } = upload;

    return (

        <>

            <section className='create-contact container'>
                <div className='d-flex align-items-center text-success'>
                    <h3>Add Contact</h3>
                </div>

                <div>
                    <p className='fst-italic'>Lorem nisi quis est excepteur commodo quis culpa veniam proident voluptate officia deserunt aute eu.</p>
                </div>
            </section>
            <section className='create-contact'>
                {
                    loading ? <Spinner /> : (
                        <div className='container'>
                            <div className='row' >
                                <div className='col-4'>
                                    <form onSubmit={handleSubmit}>
                                        <div className='mb-3'>
                                            <input type="text" className='form-control' placeholder='Name...' name='name' onInput={handleInputValue} />
                                        </div>
                                        <div className='mb-3'>
                                            <input type="number" className='form-control' placeholder='Age...' name='age' onInput={handleInputValue} />
                                        </div>
                                        <div className='mb-3'>
                                            <input type="text" className='form-control' placeholder='Class...' name='class' onInput={handleInputValue} />
                                        </div>
                                        <div className='mb-3'>
                                            <input type="text" className='form-control' placeholder='Mobile...' name='mobile' onInput={handleInputValue} />
                                        </div>
                                        <div className='mb-3'>
                                            <input type="text" className='form-control' placeholder='Gender' name='gender' onInput={handleInputValue} />
                                        </div>
                                        <div className='mb-3'>
                                            <select className='form-control' name='groupId' defaultValue={'-1'} onChange={handleInputValue} >
                                                <option value="-1" key="-1" disabled >Select Group</option>
                                                {
                                                    groups.map((group) => (
                                                        <option value={group.id} key={group.id}>{group.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className='mb-3'>
                                            <button className='btn btn-success' type='submit'>Create</button>
                                            <Link to={"/"} className="btn btn-danger ms-3">Close</Link>
                                        </div>
                                    </form>
                                </div>
                                <div className='col-4'>
                                    <img className='img-thumbnail' style={{ width: '406px', height: '406px' }} src={contact.photoUrl}
                                        onClick={() => document.querySelector("#formFile").click()} />

                                    <input className="form-control d-none" type="file" id="formFile" accept='image/*' onChange={changeAvatar} />
                                    {/* <button className='btn btn-outline-info ' onClick={handleUpload}>
                                        {
                                            uploadLoading ? <div className="spinner-grow" style={{ width: '3rem', height: '3rem' }} role="status"></div> : "Upload Avatar"
                                        }
                                    </button> */}

                                </div>
                            </div>
                        </div>
                    )
                }
            </section >
        </>
    );
}

export default AddContact;
