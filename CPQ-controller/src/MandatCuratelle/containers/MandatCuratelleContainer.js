/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React                from 'react'
import { Container }        from 'reactstrap'
import MandatCuratelleForm  from '../components/MandatCuratelleForm'

function MandatCuratelleContainer(props){
    return(
        <div className="Root" style={{ backgroundColor: '#FCF8F7', display: "flex" }}>
			<Container >
				<MandatCuratelleForm className="justify-content-center" data={props.location.state}/>
			</Container>
		</div >
    );
}

export default MandatCuratelleContainer;