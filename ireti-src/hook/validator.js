export function validate(field, constraint, message) {
  if (constraint) {
    field.error = message;
  }
}

export function empty(field, message) {
  validate(field, field.value.length === 0, message);
  validate(field, field.value[0] === " ", message);
}

export function letters(field, message) {
  validate(field, !/^([A-Za-z ])*$/.test(field.value), message);
}

export function numbers(field, message) {
  validate(field, !/^([0-9])*$/.test(field.value), message);
}

export function unique(model, fieldName, message, data) {
  data.forEach((item) => {
    if (Number(item.id) !== Number(model.id.value)) {
      validate(
        model[fieldName],
        model[fieldName].value == item[fieldName],
        message
      );
    }
  });
}

export function reset(model) {
  Object.keys(model).forEach((item) => {
    model[item].error = false;
  });
}

function apply(item, model, key, data) {
  if (item.type.name === "unique") {
    item.type(model, key, item["message"], data);
  } else {
    item.type(model[key], item["message"]);
  }
}

//validacion de modelo
export function isValid(model, setModel, data = []) {
  reset(model);

  for (const [key, value] of Object.entries(model)) {
    if (value.constraints) {
      value.constraints.forEach((item) => apply(item, model, key, data));
    }
  }

  setModel({ ...model });
  return Object.values(model).every((item) => item.error === false);
}
