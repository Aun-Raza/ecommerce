import { useEffect, useState } from 'react';
import { retrieveAllCategories } from '../../../../api/categories-api';
import { CategoryType } from '../../../../api/types/category';

type CategorySelectionProps = {
  selectedCategory: string | null;
  onCategoryChange: (category: string) => void;
};

const CategorySelection = ({
  selectedCategory,
  onCategoryChange,
}: CategorySelectionProps) => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    async function init() {
      const data = await retrieveAllCategories();
      setCategories(data);
    }
    init();
  }, []);
  return (
    <aside className='w-1/4 h-fit flex flex-col gap-1'>
      <div
        key={0}
        className={`category-selector-item ${
          selectedCategory === null ? 'bg-slate-200 border border-blue-400' : ''
        }`}
        onClick={() => onCategoryChange('')}
      >
        All Categories
      </div>
      {categories.map(({ id, name }) => (
        <div
          key={id}
          className={`category-selector-item ${
            selectedCategory === name ? 'bg-slate-200 border-blue-400' : ''
          }`}
          onClick={() => onCategoryChange(name)}
        >
          {name}
        </div>
      ))}
    </aside>
  );
};

export default CategorySelection;
