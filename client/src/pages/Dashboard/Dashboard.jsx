import {
  Admin,
  Resource,
  defaultTheme,
} from 'react-admin'
import { dataProvider } from './dataProvider'
import { UserCreate, UserEdit, UserList } from './components/User'
import { VideogameEdit, VideogameList, VideogameCreate } from './components/VideoGame'

const lightTheme = defaultTheme
const darkTheme = { ...defaultTheme, palette: { mode: 'dark' } }

const Dashboard = () => {
  return (
    <Admin
      theme={lightTheme}
      darkTheme={darkTheme}
      dataProvider={dataProvider}
      basename='/dashboard/admin'
    >
      <Resource name='user' list={UserList} edit={UserEdit} create={UserCreate} />
      <Resource name='videogames' list={VideogameList} edit={VideogameEdit} create={VideogameCreate} />
    </Admin>
  )
}
export default Dashboard
