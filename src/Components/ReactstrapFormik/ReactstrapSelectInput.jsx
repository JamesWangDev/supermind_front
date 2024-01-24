import { Fragment, useContext, useEffect, useMemo, useState } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import Image from 'next/image';
import { FormFeedback, Input, Label } from 'reactstrap';
import useOutsideDropdown from '../../Utils/Hooks/CustomHooks/useOutsideDropdown';
import { useTranslation } from '@/app/i18n/client';
import I18NextContext from '@/Helper/I18NextContext';

const ReactstrapSelectInput = ({ field, form: { touched, errors, setFieldValue }, getValuesKey = 'id', multiple = false, setvalue, ...props }) => {
  const { i18Lang } = useContext(I18NextContext);
  const { t } = useTranslation(i18Lang, 'common');
  const [searchInput, setSearchInput] = useState();
  const [selectedItems, setSelectedItems] = useState();
  const [list, setList] = useState([]);
  const { ref, isComponentVisible, setIsComponentVisible } = useOutsideDropdown();
  let error = errors[field.name];
  let touch = touched[field.name];
  // On initial mount setting options data
  useEffect(() => {
    setList(props.inputprops.options);
  }, []);

  useEffect(() => {
    setList(props.inputprops.options);
    if (searchInput) {
      if (props.inputprops?.setsearch) {
        props.inputprops?.setsearch(searchInput);
      } else {
        setList(props.inputprops.options.filter((item) => item.name.toLowerCase().includes(searchInput?.toLowerCase())));
      }
    } else {
      props.inputprops?.setsearch && props.inputprops?.setsearch(searchInput);
    }
  }, [searchInput]);
  // Memorized the value and update on option changes
  const listOpt = useMemo(() => {
    return props?.inputprops?.options;
  }, [props?.inputprops?.options]);
  useEffect(() => {
    setSearchInput();
    setList(props.inputprops.options);
  }, [isComponentVisible]);
  // Selecting Values from dropdown
  const onSelectValue = (option) => {
    if (multiple && Array.isArray(field?.value)) {
      const temp = [...selectedItems];
      const index = temp.findIndex((elem) => elem[getValuesKey] == option[getValuesKey]);
      if (index !== -1) {
        temp.splice(index, 1);
      } else {
        temp.push(option);
      }
      setSelectedItems(temp);
      setFieldValue(
        field?.name,
        temp.map((elem) => elem[getValuesKey]),
      );
    } else {
      setIsComponentVisible(false);
      const valueToSet = props.store === 'obj' ? option : option.id;
      const { inputprops, index, title } = props;
      setSelectedItems(option);
      setvalue ? setvalue(inputprops.name, valueToSet, index, title) : setFieldValue(inputprops.name, valueToSet, index);
    }
  };
  useEffect(() => {
    // Setting variables for type Array datas
    if (props.inputprops?.setsearch) {
      Array.isArray(field?.value) && setSelectedItems && setSelectedItems(listOpt.filter((elem) => field?.value?.includes(elem[getValuesKey])));
    } else {
      Array.isArray(field?.value) && setSelectedItems && setSelectedItems(list.filter((elem) => field?.value?.includes(elem[getValuesKey])));
    }
    // Setting variables for type String datas
    if (props.inputprops?.setsearch) {
      !Array.isArray(field?.value) && setSelectedItems && setSelectedItems(listOpt.find((elem) => field?.value == elem[getValuesKey]));
    } else {
      !Array.isArray(field?.value) && setSelectedItems && setSelectedItems(list.find((elem) => field?.value == elem[getValuesKey]));
    }
  }, []);

  const RemoveSelectedItem = (id, item) => {
    if (props?.inputprops?.close) {
      setSelectedItems('');
      setFieldValue(field.name, '');
    } else {
      let temp = field.value;
      if (temp.length > 0) {
        temp?.splice(temp.indexOf(id), 1);
        setFieldValue(field.name, temp);
      }
    }
  };
  return (
    <>
      {props.label && (
        <Label htmlFor={props.inputprops.id} className={'label-color'}>
          {props.label}
        </Label>
      )}
      <div className='custom-select-box' ref={ref}>
        {Array.isArray(selectedItems) ? (
          <div className={`category-select-box`} onClick={() => setIsComponentVisible((p) => p !== field?.name && field?.name)}>
            <div className={`bootstrap-tagsinput form-select`}>
              {selectedItems.length > 0 ? (
                selectedItems?.map((item, i) => (
                  <span className='tag label label-info' key={i}>
                    {item?.name}
                    <a className='ms-2 text-white'>
                      <RiCloseLine
                        onClick={(e) => {
                          e.stopPropagation();
                          RemoveSelectedItem(item[getValuesKey], item);
                          setSelectedItems((p) => p.filter((elem) => elem[getValuesKey] !== item[getValuesKey]));
                        }}
                      />
                    </a>
                  </span>
                ))
              ) : (
                <span>{t('Select')}</span>
              )}
            </div>
          </div>
        ) : (
          <Input
            type='text'
            className='form-control form-select cursor position-absolute'
            value={t(setvalue !== undefined ? props.inputprops.value || selectedItems?.name : props.inputprops?.options?.find((item) => item.id === field.value)?.name) || t('Select')}
            onClick={() => setIsComponentVisible(true)}
            readOnly
            invalid={Boolean(touched[field.name] && errors[field.name])}
          />
        )}
        {!Array.isArray(selectedItems) && (
          <Input
            id={props.inputprops.id}
            {...field}
            {...props}
            placeholder='Search'
            className='form-control form-select'
            type='text'
            invalid={Boolean(touched[field.name] && errors[field.name])}
            disabled
          />
        )}
        <p className='help-text'>{props?.inputprops?.helpertext}</p>
        {props.inputprops?.setsearch
          ? listOpt?.length > 0
          : list?.length > 0 && (
            <div className={`box-content custom-select ${isComponentVisible ? 'open' : ''}`}>
              <Input type='text' className='form-control' value={searchInput || ''} onChange={(e) => setSearchInput(e.target.value)} />
              <ul className='intl-tel-input'>
                {(props.inputprops?.setsearch ? listOpt : list)?.map((option, index) => (
                  <Fragment key={index}>
                    {option?.data ? (
                      <li
                        onClick={() => {
                          setIsComponentVisible(false);
                          setvalue
                            ? setvalue(props.inputprops.name, props.store === 'obj' ? option : option.id, props.index, props?.title)
                            : setFieldValue(props.inputprops.name, props.store === 'obj' ? option : option.id, props.index);
                        }}>
                        <div className='country'>
                          <div className='flag-box'>
                            <div className={`iti-flag ${option?.data?.class}`}></div>
                          </div>
                          <span className='dial-code'>{option?.data?.code}</span>
                        </div>
                      </li>
                    ) : (
                      <li onClick={() => onSelectValue(option)}>
                        {option?.image && <Image src={option?.image} className='img-fluid category-image' alt={option?.name} height={50} width={50} />}
                        <p className={`cursor ${(selectedItems?.[index]?.[getValuesKey] || selectedItems?.[getValuesKey]) == option[getValuesKey] ? 'selected' : ''}`}>{t(option.name)}</p>
                      </li>
                    )}
                  </Fragment>
                ))}
              </ul>
            </div>
          )}
        {touch && error && (
          <FormFeedback>
            {t(props.title)} {t('IsRequired')}
          </FormFeedback>
        )}
        {props?.inputprops?.close && (
          <div className='close-icon'>
            <RiCloseLine onClick={() => RemoveSelectedItem()} />
          </div>
        )}
      </div>
    </>
  );
};
export default ReactstrapSelectInput;
