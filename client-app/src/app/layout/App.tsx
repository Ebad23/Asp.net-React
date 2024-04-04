import { useEffect} from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import LoadingComponent from './loadingcomponent';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

function App() {

  const {activityStore} = useStore();
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore])


  if (activityStore.loadingInitial) return <LoadingComponent content='Loading app...' />

  return (
    <>
      <NavBar/>
      <Container style={{ marginTop: '7em' }}>
        <ActivityDashboard/>
      </Container>
    </>
  );
}

//this will observe the observables in our stores
export default observer(App);