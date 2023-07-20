import {
  Admin,
  Resource,
  defaultTheme,
} from 'react-admin'

import { dataProvider } from './dataProvider'
import { TagList, TagEdit, TagCreate } from './components/TagList'
import { GenreList, GenreEdit, GenreCreate} from './components/GenreList'
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
      <Resource name='tags' list={TagList} edit={TagEdit} create={TagCreate}/>
      <Resource name='genres' list={GenreList} edit={GenreEdit} create={GenreCreate}/>
    </Admin>
  )
}
export default Dashboard
