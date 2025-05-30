import { LoadingBarRef } from 'react-top-loading-bar';

let loadingBarRef: LoadingBarRef | null = null;

export function setLoadingBarRef(ref: LoadingBarRef | null) {
  loadingBarRef = ref;
}

export function startLoadingBar() {
  if (loadingBarRef) {
    loadingBarRef.continuousStart();
  }
}

export function completeLoadingBar() {
  if (loadingBarRef) {
    loadingBarRef.complete();
  }
}
