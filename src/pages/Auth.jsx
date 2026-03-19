import React, { useContext } from 'react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'


const Auth = () => {
  const [mode, setMode] = useState("signup")
  const { signUp,user, logOut, logIn } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm();

  const onSubmit = (data) => {
    setError(null);
    let result;

    if (mode === "signup") {
      result = signUp(data.email, data.password);
    } else {
      result = logIn(data.email, data.password);
    }

    console.log(result);
    if (!result.success) {
      setError(result.error);
    } else {
      setError(null);
      navigate("/");
    }
  };

  return (
    <div className='page'>
      <div className="container">
        <div className="auth-container">
          { user && <p>User logged in {user.email}</p> }
          <button className='btn btn-secondary' onClick={logOut}>Log Out</button>

          <h1 className="page-title">{mode === "signup" ? "Sign Up" : "Log In"}</h1>

          <form  className="auth-form" onSubmit={handleSubmit(onSubmit)}>
            {error && <span className="error-message">{error}</span>}

            <div className="form-group">
              <label className='form-label' htmlFor="email">Email:</label>
              <input type="email" className="form-input" id="email" {...register("email", { required: "Email is required" })} />

              {errors.email &&  <span className="form-error">{errors.email.message}</span>}
            </div>

            <div className="form-group">
              <label className='form-label'>Password:</label>
              <input 
                type="password" 
                className="form-input" 
                id="password" 
                {
                  ...register(
                    "password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters"
                      },
                      maxLength: {
                        value: 12,
                        message: "Password must be less than 12 characters"
                      }
                    })} 
              />
              {errors.password && <span className="form-error">{errors.password.message}</span>}
            </div>

            <button type="submit" className="btn btn-primary btn-large">{mode === "signup" ? "Sign Up" : "Log In"}</button>
          </form>

          <div className='auth-switch'>
            {mode === "signup" ? (
              <p>

                Already have an account? <span className='auth-link' onClick={() => setMode("login")}>Log In</span>
              </p>
              
            ) : (
              <p>
                Don't have an account? <span className='auth-link' onClick={() => setMode("signup")}>Sign Up</span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Auth
