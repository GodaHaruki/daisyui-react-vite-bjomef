import { useContext, createContext } from "react";

const Cookie = createContext();

export const useAsyncCookie = () => useContext(Cookie);

export const AsyncCookieProvider = ({ children }) => {
  class cookie {
    #strCookieObjCookie(strCookie) {
      this.#update();

      let obj = {};
      strCookie
        .split(";")
        .map((e) => e.split("="))
        .forEach((e) => (obj[e[0]] = e[1]));
      return obj;
    }

    #construct() {
      this.rawValue = document.cookie;
      this.dicValue = this.#strCookieObjCookie(this.rawValue);
    }

    constructor() {
      this.#construct;
    }

    #update() {
      this.#construct;
    }

    get(key) {
      this.#update();
      return dicValue[key];
    }
  }

  const value = { cookie };
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
