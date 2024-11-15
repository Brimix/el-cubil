import {PLATE_LOGO_URL} from "./constants";

export const getCustomProduct = (sectionName: string) => {
  // const description = `Crea tu ${sectionName.toLowerCase()} personalizada`;
  return {
    name: 'Personalizado',
    description: 'Encargá un producto personalizado',
    images: [PLATE_LOGO_URL],
  };
}
