import {
  Datagrid,
  List,
  TextField,
  Edit,
  Create,
  SimpleForm,
  TextInput,
} from 'react-admin'

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
