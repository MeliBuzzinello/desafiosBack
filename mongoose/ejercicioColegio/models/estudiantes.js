import mongoose from "mongoose";

// const studyCollection = 'estudiantes';

const StudySchema = new mongoose.Schema({
    nombre: { type: String, require: true },
    apellido: { type: String, require: true },
    edad: { type: Number, require: true },
    dni: { type: String, require: true, unique: true},
    curso: { type: String, require: true },
    nota: { type: Number, require: true }
});

export const studyModel = mongoose.model('estudiantes', StudySchema);