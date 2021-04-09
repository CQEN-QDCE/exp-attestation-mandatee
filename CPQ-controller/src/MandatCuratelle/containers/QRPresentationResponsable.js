/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React, { useState, useEffect }       from 'react'
import { Container, Button, Col, Spinner }  from 'reactstrap'
import QRComponent                          from '../components/QRComponent'
import { GET_API_SECRET }                   from '../../config/constants'
import { fetchWithTimeout }                 from '../../helpers/fetchWithTimeout'
import                                           '../../assets/styles/LoginContainer.css'

function QRPresentationResponsable(props){

	let INTERVAL = 5000; 
	let TIMEOUT  = 3000; 

    const [showAuthButton, setAuthButton]  = useState(false);
	const [showLoader, setLoader]          = useState(false)

	let cred_def_id; 

    useEffect(() => {
        cred_def_id = process.env.REACT_APP_CRED_DEF_ID_RQC;
        getConnectionInfo()
    }, []);

    function getConnectionInfo() {
		try {
			fetchWithTimeout(`/connections/${props.location.state.invitation.connection_id}`,
				{
					method : 'GET',
					headers: {
						'X-API-Key'    : `${GET_API_SECRET()}`,
						'Content-Type' : 'application/json; charset=utf-8',
					}
				}, TIMEOUT).then((
					resp => {
						try {
							resp.json().then((data => {
								if (data.state) {
									let intervalFunction;
									data.state === "invitation" ? intervalFunction = setTimeout(getConnectionInfo, INTERVAL) : clearIntervalFunction(intervalFunction);
								} else {
									console.log('En attent de réponse!');
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
    
    function clearIntervalFunction(intervalFunction) {
		clearInterval(intervalFunction);
		setAuthButton(true);
    }
    

    function requestProof(){

		fetch(`/present-proof/send-request`, 
			{
				method : 'POST', 
				headers: {
					'X-API-Key'    : `${GET_API_SECRET()}`,
					'Content-Type' : 'application/json; charset=utf-8',
				},
				body: JSON.stringify( 
				{
					"connection_id" : `${props.location.state.invitation.connection_id}`,
					"trace" : "true", 
					"comment" : "Faire preuve d'attestation d'identite de la personne responsable", 
					"proof_request" : {
						"name"    : "Preuve identite Registre d'identite", 
                        "version" : "1.0", 
                        "imageUrl" : "https://www.autoaubaine.com/special/images/dossier/permis_regulier.jpg",
						"requested_attributes" : {
							"subjectId": {
								"name": "credentialSubject.id",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							},
							"subjectFirstNames": {
								"name": "credentialSubject.firstNames",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							},
							"subjectLastName": {
								"name": "credentialSubject.lastName",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							},
							"subjectGender": {
								"name": "credentialSubject.gender",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							},
							"subjectBirthplace": {
								"name": "credentialSubject.birthplace",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							},
							"subjectBirthDate": {
								"name": "credentialSubject.birthDate",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							},
							"subjectFatherFullName": {
								"name": "credentialSubject.fatherFullName",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							},
							"subjectMotherFullName": {
								"name": "credentialSubject.motherFullName",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
                            },
                            "subjectPhoto": {
								"name": "credentialSubject.photo",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
                            }
						}, 
						"requested_predicates" : {}
					}
				}	
				)}).then(response => response.json())
					.then(data => {
						props.history.push('/verificationPreuve', {
							presentation_exchange_id:  data.presentation_exchange_id,
							connection_id           : props.location.state.invitation.connection_id,
							data                    : props.location.state.data, 
						}
                    );
				});
	}

	const handleAuthorisation = () => {
		setLoader(true);
		requestProof(); 
    }
    
    return(
        <div className="Root" style={{ backgroundColor: '#FCF8F7', display: "flex" }}>
			<Container >
				<Col>
					<QRComponent value={JSON.stringify(props.location.state)} />
				</Col>
				<Col className="mt-3">
					{showAuthButton && !showLoader ?
						<Button outline color="primary" onClick={handleAuthorisation}>Vérifier l'attestation d'identité</Button> : showLoader ? <Spinner /> : null}
				</Col>
			</Container>
		</div>
    ); 
}

export default QRPresentationResponsable; 