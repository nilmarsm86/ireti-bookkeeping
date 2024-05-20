import { useState } from "react";

function useFormModel(initialValue) {
  let [model, set] = useState(initialValue);

  let result = {};

  for (let field in model) {
    result[field] = fieldModel(model[field]);
    result[field]["name"] = field;
    result[field]["onChange"] = function (e) {
      if (typeof e === 'object') {
        model[field] = e.target.value;
      } else {
        model[field] = e;
      }
      set({ ...model });
    };
  }
  return [result, set];
}

function useNativeFormModel(initialValue) {
  let [model, setModel] = useState(initialValue);  
  let attrs = {};
  let errors = {};

  for (let field in model) {
    attrs[field] = fieldModel(model[field]);    
    attrs[field]["onChangeText"] = function (e) {
      model[field] = e;      
      setModel({ ...model });
    };
    errors[field] = false;
  }
  const [error, setError] = useState(errors);
  return [attrs, model, setModel, error, setError];
}

function fieldModel(model, set = null) {
  let attrs = { value: model };
  if (set !== null) {
    attrs["onChange"] = function (e) {
      if (typeof e === 'object') {
        set(e.target.value);
      } else {
        set(e);
      }
    };
  }
  return attrs;
}

/*function nativeFieldModel(model, set = null) {
  let attrs = { value: model };
  if (set !== null) {
    attrs["onChangeText"] = function (e) {
      set(e);
    };
  }
  return attrs;
}*/

function useFieldModel(model, set) {
  return fieldModel(model, set);
}

function validateFormModel(model, validation) {
  for (let field in validation) {
    if (model[field].value === validation[field]) {
      return true;
    }
  }
  return false;
}

function validateNativeFormModel(attr, validation, setError) {
  let error = false;
  let errors = {};
  for (let field in validation) {
    errors[field] = false;
    if (attr[field].value === validation[field]) {      
      errors[field] = 'Campo vacio';
      error = true;
    }
  }  
  setError({...errors});
  return error;
}

function reAssembleData(model, exclude) {
  let data = {};
  for (let field in model) {
    if (field !== exclude) {
      data[field] = model[field]["value"];
    }
  }
  return data;
}

export { useFormModel, useNativeFormModel, useFieldModel, validateFormModel, validateNativeFormModel, reAssembleData };
