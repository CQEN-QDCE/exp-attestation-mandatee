/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React                            from 'react';
import { Button, Container, Col, Row }  from 'reactstrap';
import { useTranslation }               from 'react-i18next'
import { useHistory }                   from 'react-router-dom'
import ProofRegistreIdentiteForm        from '../components/ProofRegistreIdentiteForm';
import Success                          from '../../assets/images/success.png';
import                                       '../../assets/styles/ProofContainer.css';

const ProofRegistreIdentiteContainer = (props) => {

    const { t } = useTranslation(['translation', 'identite']); 

    const history = useHistory();
    
    function handleClick(){
        history.push('/home'); 
    };

    return (
        <Container className="my-5">
            <Row form>
                <ProofRegistreIdentiteForm data={props.location.state} />
                <Col lg={7} className="text-center proof-left-col">
                <img className="text-center w-25" src={Success} alt="proof-banner" />
                <h4 className="ml-md-5 pb-4 mt-4">
                    {t('identite:msgIssueSuccess')}
                </h4>
                <p className="ml-md-5 pb-4 mt-2">
                {t('identite:msgIssueSuccessCompl')}
                </p>
                <div className="text-center ">
                <Button className="mt-2" outline color="primary" size="lg" onClick={handleClick} >Retourner à la page initiale</Button>
                </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ProofRegistreIdentiteContainer;
