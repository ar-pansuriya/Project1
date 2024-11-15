import { Link } from 'react-router-dom'
import logo from "../../assets/Logo.svg"
import microsoft from "../../assets/Microsoft.svg"

const Login = () => {
    return (
        <>
            <div className='h-screen w-full relative text-[#25245F]'>
                <div className='w-[600px] h-[350px] flex flex-col items-center justify-center bg-[#F9FAFB] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[20px]'>
                    <img width="180px" src={logo} alt="logo" />
                    <h1 className='font-medium mt-10 text-2xl'>Welcome Back!</h1>
                    <p className='text-[#66668F] mt-3 font-normal'>Get access of your account</p>
                    <Link to="/data-stewardship"><button className='font-semibold text-white bg-[#0A78CD] px-12 py-3 rounded-full mt-7 flex items-center justify-center gap-3 box-shadow'> <img src={microsoft} alt="microsoft_logo" /> Continue With Microsoft</button></Link>
                </div>
            </div>
        </>
    )
}

export default Login
