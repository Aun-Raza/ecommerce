import { useEffect, useState } from 'react';
import { retrieveAllCategories } from '../../../api';
import { CategoryType } from '../../../api/types';

const CategorySelection = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    async function init() {
      const data = await retrieveAllCategories();
      setCategories(data);
    }
    init();
  }, []);
  return (
    <aside className='w-1/4 h-fit border'>
      {categories.map(({ id, name }) => (
        <div key={id} className='p-3 border'>
          {name}
        </div>
      ))}
    </aside>
  );
};

export default CategorySelection;
