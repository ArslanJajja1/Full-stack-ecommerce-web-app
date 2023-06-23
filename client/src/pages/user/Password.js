import React, { useState } from 'react';
import UserNav from '../../components/nav/UserNav';
import { auth } from '../../firebase';
import { updatePassword } from 'firebase/auth';
import { toast } from 'react-toastify';

const Password = () => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setPassword('');
    const user = await auth.currentUser;
    await updatePassword(user, password)
      .then(() => {
        setLoading(false);
        toast.success('Password updated');
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };
  const passwordUpdateForm = () => (
    <form onSubmit={handleSubmit} className="text-white font-weight-bold productCard-container shadow-lg bg-body p-3">
      <div className="form-group">
        <label>Your Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control text-white"
          placeholder="Enter new password"
          disabled={loading}
        />
        <br />
        <button
          disabled={!password || password.length < 6 || loading}
          style={{ color: '#2c2c6c', letterSpacing: '1px' }}
          className="btn mt-2 bg-white font-weight-bold btn-raised"
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </div>
    </form>
  );
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-1">
          <UserNav />
        </div>
        <div className="col-md-11">
          <h4
            className="text-white  font-weight-bold font-italic mx-auto my-4"
            style={{ letterSpacing: '3px', borderBottom: '5px solid #4db5ff', width: 'fit-content' }}
          >
            Password Update
          </h4>
          {passwordUpdateForm()}
        </div>
      </div>
    </div>
  );
};

export default Password;
