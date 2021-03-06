import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import {
  modifierClassList, defaultReactProps, defaultReactPropsValues
} from '../utils';

const valueAtPath = (item, path) => {
  let value = item;
  for (let key of path) {
    value = value[key];
  }
  return value;
};

const placeholder = (name, value) => {
  if (!name) return null;
  return (<Option labelPath={['name']} valuePath={['value']} item={{name, value}} />);
};

const Option = ({item, valuePath, labelPath, ...props}) => {
  const value = valuePath ? valueAtPath(item, valuePath) : null;
  const label = valueAtPath(item, labelPath);
  return (
    <option value={value} {...props}>{label}</option>
  );
};

Option.propTypes = {
  item: PropTypes.object,
  valuePath: PropTypes.array,
  labelPath: PropTypes.array.isRequired
};

Option.defaultProps = {
  labelPath: ['name']
};

const Select = ({
  children, options, className, valuePath, labelPath, onChange, defaultValue, value, placeholderText, placeholderValue, ...props
}) => {
  let {classList, ...finalProps} = modifierClassList(props);
  classList = classnames('select', className, classList);
  return (
    <span className={classList} {...finalProps}>
      <select onChange={onChange} defaultValue={defaultValue} value={value}>
        {children}
        {placeholder(placeholderText, placeholderValue)}
        {options.map((option, idx) => {
          return (
            <Option key={`select-option-${idx}`} item={option} valuePath={valuePath} labelPath={labelPath} />
          );
        })}
      </select>
    </span>
  );
};

Select.propTypes = {
  options: PropTypes.array.isRequired,
  valuePath: PropTypes.array,
  labelPath: PropTypes.array.isRequired,
  children: PropTypes.node,
  ...defaultReactProps
};

Select.defaultProps = {
  labelPath: ['name'],
  ...defaultReactPropsValues
};

export {
  Select as default,
  Option
};
