import Lottie from 'lottie-react'
import loader from '../../assets/animations/loader.json'
const Login = () => {
  return (
    <div className='h-full overflow-hidden relative'>
      <Lottie animationData={loader} className='absolute top-0 right-0 size-full scale-150' />
    </div>
  )
}

export default Login
