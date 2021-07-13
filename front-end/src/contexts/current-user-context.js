import React from 'react';

export const emptyUser = {
  user_name: 'Не авторизирован',
  position: 'Неизвестно',
  photo: null,
};

export const CurrentUserContext = React.createContext([
  emptyUser,
  () => {},
]);
