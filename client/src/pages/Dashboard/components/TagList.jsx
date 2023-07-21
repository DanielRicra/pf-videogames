import {
  Datagrid,
  List,
  TextField,
  Edit,
  Create,
  SimpleForm,
  TextInput,
} from 'react-admin'

export const TagList = () => (
  <List>
    <Datagrid rowClick='edit'>
      <TextField source='name' />
      <TextField source='id' />
    </Datagrid>
  </List>
)

export const TagEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source='name' />
      <TextInput source='id' disabled />
    </SimpleForm>
  </Edit>
)

export const TagCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source='name' />
      </SimpleForm>
    </Create>
  )
}
