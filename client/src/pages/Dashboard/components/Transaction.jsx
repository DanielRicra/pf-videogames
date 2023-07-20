import {
  Datagrid,
  DateField,
  List,
  TextField,
} from 'react-admin'

export const TransactionList = () => (
  <List>
    <Datagrid rowClick='edit'>
      <TextField source='id' />
      <DateField source='createdAt' />
      <DateField source='updatedAt' />
      <TextField source='user.name' />
      <TextField source='cart.id' />
    </Datagrid>
  </List>
)
