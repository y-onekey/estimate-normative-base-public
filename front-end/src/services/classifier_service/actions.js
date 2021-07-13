import axiosInstance from '../axios-instance';

export const SEGMENT_NAMES = ({
  books: 'books',
  parts: 'parts',
  sections: 'sections',
  groups: 'groups',
  positions: 'positions',

});

const appName = 'classifier';

export const getAllAction = (resourseName, segmentName) => {
  return axiosInstance.get(`/${appName}/${resourseName}_${segmentName}/`);
};

export const addAction = (resourseName, segmentName, item) => {
  return axiosInstance.post(`/${appName}/${resourseName}_${segmentName}/`, item);
};

export const editAction = (resourseName, segmentName, item) => {
  return axiosInstance.put(`/${appName}/${resourseName}_${segmentName}/${item.id}/`, item);
};

export const deleteAction = (resourseName, segmentName, id) => {
  return axiosInstance.delete(`/${appName}/${resourseName}_${segmentName}/${id}/`);
};
