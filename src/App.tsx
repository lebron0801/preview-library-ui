import React from 'react';
import { HashRouter, Route, Switch, RouteComponentProps } from 'react-router-dom';
import { baseRouterMap, asyncRouterMap } from '@/routers/RouterMaps';
import '@assets/less/App.less';

const App: React.FC = () => {
  const routers = [...baseRouterMap, ...asyncRouterMap];
  return (
    <div className="App">
      <HashRouter basename={window.__POWERED_BY_QIANKUN__ ? '/ees' : process.env.PUBLIC_URL}>
        <Switch>
          {routers.map((item) => {
            return (
              <Route
                key={item.code}
                path={item.path}
                render={(props: RouteComponentProps) => <item.component {...{ ...props, meta: item.meta }} />}
              ></Route>
            );
          })}
        </Switch>
      </HashRouter>
    </div>
  );
};

export default App;
