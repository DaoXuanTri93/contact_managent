import axios from "axios";
import { GROUP_URL } from "./common";


class GroupService{
    static getGroups(){
        return axios.get(GROUP_URL)
    }

    static getGroupById(groupId){
        return axios.get(`${GROUP_URL}/${groupId}`)
    }
}

export default GroupService;