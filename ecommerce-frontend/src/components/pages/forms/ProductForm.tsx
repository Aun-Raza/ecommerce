import { useEffect, useState } from 'react';
import { CategoryType } from '../../../api/types';
import { retrieveAllCategories } from '../../../api';

const ProductForm = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    async function init() {
      const foundCategories = await retrieveAllCategories();
      setCategories(foundCategories);
    }
    init();
  }, []);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const categoryId = parseInt(event.target.value, 10);
    setSelectedCategory(categoryId);
  };

  return (
    <form className='mt-2 p-3 border'>
      <h2>Add Product</h2>
      <fieldset>
        <label htmlFor='name'>Name</label>
        <input id='name' type='text' />
      </fieldset>
      <fieldset>
        <label htmlFor='description'>Description</label>
        <textarea id='description' />
      </fieldset>
      <fieldset>
        <label htmlFor='price'>Price</label>
        <input id='price' type='number' />
      </fieldset>
      <fieldset>
        <label htmlFor='category'>Category</label>
        <select
          id='category'
          value={selectedCategory || ''}
          onChange={handleCategoryChange}
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
