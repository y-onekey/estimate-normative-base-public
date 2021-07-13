import axiosInstance from './axios-instance';

export default class ClassifierService {
  getAllBooksMaterial = () => {
    return axiosInstance.get('/books_material');
  }

  addBookMaterial = (item) => {
    return axiosInstance.post('/books_material/', item);
  }

  deleteBookMaterial = (id) => {
    return axiosInstance.delete(`/books_material/${id}`);
  }

  putBookMaterial = (item) => {
    return axiosInstance.put(`/books_material/${item.id}/`, item);
  }

  getAllBooksEquipment = () => {
    return axiosInstance.get('/books_equipment');
  };

  getAllBooksMechanism = () => {
    return axiosInstance.get('/books_mechanism');
  };
}
