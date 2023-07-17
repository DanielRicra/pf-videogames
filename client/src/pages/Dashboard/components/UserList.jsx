import { Datagrid, EmailField, List, TextField } from 'react-admin'

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
