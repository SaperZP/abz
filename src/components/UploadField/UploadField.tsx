import React, {FC, useState} from 'react';
import './UploadField.scss';
import classNames from "classnames";

interface UploadFieldProps {
  onChangeHandler: (event: HTMLInputElement["files"]) => void;
  errorMessage: string;
  isValid: boolean;
  placeholder: string;
  customClass?: string;
}

const UploadField: FC<UploadFieldProps> = (
    {
      customClass,
      onChangeHandler,
      errorMessage,
      isValid,
      placeholder
    }) => {
  const [isTouched, setIsTouched] = useState(false)
  const [uploadText, setUploadText] = useState('');
  const customClassVerified = customClass ? customClass : '';

  return (
      <div className={classNames(
          {[customClassVerified]: customClassVerified},
          "upload-field",
      )}>
        <label className="upload-field__label">
          Upload

          <input
              className="upload-field__input"
              type={'file'}
              onChange={event => {
                onChangeHandler(event.target.files)
                setIsTouched(true)
                setUploadText(event.target.files
                    ? event.target.files[0].name
                    : '')
              }}
          />
        </label>

          <input
              className="upload-field__text-input"
              readOnly
              value={uploadText}
              type={"text"}
              placeholder={placeholder}
          />
          {!isValid && isTouched &&
              <p className="text-field__error-message">
                {errorMessage}
              </p>
          }
      </div>
  )
};

export default UploadField;