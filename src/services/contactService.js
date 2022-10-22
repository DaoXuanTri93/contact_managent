import axios from "axios"
import { CONTACT_URL } from './common'
class ContactService {
    static getContacts() {
        return axios.get(CONTACT_URL)
    }

    static createContact(contact) {
        return axios.post(CONTACT_URL, contact);
    }
    
    static postContactById(contact, contactId){
        return axios.put(`${CONTACT_URL}/${contactId}`, contact)
    }

    static getContactById(contactId){
        return axios.get(`${CONTACT_URL}/${contactId}`)
    }
    static deleteContact(contactId) {
        return axios.delete(`${CONTACT_URL}/${contactId}`)
    }
    
}

export default ContactService;