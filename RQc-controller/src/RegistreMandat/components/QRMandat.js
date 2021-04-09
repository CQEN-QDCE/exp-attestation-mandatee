/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React from 'react';
import QRCode from 'qrcode.react'

function QRMandat(props) {

	const content = JSON.parse(props.value); 
	
	return (
        <div>
            <h2>Preuve du Mandat de Curatelle</h2>
            <p>Merci de présenter le mandat de curatelle émis par <br /> le 
               Curateur Public du Québec. </p>
            <QRCode value={content.invitation.invitation_url} size={400}/>
        </div>        
	);
}

export default QRMandat;