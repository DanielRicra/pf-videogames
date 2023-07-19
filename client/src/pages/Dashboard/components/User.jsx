import { Create, Datagrid, Edit, EmailField, List, SimpleForm, TextField, TextInput } from 'react-admin'

export const UserList = () => (
  <List>
    <Datagrid>
      <TextField source='name' />
      <TextField source='id' />
      <EmailField source='email' />
      <TextField source='nickname' />
      <TextField source='friends' />
      <TextField source='videogames' />
    </Datagrid>
  </List>
)

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source="id" />
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="nickname" />
      <TextInput source="friends" />
    </SimpleForm>
  </Edit>
)

export const UserCreate = () => {
  return (
    <Create>
      <SimpleForm>
      <TextInput source="name" />
      <TextInput source="email" />
      <TextInput source="nickname" />
    </SimpleForm>
    </Create>
  )
}
