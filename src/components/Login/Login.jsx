import GoogleAuthButton from './GoogleAuthButton'
import logoIcon from 'assets/logo-w.svg'
import logoName from 'assets/logo-wealthwizard.svg'

const Login = () => {
  return (
    <div>
      {/* Fancy background */}
      <div className="fixed z-0 size-full select-none blur-2xl">
        <svg
          className="absolute right-0 top-20 w-[800px] blur-2xl"
          viewBox="0 0 440 440"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M220,341.3841099245474C304.17143065397954,341.3841099245474,398.10386971260107,304.17143065397954,398.10386971260107,220C398.10386971260107,112.84296317344463,327.15703682655544,11.264769819487496,220.00000000000006,11.264769819487523C130.19036164169134,11.264769819487533,123.47690483050728,130.19036164169125,123.4769048305073,219.99999999999997C123.47690483050728,280.56377084478913,159.43622915521084,341.3841099245474,220,341.3841099245474"
            fill="#B8A7E726"
          ></path>
        </svg>
        <svg
          className="absolute left-0 top-[40%] mx-auto w-[800px] opacity-15 blur-2xl"
          viewBox="0 0 440 440"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M220,341.3841099245474C304.17143065397954,341.3841099245474,398.10386971260107,304.17143065397954,398.10386971260107,220C398.10386971260107,112.84296317344463,327.15703682655544,11.264769819487496,220.00000000000006,11.264769819487523C130.19036164169134,11.264769819487533,123.47690483050728,130.19036164169125,123.4769048305073,219.99999999999997C123.47690483050728,280.56377084478913,159.43622915521084,341.3841099245474,220,341.3841099245474"
            fill="#3484BE99"
          ></path>
        </svg>
        <svg
          className="absolute right-0 top-[50%] mx-auto w-[900px] opacity-5 blur-2xl"
          viewBox="0 0 440 440"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M220,341.3841099245474C304.17143065397954,341.3841099245474,398.10386971260107,304.17143065397954,398.10386971260107,220C398.10386971260107,112.84296317344463,327.15703682655544,11.264769819487496,220.00000000000006,11.264769819487523C130.19036164169134,11.264769819487533,123.47690483050728,130.19036164169125,123.4769048305073,219.99999999999997C123.47690483050728,280.56377084478913,159.43622915521084,341.3841099245474,220,341.3841099245474"
            fill="white"
          ></path>
        </svg>
      </div>

      {/* Form */}
      <div className=" text-white bg-[#121212] h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col gap-8">
          <div className="flex items-center gap-2">
            <img className="w-24" src={logoIcon} alt="" />
            <img className="h-24" src={logoName} alt="" />
          </div>

          <div className="text-center w-fit mx-auto">
            <GoogleAuthButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
