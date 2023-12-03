import toast from 'react-hot-toast'

export default class Message {
  static okMessage(msg) {
    toast.custom(t => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } pointer-events-auto relative flex w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
      >
        <div className="w-0 flex-1 p-5">
          <div className="flex flex-row items-center gap-4">
            <div className="w-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-10 w-10 text-green-600"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm2.023 6.828a.75.75 0 10-1.06-1.06 3.75 3.75 0 01-5.304 0 .75.75 0 00-1.06 1.06 5.25 5.25 0 007.424 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="h-full w-auto border-l border-gray-200 pl-5">
              <p className="font-semibold capitalize text-green-600">
                Operación Exitosa
              </p>
              <p className="text-sm font-light text-gray-500">{msg}</p>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="absolute right-3 top-3 cursor-pointer"
          onClick={() => toast.dismiss(t.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="h-4 w-4 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15m-15 0l15 15"
            />
          </svg>
        </button>
        <div className="animate-slide absolute bottom-0 h-1 w-full -translate-x-full bg-green-600"></div>
      </div>
    ))
  }

  static errorMessage(msg) {
    toast.custom(t => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } pointer-events-auto relative flex w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
      >
        <div className="w-0 flex-1 p-5">
          <div className="flex flex-row items-center gap-4">
            <div className="w-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-10 w-10 text-red-600"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-2.625 6c-.54 0-.828.419-.936.634a1.96 1.96 0 00-.189.866c0 .298.059.605.189.866.108.215.395.634.936.634.54 0 .828-.419.936-.634.13-.26.189-.568.189-.866 0-.298-.059-.605-.189-.866-.108-.215-.395-.634-.936-.634zm4.314.634c.108-.215.395-.634.936-.634.54 0 .828.419.936.634.13.26.189.568.189.866 0 .298-.059.605-.189.866-.108.215-.395.634-.936.634-.54 0-.828-.419-.936-.634a1.96 1.96 0 01-.189-.866c0-.298.059-.605.189-.866zm-4.34 7.964a.75.75 0 01-1.061-1.06 5.236 5.236 0 013.73-1.538 5.236 5.236 0 013.695 1.538.75.75 0 11-1.061 1.06 3.736 3.736 0 00-2.639-1.098 3.736 3.736 0 00-2.664 1.098z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="h-full w-auto border-l border-gray-200 pl-5">
              <p className="font-semibold text-black">{msg}</p>
              <p className="text-sm font-light text-gray-500">
                Hubo un problema al momento de ejecutar su petición, por favor
                intentelo más tarde
              </p>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="absolute right-3 top-3 cursor-pointer"
          onClick={() => toast.dismiss(t.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="h-4 w-4 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15m-15 0l15 15"
            />
          </svg>
        </button>
        <div className="animate-slide absolute bottom-0 h-1 w-full bg-red-600"></div>
      </div>
    ))
  }

  static warningMessage(msg) {
    toast.custom(t => (
      <div
        className={`${
          t.visible ? 'animate-enter' : 'animate-leave'
        } pointer-events-auto relative flex w-full max-w-md overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5`}
      >
        <div className="w-0 flex-1 p-5">
          <div className="flex flex-row items-center gap-4">
            <div className="w-10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-10 w-10 text-yellow-500"
              >
                <path
                  fillRule="evenodd"
                  d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="h-full w-auto border-l border-gray-200 pl-5">
              <p className="font-semibold text-black">{msg}</p>
              <p className="text-sm font-light text-gray-500">
                Hubo un problema al momento de ejecutar su petición, por favor
                intentelo más tarde
              </p>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="absolute right-3 top-3 cursor-pointer"
          onClick={() => toast.dismiss(t.id)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="h-4 w-4 text-gray-500"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 19.5l15-15m-15 0l15 15"
            />
          </svg>
        </button>
        <div className="animate-slide absolute bottom-0 h-1 w-full bg-yellow-500"></div>
      </div>
    ))
  }
}
