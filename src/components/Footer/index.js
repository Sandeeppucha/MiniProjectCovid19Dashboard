import {FiGithub, FiInstagram, FiTwitter} from 'react-icons/fi'

import './index.css'

export default function Footer() {
  return (
    <footer className="footer-container">
      <h1 className="covid-19-india">
        COVID19<span className="india">INDIA</span>
      </h1>
      <p className="footer-para">
        we stand with everyone fighting on the front lines
      </p>
      <div className="icons-container">
        <FiGithub className="icon" />
        <FiInstagram className="icon" />
        <FiTwitter className="icon" />
      </div>
    </footer>
  )
}
