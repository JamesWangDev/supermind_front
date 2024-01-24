import React, { useContext } from 'react';
import ThemeOptionContext from '@/Helper/ThemeOptionsContext';
import { dateFormate } from '@/Utils/CustomFunctions/DateFormate';
import { RiCalendarLine, RiUserLine } from 'react-icons/ri';

const BlogImageDetails = ({ Blog }) => {
  const { themeOption } = useContext(ThemeOptionContext);
  return (
    <div className='blog-image-contain'>
      <h2>{Blog?.title}</h2>
      <ul className='contain-comment-list'>
        {themeOption?.blog?.blog_author_enable && (
          <li>
            <div className='user-list'>
              <RiUserLine />
              <span>{Blog?.created_by?.name}</span>
            </div>
          </li>
        )}

        <li>
          <div className='user-list'>
            <RiCalendarLine />
            <span>{dateFormate(Blog?.created_at)}</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default BlogImageDetails;
