import { FormGroup } from '@angular/forms';
import { UUID } from 'angular2-uuid';

export class Categoria {

    constructor(
        public id: string = UUID.UUID(),
        public descricao?: string,
        public ativo: string = 'S',
        public key?: string
    ) {}

    /**
     * Retorna uma instancia de categoria com base no parâmetro informado.
     * Copia todos os valores dos atributos do objeto passado que coincidam
     * com os nomes dos atributos de categoria.
     * @param formGroup FormGroup 
     */
    public static buildFromFromGroup(formGroup: FormGroup): Categoria {
        let categoria: Categoria = new Categoria();

        Object.keys(categoria).forEach( key => {
            if (formGroup.controls[key]) {
                categoria[key] = formGroup.controls[key].value;
            }
        })

        return categoria;
    }

}