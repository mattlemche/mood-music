//import './ClearThoughts.scss';
import Logo from '../../assets/logo/Logo-brainflix.svg';
import { Link } from 'react-router-dom';


function LandingPage() {
  return (
    <div className="clear-thoughts">
      <img src={Logo} alt="Clear Thoughts Logo" />
      <Link to ="/form"><button type="submit">INSPIRE ME NOW</button></Link>
        
    </div>
  );
}

export default LandingPage;
