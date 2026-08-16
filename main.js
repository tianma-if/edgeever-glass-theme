const ROOT_ATTRIBUTE = "data-edgeever-glass-theme";
const ROOT_VALUE = "active";

export default {
  activate() {
    const root = document.documentElement;
    root.setAttribute(ROOT_ATTRIBUTE, ROOT_VALUE);

    return () => {
      if (root.getAttribute(ROOT_ATTRIBUTE) === ROOT_VALUE) {
        root.removeAttribute(ROOT_ATTRIBUTE);
      }
    };
  },
};
