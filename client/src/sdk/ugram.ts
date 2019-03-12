import axios from "axios";
import Picture from "../models/Picture";
import User from "../models/User";
import Upload from "../models/Upload";

let CancelToken = axios.CancelToken;
let call1 = CancelToken.source();
let call2 = CancelToken.source();
let picturesOfUser = CancelToken.source();

const endpoint = "http://api.ugram.net/"
const bearerToken = "91935b05-358b-4f41-aa79-8d6248d63637";

export class sdk {
    static cancelToken() {
        picturesOfUser.cancel();
        picturesOfUser = CancelToken.source();
    }
    static resetToken() {
        call1.cancel();
        call2.cancel();
        call1 = CancelToken.source();
        call2 = CancelToken.source();
    }
    static getUser(username : string) {
        return axios.get(endpoint + 'users/' + username);
    }
    static getUsers() {
        return axios.get(endpoint + 'users/')
    }
    static editUser(userid : string, userObj : User) {
        return axios.put(endpoint + 'users/' + userid, userObj, {
            headers: {
                Authorization: 'Bearer ' + bearerToken
            }
        });
    }

    static getPicturesByUser(userid : string, pageNumber : number) {
        return axios.get(endpoint + 'users/' + userid + '/pictures?page=' + pageNumber, {cancelToken:picturesOfUser.token})
    }
    static getPictures(pageNumber) {
        return axios.get(endpoint + 'pictures/?page=' + pageNumber, {cancelToken:call1.token})
    }
    static updatePictureByUser(userid : string, pictureid : number, pictureObj : any) {
        return axios.put(endpoint + 'users/' + userid + "/pictures/" + pictureid, pictureObj, {
            headers: {
                Authorization: 'Bearer ' + bearerToken
            }
        });
    }
    static deletePictureByUser(userid : string, pictureid : number) {
        return axios.delete(endpoint + 'users/' + userid + "/pictures/" + pictureid, {
            headers: {
                Authorization: 'Bearer ' + bearerToken
            }
        });
    }

    static uploadPictureByUser(userId : string, file : File, model : Upload) {
        const fileUpload = new FormData();

        fileUpload.append('file', file);
        fileUpload.append('description', model.description);
        fileUpload.append('tags', model.tags.toString());
        fileUpload.append('mentions', model.mentions.toString());

        return axios.post(endpoint + 'users/' + userId + "/pictures/",
            fileUpload, {
            headers: {
                Authorization: 'Bearer ' + bearerToken,
                'Content-Type': 'multipart/form-data'
            }});
    }
}
