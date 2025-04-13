import { DICTONARY } from 'const/Dictonary';
import { RoleComponent } from './Role';

export const MultipleRole = ({ roles, gradoAutorizacionesSanitarias }) => {
  const CODIGO_ROL = roles[0] || 'generador';
  const NOMBRE_ROL = DICTONARY.ROLES_KEY_NAME[CODIGO_ROL];

  const getIcon = () => {
    const tieneMultiplesRoles = roles && roles.length > 1;

    if (tieneMultiplesRoles) {
      if (roles.includes(DICTONARY.ROL.RECEPTOR.CODIGO)) {
        return iconoOferenteDemandante();
      } else {
        return (
          <RoleComponent rol={DICTONARY.ROL.GESTOR.NOMBRE} tipo="marcador" />
        );
      }
    } else {
      return (
        <RoleComponent
          rol={NOMBRE_ROL}
          tipo="marcador"
          gradoAutorizacionesSanitarias={gradoAutorizacionesSanitarias}
        />
      );
    }
  };

  const iconoOferenteDemandante = () => {
    return (
      <div className="relative w-10 h-10 bg-uv-secondary-0 text-white rounded-md p-2">
        <div className="relative -top-1 left-1">
          {DICTONARY.ROL.GENERADOR.ICONO()}
        </div>
        <div className="absolute top-2.5 left-1.5">
          {DICTONARY.ROL.RECEPTOR.ICONO()}
        </div>
      </div>
    );
  };

  return <div>{getIcon()}</div>;
};
