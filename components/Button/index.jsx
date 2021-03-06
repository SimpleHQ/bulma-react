import React from 'react';
import PropTypes from 'prop-types';

import classnames from 'classnames';
import {
  modifierClassList, defaultReactProps, defaultReactPropsValues
} from '../utils';

const Button = ({
  className, isLink, isInverted,
  children, ...props
}) => {
  let {classList, ...finalProps} = modifierClassList(props);
  classList = classnames('button', className, classList, {
    'is-link': isLink,
    'is-inverted': isInverted,
  });

  return (
    <button className={classList} {...finalProps}>
      {children}
    </button>
  );
};

Button.propTypes = {
  isLink: PropTypes.bool,
  isInverted: PropTypes.bool,
  children: PropTypes.node,
  type: PropTypes.string,
  ...defaultReactProps
};

Button.defaultProps = {
  isLink: false,
  isInverted: false,
  type: "button",
  ...defaultReactPropsValues
};

export default Button;
