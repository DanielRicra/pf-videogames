import {
  Datagrid,
  List,
  TextField,
  Edit,
  Create,
  SimpleForm,
  TextInput,
} from 'react-admin'

const tagFilters = [
  // eslint-disable-next-line react/jsx-key
  <TextInput source='q' label='Search' alwaysOn />,
]

export const TagList = () => (
  <List filters={tagFilters}>
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
