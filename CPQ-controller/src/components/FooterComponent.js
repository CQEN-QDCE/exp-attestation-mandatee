/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React from 'react'
import { Container } from 'reactstrap'
import { useTranslation } from 'react-i18next'
import LangueComponent  from './LangueComponent'


function FooterComponent() {

	const { t } = useTranslation();

	return (
		<Container fluid className="fixed-bottom text-center p-3 border-top" style={{ backgroundColor: '#fff' }}>
			{t('translation:copyright')}
			<LangueComponent />
		</Container>
	)
}

export default FooterComponent;
