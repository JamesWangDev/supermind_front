import { useContext } from 'react';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const CustomHeading = (props) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const { title, subTitle, svgUrl, customClass, customTitleClass, svgClass = '' } = props;

  return (
    <div className={`${customTitleClass ? customTitleClass : customClass ? customClass + ' ' : 'title'}`}>
      <div>
        <h2>{t(title)}</h2>
        {svgUrl && <span className='title-leaf'>{svgUrl}</span>}
        {subTitle && <p>{t(subTitle)}</p>}
      </div>
      {props.children && props.children}
    </div>
  );
};

export default CustomHeading;
