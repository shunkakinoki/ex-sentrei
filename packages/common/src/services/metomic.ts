const metomic = (): void => {
  if (window.Metomic) {
    window.Metomic("ConsentManager:show");
  }
};

export default metomic;
