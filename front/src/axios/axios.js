import axios from "axios";

export default axios.create({
    baseURL: 'https://react-quiz-tmp-76f4a-default-rtdb.firebaseio.com/',
});