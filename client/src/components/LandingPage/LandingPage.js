//import './ClearThoughts.scss';
import { Link } from 'react-router-dom';
import './LandingPage.scss';
import Logo from "../Logo/Logo";
import Button from '../Button/Button';


function LandingPage() {
  return (
    <section className="section section--landingpage">
      <Logo />
      <h1 className="wordmark">moody.</h1>
      <Link className="link link--button" to ="/form">
        <Button buttonText="feel the beat" />
        
      </Link>
    </section>
  );

}

export default LandingPage;
