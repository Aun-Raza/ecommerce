import { useEffect, useState } from 'react';
import { retrieveAllCategories } from '../../../../api/categories-api';
import { CategoryType } from '../../../../api/types';

type CategorySelectionProps = {
  onCategoryChange: (category: string) => void;
};

const CategorySelection = ({ onCategoryChange }: CategorySelectionProps) => {
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
      <div key={0} className='p-3 border' onClick={() => onCategoryChange('')}>
        All Categories
      </div>
      {categories.map(({ id, name }) => (
        <div
          key={id}
          className='p-3 border'
          onClick={() => onCategoryChange(name)}
        >
          {name}
        </div>
      ))}
    </aside>
  );
};

export default CategorySelection;
