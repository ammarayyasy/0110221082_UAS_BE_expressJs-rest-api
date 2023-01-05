// import Model Patient
const Patient = require("../models/Patient");

// buat class PatientController
class PatientController {
  // method index
  async index(req, res) {
    const patients = await Patient.all();

    if (patients.length > 0) {
      const data = {
        message: "Get All Resource",
        data: patients,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: "Data is empty",
      };

      res.status(200).json(data);
    }
  }

  // method store
  async store(req, res) {
    const { name, phone, address, status, in_date_at, out_date_at } = req.body;

    if (!name || !phone || !address || !status || !in_date_at || !out_date_at) {
      const data = {
        message: `All fields must be filled correctly`,
      };

      res.status(422).json(data);
    } else {
      const patient = await Patient.create(req.body);
      const data = {
        message: "Resource is added successfully",
        data: patient,
      };

      res.status(201).json(data);
    }
  }

  // method update
  async update(req, res) {
    const { id } = req.params;
    const patient = await Patient.find(id);

    if (patient) {
      const patient = await Patient.update(id, req.body);
      const data = {
        message: `Resource is update successfully`,
        data: patient,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `Resource not found`,
        data: patient,
      };

      res.status(404).json(data);
    }
  }

  // method destroy
  async destroy(req, res) {
    const { id } = req.params;
    const patient = await Patient.find(id);

    if (patient) {
      await Patient.delete(id);
      const data = {
        message: ` Resource is delete successfully`,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `Resource not found`,
      };

      res.status(404).json(data);
    }
  }

  // method show
  async show(req, res) {
    const { id } = req.params;
    const patient = await Patient.find(id);

    if (patient) {
      const data = {
        message: `Get Detail Resource`,
        data: patient,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `Resource not found`,
      };

      res.status(404).json(data);
    }
  }

  // method search
  async search(req, res) {
    const { name } = req.params;
    const patient = await Patient.search(name);

    if (patient) {
      const data = {
        message: `Get searched resource`,
        data: patient,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `Resource not found`,
      };

      res.status(404).json(data);
    }
  }

  // method potitive
  async positive(req, res) {
    const status = "positive";
    const patient = await Patient.findByStatus(status);

    if (patient) {
      const data = {
        message: `Get positive resource`,
        total: patient.length,
        data: patient,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `Resource not found`,
      };

      res.status(404).json(data);
    }
  }

  // method recovered
  async recovered(req, res) {
    const status = "recovered";
    const patient = await Patient.findByStatus(status);

    if (patient) {
      const data = {
        message: `Get recovered resource`,
        total: patient.length,
        data: patient,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `Resource not found`,
      };

      res.status(404).json(data);
    }
  }

  // method dead
  async dead(req, res) {
    const status = "dead";
    const patient = await Patient.findByStatus(status);

    if (patient) {
      const data = {
        message: `Get dead resource`,
        total: patient.length,
        data: patient,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `Resource not found`,
      };

      res.status(404).json(data);
    }
  }
}

// membuat object PatientController
const object = new PatientController();

// export object PatientController
module.exports = object;
