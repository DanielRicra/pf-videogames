/* eslint-disable react/jsx-key */
import {
  ArrayField,
  ChipField,
  Datagrid,
  DateField,
  ImageField,
  List,
  NumberField,
  RichTextField,
  SingleFieldList,
  TextField,
  WrapperField,
  Edit,
  Create,
  TextInput,
} from 'react-admin'
import CreateVideogameForm from '../../Create/Create'
import EditVideogameForm from './EditForm'

const videogameFilters = [
  <TextInput source='q' label='Search' alwaysOn />,
]

export const VideogameList = () => (
  <List filters={videogameFilters}>
    <Datagrid rowClick='edit'>
      <TextField source='name' />
      <TextField source='id' />
      <WrapperField label='Description' source='description'>
        <div className='max-h-[100px] max-w-[200px] overflow-hidden'>
          <RichTextField
            source='description'
            sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
            width={200}
            height={40}
          />
        </div>
      </WrapperField>
      <ImageField
        source='image'
        title='title'
        sx={{ height: '100px', width: '100px' }}
      />
      <DateField source='releaseDate' />
      <TextField source='stock' />
      <NumberField source='rating' />
      <TextField source='price' />
      <ArrayField source='genres'>
        <SingleFieldList>
          <ChipField source='name' size='small' />
        </SingleFieldList>
      </ArrayField>
      <ArrayField source='tags'>
        <div className='max-h-[100px] overflow-y-auto'>
          <SingleFieldList>
            <ChipField source='name' size='small' />
          </SingleFieldList>
        </div>
      </ArrayField>
    </Datagrid>
  </List>
)

export const VideogameEdit = () => (
  <Edit>
    <EditVideogameForm />
  </Edit>
)

export const VideogameCreate = () => {
  return (
    <Create>
      <CreateVideogameForm />
    </Create>
  )
}
