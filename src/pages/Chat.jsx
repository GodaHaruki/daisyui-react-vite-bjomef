import { useEffect, useRef, useState } from 'react';
// import ReactMarkdown from 'react-markdown';
import { useUserInfoContext } from '../components/userInfo.jsx';

const MyBalloon = ({ children }) => {
  return (
    <div className="my-chat-message">
      <div className="flex items-end justify-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
          <div>
            <span className="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
              {/* <ReactMarkdown children={text} /> */}
              {children}
            </span>
          </div>
          {/* <span class="text-xs text-gray-500 leading-none">2 min ago</span> */}
        </div>
        <img
          src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
          alt="My profile"
          className="w-6 h-6 rounded-full order-2"
        />
      </div>
    </div>
  );
};

const OtherBalloon = (props) => {
  return (
    <div className="other-chat-message">
      <div className="flex items-end">
        <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
        <span class="text-xs text-gray-300 inline-block leading-none">{props.name}</span>
          <div>
            <span className="px-4 py-2 rounded-lg inline-block bg-gray-300 text-gray-600">
              {props.children}
            </span>
          </div>
        </div>
        <img
          src="https://static.wikia.nocookie.net/virtualyoutuber/images/4/4b/Nekomata_Okayu_Portrait.png"
          alt="My profile"
          className="w-6 h-6 rounded-full order-1"
        />
      </div>
    </div>
  );
};

const Chat = (props) => {
  const [messages, setMessage] = useState([]);
  const inputRef = useRef();
  const { userInfo } = useUserInfoContext();
  const isFetching = useRef(false)

  useEffect(() => {
    console.log('reRendered');
  });

  const getChat = () => {
    if (!isFetching.current) {
      isFetching.current = true;
      fetch(
        'https://script.googleusercontent.com/a/macros/f-sapporo.ed.jp/echo?user_content_key=BH8Kv2-HKQYYjlY7IqN45V38lEL1SzoVswu9259GzCNqdZheAUGElDH3UAFpbK1dMbrZjzC6hxqRxGzjnLYTBDnLNLb8gvf3OJmA1Yb3SEsKFZqtv3DaNYcMrmhZHmUMi80zadyHLKD69xnUh-IhrsfB63eL3TaQ1djiqESLJYkXNcZoe1zwbJVFMimvbwDGwkl1xMkIUh9GcDqYzi69rNwOzl2svdDzwiMeXCzRPHnYlXVu6ZSvRTMBkFmQ3nSn6aEFGJJrzo5cy6pr-Oj0FQ&lib=McovRLwPv54_SYyI5iluMo5-ZE1Y-KuHf'
      )
        .then((response) => response.json())
        .then((json) => {
          json = JSON.parse(JSON.stringify(json));
          console.log(json);
          setMessage(
            messages == json.datas.data
              ? console.log('there are not post')
              : json['datas']['data'].map((elm, i) => {
                const isMine = userInfo.current.userID == elm[2];
                return isMine ? (
                  <MyBalloon key={elm[0]} children={elm[5]} />
                ) : (
                  <OtherBalloon key={elm[0]} name={elm[3]} children={elm[5]} />
                );
              })
          );
          isFetching.current = false;
        })
    };
  };

  useEffect(() => {
    const poling = setInterval(() => getChat(), 3000); // props.interval : useRef()
    return () => clearInterval(poling)
  }, []);

  const handleClick = () => {
    console.log(`Message: ${inputRef.current.value}`);
    setMessage([...messages, <MyBalloon children={inputRef.current.value} />]);
    isFetching.current = true;
    fetch(
      `https://script.google.com/macros/s/AKfycbyGRApn5hMMSRMsCX3rmuQHv9EQ8QTZE9Sh7uFnuCXxhcGqgEA5v2ChsjDzqFeNXCtMKQ/exec?type=post&body=${inputRef.current.value}&displayName=${userInfo.current.displayName}&userID=${userInfo.current.userID}&bodyType=text`
    )
      .then((response) => response.json())
      .then((json) => {
        console.log("Post to Set")
        setMessage(
          json['datas']['data'].map((elm) => {
            const isMine = userInfo.current.userID == elm[2];
            return isMine ? (
              <MyBalloon key={elm[0]} name={elm[3]} children={elm[5]} />
            ) : (
              <OtherBalloon key={elm[0]} name={elm[3]} children={elm[5]} />
            );
          })
        );
        isFetching.current = false;
      });

    inputRef.current.value = '';
  };

  return (
    <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
      <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
        <div className="relative flex items-center space-x-4">
          {/* <div className="relative">
            <span className="absolute tshiext-green-500 right-0 bottom-0">
              <svg width="20" height="20">
                <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
              </svg>
            </span>
            <img
              src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
              alt=""
              className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
            />
          </div> */}
          <div className="flex flex-col leading-tight mx-2">
            <div className="text-2xl mt-1 flex items-center">
              <span className="text-gray-200 mr-3">Alpha Server</span>
            </div>
            <span className="text-lg text-gray-400">Chat data may be lost or suddenly unavailable due to maintenance</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div
        id="messages"
        className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex-grow"
      >
        {messages}
        <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
          <div className="relative flex">
            {/* <span className="absolute inset-y-0 flex items-center">
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  ></path>
                </svg>
              </button>
            </span> */}
            <input
              ref={inputRef}
              type="text"
              placeholder="Write your message!"
              className="w-full focus:outline-none focus:lder-gray-400 text-gray-600 placeholder-gray-600 pl-5 bg-gray-200 rounded-lg py-3"
            />
            <div className="absolute right-0 items-center sm:flex">
              <button
                className="btn btn-primary px-4 py-1 rouded-md"
                onClick={handleClick}
              >
                <span className="font-bold">Send</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-6 w-6 ml-2 transform rotate-90"
                >
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
