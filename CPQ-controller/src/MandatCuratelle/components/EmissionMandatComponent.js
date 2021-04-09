/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React, { useEffect }     from 'react'
import { Container, Spinner }   from 'reactstrap'
import { useTranslation }       from 'react-i18next'
import { GET_API_SECRET }       from '../../config/constants'
import { GET_ISSUER_HOST_URL }  from '../../config/endpoints'

function EmissionMandatComponent(props){

	// Variables d'identitfication du schema
    const schemaName                       = window.env && window.env.CURATELLE_SCHEMA_NAME ? window.env.CURATELLE_SCHEMA_NAME : process.env.REACT_APP_SCHEMA_CURATELLE; 
	const schemaIssuerDID                  = window.env && window.env.AGENT_DID ? window.env.AGENT_DID : process.env.REACT_APP_SCHEMA_ISSUER_DID_CURATELLE; 
	const schemaVersion                    = window.env && window.env.CURATELLE_SCHEMA_VERSION ? window.env.CURATELLE_SCHEMA_VERSION : process.env.REACT_APP_SCHEMA_CURATELLE_VERSION; 
	const schemaCredDef                    = window.env && window.env.CURATELLE_CREDENTIAL_DEFINITION ? window.env.CURATELLE_CREDENTIAL_DEFINITION : process.env.REACT_APP_CRED_DEF_CURATELLE; 

    const { t }               = useTranslation(['translation', 'identite'])

    const{
        context,
        id,
        type,
        schema,
        issuanceDate,
        expirationDate,
        issuer,
        trustFramework,
        auditURI,
        appealURI,
        holderType,
        holderRole,
        holderRationale,
        holderFirstNames,
        holderLastName,
        holderBirthDate,
        holderBirthplace,
        holderGender,
        holderFatherFullName,
        holderMotherFullName,
        constBoundaries,
        constPointOfOrigin,
        constRadiusKm,
        constJurisdictions,
        constTrigger,
        constCircumstances,
        depType,
        depFirstNames,
        depLastName,
        depBirthDate,
        depBirthplace,
        depGender,
        depFatherFullName,
        depMotherFullName,
        depNativeLanguage,
        depIdentifyingMarks,
        depPhoto,
        depIris,
        depFingerprint
    } = props.location.state.mandat; 
    
    useEffect(() =>{
        issueCredential();
    });
    
    function issueCredential(){

        fetch('/issue-credential/send', {
            method: 'POST',
            body: JSON.stringify({
                "schema_name"          : schemaName,
                "schema_version"       : schemaVersion, 
                "schema_issuer_did"    : schemaIssuerDID,
                "connection_id"        : props.location.state.connectionId,
                "cred_def_id"          : schemaCredDef,
                "credential_proposal": {
                    "@type": "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/issue-credential/1.0/credential-preview",
					"attributes": [
                        {
                            "name": "@context",
                            "value": context
                        },
                        {
                            "name": 'id',
                            "value": id
                        },
                        {
                            "name": "type",
                            "value": type
                        },
                        {
                            "name": "credentialSchema", 
                            "value": schemaCredDef
                        },
                        {
                            "name": "issuanceDate",
                            "value": issuanceDate
                        },
                        {
                            "name": "expirationDate",
                            "value": expirationDate                               // Identite self = sans expiration props.location.state.data.expirationDate
                        },
                        {
                            "name": "issuer",
                            "value": issuer
                        }, 
                        {
                            "name": "trustFramework",
                            "value": trustFramework
                        },
                        {
                            "name": "auditURI",
                            "value": auditURI
                        },
                        {
                            "name": "appealURI",
                            "value": appealURI
                        },
                        {
                            "name": "credentialSubject.holder.type",
                            "value": holderType
                        },
                        {
                            "name": "credentialSubject.holder.role",
                            "value": holderRole
                        },
                        {
                            "name": "credentialSubject.holder.rationaleURI",
                            "value": holderRationale
                        },
                        {
                            "name": "credentialSubject.holder.firstNames",
                            "value": holderFirstNames
                        },
                        {
                            "name": "credentialSubject.holder.lastName",
                            "value": holderLastName
                        },
                        {
                            "name": "credentialSubject.holder.birthDate",
                            "value": holderBirthDate
                        },
                        {
                            "name": "credentialSubject.holder.birthplace",
                            "value": holderBirthplace
                        },
                        {
                            "name": "credentialSubject.holder.gender",
                            "value": holderGender
                        },
                        {
                            "name": "credentialSubject.holder.fatherFullName",
                            "value": holderFatherFullName
                        },
                        {
                            "name": "credentialSubject.holder.motherFullName",
                            "value": holderMotherFullName
                        },
                        {
                            "name": "credentialSubject.holder.constraints.boundaries",
                            "value": constBoundaries
                        },
                        {
                            "name": "credentialSubject.holder.constraints.pointOfOrigin",
                            "value": constPointOfOrigin
                        },
                        {
                            "name": "credentialSubject.holder.constraints.radiusKm",
                            "value": constRadiusKm
                        },
                        {
                            "name": "credentialSubject.holder.constraints.jurisdictions",
                            "value": constJurisdictions
                        },
                        {
                            "name": "credentialSubject.holder.constraints.trigger",
                            "value": constTrigger
                        },
                        {
                            "name": "credentialSubject.holder.constraints.circumstances",
                            "value": constCircumstances
                        },
                        {
                            "name": "credentialSubject.proxied.type",
                            "value": depType
                        },
                        {
                            "name": "credentialSubject.proxied.permissions",
                            "value": "S/O"
                        },
                        {
                            "name": "credentialSubject.proxied.firstNames",
                            "value": depFirstNames
                        },
                        {
                            "name": "credentialSubject.proxied.lastName",
                            "value": depLastName
                        },
                        {
                            "name": "credentialSubject.proxied.birthDate",
                            "value": depBirthDate
                        },
                        {
                            "name": "credentialSubject.proxied.birthplace",
                            "value": depBirthplace
                        },
                        {
                            "name": "credentialSubject.proxied.gender",
                            "value": depGender
                        },
                        {
                            "name": "credentialSubject.proxied.fatherFullName",
                            "value": depFatherFullName
                        },
                        {
                            "name": "credentialSubject.proxied.motherFullName",
                            "value": depMotherFullName
                        },
                        {
                            "name": "credentialSubject.proxied.nativeLanguage",
                            "value": depNativeLanguage
                        },
                        {
                            "name": "credentialSubject.proxied.identifyingMarks",
                            "value": depIdentifyingMarks
                        },
                        {
                            "name": "credentialSubject.proxied.photo",
                            "value": depPhoto
                        },
                        {
                            "name": "credentialSubject.proxied.iris",
                            "value": depIris
                        },
                        {
                            "name": "credentialSubject.proxied.fingerprint",
                            "value": depFingerprint
                        },
                    ]
                },
				"comment" : "Émission d'attestation de mandat de curatelle",
			}), headers: {
                'HOST'          : `${GET_ISSUER_HOST_URL}`,
                'X-API-Key'     : `${GET_API_SECRET()}`,
                'Content-Type'  : 'application/json; charset=utf-8'
            }
        }).then((resp => props.history.replace('/proofcuratelle', props.location.state)));
    }



    return(
        <Container className="mt-5 pt-5">
            <br /><br /><br /><br />
            <div className="text-center FormBox mt-5 pt-5">
                <h3 className="mb-5 pb-4 mt-2 header"> {t('identite:lblVerification')} </h3>
                <br />
                <p>
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

export default EmissionMandatComponent; 