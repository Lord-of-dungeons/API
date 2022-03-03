import fs from "fs"

export const isExisted = (str?: string | number) => {
  // Boolean(0) va donner false donc on fait une condition spéciale
  if (str === 0) return true;
  return Boolean(str);
};

export const isAlphaNumeric = (str?: string) => {
  if (str === (undefined || null)) return false;
  return /^[a-zA-Z0-9_]+$/.test(String(str));
};

export const isNumeric = (str?: string) => {
  if (str === (undefined || null)) return false;
  return /^[0-9]+$/.test(String(str));
};

export const isPostalCode = (str?: string) => {
  if (str === (undefined || null)) return false;
  return /^\d{5}/.test(String(str));
};

export const isPrice = (price?: number | string) => {
  if (price === (undefined || null)) return false;
  return /^\d+([.,]\d{1,2})?$/.test(String(price));
};

export const isBirthday = (date?: string) => {
  if (date === (undefined || null)) return false;
  return /^\d{4}([-])\d{2}\1\d{2}$/.test(String(date));
};

export const isEmail = (str?: string) => {
  if (str === (undefined || null)) return false;
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    String(str)
  );
};

/**
 * 8 caractères minimum, 255 caractères maximum (dans les erreurs du middleware auth.middleware pour la taille max)
 * 1 majuscule minimum
 * 1 minuscule minimum
 * 1 nombre minimum
 * 1 caractère spécial minimum
 */
export const isPassword = (str?: string) => {
  if (str === (undefined || null)) return false;
  return /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,})/.test(String(str));
};

export const isCardNumber = (str?: string) => {
  if (str === (undefined || null)) return false;
  return /^[0-9]{16}$/.test(String(str));
};

export const isExp = (str?: string) => {
  if (str === (undefined || null)) return false;
  return /^(0[1-9]|1[0-2])\/[0-9]{4}$/.test(String(str));
};

export const isCVC = (str?: string) => {
  if (str === (undefined || null)) return false;
  return /^[0-9]{3}$/.test(String(str));
};

export const isUndefinedOrNull = (data: any) => {
  return data === undefined || data === null;
};

export const renameToCamelCase = (property: string) => {
  return property.replace(/_([a-z])/g, g => {
    return g[1].toUpperCase();
  });
};

/**
 *  Function qui vérifie si l'objet est vide
 */
export const isEmptyNullUndefinedObject = (objectData: any): boolean => {
  if (isUndefinedOrNull(objectData)) return true;
  if(typeof objectData === "object"){
    for (let key in objectData) {
      if (Object.prototype.hasOwnProperty.call(objectData, key)) {
        return false;
      }
    }
  }
  return true;
};

/**
 *  Function qui créer un dossier
 */
export const verifAndCreateFolder = (path: string) => {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path);
  }
}

/**
 *  Function qui supprime un dossier
 */
export const verifAndDeleteFolder = (path: string) => {
  if (fs.existsSync(path)) {
    fs.rmdirSync(path, { recursive: true });
  }
}

/**
 *  Function qui supprime un fichier
 */
export const verifAndDeleteFile = (path: string) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
}