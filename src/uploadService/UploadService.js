import axios from "axios";
import sha1 from "sha1";
import { URL_API_AVATAR, URL_NAME_UPLOAD } from "../services/common";
class UpLoadService {
    static uploadAvatar(file) {
        let uploadAvatar = `${URL_API_AVATAR}/upload`;
        let formData = new FormData();
        formData.append("file", file)
        formData.append("upload_preset", URL_NAME_UPLOAD)
        console.log(formData.append)
        return axios.post(uploadAvatar, formData);
    }
    
    static destroyAvatar(filepath) {
        let filename = filepath.split('/').pop().split('.')[0];
        const DESTROY_API = `${URL_API_AVATAR}/destroy`;
        const timestamp = new Date().getTime();
        const public_id = filename;
        const api_key = "925162946275189";
        const api_secret_key = "mMQMX6MA7DhIsw8zvpXPGSi_yFg";
        const shaString = `public_id=${public_id}&timestamp=${timestamp}${api_secret_key}`;
        const signature = sha1(shaString)
        const formData = new FormData();
        formData.append("public_id", public_id);
        formData.append("signature", signature);
        formData.append("api_key", api_key);
        formData.append("timestamp", timestamp);
        return axios.post(DESTROY_API, formData);
    }
}

export default UpLoadService;