import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { useContext } from 'react';
import { Col, Label } from 'reactstrap';

const IconInputWrapper = (props) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <Col {...props?.colprops} className={props?.colclass ? props?.colclass : ''}>
      <div className='custom-form mb-md-4 mb-3'>
        <Label htmlFor={props?.label || ''} className='form-label'>
          {t(props?.label)} {props?.require == 'true' && <span className='theme-color required-dot'>*</span>}
        </Label>
        {props.children}
      </div>
    </Col>
  );
};

export default IconInputWrapper;
