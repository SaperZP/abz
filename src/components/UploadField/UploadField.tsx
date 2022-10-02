import React, {FC, useState} from 'react';
import './UploadField.scss';
import classNames from "classnames";

interface UploadFieldProps {
  onChangeHandler: (event: HTMLInputElement["files"]) => void;
  errorMessage: string;
  isValid: boolean;
  placeholder: string;
  customClass?: string;
  uploadText:string;
}

const UploadField: FC<UploadFieldProps> = (
    {
      customClass,
      onChangeHandler,
      errorMessage,
      isValid,
      placeholder,
      uploadText,
    }) => {
  const [isTouched, setIsTouched] = useState(false)
  const hasCustomClass = customClass ? customClass : '';

  return (
      <div className={classNames(
          {[hasCustomClass]: hasCustomClass},
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
