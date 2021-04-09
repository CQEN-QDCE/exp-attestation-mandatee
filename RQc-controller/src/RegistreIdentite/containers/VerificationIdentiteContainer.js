/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React, { useEffect }    from 'react';
import { Container, Spinner }  from 'reactstrap'
import { useTranslation }      from 'react-i18next'
import { GET_API_SECRET }      from '../../config/constants' 
import { fetchWithTimeout }    from '../../helpers/fetchWithTimeout'
import                              '../../assets/styles/Forms.css';

function VerificationIdentiteContainer(props) {
    
    let INTERVAL = 5000; 
	let TIMEOUT  = 3000; 
	let connection_id = ""; 
    
    const { t }  = useTranslation(['translation', 'identite']); 

    useEffect(() => {

		if(props.location.state.invitation.connection_id === '' | 
		   props.location.state.invitation.connection_id === undefined){
			connection_id = props.location.state.connection_id;
		}else{
			connection_id = props.location.state.invitation.connection_id;	
		}

		getConnectionInfo()

	}, []);

	function getConnectionInfo() {
		try {
            fetchWithTimeout(`/connections/${connection_id}`,
				{
					method : 'GET',
					headers: {
						'X-API-Key'     : `${GET_API_SECRET()}`,
						'Content-Type'  : 'application/json; charset=utf-8',
					}
				}, TIMEOUT).then((
					resp => {
						try {
							resp.json().then((data => {
								if (data.state) {
									let intervalFunction;
									data.state === "response" ? intervalFunction = setTimeout(getConnectionInfo, INTERVAL) : presenteAttestation();
								} else {
                                    let msg = t('identite:msgPending')
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
    
    const presenteAttestation = () => {
        props.history.push('/proofregistreidentite', props.location.state); 
    }
 
    return (
        <Container className="mt-5 pt-5">
            <br /><br /><br /><br />
            <div className="text-center FormBox mt-5 pt-5">
                <h3 className="mb-5 pb-4 mt-2 header"> {t('identite:msgIssuance1')} </h3>
                <br />
                <p>
                    <h4> {t('identite:msgIssuance2')} </h4>
                         {t('identite:msgIssuance3')}
                </p>
                <p>
                    {t('identite:msgWait')}
                </p>
                <Spinner /> 
                
            </div>
        </Container>
    );
}

export default VerificationIdentiteContainer;