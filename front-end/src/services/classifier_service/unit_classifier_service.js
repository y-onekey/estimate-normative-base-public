import axiosInstance from '../axios-instance';

export default class ClassifierService {
  // ----- UNITS BEGIN------
  getAllUnits = () => axiosInstance.get('/classifier/units/');

  // ----- UNITS END------
}
