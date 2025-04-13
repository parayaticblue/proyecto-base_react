const aceptaDecimales = (event, largoMaximo) => {
  let newValue = event.target.value;
  var regFloatWithDecimals = new RegExp(
    `^[0-9]{1,${largoMaximo || 10}}(,[0-9]{1,${largoMaximo || 2}})?$`
  );
  var regInt = new RegExp(`^[0-9]{1,${largoMaximo || 10}},?$`);

  if (
    regFloatWithDecimals.test(newValue) ||
    regInt.test(newValue) ||
    newValue === ''
  ) {
    return newValue;
  }
};

const aceptaSoloNumeros = (event, largoMaximo) => {
  let newValue = event.target.value;
  var regInt = new RegExp(`^[0-9]{1,${largoMaximo || 10}}$`);
  if (regInt.test(newValue)) {
    return newValue;
  }
  if (newValue.trim() === '') {
    return '';
  }

  return newValue.substring(0, newValue.length - 1);
};

const telefonoFormato = event => {
  let newValue = event.target.value;
  // validación para eliminar simbolo + al inicio en caso de que se haya ingresado numero
  if (!newValue) {
    return newValue;
  }
  var regInt = new RegExp('^\\+?\\d*$');
  if (regInt.test(newValue)) {
    if (newValue.substring(0, 1) === '+') {
      return newValue;
    } else {
      return '+' + newValue;
    }
  }
  if (newValue.trim() === '') {
    return '';
  }

  return newValue.substring(0, newValue.length - 1);
};

const aceptaLetrasNumeros = (event, largoMaximo) => {
  //Solo letras A-Z 0-9
  let newValue = event.target.value;
  var regInt = new RegExp(`^[A-Za-z0-9]{1,${largoMaximo || 10}}$`);
  if (regInt.test(newValue) || newValue === '') {
    return event;
  }

  newValue = newValue.substring(0, newValue.length - 1);
  return {
    ...event,
    target: {
      ...event.target,
      value: newValue
    }
  };
};

export {
  aceptaDecimales,
  aceptaSoloNumeros,
  aceptaLetrasNumeros,
  telefonoFormato
};
