import axios from "axios";
import User from "../models/User";
import Upload from "../models/Upload";
import {Comment} from "../models/Comment";
import {Like} from "../models/Like";

let urlLocalhost = "http://localhost:3000/";
let urlEB = "https://d3m64udsl8l7sh.cloudfront.net/";

let CancelToken = axios.CancelToken;
axios.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
let call1 = CancelToken.source();
let call2 = CancelToken.source();
let picturesOfUser = CancelToken.source();
const endpoint = urlEB;
let bearerToken = "";

export class sdk {
    static setToken(token) {
        bearerToken = token;
    }

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

    static getUserByToken(token : string) {
        return axios.post(endpoint + "login/token/",
            {
                token:token,
            });
    }

    static getUser(username : string) {
        return axios.get(endpoint + "users/" + username);
    }

    static login(username : string, password: string) {
        return axios.post(endpoint + "login/",
            {
                email:username,
                password:password
            });
    }

    static loginGoogle(user: User, token:string) {
        return axios.post(endpoint + "login/google",
            {
                user : user,
                token : token
            });
    }

    static getCommentById(id) {
        return axios.get(endpoint + "comment/" + id);
    }

    static getComment(start = null, end = null) {
        if (start == null && end == null) {
            return axios.get(endpoint + "comment");
        }
        return axios.get(endpoint + "comment?start=" + start + "&end=" + end);
    }

    static addComment(comment: Comment) {
        return axios.post(endpoint + "users/" + comment.userId + "/pictures/" + comment.pictureId + "/comment/",
            {
                message : comment.message,
                ownerId : comment.ownerId
            }, {
                headers: {
                    Authorization: "Bearer " + bearerToken
                }
            });
    }

    static deleteComment(comment : Comment) {
        return axios.delete(endpoint + "users/" + comment.userId + "/pictures/" + comment.pictureId + "/comment/" + comment.id, {
            headers: {
                Authorization: "Bearer " + bearerToken
            }
        });
    }

    static getLike(start = null, end = null) {
        if (start == null && end == null) {
            return axios.get(endpoint + "like");
        }
        return axios.get(endpoint + "like?start=" + start + "&end=" + end)
    }

    static getLikeById(id) {
        return axios.get(endpoint + "like/" + id);
    }

    static getNotifications(userId: string) {
        return axios.get(endpoint + "users/" + userId + "/notifications");
    }

    static setNotificationRead(userId: string, id: number) {
        return axios.put(endpoint + "users/" + userId + "/notifications/" + id, {}, {
            headers: {
                Authorization: "Bearer " + bearerToken
            }
        });
    }

    static addLike(like: Like) {
        return axios.post(endpoint + "users/" + like.userId + "/pictures/" + like.pictureId + "/like/",
            {
                ownerId : like.ownerId
            }, {
                headers: {
                    Authorization: "Bearer " + bearerToken
                }
            });
    }

    static deleteLike(like : Like) {
        return axios.delete(endpoint + "users/" + like.userId + "/pictures/" + like.pictureId + "/like/" + like.id, {
            headers: {
                Authorization: "Bearer " + bearerToken
            }
        });
    }

    static createUser(user: User) {
        try {
            return axios.post(endpoint + "users/",
                {
                    id: user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    phoneNumber: user.phoneNumber,
                    password: user.password,
                    googleId:0
                });
        } catch (error) {
            return Promise.reject({
                response: { status: 400, data: {message: "Schema user is not valid"}}
            });
        }
    }

    static getAllUsers() {
        return axios.get(endpoint + "users?perPage=-1");
    }

    static getUsers(pageNumber: number) {
        return axios.get(endpoint + "users?page=" + pageNumber);
    }

    static editUser(userid : string, userObj : User) {
        return axios.put(endpoint + "users/" + userid, userObj, {
            headers: {
                Authorization: "Bearer " + bearerToken
            }
        });
    }

    static deleteUser(userid : string) {
        return axios.delete(endpoint + "users/" + userid, {
            headers: {
                Authorization: "Bearer " + bearerToken
            }
        });
    }

    static getPicturesByUser(userid : string, pageNumber : number) {
        return axios.get(endpoint + "users/" + userid + "/pictures?page=" + pageNumber, {cancelToken:picturesOfUser.token})
    }

    static getPictures(pageNumber) {
        return axios.get(endpoint + "pictures/?page=" + pageNumber, {cancelToken:call1.token})
    }

    static updatePictureByUser(userid : string, pictureid : number, pictureObj : any) {
        return axios.put(endpoint + "users/" + userid + "/pictures/" + pictureid, pictureObj, {
            headers: {
                Authorization: "Bearer " + bearerToken
            }
        });
    }

    static deletePictureByUser(userid : string, pictureid : number) {
        return axios.delete(endpoint + "users/" + userid + "/pictures/" + pictureid, {
            headers: {
                Authorization: "Bearer " + bearerToken
            }
        });
    }

    static deletePicturesByUser(userid : string) {
        return axios.delete(endpoint + "users/" + userid + "/pictures/", {
            headers: {
                Authorization: "Bearer " + bearerToken
            }
        });
    }

    static uploadPictureByUser(userId : string, file : File, model : Upload) {
        const fileUpload = new FormData();
        fileUpload.append("file", file);
        fileUpload.append("description", model.description);
        fileUpload.append("tags", model.tags.toString());
        fileUpload.append("mentions", model.mentions.toString());
        try {
            return axios.post(endpoint + "users/" + userId + "/pictures/",
                fileUpload, {
                    headers: {
                        Authorization: "Bearer " + bearerToken,
                        "Content-Type": "multipart/form-data"
                    }});
        } catch (error) {
            return Promise.reject({
                response: { status: 400, data: {message: "Il y a eu une erreur lors de l'upload de l'image"}}
            });
        }

    }
}
