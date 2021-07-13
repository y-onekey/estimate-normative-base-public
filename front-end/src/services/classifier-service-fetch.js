class ClassifierService {
  _baseApi = 'http://localhost:8000/api_2';

  getResource = async (url) => {
    const res = await fetch(`${this._baseApi}${url}`);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url} recived ${res.status}`);
    }
    const data = await res.json();
    return data;
  };

  getBooksMatarial = async () => {
    const books = this.getResource('/books_material');
    return books;
  };

  getBooksEquipment = async () => {
    const books = this.getResource('/books_equipment');
    return books;
  };

  getBooksMechanism = async () => {
    const books = this.getResource('/books_mechanism');
    return books;
  };

  getBooksPositions = async () => {
    const positions = this.getResource('/positions_material/');
    return positions;
  };

  getMaterialPosition = async (pk) => {
    const positions = this.getResource(`/positions_material/${pk}/`);
    return positions;
  }
}

export default ClassifierService;
