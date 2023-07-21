import {
  ArrayField,
  BooleanField,
  BooleanInput,
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
    <Datagrid rowClick='edit'>
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
      <BooleanField source='banned' />
    </Datagrid>
  </List>
)

export const UserEdit = () => (
  <Edit>
    <SimpleForm>
      <TextInput source='id' disabled={true} />
      <TextInput source='name' />
      <TextInput source='email' />
      <TextInput source='nickname' />
      <TextInput source='friends' />
      <BooleanInput source='banned' />
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
