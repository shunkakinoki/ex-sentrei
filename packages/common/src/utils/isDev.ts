const isDev = (): boolean => {
  return process.env.NODE_ENV !== "production";
};

export default isDev;
