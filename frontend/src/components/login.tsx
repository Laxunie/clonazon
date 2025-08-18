import type { AuthProps } from "../utils/types"

const Login = ({ toggleAuthMode }: AuthProps) => {
  return (
    <div>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <button>Login</button>
        <span>Don't have an account? <button className='cursor-pointer' onClick={toggleAuthMode}>Sign up</button></span>
    </div>
  )
}

export default Login