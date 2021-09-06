import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import Exposicoes from '../components/Exposicoes';
import Forum from '../components/Forum';
import Home from '../components/Home';
import Termos from '../components/Termos';


export class Routes extends Component{
    render(){
        return (
            <main className="container">
                <Switch>
                    <Route exact path='/' component={Home}/>
                    <Route path='/exposicoes' component={Exposicoes}/>
                    <Route path='/forum' component={Forum}/>
                    <Route path='/termos' component={Termos}/>
                </Switch>

            </main>
        )
    }
}

export default Routes;
