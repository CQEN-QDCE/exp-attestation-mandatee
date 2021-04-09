/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React                from 'react';
import { Form, Container }  from 'reactstrap';
import { useTranslation }   from 'react-i18next'

function NoAuthContainer() {
	const { t } = useTranslation(); 
	return (
		<Container className="d-flex pt-5">
			<Form className="w-50 mx-auto mt-5 text-center pt-5">
				<h1>{t('translation:noauthMsg1')}</h1>
				<h3>{t('translation:noauthMsg2')}</h3>
			</Form>
		</Container>
	);
}

export default NoAuthContainer