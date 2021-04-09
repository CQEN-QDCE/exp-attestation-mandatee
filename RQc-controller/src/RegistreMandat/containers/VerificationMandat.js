/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React, { useState, useEffect }  from 'react';
import { Container, Spinner }          from 'reactstrap'
import { useTranslation }              from 'react-i18next'
import { GET_API_SECRET }              from '../../config/constants' 
import { fetchWithTimeout }            from '../../helpers/fetchWithTimeout'
import                                      '../../assets/styles/Forms.css';


function VerificationMandat(props){

    let INTERVAL = 5000; 
    let TIMEOUT  = 3000; 
 
    const { t } = useTranslation('identite');

    const [presentation_exchange_id, setPresentationExchangeId] = useState(props.location.state.presentation_exchange_id)

    useEffect(() => {
        setPresentationExchangeId(props.location.state.presentation_exchange_id)
        getConnectionInfo()
    }
    , []);
    
    function getConnectionInfo() {
		try {
			fetchWithTimeout(`/present-proof/records/${presentation_exchange_id}`,
				{
					method: 'GET',
					headers: {
						'X-API-Key': `${GET_API_SECRET()}`,
						'Content-Type': 'application/json; charset=utf-8',
					}
				}, TIMEOUT).then((
					resp => {
						try {
							resp.json().then((data => {
								if (data.state) {
									let intervalFunction;
									data.state === "request_sent" ? intervalFunction = setTimeout(getConnectionInfo, INTERVAL) : VerifyPresentation(presentation_exchange_id);
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

    const VerifyPresentation = (presentation_exchange_id) => {
        fetch('/present-proof/records/' + presentation_exchange_id + '/verify-presentation', 
			{
				method : 'POST', 
				headers: {
                    'X-API-Key'                         : `${GET_API_SECRET()}`,
					'Content-Type'                      : 'application/json; charset=utf-8',
					'Access-Control-Allow-Origin'       : '*', 
					'Access-Control-Allow-Methods'      : '*',
					'Access-Control-Allow-Headers'      : '*', 
					'Access-Control-Allow-Credentials'  : 'true'
				},
				body:{}
			}
		).then(response => response.json())
         .then(data => {

            props.history.push('/emissionmandat', {
                connection_id              : props.location.state.connection_id,
                responsable                : props.location.state.responsable, 
                mandat : {
                    subjectFirstNames      : data.presentation.requested_proof.revealed_attrs.subjectFirstNames.raw, 
                    subjectLastName        : data.presentation.requested_proof.revealed_attrs.subjectLastName.raw,
                    subjectGender          : data.presentation.requested_proof.revealed_attrs.subjectGender.raw,
                    subjectBirthplace      : data.presentation.requested_proof.revealed_attrs.subjectBirthplace.raw,
                    subjectBirthDate       : data.presentation.requested_proof.revealed_attrs.subjectBirthDate.raw, 
                    subjectFatherFullName  : data.presentation.requested_proof.revealed_attrs.subjectFatherFullName.raw, 
                    subjectMotherFullName  : data.presentation.requested_proof.revealed_attrs.subjectMotherFullName.raw,

                    holderFirstNames       : data.presentation.requested_proof.revealed_attrs.holderFirstNames.raw, 
                    holderLastName         : data.presentation.requested_proof.revealed_attrs.holderLastName.raw,
                    holderGender           : data.presentation.requested_proof.revealed_attrs.holderGender.raw,
                    holderBirthplace       : data.presentation.requested_proof.revealed_attrs.holderBirthplace.raw,
                    holderBirthDate        : data.presentation.requested_proof.revealed_attrs.holderBirthDate.raw, 
                    holderFatherFullName   : data.presentation.requested_proof.revealed_attrs.holderFatherFullName.raw, 
                    holderMotherFullName   : data.presentation.requested_proof.revealed_attrs.holderMotherFullName.raw
                }
            })
        });
    }

    return(
        <Container className="mt-5 pt-5">
            <br /><br /><br /><br />
            <div className="text-center FormBox mt-5 pt-5">
                <h3 className="mb-5 pb-4 mt-2 header"> {t('identite:lblVerification')} - 2ème étape </h3>
                <br />
                <p>
                    <h2> Vérification du mandat de curatelle </h2>
                    <h4> Veuillez attendre à la présentation de preuve de l'attestation de mandat de curatelle par le citoyen. </h4>
                </p>
                <p>
                    {t('identite:msgWait')}
                </p>
                <Spinner /> 
                
            </div>
        </Container>
    );
}
export default VerificationMandat;