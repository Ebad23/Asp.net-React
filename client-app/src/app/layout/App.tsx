import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Outlet, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/homepage';
import { ToastContainer } from 'react-toastify';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import LoadingComponent from './loadingcomponent';
import ModalContainer from '../common/modals/modalContainer';

function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if (commonStore.token)
    {
        userStore.getUser().finally(() => commonStore.setAppLoaded())
    }
    else
    {
        commonStore.setAppLoaded();
    }
  }, [commonStore,userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...'/>

  return (
    <>
    <ModalContainer />
    <ToastContainer position='bottom-right' hideProgressBar theme='colored'></ToastContainer>
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