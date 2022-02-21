import React, { CSSProperties, useMemo } from 'react';
import './TagList.css';

type TagCount = {
  name: string;
  count: number;
};

type props = {
  tags: TagCount[];
  selectedTag: string;
  onSelect: React.MouseEventHandler<HTMLDivElement>;
};
function TagList({ tags, selectedTag, onSelect }: props) {
  const countSum = useMemo(() => tags.reduce((sum, tag) => sum + tag.count, 0), [tags]);
  return (
    <div className="d-flex flex-column" style={styles}>
      <div className="fw-bold">태그 목록</div>
      <hr />
      <div className={selectedTag === '' ? 'tag-active' : ''} data-tag="" onClick={onSelect}>
        전체보기 ({countSum})
      </div>
      {tags
        .filter(tag => tag.count)
        .map(tag => (
          <div key={tag.name} className={selectedTag === tag.name ? 'tag-active' : ''} data-tag={tag.name} onClick={onSelect}>
            {tag.name}({tag.count})
          </div>
        ))}
    </div>
  );
}

const styles: CSSProperties = {
  lineHeight: '2rem',
  width: '10rem',
  position: 'absolute',
  left: '-15vw',
  top: '30vh',
};

export default React.memo(TagList);
