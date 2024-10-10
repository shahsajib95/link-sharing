const nestedRoutes = ["conductor", "users"];

const checkActiveItem = (location: string) => {
  const pathName = location;
  const splitMain = pathName?.split("/");
  if (splitMain?.[1] === "") return;
  let matchingMenuItem = null;
  const ul = document.getElementById("side-menu") as HTMLElement;
  const items = ul?.getElementsByTagName("a") || [];
  for (let i = 0; i < items?.length; ++i) {
    const spitPath = items[i].pathname.split("/");
    // console.log(`\n\n spitPath:`, spitPath);
    let checkNested = false;
    if (nestedRoutes.includes(spitPath?.[2])) {
      checkNested = true;
    }
    const check = checkNested
      ? splitMain?.[3] === spitPath?.[3]
      : splitMain?.[2] === spitPath?.[2];
    console.log(
      `\n\n ~ file: sidebar.ts:18 ~ checkActiveItem ~ check:`,
      splitMain?.[3],
      spitPath?.[3]
    );
    if (check) {
      matchingMenuItem = items[i];
      break;
    }
  }
  if (matchingMenuItem) {
    return matchingMenuItem;
  } else {
    return null;
  }
};

function deactivateParentDropdown(item: any) {
  if (!item) {
    return false;
  }
  item.classList.remove("active");
  const parent = item.parentElement;
  const parent2El = parent.childNodes[1];
  if (parent2El && parent2El.id !== "side-menu") {
    parent2El.classList.remove("mm-show");
  }
  if (parent) {
    parent.classList.remove("mm-active");
    const parent2 = parent.parentElement;
    if (parent2) {
      parent2.classList.remove("mm-show"); // ul tag
      const parent3 = parent2.parentElement; // li tag
      if (parent3) {
        parent3.classList.remove("mm-active"); // li
        parent3.childNodes[0].classList.remove("mm-active"); //a
        const parent4 = parent3.parentElement; // ul
        if (parent4) {
          parent4.classList.remove("mm-show"); // ul
          const parent5 = parent4.parentElement;
          if (parent5) {
            parent5.classList.remove("mm-show"); // li
            parent5.childNodes[0].classList.remove("mm-active"); // a tag
          }
        }
      }
    }
    return false;
  }
  return false;
}

export { checkActiveItem, deactivateParentDropdown };
