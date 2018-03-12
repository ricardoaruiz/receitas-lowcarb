import { TestBed, inject } from '@angular/core/testing';

import { ListarServiceService } from './listar-service.service';

describe('ListarServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListarServiceService]
    });
  });

  it('should be created', inject([ListarServiceService], (service: ListarServiceService) => {
    expect(service).toBeTruthy();
  }));
});
