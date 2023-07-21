import {
  Admin,
  Resource,
  defaultTheme,
} from 'react-admin'

import { dataProvider } from './dataProvider'
import { TagList, TagEdit, TagCreate } from './components/Tag'
import { GenreList, GenreEdit, GenreCreate} from './components/Genre'
import { UserCreate, UserEdit, UserList } from './components/User'
import { VideogameEdit, VideogameList, VideogameCreate } from './components/VideoGame'
import { TransactionList } from './components/Transaction'

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
      <Resource name='tag' list={TagList} edit={TagEdit} create={TagCreate}/>
      <Resource name='genre' list={GenreList} edit={GenreEdit} create={GenreCreate}/>
      <Resource name='transaction' list={TransactionList} />
    </Admin>
  )
}
export default Dashboard
