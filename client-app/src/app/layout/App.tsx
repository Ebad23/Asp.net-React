import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/homepage';

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname === '/' ? <HomePage /> : (
        <>
        <NavBar/>
      <Container style={{ marginTop: '7em' }}>
        <Outlet />
      </Container>
        </>
      )}
      
    </>
  );
}

//this will observe the observables in our stores
export default observer(App);