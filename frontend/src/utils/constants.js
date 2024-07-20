import UserData from "../views/plugin/UserData";

export const API_BASE_URL = `http://127.0.0.1:8000/api/v1/`;
export const userId = UserData()?.user_id;
export const PAYPAL_CLIENT_ID = "AVHF6PW6Fas-o5MKwdeoSYt10tzywJQowcL5_l7Oj3gtriB7ilOZB8XySKZVQxS_CMb_mPHh_RqLDpbP";
export const teacherId = UserData()?.teacher_id; 