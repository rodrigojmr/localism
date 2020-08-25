const buildFormData = (formData, data, parentKey) => {
  if (parentKey === 'images') {
    for (let i = 0; i < data.length; i++) {
      formData.append('images', data[i]);
    }
  } else if (
    data &&
    typeof data === 'object' &&
    !(data instanceof Date) &&
    !(data instanceof File)
  ) {
    Object.keys(data).forEach(key => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      );
    });
  } else {
    const value = data === null ? '' : data;
    formData.append(parentKey, value);
  }
};

const jsonToFormData = data => {
  const formData = new FormData();

  buildFormData(formData, data);
  return formData;
};

export default jsonToFormData;
