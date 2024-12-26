// Regex pour la validation d'email
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

// Regex pour la validation de mot de passe (minimum 6 caractères)
const PASSWORD_REGEX = /^.{6,}$/;

// Regex pour la validation de nom (lettres, espaces, tirets et apostrophes autorisés)
const NAME_REGEX = /^[a-zA-ZÀ-ÿ\s'-]{2,50}$/;

// Regex pour le nom d'utilisateur (lettres, chiffres, tirets et underscores)
const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,20}$/;

export const validateEmail = (email) => {
  return EMAIL_REGEX.test(email);
};

export const validatePassword = (password) => {
  return PASSWORD_REGEX.test(password);
};

export const validateName = (name) => {
  return NAME_REGEX.test(name);
};

export const validateUsername = (username) => {
  return USERNAME_REGEX.test(username);
};

export const getFieldErrorMessage = (fieldName) => {
  switch (fieldName) {
    case 'email':
      return "L'adresse email n'est pas valide.";
    case 'password':
      return "Le mot de passe doit contenir au moins 6 caractères.";
    case 'name':
      return "Le nom doit contenir entre 2 et 50 caractères et ne peut inclure que des lettres, espaces, tirets et apostrophes.";
    case 'username':
      return "Le nom d'utilisateur doit contenir entre 3 et 20 caractères et ne peut inclure que des lettres, chiffres, tirets et underscores.";
    default:
      return "Ce champ n'est pas valide.";
  }
};

export const validateForm = (formData) => {
  const errors = {};

  if (!formData.name || !validateName(formData.name)) {
    errors.name = getFieldErrorMessage('name');
  }

  if (!formData.username || !validateUsername(formData.username)) {
    errors.username = getFieldErrorMessage('username');
  }

  if (!formData.email || !validateEmail(formData.email)) {
    errors.email = getFieldErrorMessage('email');
  }

  if (!formData.password || !validatePassword(formData.password)) {
    errors.password = getFieldErrorMessage('password');
  }

  return errors;
};