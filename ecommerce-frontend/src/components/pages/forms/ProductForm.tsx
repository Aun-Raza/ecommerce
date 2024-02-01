import { useEffect, useState } from 'react';
import {
  CategoryType,
  ProductWithCategoryIdType,
  defaultProductWithCategoryId,
} from '../../../api/types';
import { createProduct, retrieveAllCategories } from '../../../api';

const ProductForm = () => {
  const [body, setBody] = useState<ProductWithCategoryIdType>(
    defaultProductWithCategoryId
  );
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    async function init() {
      const foundCategories = await retrieveAllCategories();
      setCategories(foundCategories);
    }
    init();
  }, []);

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
      bodyClone.product[name] = value;
      setBody(bodyClone);
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await createProduct(body);
  }

  return (
    <form onSubmit={handleSubmit} className='mt-2 p-3 border'>
      <h2>Add Product</h2>
      <fieldset>
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          name='name'
          value={body.product.name}
          type='text'
          onChange={handleBodyChange}
        />
      </fieldset>
      <fieldset>
        <label htmlFor='description'>Description</label>
        <input
          id='description'
          name='description'
          onChange={handleBodyChange}
        />
      </fieldset>
      <fieldset>
        <label htmlFor='price'>Price</label>
        <input
          id='price'
          type='number'
          name='price'
          onChange={handleBodyChange}
        />
      </fieldset>
      <fieldset>
        <label htmlFor='category'>Category</label>
        <select
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
        </select>
      </fieldset>
      <button type='submit' className='primary w-full mt-2'>
        Submit
      </button>
    </form>
  );
};

export default ProductForm;
