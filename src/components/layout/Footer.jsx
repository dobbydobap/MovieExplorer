import { FaGithub, FaHeart } from 'react-icons/fa'
import './Footer.css'

function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h3 className="footer-logo">MovieExplorer</h3>
          <p className="footer-tagline">Discover amazing movies</p>
        </div>
        
        <div className="footer-links">
          <div className="footer-section">
            <h4 className="footer-section-title">Resources</h4>
            <ul>
              <li><a href="https://www.themoviedb.org/" target="_blank" rel="noopener">TMDB API</a></li>
              <li><a href="https://reactjs.org/" target="_blank" rel="noopener">React</a></li>
              <li><a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-section-title">Legal</h4>
            <ul>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p className="footer-copyright">
          &copy; {currentYear} MovieExplorer. Made with <FaHeart className="heart-icon" /> by Varshitha Sai
        </p>
        <p className="footer-credits">
          Data provided by <a href="https://www.themoviedb.org/" target="_blank" rel="noopener">The Movie Database (TMDB)</a>
        </p>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener"
          className="footer-github"
          aria-label="GitHub"
        >
          <FaGithub />
        </a>
      </div>
    </footer>
  )
}

export default Footer