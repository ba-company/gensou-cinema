const calcScrollTop = () => {
  const { documentElement, body } = document;
  if (documentElement != null && documentElement.scrollTop > 0) {
    return documentElement.scrollTop;
  }
  if (body != null && body.scrollTop > 0) {
    return body.scrollTop;
  }
  return 0;
};

export default calcScrollTop;
