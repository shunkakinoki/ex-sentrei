import {analytics, storage} from "@sentrei/common/utils/firebase";

const upload = async (file: File, folder: string): Promise<string> => {
  const ref = storage.ref();
  const now = new Date().getTime();

  const fileUpload = ref.child(`${folder}/${file.name}-${now}`).put(file);
  analytics().logEvent("upload_file", {folder});

  const snap = await fileUpload;

  return snap.ref.getDownloadURL();
};

export default upload;
