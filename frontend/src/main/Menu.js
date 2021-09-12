import React, {Component} from 'react';
import {Link} from 'react-router-dom';

const links = [
    { route: "/", label: "Home"},
    { route: "/exposicoes", label: "Exposições"},
    { route: "/forum", label: "Fórum"},
    { route: "/termos", label: "Termos de Uso"},
    { route: "/editais", label: "Editais"}
]

export class Menu extends Component {
    renderLink = () => {
        return (
            links.map(link => 
                <Link key={link.route} className="nav-link" to={link.route}>
                    {link.label}
                </Link>
            ) 
        )
    }

    render(){
        return (
            <nav>
                <div>
                    <ul>
                        { this.renderLink() }
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Menu;
