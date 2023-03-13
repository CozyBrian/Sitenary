export const ProcessUrl = (url: string | undefined) => {
  if (url !== undefined) {
    const origin = url.split("//");
    const originWOHttps = origin[1];
    const hasSlash = originWOHttps.includes("/");
    return hasSlash ? url : url + "/";
  } else {
    return "https://www.sitenary.com/";
  }
}