import ENDPOINT from '../../constants/api-endpoints';
const sessionUser = localStorage.getItem('sessionUser') || false;
let currentUser = {IS_AUTHENTICATED:false};
if (sessionUser !== false) {
    const sessionUserParsed = JSON.parse(sessionUser);
    currentUser = {
        IS_AUTHENTICATED: `${sessionUserParsed.isAuthenticated}`,
        ID: `${sessionUserParsed.uid}`,
        NAME: `${sessionUserParsed.name}`,
        MEMBERSHIP: `${sessionUserParsed.membership}`
    };
}
export default currentUser;
