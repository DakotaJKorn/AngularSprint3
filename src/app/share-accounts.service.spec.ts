import { TestBed } from '@angular/core/testing';

import { ShareAccountsService } from './share-accounts.service';

describe('ShareAccountsService', () => {
  let service: ShareAccountsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShareAccountsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
