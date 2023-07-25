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
import { Link } from 'react-router-dom'
import authProvider from './authProvider'
import LoginPage from './components/Login'

const lightTheme = defaultTheme
const darkTheme = { ...defaultTheme, palette: { mode: 'dark' } }

const DashboardHome = () => {
  return (
    <div className='flex p-6 flex-col gap-4'>
        <h1 className='text-3xl'>Welcome to the administration</h1>
        <Link to='/' className='underline text-lg opacity-95 hover:opacity-80'>Go back to Videogames Store</Link>
    </div>
  )
}

const Dashboard = () => {
  return (
    <Admin
      theme={lightTheme}
      darkTheme={darkTheme}
      dataProvider={dataProvider}
      basename='/dashboard/admin'
      dashboard={DashboardHome}
      authProvider={authProvider}
      loginPage={LoginPage}
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
