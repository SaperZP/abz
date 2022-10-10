import React, {FC, useEffect, useState} from 'react';
import './AddUser.scss';
import successImage from '../../assets/success-image.svg';
import TextField from "../TextField/TextField";
import RadioButtonsField from "../RadioButtonsField/RadioButtonsField";
import UploadField from "../UploadField/UploadField";
import {addUser, getPositions, getToken} from "../../api";
import {regexEmail, regexPhone} from "../../regex";
import classNames from "classnames";
import {useAppDispatch} from "../../store/hooks";
import * as actions from "../../store/usersReducer";

interface Props {
}

const AddUser: FC<Props> = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [positions, setPositions] = useState<Position[]>([]);
  const [position_id, setPositions_id] = useState('1');
  const [photo, setPhoto] = useState<File | null>(null);
  const [uploadText, setUploadText] = useState('');
  const [isValid, setIsValid] = useState<FieldsError>({
    nameIsValid: false,
    emailIsValid: false,
    phoneIsValid: false,
    photoIsValid: false,
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getPositions().then(response => setPositions(response.positions))
  }, [])

  const nameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setName(value)
    setIsValid((prev) => {
      return {
        ...prev,
        nameIsValid: value.length >= 2 && value.length <= 60
      }
    })
  }

  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setEmail(event.target.value)
    setIsValid((prev) => {
      return {
        ...prev,
        emailIsValid: regexEmail.test(value)
      }
    })
  }

  const phoneChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setPhone(event.target.value)
    setIsValid((prev) => {
      return {
        ...prev,
        phoneIsValid: regexPhone.test(value)
      }
    })
  }

  const positionIdHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPositions_id(event.target.value)
  }

  const photoUploadHandler = (files: HTMLInputElement["files"]) => {
    if (files !== null && files[0]) {
      setPhoto(files[0])
      setUploadText(files![0].name)
      setIsValid((prev) => {
        return {
          ...prev,
          photoIsValid: files[0].size < 5242880 && files[0].type === 'image/jpeg'
        }
      })
    } else {
      setPhoto(null)
      setUploadText('')
      setIsValid((prev) => {
        return {
          ...prev,
          photoIsValid: false
        }
      })
    }
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('position_id', position_id);
    formData.append('photo', photo as Blob);

    getToken().then(response => {
      addUser(formData, response.token)
          .then(response => {
            if (response.success) {
              setIsSuccess(response.success)
              document.body.classList.add('page__body--modal-open');
              dispatch(actions.addUsersFromServer(1))
              setName('')
              setEmail('')
              setPhone('')
              setPositions_id('1')
              setPhoto(null)
              setUploadText('')
            }
          })
    })
  }

  return (
      <div className="add-user">
        <h2 className="add-user__title page__title" id="signup">
          Working with POST request
        </h2>

        <form
            className="add-user__form form"
            onSubmit={submitHandler}
        >
          <TextField
              customClass='form__field'
              type={'text'}
              placeholder={'Your name'}
              value={name}
              onChangeHandler={nameChangeHandler}
              errorMessage={'name, should be 2-60 characters'}
              isValid={isValid.nameIsValid}
          />

          <TextField
              customClass='form__field'
              type={'email'}
              placeholder={'Email'}
              value={email}
              onChangeHandler={emailChangeHandler}
              errorMessage={'email, must be a valid email'}
              isValid={isValid.emailIsValid}
          />

          <TextField
              customClass='form__field'
              type={'tel'}
              placeholder={'Phone'}
              value={phone}
              onChangeHandler={phoneChangeHandler}
              errorMessage={'phone number, should start of +380'}
              isValid={isValid.phoneIsValid}
          />

          <RadioButtonsField
              customClass='form__field'
              items={positions}
              onChangeHandler={positionIdHandler}
              selectedButton={position_id}
          />

          <UploadField
              customClass='form__field'
              onChangeHandler={photoUploadHandler}
              errorMessage={'Min size of photo 70x70px. Only jpeg/jpg type, not greater than 5 Mb.'}
              isValid={isValid.photoIsValid}
              placeholder={'Upload your photo'}
              uploadText={uploadText}
          />

          <button
              className={classNames(
                  'form__submit-button button',
                  {"button--disabled": !Object.values(isValid).every(value => value)}
              )}
              type='submit'
              disabled={!Object.values(isValid).every(value => value)}
          >
            Sign up
          </button>

        </form>

        {isSuccess &&
            <div className="add-user__success">
              <div
                  className="add-user__success-close"
                  onClick={() => {
                    document.body.classList.remove('page__body--modal-open');
                    setIsSuccess(false)
                  }}
              >
                x
              </div>

              <div className="add-user__success-text">
                User successfully registered
              </div>

              <img
                  src={successImage}
                  alt="success"
                  className="add-user__success-image"
              />
            </div>
        }
      </div>
  )
};

export default AddUser;
