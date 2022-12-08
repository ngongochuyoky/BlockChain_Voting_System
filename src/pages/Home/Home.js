import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';

function Home() {
    
    const logOut = () => {
        Cookies.remove('voter_token');
        Cookies.remove('company_token');
    }
    
    return (
        <div>
            <h1>Home nha</h1>
            <h1>Voter:{Cookies.get('voter_token')}</h1>
            <h1>Company: {Cookies.get('company_token')}</h1>
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
