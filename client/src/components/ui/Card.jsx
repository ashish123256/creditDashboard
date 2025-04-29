import { Children, cloneElement } from 'react';
import PropTypes from 'prop-types';

const Card = ({ 
  children, 
  className = '', 
  hoverEffect = false, 
  rounded = 'lg',
  shadow = 'md',
  border = false,
  ...props 
}) => {
  // Add interactive styles if hoverEffect is true
  const hoverClasses = hoverEffect 
    ? 'transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5' 
    : '';

  // Handle rounded corners
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full',
  }[rounded];

  // Handle shadow
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  }[shadow];

  // Handle border
  const borderClasses = border ? 'border border-gray-200' : '';

  // Clone children to add common classes to CardHeader, CardBody, CardFooter
  const enhancedChildren = Children.map(children, child => {
    if (child?.type?.displayName === 'CardHeader' || 
        child?.type?.displayName === 'CardBody' || 
        child?.type?.displayName === 'CardFooter') {
      return cloneElement(child, {
        className: `${child.props.className || ''} ${
          child.type.displayName === 'CardHeader' ? 'border-b border-gray-200' : ''
        } ${
          child.type.displayName === 'CardFooter' ? 'border-t border-gray-200' : ''
        }`.trim()
      });
    }
    return child;
  });

  return (
    <div
      className={`bg-white ${roundedClasses} ${shadowClasses} ${borderClasses} ${hoverClasses} ${className}`}
      {...props}
    >
      {enhancedChildren}
    </div>
  );
};

// Card Sub-components
const CardHeader = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 ${className}`} {...props}>
    {children}
  </div>
);
CardHeader.displayName = 'CardHeader';

const CardBody = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 ${className}`} {...props}>
    {children}
  </div>
);
CardBody.displayName = 'CardBody';

const CardFooter = ({ children, className = '', ...props }) => (
  <div className={`px-6 py-4 ${className}`} {...props}>
    {children}
  </div>
);
CardFooter.displayName = 'CardFooter';

// Attach sub-components to Card
Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

// Prop Types
Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hoverEffect: PropTypes.bool,
  rounded: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl', 'full']),
  shadow: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
  border: PropTypes.bool,
};

export default Card;