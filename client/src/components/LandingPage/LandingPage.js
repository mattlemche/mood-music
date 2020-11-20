//import './ClearThoughts.scss';
import logo from '../../assets/logo/moody-logo.svg';
import { Link } from 'react-router-dom';
import './LandingPage.css';


function LandingPage() {
  return (
    <div className="landingpage">
      <img  className="landingpage-logo" src={logo} alt="Clear Thoughts Logo" />
      <h1 className="landingpage-h1">moody.</h1>
      <Link className="landingpage-link" to ="/form"><button className="landingpage-button" type="submit">Read my thoughts</button></Link>
    </div>
  );

}

export default LandingPage;
