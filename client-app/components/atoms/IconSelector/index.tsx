import React from 'react'

export type TSvgNames =
  | 'home'
  | 'down-arrow'
  | 'user'
  | 'menu'
  | 'login'
  | 'facebook'
  | 'twitter'
  | 'instagram'
  | 'telf'
  | 'whatsapp'
  | 'Email'
  | 'map'
  | 'cart'
  | 'close'
  | 'check'
  | 'error'
  | 'trash'
  | 'edit'
  | 'arrow-left'
  | 'arrow-right'
  | 'delete'
  | 'eye'
  | 'checked'
  | 'users'

type TIconSelectorProps = {
  name: TSvgNames
  color?: string
  width?: string
  height?: string
  stroke?: number
  fill?: string
  className?: React.ComponentProps<'div'>['className']
}

const IconSelector: React.FC<TIconSelectorProps> = ({
  name,
  color = 'text-inherit',
  width = 'w-6',
  stroke = 2,
  height = 'h-6',
  fill = 'fill-current',
  className = ''
}) => {
  switch (name) {
    case 'home':
      return (
        <svg
          className={`${width} ${height} ${color} ${className}`}
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={stroke}
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25'
          />
        </svg>
      )
    case 'down-arrow':
      return (
        <svg
          className={`${width} ${height} ${color} ${className}`}
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={stroke}
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15.75 19.5L8.25 12l7.5-7.5'
          />
        </svg>
      )
    case 'user':
      return (
        <svg
          className={`${width} ${height} ${color} ${className}`}
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={stroke}
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z'
          />
        </svg>
      )
    case 'menu':
      return (
        <svg
          className={`${width} ${height} ${color} ${className}`}
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={stroke}
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
          />
        </svg>
      )
    case 'facebook':
      return (
        <svg
          className={`${width} ${height} ${color} ${className} ${fill}`}
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 512 512'
        >
          <path d='M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z' />
        </svg>
      )
    case 'twitter':
      return (
        <svg
          className={`${width} ${height} ${color} ${className}`}
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={stroke}
          stroke='currentColor'
        >
          <path d='M19.633 7.997c.013.175.013.349.013.523 0 5.325-4.053 11.461-11.46 11.461-2.282 0-4.402-.661-6.186-1.809.324.037.636.05.973.05a8.07 8.07 0 0 0 5.001-1.721 4.036 4.036 0 0 1-3.767-2.793c.249.037.499.062.761.062.361 0 .724-.05 1.061-.137a4.027 4.027 0 0 1-3.23-3.953v-.05c.537.299 1.16.486 1.82.511a4.022 4.022 0 0 1-1.796-3.354c0-.748.199-1.434.548-2.032a11.457 11.457 0 0 0 8.306 4.215c-.062-.3-.1-.611-.1-.923a4.026 4.026 0 0 1 4.028-4.028c1.16 0 2.207.486 2.943 1.272a7.957 7.957 0 0 0 2.556-.973 4.02 4.02 0 0 1-1.771 2.22 8.073 8.073 0 0 0 2.319-.624 8.645 8.645 0 0 1-2.019 2.083z'></path>
        </svg>
      )
    case 'instagram':
      return (
        <svg
          className={`${width} ${height} ${color} ${className} ${fill}`}
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
        >
          <path d='M20.947 8.305a6.53 6.53 0 0 0-.419-2.216 4.61 4.61 0 0 0-2.633-2.633 6.606 6.606 0 0 0-2.186-.42c-.962-.043-1.267-.055-3.709-.055s-2.755 0-3.71.055a6.606 6.606 0 0 0-2.185.42 4.607 4.607 0 0 0-2.633 2.633 6.554 6.554 0 0 0-.419 2.185c-.043.963-.056 1.268-.056 3.71s0 2.754.056 3.71c.015.748.156 1.486.419 2.187a4.61 4.61 0 0 0 2.634 2.632 6.584 6.584 0 0 0 2.185.45c.963.043 1.268.056 3.71.056s2.755 0 3.71-.056a6.59 6.59 0 0 0 2.186-.419 4.615 4.615 0 0 0 2.633-2.633c.263-.7.404-1.438.419-2.187.043-.962.056-1.267.056-3.71-.002-2.442-.002-2.752-.058-3.709zm-8.953 8.297c-2.554 0-4.623-2.069-4.623-4.623s2.069-4.623 4.623-4.623a4.623 4.623 0 0 1 0 9.246zm4.807-8.339a1.077 1.077 0 0 1-1.078-1.078 1.077 1.077 0 1 1 2.155 0c0 .596-.482 1.078-1.077 1.078z'></path>
          <circle cx='11.994' cy='11.979' r='3.003'></circle>
        </svg>
      )
    case 'telf':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`${width} ${height} ${color} ${className}`}
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={stroke}
          stroke='currentColor'
        >
          <path d='M20 10.999h2C22 5.869 18.127 2 12.99 2v2C17.052 4 20 6.943 20 10.999z'></path>
          <path d='M13 8c2.103 0 3 .897 3 3h2c0-3.225-1.775-5-5-5v2zm3.422 5.443a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.391L6.859 3.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C11.305 20.707 16.323 21 17.705 21c.202 0 .326-.006.359-.008a.992.992 0 0 0 .648-.291l1.86-2.171a1 1 0 0 0-.086-1.391l-4.064-3.696z'></path>
        </svg>
      )
    case 'whatsapp':
      return (
        <svg
          className={`${width} ${height} ${color} ${className} ${fill}`}
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <g>
            <path fill='none' d='M0 0h24v24H0z' />
            <path
              fillRule='nonzero'
              d='M2.004 22l1.352-4.968A9.954 9.954 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10a9.954 9.954 0 0 1-5.03-1.355L2.004 22zM8.391 7.308a.961.961 0 0 0-.371.1 1.293 1.293 0 0 0-.294.228c-.12.113-.188.211-.261.306A2.729 2.729 0 0 0 6.9 9.62c.002.49.13.967.33 1.413.409.902 1.082 1.857 1.971 2.742.214.213.423.427.648.626a9.448 9.448 0 0 0 3.84 2.046l.569.087c.185.01.37-.004.556-.013a1.99 1.99 0 0 0 .833-.231c.166-.088.244-.132.383-.22 0 0 .043-.028.125-.09.135-.1.218-.171.33-.288.083-.086.155-.187.21-.302.078-.163.156-.474.188-.733.024-.198.017-.306.014-.373-.004-.107-.093-.218-.19-.265l-.582-.261s-.87-.379-1.401-.621a.498.498 0 0 0-.177-.041.482.482 0 0 0-.378.127v-.002c-.005 0-.072.057-.795.933a.35.35 0 0 1-.368.13 1.416 1.416 0 0 1-.191-.066c-.124-.052-.167-.072-.252-.109l-.005-.002a6.01 6.01 0 0 1-1.57-1c-.126-.11-.243-.23-.363-.346a6.296 6.296 0 0 1-1.02-1.268l-.059-.095a.923.923 0 0 1-.102-.205c-.038-.147.061-.265.061-.265s.243-.266.356-.41a4.38 4.38 0 0 0 .263-.373c.118-.19.155-.385.093-.536-.28-.684-.57-1.365-.868-2.041-.059-.134-.234-.23-.393-.249-.054-.006-.108-.012-.162-.016a3.385 3.385 0 0 0-.403.004z'
            />
          </g>
        </svg>
      )
    case 'map':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`${width} ${height} ${color} ${className}`}
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={stroke}
          stroke='currentColor'
        >
          <path d='M12 14c2.206 0 4-1.794 4-4s-1.794-4-4-4-4 1.794-4 4 1.794 4 4 4zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2-2-.897-2-2 .897-2 2-2z'></path>
          <path d='M11.42 21.814a.998.998 0 0 0 1.16 0C12.884 21.599 20.029 16.44 20 10c0-4.411-3.589-8-8-8S4 5.589 4 9.995c-.029 6.445 7.116 11.604 7.42 11.819zM12 4c3.309 0 6 2.691 6 6.005.021 4.438-4.388 8.423-6 9.73-1.611-1.308-6.021-5.294-6-9.735 0-3.309 2.691-6 6-6z'></path>
        </svg>
      )
    case 'cart':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`${width} ${height} ${color} ${className} ${fill} `}
          width='24'
          height='24'
          viewBox='0 0 24 24'
        >
          <path d='M21.822 7.431A1 1 0 0 0 21 7H7.333L6.179 4.23A1.994 1.994 0 0 0 4.333 3H2v2h2.333l4.744 11.385A1 1 0 0 0 10 17h8c.417 0 .79-.259.937-.648l3-8a1 1 0 0 0-.115-.921zM17.307 15h-6.64l-2.5-6h11.39l-2.25 6z'></path>
          <circle cx='10.5' cy='19.5' r='1.5'></circle>
          <circle cx='17.5' cy='19.5' r='1.5'></circle>
        </svg>
      )
    case 'close':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`${width} ${height} ${color} ${className} ${fill} `}
          width='24'
          height='24'
          viewBox='0 0 24 24'
        >
          <path d='m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z'></path>
        </svg>
      )
    case 'login':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`${width} ${height} ${color} ${className} ${fill} `}
          width='24'
          height='24'
          viewBox='0 0 24 24'
        >
          <path d='m13 16 5-4-5-4v3H4v2h9z'></path>
          <path d='M20 3h-9c-1.103 0-2 .897-2 2v4h2V5h9v14h-9v-4H9v4c0 1.103.897 2 2 2h9c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2z'></path>
        </svg>
      )
    case 'check':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`${width} ${height} ${color} ${className} ${fill} `}
          width='24'
          height='24'
          viewBox='0 0 24 24'
        >
          <path d='M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-1.999 14.413-3.713-3.705L7.7 11.292l2.299 2.295 5.294-5.294 1.414 1.414-6.706 6.706z'></path>
        </svg>
      )
    case 'error':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`${width} ${height} ${color} ${className} ${fill} `}
          width='24'
          height='24'
          viewBox='0 0 24 24'
        >
          <path d='M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zm-.001 14.413l-3.713-3.705 1.414-1.414 2.299 2.295 5.294-5.294 1.414 1.414-6.707 6.704z'></path>
        </svg>
      )
    case 'trash':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`${width} ${height} ${color} ${className} ${fill} `}
          width='24'
          height='24'
          viewBox='0 0 24 24'
        >
          <path d='M5 20a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8h2V6h-4V4a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v2H3v2h2zM9 4h6v2H9zM8 8h9v12H7V8z'></path>
          <path d='M9 10h2v8H9zm4 0h2v8h-2z'></path>
        </svg>
      )
    case 'edit':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          viewBox='0 0 24 24'
        >
          <path d='m16 2.012 3 3L16.713 7.3l-3-3zM4 14v3h3l8.299-8.287-3-3zm0 6h16v2H4z'></path>
        </svg>
      )
    case 'arrow-right':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={stroke}
          stroke='currentColor'
          className={`${width} ${height} ${color}`}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M8.25 4.5l7.5 7.5-7.5 7.5'
          />
        </svg>
      )
    case 'arrow-left':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={stroke}
          stroke='currentColor'
          className={`${width} ${height} ${color}`}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15.75 19.5L8.25 12l7.5-7.5'
          />
        </svg>
      )
    case 'checked':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={stroke}
          stroke='currentColor'
          className={`${width} ${height} ${color}`}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M4.5 12.75l6 6 9-13.5'
          />
        </svg>
      )
    case 'users':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className={`${width} ${height} ${color}`}
          viewBox='0 0 24 24'
          fill='currentColor'
        >
          <path
            id='Icon'
            d='M14.1666 17.5V15.8333C14.1666 14.9493 13.8154 14.1014 13.1903 13.4763C12.5652 12.8512 11.7173 12.5 10.8333 12.5H4.16658C3.28253 12.5 2.43468 12.8512 1.80956 13.4763C1.18444 14.1014 0.833252 14.9493 0.833252 15.8333V17.5M19.1666 17.5V15.8333C19.166 15.0948 18.9202 14.3773 18.4677 13.7936C18.0152 13.2099 17.3817 12.793 16.6666 12.6083M13.3333 2.60833C14.0503 2.79192 14.6858 3.20892 15.1396 3.79359C15.5935 4.37827 15.8398 5.09736 15.8398 5.8375C15.8398 6.57764 15.5935 7.29673 15.1396 7.88141C14.6858 8.46608 14.0503 8.88308 13.3333 9.06667M10.8333 5.83333C10.8333 7.67428 9.34087 9.16667 7.49992 9.16667C5.65897 9.16667 4.16658 7.67428 4.16658 5.83333C4.16658 3.99238 5.65897 2.5 7.49992 2.5C9.34087 2.5 10.8333 3.99238 10.8333 5.83333Z'
            stroke='#98A2B3'
            stroke-width='1.67'
            stroke-linecap='round'
            stroke-linejoin='round'
          />
        </svg>
      )
    case 'eye':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='1em'
          viewBox='0 0 576 512'
        >
          <path d='M288 80c-65.2 0-118.8 29.6-159.9 67.7C89.6 183.5 63 226 49.4 256c13.6 30 40.2 72.5 78.6 108.3C169.2 402.4 222.8 432 288 432s118.8-29.6 159.9-67.7C486.4 328.5 513 286 526.6 256c-13.6-30-40.2-72.5-78.6-108.3C406.8 109.6 353.2 80 288 80zM95.4 112.6C142.5 68.8 207.2 32 288 32s145.5 36.8 192.6 80.6c46.8 43.5 78.1 95.4 93 131.1c3.3 7.9 3.3 16.7 0 24.6c-14.9 35.7-46.2 87.7-93 131.1C433.5 443.2 368.8 480 288 480s-145.5-36.8-192.6-80.6C48.6 356 17.3 304 2.5 268.3c-3.3-7.9-3.3-16.7 0-24.6C17.3 208 48.6 156 95.4 112.6zM288 336c44.2 0 80-35.8 80-80s-35.8-80-80-80c-.7 0-1.3 0-2 0c1.3 5.1 2 10.5 2 16c0 35.3-28.7 64-64 64c-5.5 0-10.9-.7-16-2c0 .7 0 1.3 0 2c0 44.2 35.8 80 80 80zm0-208a128 128 0 1 1 0 256 128 128 0 1 1 0-256z' />
        </svg>
      )
    case 'delete':
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          height='1em'
          viewBox='0 0 448 512'
        >
          <path d='M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z' />
        </svg>
      )

    default:
      return <></>
  }
}

export default IconSelector
