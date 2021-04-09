/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React                 from 'react';
import { Container }         from 'reactstrap';
import RegistreIdentiteForm  from '../components/RegistreIdentiteForm'
import                            '../../assets/styles/LoginContainer.css'

function RegistreIdentiteContainer() {

	return (
		<div className="Root" style={{ backgroundColor: '#FCF8F7', display: "flex" }}>
			<Container >
				<RegistreIdentiteForm className="justify-content-center" />
			</Container>
		</div >
	);
}

export default RegistreIdentiteContainer;