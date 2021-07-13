import axiosInstance from 'src/services/axios-instance';

export default class GesnService {
  _baseUrl = '/geo';

  getAllConstructionObjects = () => axiosInstance.get(`${this._baseUrl}/construction_object/`)

  getAllQuarries = () => axiosInstance.get(`${this._baseUrl}/quarry/`);

  getAllCementFactories = () => axiosInstance.get(`${this._baseUrl}/cement_factory/`);

  getAllConstructionZones = () => axiosInstance.get(`${this._baseUrl}/construction_zone/`);

  getAllRoadLines = () => axiosInstance.get(`${this._baseUrl}/road_line/`);

  // getBaseCollection = (id) => axiosInstance.get(`${this._baseUrl}/base_collections/${id}/`);

  // getCollection = (id) => axiosInstance.get(`${this._baseUrl}/collections/${id}/`);

  // getTable = (id) => axiosInstance.get(`${this._baseUrl}/tables/${id}/`);

  // // getCollections = (id) => axiosInstance.get(`/gesn/base_collections/${id}/`);

  // // BEGIN NORMS
  // addNorm = (item) => axiosInstance.post(`${this._baseUrl}/norms/`, item);

  // editNorm = (item) => axiosInstance.put(`${this._baseUrl}/norms/${item.id}/`, item);
  // // END NORMS
}
