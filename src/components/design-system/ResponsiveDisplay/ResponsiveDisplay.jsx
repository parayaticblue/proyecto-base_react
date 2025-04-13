import { useEffect, useState } from 'react';
import { useResponsive } from 'hooks/useResponsive';
import { DICTONARY } from 'const/Dictonary';

export const ResponsiveDisplay = ({
  breakPoint = DICTONARY.RESPONSIVE_BREAKPOINT.MD,
  componentePrimario,
  componenteSecundario,
  variableLeer
}) => {
  const [isDisplayPrimario, setIsDisplayPrimario] = useState(null);
  const { customBreakPoint } = useResponsive(breakPoint);

  useEffect(() => {
    setIsDisplayPrimario(variableLeer);
    window.scrollTo(0, 0);
  }, [variableLeer]);

  return (
    <>
      {customBreakPoint ? (
        <>
          <div className="absolute top-0 z-10 left-0 right-0 bg-white">
            {isDisplayPrimario && <>{componenteSecundario}</>}
          </div>
          {componentePrimario}
        </>
      ) : (
        <>{componentePrimario}</>
      )}
    </>
  );
};
