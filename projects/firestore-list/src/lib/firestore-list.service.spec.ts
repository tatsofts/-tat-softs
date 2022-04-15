import { TestBed } from '@angular/core/testing';

import { FirestoreListService } from './firestore-list.service';

describe('FirestoreListService', () => {
  let service: FirestoreListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
