import {
  Admin,
  Resource,
  defaultTheme,
} from 'react-admin'
import { dataProvider } from './dataProvider'
import { UserList } from './components/UserList'
import { VideogameEdit, VideogameList, VideogameCreate } from './components/VideoGameList'

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
      <Resource name='user' list={UserList} />
      <Resource name='videogames' list={VideogameList} edit={VideogameEdit} create={VideogameCreate} />
    </Admin>
  )
}
export default Dashboard
