import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <div>
      <div>
        <ul>
          <li>
            <FaFacebookSquare />
          </li>
          <li>
            <FaTwitterSquare />
          </li>
          <li>
            <FaInstagramSquare />
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>Contact</li>
          <li>About Us</li>
          <li>Terms & Conditions</li>
          <li>Careers</li>
          <li>Change country</li>
          <li>FAQ</li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
