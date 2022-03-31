import { Link } from 'react-router-dom';
import { useState } from 'react';
import './Auth.css';
import { useAuth } from '../../context';

export const Signup = () => {
  const { signupUser } = useAuth();
  const [signupForm, setSignupForm] = useState({
    email: '',
    password: '',
    name: '',
  });

  const signupHandler = (e) => {
    e.preventDefault();
    const { email, password, name } = signupForm;
    if (email && password && name !== '') {
      (async () => {
        signupUser(email, password, name);
      })();
    }
  };

  return (
    <>
      <div className='container'>
        <form>
          <div className='auth__form'>
            <div className='auth__title'>
              <h2 className='heading text__center'>Signup</h2>
            </div>
            <div className='input'>
              <label className='label__text'>Name</label>
              <input
                className='input-txt'
                type='text'
                value={signupForm.name}
                onChange={(e) =>
                  setSignupForm({ ...signupForm, name: e.target.value })
                }
                required
              />
            </div>
            <div className='input'>
              <label className='label__text'>Email</label>
              <input
                className='input-txt'
                type='email'
                value={signupForm.email}
                onChange={(e) =>
                  setSignupForm({
                    ...setSignupForm,
                    email: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className='input'>
              <label className='label__text'>Password</label>
              <input
                className='input-txt'
                type='password'
                value={signupForm.password}
                onChange={(e) =>
                  setSignupForm({
                    ...signupForm,
                    password: e.target.value,
                  })
                }
                required
              />
            </div>
            <div className='input'>
              <label className='label__text input__checkbox'></label>
              <input type='checkbox' />
              <span className='text'>Remember Me</span>
              <Link to='/login' className='auth__forget'>
                Forget your Password?
              </Link>
            </div>

            <div className='btn__signup text__center'>
              <button onClick={(e) => signupHandler(e)} className='btn '>
                Signup
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};
