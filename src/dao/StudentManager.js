import StudentModel from '../models/student.model.js';
import { Exception } from '../utils.js';

export default class StudentManager {
  // Utiliza comentarios para explicar la funcionalidad de los métodos

  /**
   * Obtiene una lista de estudiantes basada en un criterio de búsqueda.
   * @param {Object} query - Criterio de búsqueda opcional.
   * @returns {Promise<Array>} - Una lista de estudiantes que coinciden con el criterio.
   */
  static async get(query = {}) {
    const criteria = query.course ? { course: query.course } : {};
    return await StudentModel.find(criteria);
  }

  /**
   * Obtiene un estudiante por su ID.
   * @param {string} sid - ID del estudiante.
   * @returns {Promise<Object>} - El estudiante encontrado.
   * @throws {Exception} - Si el estudiante no existe.
   */
  static async getById(sid) {
    const student = await StudentModel.findById(sid);
    if (!student) {
      throw new Exception('No existe el estudiante 😨', 404);
    }
    return student;
  }

  /**
   * Crea un nuevo estudiante.
   * @param {Object} data - Datos del estudiante a crear.
   * @returns {Promise<Object>} - El estudiante creado.
   */
  static async create(data) {
    const student = await StudentModel.create(data);
    console.log('Estudiante creado correctamente 😁');
    return student;
  }

  /**
   * Actualiza un estudiante por su ID.
   * @param {string} sid - ID del estudiante.
   * @param {Object} data - Datos actualizados del estudiante.
   * @throws {Exception} - Si el estudiante no existe.
   */
  static async updateById(sid, data) {
    const student = await StudentModel.findById(sid);
    if (!student) {
      throw new Exception('No existe el estudiante 😨', 404);
    }
    const criteria = { _id: sid };
    const operation = { $set: data };
    await StudentModel.updateOne(criteria, operation);
    console.log('Estudiante actualizado correctamente 😁');
  }

  /**
   * Elimina un estudiante por su ID.
   * @param {string} sid - ID del estudiante a eliminar.
   * @throws {Exception} - Si el estudiante no existe.
   */
  static async deleteById(sid) {
    const student = await StudentModel.findById(sid);
    if (!student) {
      throw new Exception('No existe el estudiante 😨', 404);
    }
    const criteria = { _id: sid };
    await StudentModel.deleteOne(criteria);
    console.log('Estudiante eliminado correctamente 😑');
  }
}
