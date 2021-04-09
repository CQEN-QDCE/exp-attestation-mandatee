/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
* Ref: https://github.com/hyperledger/aries-rfcs/blob/master/features/0160-connection-protocol/README.md
*/
import React, { useState, useEffect }  from 'react'
import { Container, 
         Button, 
         Col, 
         Modal, 
         ModalHeader, 
         ModalBody, 
         ModalFooter, 
         Spinner }                     from 'reactstrap'
import QRComponent                     from '../../components/QRComponent'
import { useTranslation }              from 'react-i18next'
import { GET_API_SECRET }              from '../../config/constants'
import { GET_ISSUER_HOST_URL }         from '../../config/endpoints'
import { fetchWithTimeout }            from '../../helpers/fetchWithTimeout'
import                                      '../../assets/styles/LoginContainer.css'

function QRRegistreIdentiteContainer(props) {

	let INTERVAL = 5000; 
	let TIMEOUT  = 3000;
	// Variables d'identitfication du schema
	const schemaName                       = window.env && window.env.IDENTITY_SCHEMA_NAME ? window.env.IDENTITY_SCHEMA_NAME : process.env.REACT_APP_SCHEMA_NAME_IDENTITE; 
	const schemaIssuerDID                  = window.env && window.env.AGENT_DID ? window.env.AGENT_DID : process.env.REACT_APP_SCHEMA_ISSUER_DID_IDENTITE; 
	const schemaVersion                    = window.env && window.env.IDENTITY_SCHEMA_VERSION ? window.env.IDENTITY_SCHEMA_VERSION : process.env.REACT_APP_SCHEMA_VERSION_IDENTITE; 
	const schemaCredDef                    = window.env && window.env.IDENTITY_CREDENTIAL_DEFINITION ? window.env.IDENTITY_CREDENTIAL_DEFINITION : process.env.REACT_APP_CRED_DEF_IDENTITE; 

	const [modal, setModal]                = useState(false);
	const [show, setShow]                  = useState(false);
	const [showAuthButton, setAuthButton]  = useState(false);
	const [showLoader, setLoader]          = useState(false)
	const [did, setDid]                    = useState('')

    const { t }                            = useTranslation(['translation', 'identite']);

	useEffect(() => getConnectionInfo(), []);

	function getConnectionInfo() {
		try {
			fetchWithTimeout(`/connections/${props.location.state.invitation.connection_id}`,
				{
					method: 'GET',
					headers: {
						'HOST'          : `${GET_ISSUER_HOST_URL}`,
						'X-API-Key'     : `${GET_API_SECRET()}`,
						'Content-Type'  : 'application/json; charset=utf-8',
					}
				}, TIMEOUT).then((
					resp => {
						try {
							resp.json().then((data => {
								if (data.state) {
									let intervalFunction;
									data.state === "invitation" ? intervalFunction = setTimeout(getConnectionInfo, INTERVAL) : clearIntervalFunction(intervalFunction, data.their_did);
								} else {
									let msg = t('identite:msgPending')
									console.log(msg);
									setTimeout(getConnectionInfo, INTERVAL)
								}
							}))
						} catch (error) {
							setTimeout(getConnectionInfo, INTERVAL)
						}
					}
				))
		} catch (error) {
			console.log(error);
			setTimeout(getConnectionInfo, INTERVAL)
		}
	}

	function clearIntervalFunction(intervalFunction, did) {
		setDid(did); 
		clearInterval(intervalFunction);
		setAuthButton(true);
	}

	function issueCredential() {
		fetch(`/issue-credential/send`,
			{
				method: 'POST',
				body: JSON.stringify({
					"schema_name"          : schemaName,
					"schema_version"       : schemaVersion, 
					"schema_issuer_did"    : schemaIssuerDID,
					"connection_id"        : props.location.state.invitation.connection_id,
                    "cred_def_id"          : schemaCredDef,
					"credential_proposal": {
                        "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/credential-preview",
						"attributes": [
                            /*{
                                "name: ": "imageUrl", 
                                "value":  "https://www.autoaubaine.com/special/images/dossier/permis_regulier.jpg"
                            },*/
							{
								"name": "@context",
                                "value": '["https://www.w3.org/2018/credentials/v1", "http://iqn-trustframework.apps.exp.lab.pocquebec.org/2020/credentials/iqn/identite/v1"]'
							},
							{
								"name": 'id',
								"value": "http://iqn-trustframework.apps.exp.lab.pocquebec.org/2020/credentials/iqn/identite/v1/RegistreIdentite.json"
							},
							{
								"name": "type",
								"value": '["VerifiableCrendetial", "IdentityCredential"]'
                            },
                            {
                                "name": "credentialSchema", 
                                "value": schemaCredDef
                            },
                            {
								"name": "issuanceDate",
								"value": props.location.state.data.issuanceDate
							},
							{
								"name": "expirationDate",
								"value": ""                                         // Identite self = sans expiration props.location.state.data.expirationDate
                            },
							{
								"name": "issuer",
								"value": "did:iqn:" + schemaIssuerDID
                            }, 
                            {
                                "name": "trustFramework",
								"value": "http://iqn-trustframework.apps.exp.lab.pocquebec.org/"
                            },
                            {
								"name": "credentialSubject.id",
								"value": did
							},
							{
								"name": "credentialSubject.firstNames",
								"value": props.location.state.data.firstNames
                            },
                            {
								"name": "credentialSubject.lastName",
								"value": props.location.state.data.lastName
							},
                            {
								"name": "credentialSubject.gender",
								"value": props.location.state.data.gender
							},
                            {
								"name": "credentialSubject.birthplace",
								"value": props.location.state.data.birthplace
							},
                            {
								"name": "credentialSubject.birthDate",
								"value": props.location.state.data.birthDate
							},
                            {
								"name": "credentialSubject.fatherFullName",
								"value": props.location.state.data.fatherFullName
							},
                            {
								"name": "credentialSubject.motherFullName",
								"value": props.location.state.data.motherFullName
                            }, 
                            {
								"name": "credentialSubject.photo",
								"value": props.location.state.data.photo
                            }, 
						]
					}, 
					"comment"       : "Émission d'attestation du registre d'identité Québec"
				}),
				headers: {
					'HOST'          : `${GET_ISSUER_HOST_URL}`,
					'X-API-Key'     : `${GET_API_SECRET()}`,
					'Content-Type'  : 'application/json; charset=utf-8'
				}
			 }).then((resp => props.history.replace('/verificationidentite', props.location.state)))
	}

	const handleClose = () => setShow(false);
    const handleShow  = () => setShow(true);
    
	const toggle = () => {
		setModal(!modal);
		handleShow();
    }
    
	const issued = () => {
		setModal(!modal);
		handleClose();
		props.history.replace('/registreidentite');
    }
    
	const handleAuthorisation = () => {
		setLoader(true);
		issueCredential();
	}

	return (
		<div className="Root" style={{ backgroundColor: '#FCF8F7', display: "flex" }}>
			<Container >
				<Col>
					<QRComponent value={JSON.stringify(props.location.state)} />
				</Col>
				<Col className="mt-3">
					{showAuthButton && !showLoader ?
						<Button outline color="primary" onClick={handleAuthorisation}>{t('identite:btnAuthorizeIdentity')}</Button> : showLoader ? <Spinner /> : null}
				</Col>

				<div>
					<Modal isOpen={modal} toggle={toggle}
						show={show}
						onHide={handleClose}
						backdrop="static"
						keyboard={false} centered>
						<ModalHeader toggle={toggle} closeButton>{t('identite:ANIGIdentity')}</ModalHeader>
                        <ModalBody>{t('identite:msgIdentityIssued')}</ModalBody>
						<ModalFooter>
							<Button color="primary" onClick={issued}>{t('identite:ok')}</Button>{' '}
						</ModalFooter>
					</Modal>
				</div>
			</Container>
		</div>
	);
}

export default QRRegistreIdentiteContainer;