import { useState } from 'react'
import LoginForm from './login'
import RegisterForm from './register'
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa'

function LoginFormCircle() {
  const [isRegister, setIsRegister] = useState<Boolean>(false)

  return (
    <div className='relative flex items-center justify-center from-blue-100 to-purple-200 overflow-hidden'>
      {/* Circle */}
      <div
        className='w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] lg:w-[500px] lg:h-[500px] xl:w-[600px] xl:h-[600px] rounded-full bg-white overflow-hidden relative transition-all duration-500'
        style={{
          // padding: '10px',
          borderRadius: '20px',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <div
          className={`absolute top-[-18px] left-0 h-full w-[205%] flex transition-transform duration-500 ${
            isRegister ? '-translate-x-1/2' : 'translate-x-0'
          }`}
        >
          {/* Form Login */}
          <div className='w-1/2 flex flex-col items-center justify-center px-6'>
            <LoginForm />
          </div>
          {/* Form Register */}
          <div className='w-1/2 flex flex-col items-center justify-center px-6'>
            <RegisterForm />
          </div>
        </div>
      </div>

      {/* Mũi tên dưới góc trái */}
      <div className='absolute bottom-6 left-6'>
        {isRegister ? (
          <button
            onClick={() => setIsRegister(false)}
            className='flex items-center text-gray-700 bg-transparent  transition'
            style={{
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <FaArrowLeft className='mr-2' />
            Về đăng nhập
          </button>
        ) : (
          <button
            onClick={() => setIsRegister(true)}
            className='flex items-center text-white-500 bg-[#90caf9] transition'
            style={{
              padding: '10px',
              borderRadius: '10px',
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)'
            }}
          >
            Sang đăng ký
            <FaArrowRight className='ml-2' />
          </button>
        )}
      </div>
    </div>
  )
}

export default LoginFormCircle
