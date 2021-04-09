/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React from 'react'
import { Container, Button } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function ErrorContainer(){

    const history = useHistory(); 

    const { t } = useTranslation(['translation', 'identite'])

    function handleClick(){
        history.push('/home');
    }

    return(
        <div className="Root" style={{ backgroundColor: '#FCF8F7', display: "flex" }}>
            
			<Container>
                
                <br /> <br /> <br /> 
                <h3>{t('identite:lblEmissionANIG')}</h3>
                
                <br /> <br /> <br /> 
                <h3>{t('identite:lblErreurEmission')}</h3>
                Il y a eu un problème de validation de l'attestation d'identité presentée de la personne responsable. <br />
                Probablement la cause est la présentation d'un ou plusieurs champs qui n'appartiennent pas à l'attestation de la 
                personne responsable du mandat de curatelle. 
                Merci d'essayer à nouveau. 
                <div>
                    <Button onClick={handleClick} outline color="primary" className="m-3">Essayer à nouveau</Button>
                </div>
            </Container>
		</div >
    );
}
export default ErrorContainer; 