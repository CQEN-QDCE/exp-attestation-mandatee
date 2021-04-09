/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React                    from 'react'
import { Button, Container }    from 'reactstrap'
import { useHistory }           from 'react-router-dom' 
import { GET_API_SECRET }       from '../config/constants'
import { GET_ISSUER_HOST_URL }  from '../config/endpoints'

function HomeContainer(){

    const history = useHistory(); 

    function handleIdentite(){
        history.push('/registreidentite');
    }

    function handleMandat(){
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
                history.push('/qrmandatresp',
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
                <h1>Bienvenue au site de Registre Québec </h1>
                <br /> <br /> <br /> 
                <h3>Émission d'identité ANIG</h3>
                <div>
                    <Button onClick={handleIdentite} outline color="primary" className="m-3">Émission d'identité ANIG</Button>
                </div>
                <br /> <br /> <br /> 
                <h3>Émission d'identité ANIG par mandat</h3>
                Pour démarrer l'émission d'identité par mandat de curatelle, d'abord demandez la présentation de  l'attestation d'identité <br /> de la personne responsable, 
                et ensuite l'attestation du mandat émise par le Curateur public du Québec. 
                <div>
                    <Button onClick={handleMandat} outline color="primary" className="m-3">Demander présentation d'identité du responsable</Button>
                </div>
            </Container>
            <Container>
                <div></div>
            </Container>
		</div >
    );
}
export default HomeContainer; 