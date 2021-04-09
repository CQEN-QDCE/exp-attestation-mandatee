/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
* Ref: https://github.com/hyperledger/aries-rfcs/blob/master/features/0160-connection-protocol/README.md
*/
import React, { useEffect }     from 'react'
import { Container, Spinner }   from 'reactstrap'
import { useTranslation }       from 'react-i18next'
import { useHistory }           from 'react-router-dom'
import { GET_API_SECRET }       from '../../config/constants'
import { GET_ISSUER_HOST_URL }  from '../../config/endpoints'
import { v4 as uuidv4 }         from 'uuid'
import                               '../../assets/styles/LoginContainer.css'

function EmissionParMandat(props){

    const history                = useHistory(); 
    const { t }                  = useTranslation(['translation', 'identite']);

    // Identification du schema et cred_def_id
	const schemaName                       = window.env && window.env.IDENTITY_SCHEMA_NAME ? window.env.IDENTITY_SCHEMA_NAME : process.env.REACT_APP_SCHEMA_NAME_IDENTITE; 
	const schemaIssuerDID                  = window.env && window.env.AGENT_DID ? window.env.AGENT_DID : process.env.REACT_APP_SCHEMA_ISSUER_DID_IDENTITE; 
	const schemaVersion                    = window.env && window.env.IDENTITY_SCHEMA_VERSION ? window.env.IDENTITY_SCHEMA_VERSION : process.env.REACT_APP_SCHEMA_VERSION_IDENTITE; 
	const schemaCredDef                    = window.env && window.env.IDENTITY_CREDENTIAL_DEFINITION ? window.env.IDENTITY_CREDENTIAL_DEFINITION : process.env.REACT_APP_CRED_DEF_IDENTITE; 

    // Responsable 
    const respFirstNames         = props.location.state.responsable.subjectFirstNames
    const respLastName           = props.location.state.responsable.subjectLastName
    const respGender             = props.location.state.responsable.subjectGender
    const respBirthplace         = props.location.state.responsable.subjectBirthplace
    const respBirthDate          = props.location.state.responsable.subjectBirthDate
    const respFatherFullName     = props.location.state.responsable.subjectFatherFullName
    const respMotherFullName     = props.location.state.responsable.subjectMotherFullName

    // Mandat
    // ==> Responsable 
    const holderFirstNames       = props.location.state.mandat.holderFirstNames;
    const holderLastName         = props.location.state.mandat.holderLastName
    const holderGender           = props.location.state.mandat.holderGender
    const holderBirthplace       = props.location.state.mandat.holderBirthplace
    const holderBirthDate        = props.location.state.mandat.holderBirthDate
    const holderFatherFullName   = props.location.state.mandat.holderFatherFullName
    const holderMotherFullName   = props.location.state.mandat.holderMotherFullName

    // ==> Dependent
    const subjectFirstNames      = props.location.state.mandat.subjectFirstNames
    const subjectLastName        = props.location.state.mandat.subjectLastName
    const subjectGender          = props.location.state.mandat.subjectGender
    const subjectBirthplace      = props.location.state.mandat.subjectBirthplace
    const subjectBirthDate       = props.location.state.mandat.subjectBirthDate
    const subjectFatherFullName  = props.location.state.mandat.subjectFatherFullName
    const subjectMotherFullName  = props.location.state.mandat.subjectMotherFullName;
   

    useEffect(() => {
        let valide = validationResponsable(); 

        if(valide){
            issueCredential();
        } else {
            history.push('/emissionerror')
        }
    });

    /**
     * Émission seulement si les données du responsable par le mandat de curatelle sont les 
     * mêmes de l'identité présentée. 
     */
    function validationResponsable(){
        let valide = true; 

        if((respFirstNames !== holderFirstNames) | (respLastName !== holderLastName) | 
          (respGender !== holderGender) | (respBirthplace !== holderBirthplace) | 
          (respBirthDate !== holderBirthDate) | (respFatherFullName !== holderFatherFullName) | 
          (respMotherFullName !== holderMotherFullName)){
         
            valide = false; 
        }
        return valide; 
    }

    function issueCredential() {
		fetch(`/issue-credential/send`,
			{
				method: 'POST',
				body: JSON.stringify({
					"schema_name"          : schemaName,
					"schema_version"       : schemaVersion, 
					"schema_issuer_did"    : schemaIssuerDID,
					"connection_id"        : props.location.state.connection_id,
					"cred_def_id"          : schemaCredDef,
					"credential_proposal": {
						"@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/credential-preview",
						"attributes": [
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
								"value": retrieveToday()
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
								"value":  formatID()
							},
							{
								"name": "credentialSubject.firstNames",
								"value": subjectFirstNames
                            },
                            {
								"name": "credentialSubject.lastName",
								"value": subjectLastName
							},
                            {
								"name": "credentialSubject.gender",
								"value": subjectGender
							},
                            {
								"name": "credentialSubject.birthplace",
								"value": subjectBirthplace
							},
                            {
								"name": "credentialSubject.birthDate",
								"value": subjectBirthDate
							},
                            {
								"name": "credentialSubject.fatherFullName",
								"value": subjectFatherFullName
							},
                            {
								"name": "credentialSubject.motherFullName",
								"value": subjectMotherFullName
                            }, 
                            {
								"name": "credentialSubject.photo",
								"value": "credentialSubject.photo"
                            }
						]
					}, 
					"comment"       : "Émission d'attestation du registre d'identité Québec"
				}),
				headers: {
					'HOST'          : `${GET_ISSUER_HOST_URL}`,
					'X-API-Key'     : `${GET_API_SECRET()}`,
					'Content-Type'  : 'application/json; charset=utf-8'
				}
			 }).then((resp => props.history.replace('/presentationemission', props.location.state)))
			
	}

    // Fonctions utilitaires de date
    function retrieveISODate(){
        return new Date().toISOString(); 
    }

    function retrieveToday(){
        return retrieveISODate().substring(0,10); 
    }

    // Fonction utilitaire pour genenration d'ID dummy format did
    function formatID(){
        return uuidv4().substring(25).replace('-', '');
    }

    return(
        <Container className="mt-5 pt-5">
            <br /><br /><br /><br />
            <div className="text-center FormBox mt-5 pt-5">
                <h3 className="mb-5 pb-4 mt-2 header"> {t('identite:lblVerification')} </h3>
                <br />
                <p>
                    <h2> Emission d'identite par mandat </h2>
                    <h4> En attente de l'acceptation du citoyen à l'attestation d'identité offerte dans son portefeuille. </h4>
                </p>
                <p>
                    {t('identite:msgWait')}
                </p>
                <Spinner /> 
                
            </div>
        </Container>
    );
}
export default EmissionParMandat;