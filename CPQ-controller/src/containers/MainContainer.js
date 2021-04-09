/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React               from 'react';
import { Container }       from 'reactstrap';
import JumbotronComponent  from '../components/JumbotronComponent';

function MainContainer() {
	return (

		< Container fluid style={{ backgroundColor: '#FCF8F7' }}>
			<JumbotronComponent />
		</Container >
	);
}

export default MainContainer;