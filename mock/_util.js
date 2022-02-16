export function resultSuccess(result, { message = "ok" } = {}) {
  return {
    code: 0,
    result,
    message,
    type: "success",
  };
}

export function resultPageSuccess(
  page,
  pageSize,
  list,
  { message = "ok" } = {}
) {
  const pageData = pagination(page, pageSize, list);

  return {
    ...resultSuccess({
      items: pageData,
      total: list.length,
    }),
    message,
  };
}

export function pagination(pageNo, pageSize, array) {
  const offset = (pageNo - 1) * Number(pageSize);
  const ret =
    offset + Number(pageSize) >= array.length
      ? array.slice(offset, array.length)
      : array.slice(offset, offset + Number(pageSize));
  return ret;
}
