export function setDisplayHeight(parent, height) {
  const mirrorList = [].slice.call(document.querySelectorAll(`${parent} .ReactCodeMirror .CodeMirror`));
  mirrorList.forEach(mirror => {
    mirror.style.height = `${height - 5}px`; 
  });
}
