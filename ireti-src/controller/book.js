import { isValid } from "../hook/validator";
import * as controller from "./controller";

export const applyManageBook = (
  worker,
  dispatch,
  screenDispatch,
  resetForm,
  setModel,
  model,
  setWriters
) => {
  return (e) => {
    if (e.data.action === "error") {
      controller.onError(e);
      return;
    }

    if (controller[e.data.action]) {
      controller[e.data.action](e, dispatch, "book", screenDispatch, resetForm);

      if (e.data.action === "insert") {
        insert(screenDispatch, model, e, worker);
      }

      if (e.data.action === "update") {
        update(screenDispatch, model, e, worker);
      }
    } else if (e.data.action === "delete") {
      controller.remove(e, dispatch, "book", screenDispatch, resetForm);
    } else {
      switch (e.data.action) {
        case "allLiterarySubgenre":
          controller.simpleDispatch(e, dispatch, "select_literary_subgenre");
          break;
        case "allPublishings":
          controller.simpleDispatch(e, dispatch, "select_publishing");
          break;
        case "bookAuthors":
          let data = e.data.result.length > 0 ? e.data.result : [];
          setModel((model) => {
            return {
              ...model,
              authors: { ...model.authors, value: data },
            };
          });
          break;
        case "deleteBookAuthor":
          //NO se tiene que reaccionar ante esto
          break;
        case "allAuthors":
          setWriters(e.data.result);
          break;
        case "increaseNumberBooksPurchased":
          dispatch({
            type: String("update_setting").toUpperCase(),
            payload: e.data.result[0],
          });
          break;
        default:
          break;
      }
    }
  };
};

export const onModalOk = (worker, id, resetForm, screenDispatch) => {
  //TODO: buscar si hay libros que dependen de este genero literario en caso de que si mostrar mensaje diciendo esto
  console.warn("porque es que no se debe borrar un libros del sistema");
  worker.postMessage({
    action: "delete",
    args: ["book", { id: id }],
  });
  screenDispatch({ type: "SHOW_LOADER" });
  controller.onModalClose(resetForm, screenDispatch);
};

export const onCeateNew = (resetForm, titleInputRef, screenDispatch) => {
  screenDispatch({ type: "SHOW_MODAL_FORM" });
  resetForm();
  if (titleInputRef.current) {
    titleInputRef.current.focus();
  }
};

export const formatPriceFromCents = (price) => {
  return "$ " + Number(price / 100).toFixed(2);
};

export const formatPriceToCents = (price) => {
  return Number(price) * 100;
};

export const onSave = (
  worker,
  model,
  setModel,
  existData,
  screenDispatch,
  table,
  data,
  setting
) => {
  if (isValid(model, setModel, existData)) {
    try {
      let hasId = model.id.value;

      if (model.id.value === null) {
        const existence = existData.find((item) => {
          return (
            data.tag === item.tag &&
            data.edition_year === item.edition_year &&
            data.edition_number === item.edition_number &&
            data.literary_subgenre_id === item.literary_subgenre_id &&
            data.publishing_id === item.publishing_id
          );
        });

        if (existence) {
          data.amount = Number(data.amount) + Number(existence.amount);
          data.acquisition_price =
            Number(data.acquisition_price) +
            Number(existence.acquisition_price);
          data.difficult_price =
            Number(data.difficult_price) + Number(existence.difficult_price);
          data.transport_price =
            Number(data.transport_price) + Number(existence.transport_price);
          data.marketing_megas =
            Number(data.marketing_megas) + Number(existence.marketing_megas);
          hasId = existence.id;

          alert(
            "Ya existe en el sistema un libro con estas catacterísticas, se incrementará su cantidad."
          );
        }
      }

      if (hasId === null) {
        worker.postMessage({
          action: "insert",
          args: [table, data],
        });
        setModel({ ...model }); //esto se hace para salvar despues los autores
        //aumentar el setting number_books_purchased
        increaseNumberBooksPurchased(setting, data, worker);
      } else {
        worker.postMessage({
          action: "update",
          args: [table, { ...data, id: hasId }, { id: hasId }],
        });
        //aumentar el setting number_books_purchased solo si la cantidad a cambiado
        //tener en cuenta que esta cantidad puede haber disminuido
      }
      screenDispatch({ type: "SHOW_LOADER" });
    } catch (e) {
      controller.onError(e);
    }
  }
};

function increaseNumberBooksPurchased(setting, data, worker) {
  let numberBooksPurchased = setting.find((item) => {
    return item.key === "number_books_purchased";
  });

  let newAmount = Number(numberBooksPurchased.value) + data.amount;

  worker.postMessage({
    action: "increaseNumberBooksPurchased",
    args: [
      `UPDATE setting
   SET value = :value
 WHERE key = 'number_books_purchased' RETURNING *;
`,
      { value: newAmount },
    ],
  });
}

export const findAutorsBook = (worker, id) => {
  worker.postMessage({
    action: "bookAuthors",
    args: [
      `SELECT author.id,
   author.name,
   author.gender,
   country.name AS country,
   province.name AS province,
   book_author.book_id, 
   book_author.author_id
FROM book_author,
   author,
   country,
   province
WHERE book_author.book_id = :book_id AND 
   book_author.author_id = author.id AND 
   country.id = author.country_id AND 
   province.id = author.id
ORDER BY author.id`,
      { book_id: id },
    ],
  });
};

export const removeAuthorBook = (worker, bookId, authorId) => {
  worker.postMessage({
    action: "deleteBookAuthor",
    args: [
      "DELETE FROM book_author WHERE book_id = :book_id AND author_id = :author_id",
      { book_id: bookId, author_id: authorId },
    ],
  });
};

const addAuthorBook = (worker, data) => {
  worker.postMessage({
    action: "addBookAuthor",
    args: [
      "INSERT INTO book_author (book_id, author_id) VALUES (:book_id, :author_id)",
      { book_id: data["book_id"], author_id: data["author_id"] },
    ],
  });
};

export const findAuthors = (worker) => {
  worker.postMessage({
    action: "allAuthors",
    args: [
      `SELECT author.id,
       author.name,
       author.gender,
       country.name AS country,
       province.name AS province,
       author.country_id,
       author.province_id
  FROM author,
       country,
       province
 WHERE country.id = author.country_id AND 
       province.id = author.id
 ORDER BY author.name`,
      {},
    ],
  });
};

export const onListDelete = (value, worker) => {
  removeAuthorBook(worker, value.book_id, value.author_id);
  findAutorsBook(worker, value.book_id);
};
function insert(screenDispatch, model, e, worker) {
  screenDispatch({ type: "HIDE_MODAL_FORM" });
  model.authors.value.forEach((author) => {
    let data = { book_id: e.data.result[0].id };
    data["author_id"] = author.author_id ? author.author_id : author.id;
    addAuthorBook(worker, data);
  });
}

function update(screenDispatch, model, e, worker) {
  screenDispatch({ type: "HIDE_MODAL_FORM" });
  model.authors.value.forEach((author) => {
    let data = { book_id: e.data.result[0].id };
    if (!author.author_id) {
      data["author_id"] = author.id;
      addAuthorBook(worker, data);
    }
  });
}
