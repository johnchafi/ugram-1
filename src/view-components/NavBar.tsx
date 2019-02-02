import * as React from 'react'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem} from 'reactstrap';
interface Props {
}
interface State {
    isOpen: boolean
}
import {NavLink as RRNavLink } from 'react-router-dom';
import CustomNavLink from "./CustomNavLink";
import CustomNavLinkBrand from "./CustomNavLinkBrand";

class NavBar extends React.Component<Props,State> {
    constructor(props : Props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <CustomNavLinkBrand to="/" tag={RRNavLink}>ugram</CustomNavLinkBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <CustomNavLink to="/login" tag={RRNavLink}>Login</CustomNavLink>
                            </NavItem>
                            <NavItem>
                                    <CustomNavLink to={'/profil/wfortin'} tag={RRNavLink}> Profil</CustomNavLink>
                            </NavItem>
                            <NavItem>
                                    <CustomNavLink to="/users" tag={RRNavLink}>Les utilisateurs</CustomNavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

export default NavBar;
