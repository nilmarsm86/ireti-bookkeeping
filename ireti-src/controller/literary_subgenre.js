//import { validateNativeFormModel } from "../hook/form";

import { onError } from "./error";

//poner en un memo
/* export const applyManageSubgenre = (worker, dispatch) => {
    worker.onmessage = function (e) {        
        //tercera forma
        let payload = (e.data.action !== 'select') ? e.data.result[0] : e.data.result;
        dispatch({type:String(e.data.action).toUpperCase(), payload: payload});

        //segunda forma
        if(e.data.action === 'select'){
            dispatch({type:String(e.data.action).toUpperCase(), payload: e.data.result});
        }

        if(['insert', 'update', 'delete'].indexOf(e.data.action) !== -1){            
            dispatch({type:String(e.data.action).toUpperCase(), payload: e.data.result[0]});
            //worker.postMessage({ action: 'SELECT', args: ["literary_subgenre"] });
        }

        //primera forma        
        switch (e.data.action) {
            case 'findAllLiterarySubgenre':                
                dispatch({type:'findAllLiterarySubgenre', payload: e.data.result});
                return ;
                break;
            case 'addLiterarySubgenre':                
                dispatch({type:'addLiterarySubgenre', payload: e.data.result[0]});
                break;
            case 'updateLiterarySubgenre':                
                dispatch({type:'updateLiterarySubgenre', payload: e.data.result[0]});
                break;
            case 'removeLiterarySubgenre':                
                dispatch({type:'removeLiterarySubgenre', payload: e.data.result[0]});                
                break;
        }
    };   
} */

export const applyManageSubgenre = (dispatch, screenDispatch, resetForm) => {
  return (e) => {
    if (e.data.action === "error") {
      onError(e);
      return;
    }

    switch (e.data.action) {
      case "select":
        dispatch({
          type: String(e.data.action + "_literary_subgenre").toUpperCase(),
          payload: e.data.result,
        });
        break;
      case "insert":
        dispatch({
          type: String(e.data.action + "_literary_subgenre").toUpperCase(),
          payload: e.data.result[0],
        });
        screenDispatch({ type: "AFTER_SAVE", payload: "Datos agregados" });
        resetForm();
        break;
      case "update":
        dispatch({
          type: String(e.data.action + "_literary_subgenre").toUpperCase(),
          payload: e.data.result[0],
        });
        screenDispatch({ type: "AFTER_SAVE", payload: "Datos modificados" });
        resetForm();
        break;
      case "delete":
        dispatch({
          type: String(e.data.action + "_literary_subgenre").toUpperCase(),
          payload: e.data.result[0],
        });
        screenDispatch({ type: "AFTER_SAVE", payload: "Datos eliminados" });
        break;
      case "allSubgenre":
        dispatch({
          type: String("select_literary_subgenre").toUpperCase(),
          payload: e.data.result,
        });
        break;
      default:
        break;
    }
  };
};

//validacion formulario
function isValid(data, genreAttr, setError) {
  let valid = [true];
  let error = { name: false, num: false };

  if (genreAttr.name.value.length === 0) {
    error["name"] = "Este campo no debe estar vacio!";
    valid.push(false);
  }

  if (genreAttr.num.value.length === 0) {
    error["num"] = "Este campo no debe estar vacio!";
    valid.push(false);
  }

  let v = data.every((item) => {
    let validate = true;

    if (Number(item.id) !== Number(genreAttr.id.value)) {
      if (genreAttr.name.value === item.name) {
        error["name"] = "Este género literario ya existe!";
        validate = false;
      }

      if (Number(genreAttr.num.value) === Number(item.num)) {
        error["num"] =
          "Este numero identificador de género literario ya existe!";
        validate = false;
      }
    }

    return validate;
  });
  valid.push(v);

  setError({ ...error });
  return valid.every((item) => item);
}

//insert and update
export const onSave = (
  genreAttr,
  setError,
  worker,
  existData,
  screenDispatch
) => {
  if (isValid(existData, genreAttr, setError)) {
    try {
      if (genreAttr.id.value === null) {
        worker.postMessage({
          action: "insert",
          args: [
            "literary_subgenre",
            { name: genreAttr.name.value, num: Number(genreAttr.num.value) },
          ],
        });
      } else {
        worker.postMessage({
          action: "update",
          args: [
            "literary_subgenre",
            {
              id: genreAttr.id.value,
              name: genreAttr.name.value,
              num: Number(genreAttr.num.value),
            },
            { id: genreAttr.id.value },
          ],
        });
      }
      screenDispatch({ type: "SHOW_LOADER" });
    } catch (e) {
      onError(e);
    }
  }
};

export const onModalClose = (resetForm, screenDispatch) => {
  resetForm();
  screenDispatch({ type: "HIDE_MODAL_ALERT" });
};

export const onModalOk = (worker, newGenreData, resetForm, screenDispatch) => {
  //TODO: buscar si hay libros que dependen de este genero literario en caso de que si mostrar mensaje diciendo esto
  console.warn(
    "buscar si hay libros que dependen de este genero literario en caso de que si mostrar mensaje diciendo esto"
  );
  worker.postMessage({
    action: "delete",
    args: ["literary_subgenre", { id: newGenreData.id }],
  });
  screenDispatch({ type: "SHOW_LOADER" });
  onModalClose(resetForm, screenDispatch);
};

export const onCeateNew = (resetForm, nameInputRef, setError) => {
  resetForm();
  nameInputRef.current.focus();
  setError({ name: false, num: false });
};
