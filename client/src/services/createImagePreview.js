const createImagePreviews = async (files, length) => {
  if (files.length > length) {
    alert(`You can only upload ${length} images!`);
  } else {
    const promises = [...files].map(file => getImageURL(file));
    return Promise.all(promises);
  }
};

const getImageURL = file => {
  const reader = new FileReader();
  return new Promise(resolve => {
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
};

export default createImagePreviews;
