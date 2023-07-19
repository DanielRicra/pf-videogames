import {
    Datagrid,
    List,
    TextField,
    Edit,
    Create,
  } from 'react-admin'

  import CreateTagForm from '../../Create/CreateTag'
  import EditTagForm from './EditTagForm'
  
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
      <EditTagForm />
    </Edit>
  )
  
  export const TagCreate = () => {
    return (
      <Create>
        <CreateTagForm />
      </Create>
    )
  }
  