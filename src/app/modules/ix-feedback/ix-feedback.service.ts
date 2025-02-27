import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import html2canvas, { Options } from 'html2canvas';
import {
  BehaviorSubject,
  Observable, combineLatest, filter, first, map, switchMap,
} from 'rxjs';
import {
  AddReview, AttachmentAddedResponse,
} from 'app/modules/ix-feedback/interfaces/feedback.interface';
import { SystemGeneralService } from 'app/services/system-general.service';
import { WebSocketService } from 'app/services/ws.service';
import { AppState } from 'app/store';
import { selectSystemHostId, waitForSystemInfo } from 'app/store/system-info/system-info.selectors';
import { ReviewAddedResponse } from './interfaces/feedback.interface';

@Injectable({
  providedIn: 'root',
})
export class IxFeedbackService {
  isReviewAllowed$ = new BehaviorSubject<boolean>(false);
  private readonly hostname = 'https://feedback.ui.truenas.com';

  constructor(
    private httpClient: HttpClient,
    private ws: WebSocketService,
    private store$: Store<AppState>,
    private systemGeneralService: SystemGeneralService,
  ) {
    this.checkIfReviewAllowed().subscribe({
      next: (isAllowed) => {
        this.isReviewAllowed$.next(isAllowed);
      },
      error: () => {
        this.isReviewAllowed$.next(false);
      },
    });
  }

  getHostId(): Observable<string> {
    return this.store$.select(selectSystemHostId).pipe(filter(Boolean));
  }

  addReview(body: AddReview): Observable<ReviewAddedResponse> {
    return this.httpClient.post<ReviewAddedResponse>(`${this.hostname}/api/reviews/add/`, body);
  }

  addAttachment(reviewId: number, image: File): Observable<AttachmentAddedResponse> {
    const formData = new FormData();
    formData.append('image', image);

    return this.httpClient.post<AttachmentAddedResponse>(
      `${this.hostname}/api/reviews/${reviewId}/add-attachment/`,
      formData,
    );
  }

  takeScreenshot(filename = `${Date.now()}.png`, type = 'image/png', options?: Partial<Options>): Observable<File> {
    return new Observable((observer) => {
      html2canvas(document.body, {
        allowTaint: true,
        useCORS: true,
        imageTimeout: 0,
        ignoreElements: (element) => element.classList.contains('cdk-overlay-container'),
        ...options,
      }).then((canvas) => {
        canvas.toBlob((blob) => {
          const file = new File([blob], filename, { type });
          observer.next(file);
          observer.complete();
        }, type);
      }).catch((error) => {
        observer.error(error);
      });
    });
  }

  checkIfReviewAllowed(): Observable<boolean> {
    return combineLatest([
      this.store$.pipe(waitForSystemInfo),
      this.systemGeneralService.getProductType$,
    ]).pipe(
      first(),
      switchMap(([systemInfo, productType]) => {
        const params = new HttpParams()
          .set('version', systemInfo.version)
          .set('product_type', productType);

        return this.httpClient
          .get<{ value: boolean }>(`${this.hostname}/api/collect-blacklist/check/`, { params })
          .pipe(map((response) => !response.value));
      }),
    );
  }
}
