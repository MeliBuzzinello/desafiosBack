import mongoose from "mongoose";

const studySchema = new mongoose.Schema({
    nombre: { type: String, require: true },
    apellido: { type: String, require: true },
    edad: { type: Number, require: true },
    dni: { type: String, require: true, unique: true},
    curso: { type: String, require: true },
    nota: { type: Number, require: true },
    ingreso: { type: Boolean, default: false}
  });
  
const studyModel = mongoose.model('estudiantes', studySchema);

const URL = 'mongodb+srv://melisabuzzinello:rHoBiwDQak6rrRlq@cluster0.8wjkcvd.mongodb.net/colegio?retryWrites=true&w=majority';

await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

console.log('base de datos conectada');

try {
    console.log('actualizar dni');
    const estudianteActualizado = await studyModel.updateOne(
        { nombre: 'Lucas', apellido: 'Blanco' },{ dni: '20355875' });
        console.log(estudianteActualizado);

    console.log('agregar campo ingreso');
    const ingresoUpdate = await studyModel.updateMany({},{ ingreso: false });
    console.log(ingresoUpdate)

    console.log('modificar valor ingreso');
    const ingresoUpdateTrue = await studyModel.updateMany(
        { curso: '1A'},{ ingreso: true });
    console.log(ingresoUpdateTrue)

    console.log('listar alumnos aprobados');
    const aprobados = await studyModel.find({ nota: { $gte: 4 } }, { _id: 0, __v: 0 });
    console.log(aprobados)

    console.log('listar alumnos por fecha');
    const alumnosFechaCreacion = await studyModel.find({}, { __v: 0 });

    alumnosFechaCreacion.forEach(alumnos =>{
          console.log(
            alumnos, '--> fecha de creacion: ',
            new Date(alumnos._id.getTimestamp()).toLocaleString()
          )
    })


} catch (error) {
    console.log(error);
} finally {
    await mongoose.disconnect();
}