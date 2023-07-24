import {
  Datagrid,
  List,
  TextField,
  Edit,
  Create,
  SimpleForm,
  TextInput,
} from 'react-admin'

const genreFilters = [
  // eslint-disable-next-line react/jsx-key
  <TextInput source='q' label='Search' alwaysOn />,
]

export const GenreList = () => (
  <List filters={genreFilters}>
    <Datagrid rowClick='edit'>
      <TextField source='name' />
      <TextField source='id' />
    </Datagrid>
  </List>
)

export const GenreEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source='name' />
      <TextInput source='id' disabled />
    </SimpleForm>
  </Edit>
)

export const GenreCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source='name' />
      </SimpleForm>
    </Create>
  )
}
