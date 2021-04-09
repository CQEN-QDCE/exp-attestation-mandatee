/*
* Copyright (c) 2020 Gouvernement du Québec
* Auteur: Julio Cesar Torres (torj01)
* SPDX-License-Identifier: LiLiQ-R-v.1.1
* License-Filename: /LICENSE
*/
import React                                      from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HeaderComponent                            from '../components/HeaderComponent'
import FooterComponent                            from '../components/FooterComponent'
import MainContainer                              from '../containers/MainContainer'
import LoginContainer                             from '../containers/LoginContainer'
import NoAuthContainer                            from '../containers/NoAuthContainer'
import HomeContainer                              from '../containers/HomeContainer'
import CuratelleContainer                         from '../MandatCuratelle/containers/CuratelleContainer'
import QRPresentationResponsable                  from '../MandatCuratelle/containers/QRPresentationResponsable'
import VerificationPreuve                         from '../MandatCuratelle/containers/VerificationPreuve'
import MandatCuratelleContainer                   from '../MandatCuratelle/containers/MandatCuratelleContainer'
import EmissionMandatComponent                    from '../MandatCuratelle/components/EmissionMandatComponent'
import ProofCuratelle                             from '../MandatCuratelle/containers/ProofCuratelle'
import Auth from '../helpers/Auth'


const PrivateRoute = ({ component, ...options }) => {
	const finalComponent = Auth.getAuth() ? component : NoAuthContainer;
	return <Route {...options} component={finalComponent} />;
  };

function Routes() {
	return (
		<Router>
			<div>
				<Route component={HeaderComponent}/>
				<Switch>

                    {/* Routes attestation de mandat de curatelle */}
                    <PrivateRoute path="/curatelle" component={CuratelleContainer} />
                    <PrivateRoute path="/qrcuratelleresp" component={QRPresentationResponsable} />
                    <PrivateRoute path="/verificationPreuve" component={VerificationPreuve} />
                    <PrivateRoute path="/mandatcuratelle" component={MandatCuratelleContainer} />
                    <PrivateRoute path="/emissioncuratelle" component={EmissionMandatComponent} />
                    <PrivateRoute path="/proofcuratelle" component={ProofCuratelle} />

					{ /* Routes de base de l'app */ }
					<PrivateRoute path="/home"   component={HomeContainer} />
					<Route        path="/noauth" component={NoAuthContainer} />
					<Route        path="/login"  component={LoginContainer} />
					<Route        path="/" exact component={MainContainer} />

				</Switch>
				<FooterComponent />
			</div>
		</Router>
	)
}

export default Routes