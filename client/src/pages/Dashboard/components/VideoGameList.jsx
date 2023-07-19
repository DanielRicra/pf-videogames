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
} from 'react-admin'
import CreateVideogameForm from '../../Create/Create'
import EditVideogameForm from './EditForm'

export const VideogameList = () => (
  <List>
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
      <NumberField source='rating' />
      <TextField source='price' />
      <NumberField source='stock' />
      <ArrayField source='genres'>
        <SingleFieldList>
          <ChipField source='name' />
        </SingleFieldList>
      </ArrayField>
      <ArrayField source='tags'>
        <SingleFieldList>
          <ChipField source='name' />
        </SingleFieldList>
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
