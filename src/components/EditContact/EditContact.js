import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ContactService from "../../services/contactService";
import GroupService from "../../services/groupService";
import Spinner from '../Spinner/Spinner';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import UpLoadService from "../../uploadService/UploadService";

function EditContact() {

    const [oldAvatar, setoldAvatar] = useState({
        avatar_old: ''
    });
    const [upload, setupload] = useState({
        uploadLoading: false,
        file: ''
    });
    const navigate = useNavigate();
    const [state, setState] = useState({
        loading: false,
        groups: []
    });

    const { contactId } = useParams();

    const [contact, setcontact] = useState({
        name: '',
        age: '',
        class: '',
        photoUrl: '',
        mobile: '',
        gender: '',
        groupId: 0,

    });



    useEffect(() => {
        setState({ ...state, loading: true })
        async function getData() {
            let groupRes = await GroupService.getGroups();
            let contactRes = await ContactService.getContactById(contactId);
            setState({
                ...state,
                loading: false,
                groups: groupRes.data
            })
            setcontact(contactRes.data);
            setoldAvatar({ avatar_old: contactRes.data.photoUrl })
        }
        getData();

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
            setState({ ...state, loading: true });
            async function postData() {
                let avatarResulf = await UpLoadService.uploadAvatar(upload.file)
                await UpLoadService.destroyAvatar(oldAvatar.avatar_old);
                setupload({
                    ...upload,
                    uploadLoading: false,
                    file: avatarResulf
                })
                contact.photoUrl = avatarResulf.data.url;
                toast.info("upload hơi lâu, đợi xíu nghen !!!")
                let postDataEdit = await ContactService.postContactById(contact, contactId)
                if (postDataEdit.data) {
                    toast.success("updata success !!!")
                    navigate("/")
                }
            }
                postData();
        } catch (error) {

        }
    }
    // const handleUpload = () => {
    //     if (upload.file) {
    //         setupload({ ...upload, uploadLoading: true })
    //         async function upAvatar() {
    //             let avatarResulf = await UpLoadService.uploadAvatar(upload.file)
    //             await UpLoadService.destroyAvatar(oldAvatar.avatar_old);
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
    const { loading, groups } = state;
    const { uploadLoading } = upload;
    // console.log(contact.photoUrl)
    return (
        <>
            <section className='edit-contact container'>
                <div className='d-flex align-items-center text-success'>
                    <h3>Edit Contact</h3>
                </div>

                <div>
                    <p className='fst-italic'>Lorem nisi quis est excepteur commodo quis culpa veniam proident voluptate officia deserunt aute eu.</p>
                </div>
            </section>
            <section className='edit-contact'>
                {
                    loading ? <Spinner /> : (
                        <div className='container'>
                            <div className='row' >
                                <div className='col-4'>
                                    <form onSubmit={handleSubmit}>
                                        <div className='mb-3'>
                                            <input type="text" value={contact.name} className='form-control' placeholder='Name...' name='name' onInput={handleInputValue} />
                                        </div>
                                        <div className='mb-3'>
                                            <input type="number" value={contact.age} className='form-control' placeholder='Age...' name='age' onInput={handleInputValue} />
                                        </div>
                                        <div className='mb-3'>
                                            <input type="text" value={contact.class} className='form-control' placeholder='Class...' name='class' onInput={handleInputValue} />
                                        </div>
                                        <div className='mb-3'>
                                            <input type="text" value={contact.photoUrl} id="photoUrl" className='form-control' placeholder='PhotoUrl...' name='photoUrl' onInput={handleInputValue} />
                                        </div>
                                        <div className='mb-3'>
                                            <input type="text" value={contact.mobile} className='form-control' placeholder='Mobile...' name='mobile' onInput={handleInputValue} />
                                        </div>

                                        <div className='mb-3'>
                                            <select className='form-control' name='groupId' onChange={handleInputValue} value={contact.groupId} >
                                                <option value="-1" key="-1" disabled defaultValue>Select Group</option>
                                                {
                                                    groups.map((group) => (
                                                        <option value={group.id} key={group.id}>{group.name}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        <div className='mb-3'>
                                            <button className='btn btn-success' type='submit'>Update</button>
                                            <Link to={"/"} className="btn btn-danger ms-3">Close</Link>
                                        </div>
                                    </form>
                                </div>
                                <div className='col-4'>
                                    <img className='img-thumbnail' style={{ width: '406px', height: '406px' }} src={contact.photoUrl}
                                        onClick={() => document.querySelector("#formFile").click()} />

                                    <input className="form-control d-none" type="file" id="formFile" accept='image/*' onChange={changeAvatar} />
                                    {/* <button className='btn btn-outline-info d-none' onClick={handleUpload} id="updateAvatar">
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

export default EditContact;