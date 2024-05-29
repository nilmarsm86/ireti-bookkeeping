export const onRowDelete = (screenDispatch, setNewGenreData, item) => {
  screenDispatch({ type: "SHOW_MODAL_ALERT" });
  setNewGenreData(item);
};
