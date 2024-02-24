import React, { useEffect, useRef, useState } from 'react';
import {
  ProductWithCategoryIdType,
  defaultProductWithCategoryId,
} from '../../../api/types/product';
import {
  createProduct,
  retrieveProduct,
  modifyProduct,
} from '../../../api/products-api';
import { retrieveAllCategories } from '../../../api/categories-api';
import { useParams, useHistory } from 'react-router-dom';
import { CategoryType } from '../../../api/types/category';
import {
  Button,
  Image,
  Input,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react';

type ProductFormType = {
  operation: string;
};

const ProductForm = ({ operation }: ProductFormType) => {
  const [body, setBody] = useState<ProductWithCategoryIdType>(
    defaultProductWithCategoryId
  );
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [file, setFile] = useState<File>();
  const { id: paramId } = useParams<{ id: string }>();
  const history = useHistory();
  const token = localStorage.getItem('token') as string;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerFileInput = () => {
    // Trigger the click event on the hidden file input
    fileInputRef?.current?.click();
  };

  useEffect(() => {
    async function init() {
      const foundCategories = await retrieveAllCategories();
      setCategories(foundCategories);
    }
    init();
  }, []);

  // only for modifying
  useEffect(() => {
    async function init() {
      if (operation === 'modify' && paramId) {
        const { name, description, price, category, imageUrl } =
          await retrieveProduct(paramId);
        setBody({
          name,
          description,
          price,
          categoryId: category.id,
          imageUrl,
        });
      }
    }
    init();
  }, [paramId]);

  function handleBodyChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = event.target;
    if (name === 'category') {
      const categoryId = parseInt(value, 10);
      setBody((body) => ({ ...body, categoryId }));
    } else {
      const bodyClone = { ...body };
      // @ts-ignore
      bodyClone[name] = value;
      setBody(bodyClone);
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setFile(selectedFile);
      const fileUrl = URL.createObjectURL(selectedFile);
      setBody((body) => ({ ...body, imageUrl: fileUrl }));
    }
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData();
    const { name, description, price, categoryId } = body;
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price + '');
    formData.append('categoryId', categoryId + '');
    if (!file && operation === 'add') return;
    if (file) {
      formData.append('file', file);
    }
    if (operation === 'add') {
      await createProduct(formData, token);
    } else if (operation === 'modify' && paramId) {
      await modifyProduct(paramId, formData, token);
    }
    history.push('/');
  }

  return (
    <section>
      <h1>{operation === 'add' ? 'Add' : 'Modify'} Product</h1>
      <form onSubmit={handleSubmit} className='mt-2 p-3 border'>
        <input
          ref={fileInputRef}
          id='file'
          name='file'
          type='file'
          hidden
          onChange={handleFileChange}
        />
        <Button
          onClick={triggerFileInput}
          color='primary'
          variant='bordered'
          className='shadow-lg w-fit'
        >
          Upload Image
        </Button>
        {body.imageUrl && (
          <Image src={body.imageUrl} className='w-48 h-48' alt='' />
        )}
        <fieldset className='flex flex-col md:flex-row gap-2'>
          <Input
            id='name'
            name='name'
            value={body.name}
            label='Name'
            type='text'
            onChange={handleBodyChange}
          />
          <Input
            id='price'
            type='number'
            name='price'
            label='Price'
            value={body.price.toString()}
            onChange={handleBodyChange}
          />
        </fieldset>
        <Textarea
          id='description'
          name='description'
          label='Description'
          value={body.description}
          onChange={handleBodyChange}
        />

        <label htmlFor='category'>Category</label>
        <Select
          items={categories}
          label='Categories'
          name='category'
          placeholder='Select a category'
          onChange={handleBodyChange}
          className='max-w-xs'
          value={body.categoryId || ''}
        >
          {(category) => (
            <SelectItem key={category.id}>{category.name}</SelectItem>
          )}
        </Select>
        {/* <select
          id='category'
          value={body.categoryId || ''}
          name='category'
          onChange={handleBodyChange}
          className='w-fit'
        >
          <option value=''>Select a category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select> */}
        <Button type='submit' color='primary' className='w-full mt-2'>
          Submit
        </Button>
      </form>
    </section>
  );
};

export default ProductForm;
