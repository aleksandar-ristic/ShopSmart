import React, { useState, useEffect } from 'react'
import  MetaData from '../layout/MetaData'

import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { updatePassword, clearErrors } from '../../actions/userActions'

import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants'

const UpdatePassword = ({ history }) => {

  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const alert = useAlert();
  const dispatch = useDispatch();

  const { error, isUpdated, loading } = useSelector(
    state => state.user)

  useEffect(() => {

    if(error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if(isUpdated) {
      alert.success('Password Updated Successfully');

      history.push('/me');

      dispatch({
        type: UPDATE_PASSWORD_RESET
      })
    }

  }, [dispatch, alert, error, history, isUpdated])

  const submitHandler = e => {
    e.preventDefault();

    const formData = new FormData();
    formData.set('oldPassword', oldPassword );
    formData.set('newPassword', newPassword );

    dispatch(updatePassword(formData));
  }

  return (
    <>
      <div className="row wrapper">
            <div className="col-10 col-lg-5">
                <form className="shadow-lg">
                    <h1 className="mb-3">Update Password</h1>

                    <div className="form-group">
                        <label htmlFor="password_field">Old Password</label>
                        <input
                            type="password"
                            id="password_field"
                            className="form-control"
                            value={oldPassword}
                            onChange={(e) => 
                              setOldPassword(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirm_password_field">Confirm Password</label>
                        <input
                            type="password"
                            id="confirm_password_field"
                            className="form-control"
                            value={newPassword}
                            onChange={(e) => 
                              setNewPassword(e.target.value)}
                        />
                    </div>

                    <button
                        id="new_password_button"
                        type="submit"
                        className="btn btn-block py-3"
                        disabled={ loading ? true : false }
                        >
                        Set Password
                    </button>

                </form>
            </div>
        </div>
    </>
  )
}

export default UpdatePassword
