import React, {useEffect }     from 'react'
import { Container, Spinner }  from 'reactstrap'
import { useTranslation }      from 'react-i18next'
import { GET_API_SECRET }      from '../../config/constants'
import { fetchWithTimeout }    from '../../helpers/fetchWithTimeout'

function QRPresentationCuratelle(props){

    let INTERVAL = 5000; 
    let TIMEOUT  = 3000; 

    let cred_def_id; 

    const { t } = useTranslation(['translation', 'identite']); 

    useEffect(() => {
        cred_def_id = process.env.REACT_APP_CRED_DEF_CURATELLE;
        getConnectionInfo()
    }, []);

    function getConnectionInfo() {
		try {
			fetchWithTimeout(`/connections/${props.location.state.connection_id}`,
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
        setTimeout(null, INTERVAL); 
        requestProof();
    }
    

    function requestProof(){
        fetch(`/present-proof/send-request`, 
            {
                method : 'POST', 
				headers: {
					'X-API-Key'    : `${GET_API_SECRET()}`,
					'Content-Type' : 'application/json; charset=utf-8',
                },
                body: JSON.stringify({
                    "connection_id"  : `${props.location.state.connection_id}`,
					"trace"          : "true", 
                    "comment"        : "Faire preuve d'attestation du mandat de curatelle emis par le Curateur Publique", 
                    "proof_request"  : {
                        "name"       : "Preuve mandat de curatelle", 
                        "version"    : "1.0", 
                        "requested_attributes" : {
                            "subjectFirstNames": {
								"name": "credentialSubject.proxied.firstNames",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
                            },
                            "subjectLastName": {
								"name": "credentialSubject.proxied.lastName",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							},
							"subjectGender": {
								"name": "credentialSubject.proxied.gender",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							},
							"subjectBirthplace": {
								"name": "credentialSubject.proxied.birthplace",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							},
							"subjectBirthDate": {
								"name": "credentialSubject.proxied.birthDate",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							},
							"subjectFatherFullName": {
								"name": "credentialSubject.proxied.fatherFullName",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							},
							"subjectMotherFullName": {
								"name": "credentialSubject.proxied.motherFullName",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
                            }, 
                            "holderFirstNames": {
								"name": "credentialSubject.holder.firstNames",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
                            },
                            "holderLastName": {
								"name": "credentialSubject.holder.lastName",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							},
							"holderGender": {
								"name": "credentialSubject.holder.gender",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							},
							"holderBirthplace": {
								"name": "credentialSubject.holder.birthplace",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							},
							"holderBirthDate": {
								"name": "credentialSubject.holder.birthDate",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							},
							"holderFatherFullName": {
								"name": "credentialSubject.holder.fatherFullName",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							},
							"holderMotherFullName": {
								"name": "credentialSubject.holder.motherFullName",
								"restrictions": [
									{
									"cred_def_id": cred_def_id
									}
								]
							}
                        },
                        "requested_predicates" : {

                        }
                    },
                    
                })
            }
        ).then(response => response.json())
         .then(data => {
            props.history.push('/verificationmandat', {
                responsable             : props.location.state.responsable,
                presentation_exchange_id: data.presentation_exchange_id,
                connection_id           : props.location.state.connection_id,
                data                    : props.location.state.data, 
            }
        );
    }); 
    }


    return(
        <Container className="mt-5 pt-5">
            <br /><br /><br /><br />
            <div className="text-center FormBox mt-5 pt-5">
                <h3 className="mb-5 pb-4 mt-2 header"> {t('identite:lblVerification')} </h3>
                <br />
                <p>
                    <h2> Mandat par curatelle </h2>
                    <h4>{t('identite:msgVerification1')} </h4>
                        {t('identite:msgVerification2')}
                </p>
                <p>
                    {t('identite:msgWait')}
                </p>
                <Spinner /> 
                
            </div>
        </Container>
    ); 
}
export default QRPresentationCuratelle;