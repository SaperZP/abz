import React, {FC} from 'react';
import './RadioButtonsField.scss';
import classNames from "classnames";

interface RadioButtonsFieldProps {
  items: Position[];
  onChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedButton: string;
  customClass?: string;
}

const RadioButtonsField: FC<RadioButtonsFieldProps> = (
    {
      customClass,
      items,
      onChangeHandler,
      selectedButton
    }) => {
  const customClassVerified = customClass ? customClass : '';

  return (
      <div className={classNames(
          {[customClassVerified]: customClassVerified},
          'radio-buttons',
      )}>
        <p className="radio-buttons__title">
          Select your position
        </p>
        {items.map(position =>
            <label
                key={position.id}
                className='radio-buttons__label'
            >
              <input
                  className='radio-buttons__button'
                  type={"radio"}
                  name={'position_id'}
                  value={position.id}
                  onChange={event => onChangeHandler(event)}
                  checked={+selectedButton === position.id}

              />
              {position.name}
            </label>
        )}
      </div>
  )
};

export default RadioButtonsField;
