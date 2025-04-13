import { DICTONARY } from 'const/Dictonary';
import styles from './role.module.css';
import { RecicladorICON } from 'helpers/autorizaciones';
/**
 *
 * @param rol 'generador' 'receptor' 'asesor' 'gestor' 'transportista' 'oferentedemandante', 'recicladordebase', 'asesordecircularidad'
 * @param tipo  'etiqueta' 'marcador', 'icono'
 * @param verbo  'accion' 'nombre'
 * @param size 'm', 's'
 * @returns
 */
export const RoleComponent = props => {
  const { arrayRol, sucursal, gradoAutorizacionesSanitarias, ...rest } = props;
  if (arrayRol && arrayRol.length > 0) {
    return (
      <MultipleRole
        roles={arrayRol}
        autorizacion={gradoAutorizacionesSanitarias}
        {...rest}
      />
    );
  } else {
    return (
      <SingleRole
        roles={arrayRol}
        autorizacion={gradoAutorizacionesSanitarias}
        {...rest}
      />
    );
  }
};

const MultipleRole = props => {
  const { roles, autorizacion, ...rest } = props;
  const arrayRole = roles.map(item => item.codigoRol);
  if (
    arrayRole.includes(DICTONARY.ROL.GENERADOR.CODIGO) &&
    arrayRole.includes(DICTONARY.ROL.RECEPTOR.CODIGO)
  ) {
    return <SingleRole rol="oferentedemandante" {...rest} />;
  } else if (arrayRole.includes(DICTONARY.ROL.GENERADOR.CODIGO)) {
    return <SingleRole rol="generador" {...rest} />;
  } else if (arrayRole.includes(DICTONARY.ROL.RECEPTOR.CODIGO)) {
    return <SingleRole rol="receptor" {...rest} />;
  } else if (arrayRole.includes(DICTONARY.ROL.TRANSPORTISTA.CODIGO)) {
    return <SingleRole rol="transportista" {...rest} />;
  } else if (arrayRole.includes(DICTONARY.ROL.ASESOR.CODIGO)) {
    return <SingleRole rol="asesor" {...rest} />;
  } else if (arrayRole.includes(DICTONARY.ROL.RECICLADORDEBASE.CODIGO)) {
    return (
      <SingleRole
        rol="recicladordebase"
        autorizacion={autorizacion}
        {...rest}
      />
    );
  } else if (arrayRole.includes(DICTONARY.ROL.ASESORDECIRCULARIDAD.CODIGO)) {
    return <SingleRole rol="asesordecircularidad" {...rest} />;
  } else {
    return <SingleRole rol="gestor" {...rest} />;
  }
};

const SingleRole = props => {
  let {
    rol = DICTONARY.ROL.RECEPTOR.NOMBRE,
    tipo = 'etiqueta',
    verbo = 'accion',
    autorizacion = props.autorizacion || '',
    className,
    ...rest
  } = props;

  // Si el rol es oferente o demandante, se cambia a generador o receptor
  switch (rol) {
    case 'oferente':
      rol = DICTONARY.ROL.GENERADOR.NOMBRE;
      break;
    case 'demandante':
      rol = DICTONARY.ROL.RECEPTOR.NOMBRE;
      break;
    default:
      break;
  }

  return (
    <>
      {tipo === 'etiqueta' && (
        <Etiqueta
          verbo={verbo}
          className={className}
          autorizacion={autorizacion}
          rol={rol.replaceAll(' ', '')}
          {...rest}
        />
      )}

      {tipo === 'marcador' && (
        <Marcador
          verbo={verbo}
          className={className}
          autorizacion={autorizacion}
          rol={rol.replaceAll(' ', '')}
          {...rest}
        />
      )}

      {tipo === 'icono' && (
        <Icono
          className={className}
          rol={rol.replaceAll(' ', '')}
          autorizacion={autorizacion}
          {...rest}
        />
      )}
    </>
  );
};

const Etiqueta = props => {
  const { verbo, className, rol, autorizacion, ...rest } = props;
  const { ICONO, ACCION, NOMBRE } = DICTONARY.ROL[rol.toUpperCase()];
  return (
    <div
      className={`
        ${className}
        ${styles['etiqueta']}
        ${styles[rol.replace(/\s+/g, '')]}
        ${styles[rol + autorizacion]}
      `}
      {...rest}
    >
      <ICONO className={styles.iconoEtiqueta} />
      {verbo === 'accion' ? <span>{ACCION}</span> : <span>{NOMBRE}</span>}
    </div>
  );
};

const Marcador = props => {
  const { verbo, className, rol, autorizacion, ...rest } = props;
  const { ICONO } = DICTONARY.ROL[rol.toUpperCase()] || DICTONARY.ROL.GENERADOR;
  if (rol === 'recicladordebase') {
    return (
      <div
        className={`
        ${className}
        ${styles['marcador-reciclador']}
      `}
        {...rest}
      >
        <RecicladorICON tipo={autorizacion} className={styles.iconoMarcador} />
      </div>
    );
  }

  return (
    <div
      className={`
        ${className}
        ${styles['marcador']}
        ${styles[rol]}
        ${styles[rol + autorizacion]}
      `}
      {...rest}
    >
      <ICONO className={styles.iconoMarcador} />
    </div>
  );
};

const Icono = props => {
  const { className, rol } = props;
  const { ICONO } = DICTONARY.ROL[rol.toUpperCase()];
  return (
    <ICONO
      className={`
        ${className}
        ${styles.iconoMarcador}
        ${styles['icono-' + rol]}
      `}
    />
  );
};
