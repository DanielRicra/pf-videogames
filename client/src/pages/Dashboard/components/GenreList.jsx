import {
    Datagrid,
    List,
    TextField,
    Edit,
    Create,
  } from 'react-admin'

  import CreateGenreForm from '../../Create/CreateGenre'
  import EditGenreForm from './EditGenreForm'
  
  export const GenreList = () => (
    <List>
      <Datagrid rowClick='edit'>
        <TextField source='name' />
        <TextField source='id' />
      </Datagrid>
    </List>
  )
  
  export const GenreEdit = () => (
    <Edit>
      <EditGenreForm />
    </Edit>
  )
  
  export const GenreCreate = () => {
    return (
      <Create>
        <CreateGenreForm />
      </Create>
    )
  }
  