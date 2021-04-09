/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React, { useState } from 'react';
import { Button, 
         Label, 
         Col, 
         FormGroup, 
         Form, 
         InputGroup, 
         Input, 
         Container, 
         Modal, 
         ModalHeader, 
         ModalBody, 
         ModalFooter }     from 'reactstrap';
import Auth                from '../helpers/Auth';
import { useTranslation }  from 'react-i18next' 
import { GET_PASSCODE }    from '../config/constants'
import '../assets/styles/LoginContainer.css'

function LoginContainer(props) {

	const [email, setEmail]       = useState('')
	const [password, setPassword] = useState('')

	const [modal, setModal]       = useState(false);

	const toggle = () => setModal(!modal);

	const { t } = useTranslation();

	const handleSubmit = () => {
		let pass = GET_PASSCODE()
		//if (email === 'experimentation' && password === pass) {
		if (email === '' && password === '') {
			Auth.authenticate();
			props.history.replace('/curatelle')
		}
		else {
			toggle();
		}
	}

	return (
		<div className="Root" style={{ backgroundColor: '#FCF8F7' }}>

			<Container className="App" >
				<Form className="form">
					<h2 className="text-center">{t('translation:login')}</h2>
					<p className="text-center" style={{ color: '#808080', fontSize: '10px' }}>{t('translation:formLoginMsg')}</p>
						<Col>
						<FormGroup>
							<Label className="mt-2">{t('translation:username')}</Label>
							<InputGroup>
								<Input className="inputField rounded-pill"
									type="email"
									name="email"
									id="Email"
									onChange={(e) => setEmail(e.target.value)}
									placeholder={t('translation:username')}
								/>
							</InputGroup>

						</FormGroup>
					</Col>
					<Col>
						<FormGroup>
							<Label for="Password">{t('translation:password')}</Label>
							<Input className="inputField rounded-pill"
								type="password"
								name="password"
								id="Password"
								onChange={(e) => setPassword(e.target.value)}
								placeholder="••••••••••••"
								autoComplete="currentPassword"
							/>
						</FormGroup>
					</Col>
					<div className="text-center ">
					<Button className="mt-2" outline color="primary" size="lg" onClick={handleSubmit}>{t('translation:btnSend')}</Button>
					</div>
				</Form>
				<div>
					<Modal isOpen={modal} toggle={toggle} centered>
						<ModalHeader toggle={toggle}>{t('translation:modalLoginMsg')}</ModalHeader>
						<ModalBody>{t('translation:modalCorrectInfoMsg')}</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={toggle}>{t('translation:ok')}</Button>{' '}
						</ModalFooter>
					</Modal>
				</div>
			</Container>
		</div >
	);
}

export default LoginContainer;