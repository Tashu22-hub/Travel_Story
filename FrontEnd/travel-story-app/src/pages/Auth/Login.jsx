import React from 'react'

const Login = () => {
  return (
    <div className='h-screen bg-cyan-50 overflow-hidden relative'>
      <div className="container h-screen flex justify-center items-center px-20 mx-auto">
        <div className="">
        </div>
        <div className="">
          <form onSubmit={() => {}}>
            <h4 className='text-2xl font-semibold mb-7'>Login</h4>

            <input type="text" placeholder="Email" className='input-box' /><br /><br />

            <input type="password" placeholder="Password" className='input-box' /><br/><br />

            <button type="submit" className='btn-primary'>Login</button>

            <p className = "">Or</p>

            <button 
            type="submit" 
            className="" 
            onClick={() => { 
            navigate ("/signup");
            }}>
            CREATE ACCOUNT
            </button>
          </form>
        </div>
  
      </div>
      
    </div>
  )
}

export default Login
