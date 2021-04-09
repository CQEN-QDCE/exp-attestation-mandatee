/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React               from 'react'
import { useTranslation }  from 'react-i18next'
import '../assets/styles/JumbotronComponent.css'

const JumbotronComponent = () => {
  const { t } = useTranslation();
  return (
    <header>
      <div className="pt-5 container-fluid text-center" >

        <div className="row" >
          <div className="col-md-7 col-sm-12">
            <h1>Le Curateur public du Québec</h1>
            <p className="lead">
                Le Curateur public veille à la protection de personnes inaptes et du patrimoine de mineurs. 
                Il sensibilise la population à l’inaptitude et à l’importance d’agir avant même qu’elle ne survienne. 
                Le Curateur public accompagne également les familles et les proches qui représentent une personne ou 
                qui participent à un conseil de tutelle et il surveille l’administration de ces tutelles et curatelles. 
                Il agit lui-même comme curateur ou tuteur d’une manière personnalisée à l’endroit des personnes qu’il 
                représente, lorsqu’aucun proche ne peut les représenter ou que ce n’est pas dans leur intérêt. 
                Il s’assure que les décisions sont prises dans l’intérêt de la personne représentée, le respect de ses 
                droits et la sauvegarde de son autonomie.
            </p>
          </div>
          <div className="col-md-5 col-sm-12">
            &nbsp;
          </div>
        </div>
      </div>
    </header>
  );
};

export default JumbotronComponent;