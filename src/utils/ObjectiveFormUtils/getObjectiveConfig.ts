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

/**
 * @description Generates the configuration for an objective form based on the provided progress state.
 *
 * @param progress - The current progress state of the objective.
 *                   Possible values are:
 *                   - "Borrador": Draft state where fields are editable and required.
 *                   - "Enviado": Submitted state where fields are visible but not editable.
 *                   - "Aprobado": Approved state where result field becomes editable.
 *                   - "Calificado": Graded state where all fields are visible but not editable.
 *
 * @returns An `ObjectiveFormConfig` object containing visibility, editability, and requirement settings
 *          for each field, as well as button text and visibility configurations.
 */
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
      config.editButtonText = "Agregar Resultado";
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
