import { useContext, createContext } from "react";

const Cookie = createContext();

export const useAsyncCookie = () => useContext(Cookie);

export const AsyncCookieProvider = ({ children }) => {
  const asyncSet = async (key, value) => {
    document.cookie(`${key}=${encodeURIComponent(value)}`);
  };

  const set = (key, value) => {
    document.cookie(`${key}=${encodeURIComponent(value)}`);
  };

  const get = () => {
    let obj = {};
    document.cookie
      .split(";")
      .map((e) => e.split("="))
      .forEach((e) => (obj.current[e[0]] = decodeURIComponent(e[1])));
    return obj;
  };

  const asyncGet = async () => {
    let obj = {};
    document.cookie
      .split(";")
      .map((e) => e.split("="))
      .forEach((e) => (obj.current[e[0]] = decodeURIComponent(e[1])));
    return obj;
  };

  const value = {
    asyncSet,
    asyncGet,
    set,
    get,
  };
  return <Cookie.Provider value={value}>{children}</Cookie.Provider>;
};

// const IndexDB = createContext();

// const IndexDBProvider = ({ children }) => {
//   class DB {
//     constructor(name, version) {
//       // this.openReq = indexedDB.open(name, version);
//       // openReq.onsuccess = (e) =>
//     }
//     #openReq(){
//       let req = indexedDB.open("test", 1);
//       req.onupgradeneeded = () => {
//         const db = this.result;

//       }
//     }
//     push()
//   }
//   const value = {};
//   return <IndexDB.Provider value={value}>{children}</IndexDB.Provider>;
// };
