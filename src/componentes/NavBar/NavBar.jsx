import './NavBar.css'
import CartWidget from '../CartWidget/CartWidget'
import { Link, NavLink } from 'react-router-dom'
const NavBar = () => {
    return (
        <header>
            <Link>
                <h1>
                    <NavLink to='/' >
                        Big Shop
                    </NavLink>
                </h1>
            </Link>
            <nav>
                <ul>
                    <li>
                        <NavLink to='/categoria/personal'>Personal</NavLink>
                    </li>
                    <li>
                        <NavLink to='/categoria/domestico'> Domestico</NavLink>
                    </li>
                </ul>
            </nav>
            <CartWidget />
        </header>
    )
}

export default NavBar