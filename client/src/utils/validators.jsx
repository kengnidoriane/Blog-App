// Regex pour la validation d'email
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Regex pour la validation de mot de passe
// Au moins 8 caractères, au moins une lettre majuscule, une lettre minuscule, un chiffre et un caractère spécial
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// Regex pour la validation de nom (lettres, espaces, tirets et apostrophes autorisés)
const NAME_REGEX = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;

/**
 * Valide une adresse email.
 * @param {string} email - L'adresse email à valider.
 * @returns {boolean} True si l'email est valide, sinon False.
 */
export const validateEmail = (email) => {
  return EMAIL_REGEX.test(email);
};

/**
 * Valide un mot de passe.
 * @param {string} password - Le mot de passe à valider.
 * @returns {boolean} True si le mot de passe est valide, sinon False.
 */
export const validatePassword = (password) => {
  return PASSWORD_REGEX.test(password);
};

/**
 * Valide un nom.
 * @param {string} name - Le nom à valider.
 * @returns {boolean} True si le nom est valide, sinon False.
 */
export const validateName = (name) => {
  return NAME_REGEX.test(name);
};

/**
 * Génère un message d'erreur pour un champ invalide.
 * @param {string} fieldName - Le nom du champ.
 * @returns {string} Le message d'erreur.
 */
export const getFieldErrorMessage = (fieldName) => {
  switch (fieldName) {
    case 'email':
      return "L'adresse email n'est pas valide.";
    case 'password':
      return "Le mot de passe doit contenir au moins 8 caractères, incluant une majuscule, une minuscule, un chiffre et un caractère spécial.";
    case 'name':
      return "Le nom doit contenir entre 2 et 50 caractères et ne peut inclure que des lettres, espaces, tirets et apostrophes.";
    default:
      return "Ce champ n'est pas valide.";
  }
};

/**
 * Valide un objet contenant les données du formulaire.
 * @param {Object} formData - Les données du formulaire à valider.
 * @returns {Object} Un objet contenant les erreurs éventuelles.
 */
export const validateForm = (formData) => {
  const errors = {};

  if (formData.name && !validateName(formData.name)) {
    errors.name = getFieldErrorMessage('name');
  }

  if (formData.email && !validateEmail(formData.email)) {
    errors.email = getFieldErrorMessage('email');
  }

  if (formData.password && !validatePassword(formData.password)) {
    errors.password = getFieldErrorMessage('password');
  }

  return errors;
};
