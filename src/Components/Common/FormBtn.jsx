import { Col } from 'reactstrap';
import Btn from '@/Elements/Buttons/Btn';
import { useContext } from 'react';
import I18NextContext from '@/Helper/I18NextContext';
import { useTranslation } from '@/app/i18n/client';

const FormBtn = ({ title, classes = {}, loading }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  return (
    <Col xs={12}>
      <Btn className={classes.btnClass ? classes.btnClass : ''} type='submit' loading={Number(loading)}>
        {t(title)}
      </Btn>
    </Col>
  );
};

export default FormBtn;
