import {
  ArrayField,
  ChipField,
  Create,
  Datagrid,
  Edit,
  EmailField,
  List,
  SimpleForm,
  SingleFieldList,
  TextField,
  TextInput,
} from 'react-admin'

export const UserList = () => (
  <List>
    <Datagrid>
      <TextField source='name' />
      <TextField source='id' />
      <EmailField source='email' />
      <TextField source='nickname' />
      <TextField source='friends' />
      <ArrayField source='videogames'>
        <SingleFieldList>
          <ChipField source='name' size='small' />
        </SingleFieldList>
      </ArrayField>
    </Datagrid>
  </List>
)

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source='id' />
      <TextInput source='name' />
      <TextInput source='email' />
      <TextInput source='nickname' />
      <TextInput source='friends' />
    </SimpleForm>
  </Edit>
)

export const UserCreate = () => {
  const validateUserCreation = (values) => {
    const errors = {}
    if (!values.name) {
      errors.name = 'Name is required'
    }
    if (!values.email) {
      errors.email = 'Email is required'
    }
    if (!values.nickname) {
      errors.nickname = 'Nickname is required'
    }
    return errors
  }

  return (
    <Create>
      <SimpleForm validate={validateUserCreation}>
        <TextInput source='name' />
        <TextInput source='email' />
        <TextInput source='nickname' />
      </SimpleForm>
    </Create>
  )
}
