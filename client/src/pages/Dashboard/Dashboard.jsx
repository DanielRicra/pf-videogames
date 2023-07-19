import {
  Admin,
  Resource,
  defaultTheme,
} from 'react-admin'
import { dataProvider } from './dataProvider'
import { UserList } from './components/UserList'
import { VideogameEdit, VideogameList, VideogameCreate } from './components/VideoGameList'
import { TagList, TagEdit, TagCreate } from './components/TagList'
import { GenreList, GenreEdit, GenreCreate} from './components/GenreList'

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
      <Resource name='tags' list={TagList} edit={TagEdit} create={TagCreate}/>
      <Resource name='genres' list={GenreList} edit={GenreEdit} create={GenreCreate}/>
    </Admin>
  )
}
export default Dashboard
