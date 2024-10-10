export const htmlDecode = (content: any) => {
  if (content) {
    let e = document.createElement("div");
    e.innerHTML = content;
    return e.textContent || "";
  }
  return "";
};