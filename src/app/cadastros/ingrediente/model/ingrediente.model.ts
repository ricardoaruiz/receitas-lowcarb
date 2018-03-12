import { FormGroup } from '@angular/forms';

export class Ingrediente {

    constructor(
        public id: number = 0,
        public descricao?: string,
        public ativo: boolean = true
    ) {}

    /**
     * Retorna um objeto Ingrediente em função do formGroup informado.
     * 
     * @param formGroup 
     */
    public static buildFromFormGroup(formGroup: FormGroup): Ingrediente {
        let ingrediente: Ingrediente = new Ingrediente();

        Object.keys(ingrediente).forEach( key => {
            if (formGroup.controls[key]) {
                ingrediente[key] = formGroup.controls[key].value;
            }
        })

        return ingrediente;
    }

}