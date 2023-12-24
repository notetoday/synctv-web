import { ElMessage, ElNotification } from "element-plus";

export const debounces = (delay: number): Function => {
  let timerId: ReturnType<typeof setTimeout> | null = null;

  const add = (func: Function): Function => {
    return (...args: any[]) => {
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        func(...args);
        timerId = null;
      }, delay);
    };
  };

  return add;
};

export const strLengthLimit = (str: any, num: number) => {
  if (typeof str !== "string") return;
  if (str.length > num)
    throw ElMessage({
      type: "error",
      message: `输入框内容过长，单个输入框最大不可超过${num}个字符！`
    });
};

export const blobToUint8Array = (blob: Blob): Promise<Uint8Array> => {
  return new Promise((resolve, reject) => {
    blob
      .arrayBuffer()
      .then((res) => {
        resolve(new Uint8Array(res));
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const decodeJWT = (jwt: string) => {
  const parts = jwt.split(".");
  if (parts.length !== 3) {
    throw new Error("非 JWT 格式！");
  }
  return JSON.parse(atob(parts[1]));
};

export const getAppIcon = (appName: string): string => {
  const href = new URL(`/src/assets/appIcons/${appName}.svg`, import.meta.url).href;
  return href.endsWith("undefined") ? getAppIcon("default") : href;
};

export const getObjValue = <T extends object, K extends keyof T>(obj: T, key: K) => {
  return obj[key];
};

export const artPlay = (art: Artplayer) => {
  art.play().catch(() => {
    art.muted = true;
    art
      .play()
      .then(() => {
        ElNotification({
          title: "温馨提示",
          type: "info",
          message: "由于浏览器限制，播放器已静音，请手动开启声音"
        });
      })
      .catch((e) => {
        ElNotification({
          title: "播放失败",
          type: "error",
          message: e
        });
      });
  });
};
