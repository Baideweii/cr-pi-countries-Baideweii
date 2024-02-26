export const validateSearch = (searchInput) => {
  if (!/^[a-zA-Z]*$/.test(searchInput)) return 'La búsqueda solo puede contener letras';
    return '';
};

export const validateName = (name) => {
  if (!name) return 'El nombre es requerido';
  if (name.length > 40) return 'El nombre no puede tener más de 40 caracteres';
  if (!/^[A-Z]/.test(name)) return 'El nombre debe comenzar con una letra mayúscula';
  if (!/^[A-Za-z\s]*$/.test(name)) return 'El nombre no puede contener números ni caracteres especiales';
  return '';
};

export const validateDifficulty = (difficulty) => {
  if (!difficulty) return 'La dificultad es requerida';
  if (isNaN(difficulty) || difficulty < 1 || difficulty > 5) return 'La dificultad debe ser un número entre 1 y 5';
    return '';
};

export const validateDuration = (duration) => {
  if (!duration) return 'La duracion es requerida'
  if (isNaN(duration) || duration <= 0 || duration > 24) return 'La duración debe ser un número mayor que 1 y máximo 24 horas';
    return '';
};

export const validateSeason = (season) => {
  if (!season) return 'La temporada es requerida';
    return '';
};

export const validateType = (type) => {
  if (!type) return 'El tipo es requerido';
    return '';
};

