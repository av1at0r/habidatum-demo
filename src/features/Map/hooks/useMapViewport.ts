import { useCallback, useEffect, useRef, useState } from "react";
import { ContextViewStateChangeInfo, ViewState } from "react-map-gl";

export default function useMapViewport(initialState?: Partial<ViewState>) {
  const [viewState, setViewState] = useState<ViewState>({
    latitude: 0,
    longitude: 0,
    zoom: 5,
    ...initialState,
  });

  const viewStateRef = useRef(viewState);

  useEffect(() => {
    viewStateRef.current = viewState;
  }, [viewState]);

  const setPartialViewportState = useCallback(
    (viewState: Partial<ViewState>) => {
      setViewState({
        ...viewStateRef.current,
        ...viewState,
      });
    },
    []
  );

  const handleViewChanged = useCallback(
    (viewState: ContextViewStateChangeInfo) => {
      setViewState({
        ...viewState.viewState,
        ...viewState.newViewState,
      });
    },
    []
  );

  return {
    viewState,
    setViewState,
    handleViewChanged,
    setPartialViewportState,
  };
}
