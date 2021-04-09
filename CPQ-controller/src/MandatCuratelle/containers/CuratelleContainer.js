/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React                    from 'react'
import { Button, Container }    from 'reactstrap'
import { useHistory }           from 'react-router-dom' 
import { GET_API_SECRET }       from '../../config/constants'
import { GET_ISSUER_HOST_URL }  from '../../config/endpoints'

function CuratelleContainer(){

    const history = useHistory();
    /**
     * Traitement du click du button. On passe à la création d'une invitation pour l'identité de l'enfant.  
     */
    const handleRequest = () => {
        creerInvitation('/qrcuratelleresp'); 
    }

    function creerInvitation(destination){

        fetch('/connections/create-invitation',
        {
            method: 'POST',
            headers: {
            'HOST'                         : `${GET_ISSUER_HOST_URL}`,
            'X-API-Key'                    : `${GET_API_SECRET()}`,
            'Content-Type'                 : 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin'  : '*', 
            'Access-Control-Allow-Methods' : 'GET, POST, PUT, PATCH, POST, DELETE, OPTIONS', 
            'Access-Control-Allow-Headers' : 'Content-Type', 
            'Access-Control-Max-Age'       : '86400'
            }
        }).then((
            resp => resp.json().then((
            data => 
                history.push(destination,
                {
                    type: "did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/connections/1.0/invitation", 
                    invitation    : data
                } 
                )
            ))
        ));
    }

    return(
        <div className="Root" style={{ backgroundColor: '#FCF8F7', display: "flex" }}>
            
			<Container>
                <h1>Mandat de Curatelle </h1>
                <br /> 
                Pour démarrer l'émission du mandat de curatelle, d'abord demandez la présentation de <br /> l'attestation d'identité de la personne responsable. 
                <div>
                    <Button onClick={handleRequest} outline color="primary" className="m-3">Demander présentation d'identité du responsable</Button>
                </div>
            </Container>
            <Container>
                <div></div>
            </Container>
		</div >
    );
}

export default CuratelleContainer;