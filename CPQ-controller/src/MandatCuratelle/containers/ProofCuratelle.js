/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React                           from 'react';
import { Button, Container, Col, Row } from 'reactstrap';
import { useHistory }                  from 'react-router-dom'
import ProofCuratelleForm              from '../components/ProofCuratelleForm';
import Success                         from '../../assets/images/success.png';
import                                      '../../assets/styles/ProofContainer.css';

const ProofCuratelle = (props) => {

    const history = useHistory(); 

    function handleClick(){
        history.push('/home')
    }
    return (
        <Container className="my-5">
        <Row form>
            <ProofCuratelleForm data={props.location.state} />
            <Col lg={7} className="text-center proof-left-col">
            <img className="text-center w-25" src={Success} alt="proof-banner" />
            <h4 className="ml-md-5 pb-4 mt-4">
                Le mandat de curatelle a été émis avec succès. 
            </h4>
            <p className="ml-md-5 pb-4 mt-2">
                Le mandat de curatelle a été émis avec succès. 
                Le citoyen doit se présenter au Registre Québec pour demander l'attestation d'identité par mandat. 
            </p>
            <div className="text-center ">
                <Button className="mt-2" outline color="primary" size="lg" onClick={handleClick} >Retourner à la page initiale</Button>
            </div>
            </Col>
        </Row>

        </Container>
    );
};

export default ProofCuratelle;
