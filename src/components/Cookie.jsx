import { useContext, createContext } from "react";

const Cookie = createContext();

export const useAsyncCookie = () => useContext(Cookie);

export const AsyncCookieProvider = ({ children }) => {
  class cookie {
    #strCookie2ObjCookie(strCookie) {
      this.update();

      let obj = {};
      strCookie
        .split(";")
        .map((e) => e.split("="))
        .forEach((e) => (obj[e[0]] = JSON.parse(e[1])));
      return obj;
    }

    #construct(defaultValue, time) {
      if (document.cookie == null) {
        document.cookie = defaultValue;
      }
      this.rawValue = document.cookie;
      this.dicValue = this.#strCookie2ObjCookie(this.rawValue);
    }

    get dicCookie() {
      return this.dicValue;
    }

    setCookie(name, json) {
      document.cookie = `${name}=${json}`;
    }

    constructor(time) {
      this.#construct(time);
    }

    update() {
      this.#construct;
    }

    get(key) {
      this.update();
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
