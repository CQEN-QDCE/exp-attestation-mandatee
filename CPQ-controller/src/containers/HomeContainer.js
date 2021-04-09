/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React  from 'react'
import { Button } from 'reactstrap'
import { useHistory} from 'react-router-dom'

function HomeContainer(){

    const history = useHistory();
    
    function handleRequest(){
        history.push("/curatelle"); 
    }

    return(
        <div className="pt-5 container-fluid text-center" >
            <div className="row" >
                <div className="col-md-7 col-sm-12">
                    <h1>Bienvenue au site du Curateur public du Québec </h1>
                    <br />
                    <br />
                    <br />
                    <br />
                    <Button onClick={handleRequest} outline color="primary" className="m-3">Émettre mandat de curatelle</Button>
                </div>
            </div>
      </div>
    );
}
export default HomeContainer; 