import {
  SEGMENT_NAMES,
  getAllAction,
  addAction,
  editAction,
  deleteAction,
} from './actions';
// import axiosInstance from '../axios-instance';
// return axiosInstance.post('/books_material/', item);
// return axiosInstance.put(`/books_material/${item.id}/`, item);
// return axiosInstance.delete(`/books_material/${id}`);

// MATERIALS
const RESOURSE_NAME = 'mechanism';

export default class ClassifierService {
  // ----- BOOKS BEGIN------
  getAllBooks = () => getAllAction(RESOURSE_NAME, SEGMENT_NAMES.books)

  getAllBooksWithRelation = () => getAllAction(RESOURSE_NAME,
    `with_relation_${SEGMENT_NAMES.books}`)

  addBook = (item) => addAction(RESOURSE_NAME, SEGMENT_NAMES.books, item);

  editBook = (item) => editAction(RESOURSE_NAME, SEGMENT_NAMES.books, item);

  deleteBook = (id) => deleteAction(RESOURSE_NAME, SEGMENT_NAMES.books, id);
  // ----- BOOKS END ------

  // ----- SECTIONS BEGIN------
  getAllSections = () => getAllAction(RESOURSE_NAME, SEGMENT_NAMES.sections);

  addSection = (item) => addAction(RESOURSE_NAME, SEGMENT_NAMES.sections, item);

  editSection = (item) => editAction(RESOURSE_NAME, SEGMENT_NAMES.sections, item);

  deleteSection = (id) => deleteAction(RESOURSE_NAME, SEGMENT_NAMES.sections, id);
  // ----- SECTIONS END------

  // ----- GROUPS BEGIN------
  getAllGroups = () => getAllAction(RESOURSE_NAME, SEGMENT_NAMES.groups);

  addGroup = (item) => addAction(RESOURSE_NAME, SEGMENT_NAMES.groups, item);

  editGroup = (item) => editAction(RESOURSE_NAME, SEGMENT_NAMES.groups, item);

  deleteGroup = (id) => deleteAction(RESOURSE_NAME, SEGMENT_NAMES.groups, id);
  // ----- GROUPS END------

  // ----- POSITIONS BEGIN------
  getAllPositions = () => getAllAction(RESOURSE_NAME, SEGMENT_NAMES.positions);

  addPosition = (item) => addAction(RESOURSE_NAME, SEGMENT_NAMES.positions, item);

  editPosition = (item) => editAction(RESOURSE_NAME, SEGMENT_NAMES.positions, item);

  deletePosition = (id) => deleteAction(RESOURSE_NAME, SEGMENT_NAMES.positions, id);
  // ----- POSITIONS END------
}
