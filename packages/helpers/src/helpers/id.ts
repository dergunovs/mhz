export function createTempId() {
  return `temp-${crypto.randomUUID()}`;
}

export function deleteTempId<T extends { _id?: string }>(array: T[]) {
  return array.map((obj) => {
    if (obj._id?.includes('temp')) {
      delete obj._id;

      return obj;
    } else return obj;
  });
}

export function deleteId<T extends { _id?: string }>(array: T[]) {
  return array.map((obj) => {
    delete obj._id;

    return obj;
  });
}
