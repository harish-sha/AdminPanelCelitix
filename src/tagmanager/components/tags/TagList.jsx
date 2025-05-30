import React from 'react';
import { useTags } from '@/tagmanager/hooks/useTags';
import TagCard from './TagCard';

const TagList = () => {
  const { tags } = useTags();

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {tags.length === 0 ? (
        <p className="text-gray-500 text-sm col-span-full">No tags available</p>
      ) : (
        tags.map(tag => <TagCard key={tag._id} tag={tag} />)
      )}
    </div>
  );
};

export default TagList;