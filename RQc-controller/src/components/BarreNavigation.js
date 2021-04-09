import React, { useState } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText
} from 'reactstrap';

const BarreNavigation = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
        <Navbar color="light" light expand="md">
            <NavbarToggler onClick={toggle} />
            <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar>
                    <UncontrolledDropdown nav inNavbar>
                        <DropdownToggle nav caret>
                        Émission d'identité
                        </DropdownToggle>
                        <DropdownMenu right>
                        <DropdownItem>
                            <NavItem>
                                <NavLink href="/registreidentite/">Émettre attestation identité adulte</NavLink>
                            </NavItem>
                        </DropdownItem>
                        <DropdownItem>
                            <NavItem>
                                <NavLink href="/registremandat/">Émettre attestation d'identité par mandat</NavLink>
                            </NavItem>
                        </DropdownItem>
                        <DropdownItem divider />
                            <DropdownItem>
                            <NavItem>
                                <NavLink href="https://quebec.ca/schemas/" target="_blank">Accès site des schemas</NavLink>
                            </NavItem>
                        </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                <NavbarText>&nbsp;</NavbarText>
            </Collapse>
        </Navbar>
        </div>
    );
}

export default BarreNavigation;