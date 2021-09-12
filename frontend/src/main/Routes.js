import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Exposicoes from '../components/exposicoes/Exposicoes';
import Forum from '../components/forum/Forum';
import Home from '../components/home/Home';
import Termos from '../components/termos/Termos';
import Editais from '../components/editais/Editais';




export class Routes extends Component{
    render(){
        return (
            <main className="container">
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/exposicoes' component={Exposicoes}/>
                    <Route patch='/editais' component={Editais}/>
                    <Route path='/forum' component={Forum}/>
                    <Route path='/termos' component={Termos}/>
                </Switch>

            </main>
        )
    }
}

export default Routes;
