import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';
import { useContext } from 'react';
import { Col, Label, Row } from 'reactstrap';

const SimpleTitleWrapper = (props) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <Row className='mb-3 align-items-center'>
      <Label htmlFor='bankaccount' className='col-xxl-2 col-xl-3 col-lg-12 col-md-3'>
        {t(props?.title)}
      </Label>
      <Col xxl={10} xl={9} lg={12} md={9} {...props?.colProps} className={props?.colClass ? props?.colClass : ''}>
        {props.children}
      </Col>
    </Row>
  );
};

export default SimpleTitleWrapper;
