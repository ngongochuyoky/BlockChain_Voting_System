import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function Home() {
    const logOut = () => {
        Cookies.remove('voterToken');
        Cookies.remove('companyToken');
        Cookies.remove('electionAddress');
        Cookies.remove('companyId');
    };

    return (
        <div>
            <h1>Home nha</h1>
            <h1>Voter:{Cookies.get('voterToken')}</h1>
            <h1>Company: {Cookies.get('companyToken')}</h1>
            <button onClick={logOut}>Log Out</button>
            <Button component={Link} to="/voter_login">
                Login with Voter
            </Button>
            <Button component={Link} to="/company_login">
                Login with Company
            </Button>
        </div>
    );
}

export default Home;
