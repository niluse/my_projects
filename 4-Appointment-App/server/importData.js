const { Sequelize, DataTypes } = require("sequelize");
const fs = require("fs");
const path = require("path");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: path.join(__dirname, "appointmentAppDB.sqlite3"),
});

const Doctors = sequelize.define("doctors", {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  }, //* "Dr. Kristensen Abraham",
  dep: {
    type: DataTypes.TEXT,
    allowNull: false,
  }, //* "Neurology",
  img: {
    type: DataTypes.TEXT,
    allowNull: false,
  }, //* "./img/dr6.jpg",
});

const Appointments = sequelize.define("appointments", {
  //   appointmentId: {
  //     type: DataTypes.INTEGER,
  //     autoIncrement: true,
  //     references: {
  //       model: Doctors,
  //       key: "id",
  //     },
  //   },
  patient: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  day: {
    type: DataTypes.TEXT,
    allowNull: false,
  }, //* "2024-10-02T10:00:00Z"
  consulted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  }, //* true,
  doctor: {
    type: DataTypes.TEXT,
    allowNull: false,
  }, //* "Dr. Hazel Valery"
});

Doctors.hasMany(Appointments, {
  foreignKey: "doctor",
  sourceKey: "name",
  as: "assignedAppointments",
  onDelete: "CASCADE",
});
Appointments.belongsTo(Doctors, {
  foreignKey: "doctor",
  targetKey: "name",
  as: "assignedDoctor",
});

async function importData() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    const doctorDataPath = path.join(__dirname, "doctorData.json");
    const appointmentDataPath = path.join(__dirname, "appointmentData.json");

    const doctorData = JSON.parse(fs.readFileSync(doctorDataPath, "utf8"));
    const appointmentData = JSON.parse(
      fs.readFileSync(appointmentDataPath, "utf8")
    );

    for (const doc of doctorData) {
      await Doctors.create({
        name: doc.name,
        dep: doc.dep,
        img: doc.img,
      });
      for (const app of appointmentData) {
        if (app.doctor === doc.name) {
          await Appointments.create({
            patient: app.patient,
            day: app.day,
            consulted: app.consulted,
            doctor: app.doctor,
          });
        }
      }
    }
    console.log("Data imported successfully!");
    await sequelize.close();
  } catch (error) {
    console.error("Error importing data:", error);
  }

  //   await sequelize.drop();
}

importData();
