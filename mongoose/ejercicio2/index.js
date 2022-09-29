const mongoose = require("mongoose");

const StudySchema = new mongoose.Schema({
  nombre: { type: String, require: true },
  apellido: { type: String, require: true },
  edad: { type: Number, require: true, unique: true },
  curso: { type: String, require: true },
  nota: { type: Number, require: true },
});

const studyModel = mongoose.model("estudiantes", StudySchema);

const URL = "mongodb://localhost:27017/colegio";

mongoose
  .connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("base de datos conectada");
    studyModel.find({}).sort({ nombre: 1 })
      .then((estudiantes) => {
        estudiantes.forEach((element) => {
        //   console.log(element);
        });
        return studyModel.find({}).sort({ edad: 1 }).limit(1);
      })
      .then((estudiantes) => {
        estudiantes.forEach((element) => {
        //   console.log(element);
        });
        return studyModel.find({ curso: "2A" });
      })
      .then((estudiantes) => {
        estudiantes.forEach((element) => {
        //   console.log(element);
        });
        return studyModel.find({}).sort({ edad: 1 }).skip(1).limit(1);
      })
      .then((estudiantes) => {
        estudiantes.forEach((element) => {
        //   console.log(element);
        });
        return studyModel.find({},{ 'nombre': 1, 'apellido': 1, 'curso': 1, _id: 0}).sort({ apellido: -1 });
      })
      .then((estudiantes) => {
        estudiantes.forEach((element) => {
        //   console.log(element);
        });
        return studyModel.find({ 'nota': 10 });
      })
      .then((estudiantes) => {
        estudiantes.forEach((element) => {
        //   console.log(element);
        });
        return studyModel.find({});
      });
  });
 