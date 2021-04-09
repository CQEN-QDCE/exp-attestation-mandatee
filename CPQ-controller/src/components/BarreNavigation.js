/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
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
                        Émission d'attestations 
                        </DropdownToggle>
                        <DropdownMenu right>
                        <DropdownItem>
                            <NavItem>
                                <NavLink href="/curatelle/">Attestation de mandat de curatelle</NavLink>
                            </NavItem>
                        </DropdownItem>
                        <DropdownItem divider />
                            <DropdownItem>
                            <NavItem>
                                <NavLink href="http://iqn-trustframework.apps.exp.lab.pocquebec.org/" target="_blank">Accès au Trust Framework</NavLink>
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