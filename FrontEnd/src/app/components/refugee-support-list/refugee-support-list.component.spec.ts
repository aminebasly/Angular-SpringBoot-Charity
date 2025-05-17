import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RefugeeSupportControllerService } from '../../services/servicess/refugee-support-controller.service';
import { RefugeeSupport } from '../../services/models/refugee-support';

describe('RefugeeSupportControllerService', () => {
  let service: RefugeeSupportControllerService;
  let httpMock: HttpTestingController;
  const apiUrl = '/api/refugee-supports'; // Remplace par ton URL réelle si nécessaire

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RefugeeSupportControllerService]
    });

    service = TestBed.inject(RefugeeSupportControllerService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Vérifie qu'aucune requête HTTP n'est en attente
  });

  it('devrait être créé', () => {
    expect(service).toBeTruthy();
  });

  it('devrait récupérer tous les RefugeeSupports (GET)', () => {
    const mockData: RefugeeSupport[] = [
      { supportId: 1, helpRequest: 'Besoin de logement', question: 'Où aller ?', reqStatus: 'PENDING', services: [] },
      { supportId: 2, helpRequest: 'Soins médicaux', question: 'Où trouver un médecin ?', reqStatus: 'ANSWERED', services: [] }
    ];

    service.getAllRefugeeSupports().subscribe((data) => {
      expect(data.length).toBe(2);
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('devrait créer un RefugeeSupport (POST)', () => {
    const newSupport: RefugeeSupport = { helpRequest: 'Besoin d\'aide', question: 'Comment faire ?', reqStatus: 'PENDING', services: [] };

    service.createRefugeeSupport({ body: newSupport }).subscribe((data) => {
      expect(data).toEqual(newSupport);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush(newSupport);
  });

  it('devrait mettre à jour un RefugeeSupport (PUT)', () => {
    const updatedSupport: RefugeeSupport = { supportId: 1, helpRequest: 'Aide mise à jour', question: 'Mise à jour ?', reqStatus: 'ANSWERED', services: [] };

    service.updateRefugeeSupport({ id: 1, body: updatedSupport }).subscribe((data) => {
      expect(data).toEqual(updatedSupport);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedSupport);
  });

  it('devrait supprimer un RefugeeSupport (DELETE)', () => {
    service.deleteRefugeeSupport({ id: 1 }).subscribe((data) => {
      expect(data).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
