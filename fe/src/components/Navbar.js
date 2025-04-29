import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <Link to="/">홈</Link>
    <Link to="/info">정보게시판</Link>
    <Link to="/free">자유게시판</Link>
    <Link to="/community">커뮤니티게시판</Link>
  </nav>
);

export default Navbar;