import React, { FC, useState } from 'react';
import './TextField.scss';
import classNames from 'classnames';

interface TextFieldProps {
  type: 'text' | 'tel' | 'email';
  placeholder: string;
  value: string;
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
  isValid: boolean;
  customClass?: string;
  hint?: string;
}

const TextField: FC<TextFieldProps> = ({
  hint,
  customClass,
  type,
  placeholder,
  value,
  onChangeHandler,
  errorMessage,
  isValid,
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const customClassVerified = customClass ? customClass : '';

  return (
    <div
      className={classNames(
        { [customClassVerified]: customClassVerified },
        'text-field'
      )}
    >
      <input
        className={classNames('text-field__input', {
          'text-field__input--error': !isValid && isTouched,
        })}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
        onBlur={() => setIsTouched(true)}
      />
      {!isValid && hint && !isTouched && (
        <p className="text-field__hint-message">{hint}</p>
      )}

      {!isValid && isTouched && (
        <p className="text-field__error-message">{errorMessage}</p>
      )}
    </div>
  );
};

export default TextField;
