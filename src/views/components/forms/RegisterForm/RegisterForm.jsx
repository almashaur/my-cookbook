import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../../../services/authService';
import { UserContext } from '../../../../context/UserContext';


const SignUpForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const { username, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    console.log(formData);
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };
  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="text-center mb-3">Sign Up</h1>
        <p className="text-center text-danger">{message}</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="username" className="form-label">Username:</label>
            <input
              type="text"
              id="name"
              value={username}
              name="username"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="confirm" className="form-label">Confirm Password:</label>
            <input
              type="password"
              id="confirm"
              value={passwordConf}
              name="passwordConf"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary w-100 me-2" disabled={isFormInvalid()}>Sign Up</button>
            <button className="btn btn-secondary w-100" type="button" onClick={() => navigate('/')}>Cancel</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignUpForm;