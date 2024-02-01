import AccessToken from './AccessToken';
import RefreshToken from './RefreshToken';
import User from './User';

const logout = () => {
    AccessToken.remove();
    RefreshToken.remove();
    User.remove();
};

export default logout;
