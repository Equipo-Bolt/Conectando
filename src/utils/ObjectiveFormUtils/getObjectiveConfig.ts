interface FieldConfig {
  visible: boolean;
  editable: boolean;
  required: boolean;
}

interface ObjectiveFormConfig {
  title: FieldConfig;
  classification: FieldConfig;
  weight: FieldConfig;
  goal: FieldConfig;
  result: FieldConfig;
  grade: FieldConfig;
  editButtonText: string;
  showEditButton: boolean;
}

export const getFormConfig = (progress: string): ObjectiveFormConfig => {
  const config: ObjectiveFormConfig = {
    title: { visible: false, editable: false, required: false },
    classification: { visible: false, editable: false, required: false },
    weight: { visible: false, editable: false, required: false },
    goal: { visible: false, editable: false, required: false },
    result: { visible: false, editable: false, required: false },
    grade: { visible: false, editable: false, required: false },
    editButtonText: "Editar Objetivo",
    showEditButton: true,
  };

  switch (progress) {
    case "Borrador":
      config.title = { visible: true, editable: true, required: true };
      config.classification = { visible: true, editable: true, required: true };
      config.weight = { visible: true, editable: true, required: true };
      config.goal = { visible: true, editable: true, required: false };

      config.showEditButton = true;
      break;
    case "Enviado":
      config.title = { visible: true, editable: false, required: false };
      config.classification = {
        visible: true,
        editable: false,
        required: false,
      };
      config.weight = { visible: true, editable: false, required: false };
      config.goal = { visible: true, editable: false, required: false };
      config.showEditButton = false;
      break;
    case "Aprobado":
      config.title = { visible: true, editable: false, required: false };
      config.classification = {
        visible: true,
        editable: false,
        required: false,
      };
      config.weight = { visible: true, editable: false, required: false };
      config.goal = { visible: true, editable: false, required: false };
      config.result = { visible: true, editable: true, required: true };
      config.editButtonText = "Agregar resultado";
      break;
    case "Calificado":
      config.title = { visible: true, editable: false, required: false };
      config.classification = {
        visible: true,
        editable: false,
        required: false,
      };
      config.weight = { visible: true, editable: false, required: false };
      config.goal = { visible: true, editable: false, required: false };
      config.result = { visible: true, editable: false, required: false };
      config.grade = { visible: true, editable: false, required: false };
      config.showEditButton = false;
      break;
  }

  return config;
};
