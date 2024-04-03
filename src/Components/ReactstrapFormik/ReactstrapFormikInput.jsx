import React, { useContext } from 'react';
import { FormFeedback, FormGroup, Input, InputGroup, Label, InputGroupText } from 'reactstrap';
import { handleModifier } from '../../Utils/Validation/ModifiedErrorMessage';
import { ErrorMessage } from 'formik';
import { useTranslation } from '@/app/i18n/client';
import I18NextContext from '@/Helper/I18NextContext';

const ReactstrapFormikInput = ({ field: { ...fields }, form: { touched, errors }, ...props }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  // const { currencySymbol } = useContext(SettingContext);
  return (
    <>
      {props.label ? (
        <>
          <FormGroup floating>
            <Input {...props} {...fields} invalid={Boolean(touched[fields.name] && errors[fields.name])} valid={Boolean(touched[fields.name] && !errors[fields.name])} autoComplete='off' />
            <Label htmlFor={props.id}>{t(props.label)}</Label>
            {touched[fields.name] && errors[fields.name] ? <FormFeedback>{t(handleModifier(errors[fields.name]))}</FormFeedback> : ''}
          </FormGroup>
        </>
      ) : props.inputaddon ? (
        <InputGroup>
          {!props.postprefix && <InputGroupText>{props?.prefixvalue ? props?.prefixvalue : '$'}</InputGroupText>}
          <Input
            disabled={props.disable ? props.disable : false}
            {...fields}
            {...props}
            invalid={Boolean(touched[fields.name] && errors[fields.name])}
            valid={Boolean(touched[fields.name] && !errors[fields.name])}
            autoComplete='off'
            readOnly={props.readOnly ? true : false}
            onInput={(e) => {
              if (props.min && props.max) {
                if (e.target.value > 100) e.target.value = 100;
                if (e.target.value < 0) e.target.value = 0;
              } else false;
            }}
          />
          {props.postprefix && <InputGroupText>{props.postprefix}</InputGroupText>}
          {touched[fields.name] && errors[fields.name] ? <FormFeedback>{t(handleModifier(errors[fields.name]))}</FormFeedback> : ''}
          {props?.errormsg && (
            <ErrorMessage
              name={fields.name}
              render={(msg) => (
                <div className='invalid-feedback d-block'>
                  {t(props.errormsg)} {t('IsRequired')}
                </div>
              )}
            />
          )}
        </InputGroup>
      ) : (
        <>
          {props.type == 'color' ? (
            <div className='color-box'>
              <Input
                disabled={props.disable ? props.disable : false}
                {...fields}
                {...props}
                invalid={Boolean(touched[fields.name] && errors[fields.name])}
                valid={Boolean(touched[fields.name] && !errors[fields.name])}
                autoComplete='off'
              />
              {touched[fields.name] && errors[fields.name] ? <FormFeedback>{t(handleModifier(errors[fields.name]))}</FormFeedback> : ''}
              <h6>{fields.value}</h6>
            </div>
          ) : (
            <>
              <Input
                disabled={props.disable ? props.disable : false}
                {...fields}
                {...props}
                invalid={Boolean(touched[fields.name] && errors[fields.name])}
                valid={Boolean(touched[fields.name] && !errors[fields.name])}
                autoComplete='off'
              />
              {touched[fields.name] && errors[fields.name] ? <FormFeedback>{t(handleModifier(errors[fields.name]))}</FormFeedback> : ''}
              {props?.errormsg && (
                <ErrorMessage
                  name={fields.name}
                  render={(msg) => (
                    <div className='invalid-feedback d-block'>
                      {t(props.errormsg)} {t('IsRequired')}
                    </div>
                  )}
                />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
export default ReactstrapFormikInput;
